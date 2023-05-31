//import React, { Component } from 'react';
import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import ViewCaseNav from './Navbar/ViewCaseNavF.jsx'
import CrimeScenePhotographs from './CrimeScenePhotographs';

import SimpleStorageContract from "../contracts/ForensicContract.json";
import getWeb3 from "../utils/getWeb3";

import ipfs from '../ipfs';



function ViewForensic(props) {
  const [state, setState] =useState({ web3: null,
   // buffer: null,
    contract: null,
    accounts: null,});
  const [ipfsHash, setIpfsHash] = useState("");
  const [buffer, setBuffer] = useState(null);
  
  const [case_id, setCaseId] = useState();
  const [exhibit_name, setExhibitName] = useState("");
  const [desc, setDesc] = useState("");
  const [timestamp, setTimestamp] = useState("");

      useEffect(() => {
        const init = async () => {
        try {
          // Get network provider and web3 instance.
          const web3 = await getWeb3();           
          // Use web3 to get the user's accounts.
          const accounts = await web3.eth.getAccounts();      
    
          // Get the contract instance.
          const networkId = await web3.eth.net.getId();
          const deployedNetwork = SimpleStorageContract.networks[networkId];
          const instance = new web3.eth.Contract(
            SimpleStorageContract.abi,
            deployedNetwork && deployedNetwork.address,
          );
          console.log(deployedNetwork.address);    
          // Set web3, accounts, and contract to the state, and then proceed with an
          // example of interacting with the contract's methods.
           setState({ web3: web3, contract: instance, accounts: accounts });
        //  setWeb3(web3);
         // setAccounts(accounts);
         // setContract(instance);
          // runExample();
          onGetDate();
          // getVal();
          // getImg();
        } catch (error) {
          // Catch any errors for any of the above operations.
          alert(
            `Failed to load web3, accounts, or contract. Check console for details.`,
          );
          console.error(error);
        }
      }
        init();
      }, []);
    
    
      const captureFile = async (event) => {
        event.preventDefault();
        const file = event.target.files[0];
        const reader = await new window.FileReader();
        await reader.readAsArrayBuffer(file);
        reader.onloadend = async () => {
          await setBuffer(reader.result);
         // setBuffer(Buffer(reader.result));
          console.log('buffer', buffer);
        };
      };
      
    
      const onSubmit = async (event) =>  {
            const { accounts, contract } = state;
           event.preventDefault();
           try {
            const result = await ipfs.add(buffer);
            console.log(result);
            await setIpfsHash(result.path);
            // const url = `http://localhost:8080/ipfs/${ipfsHash}`;
            // console.log(ipfsHash);
          //  window.location = url;
            console.log(caseId, exhibit_name, desc, timestamp, result.path);
            contract.methods.addReport(caseId, exhibit_name, desc, timestamp, result.path).send({ from: accounts[0] });
            
            
            // console.log(ipfs);
          } catch (error) {
            console.error(error);
          }
        //  });
        }; 
             
    

         

          
       

          

          const onGetDate = () => {
            const date = new Date();
            const year = date.getFullYear().toString();
            const month = (date.getMonth() + 101).toString().substring(1);
            const day = (date.getDate() + 100).toString().substring(1);
            const hour = (date.getHours() + 100).toString().substring(1);
            const mins = (date.getMinutes() + 100).toString().substring(1);
            const sec = (date.getSeconds() + 100).toString().substring(1);
            setTimestamp(year + "-" + month + "-" + day + " " + hour + ":" + mins + ":" + sec);
          };

          const {caseId} = useParams();
          // setCaseId(caseId);
          console.log(caseId);
         //const crimeId = props.routeParams.crimeId;
        //  console.log("crid", crimeId);
          
          return (
            <div>
              <ViewCaseNav crimeId={caseId} />
              <h4  className="title-styled" style={{ marginTop: "40px",  marginLeft: "235px", marginBottom: "25px"  }}>
                Upload Forensic Reports</h4>
      <div className="container">
      <form onSubmit={onSubmit} id="donateForm" className="donate-form">
        <div className="row">
          <div className="col-sm-4">
            <div className="form-group required">
              <label htmlFor="report_type">CASE ID</label>
              <input
                  className="form-control"
                  readOnly
                  value={caseId}
                  type="text"
                  id="case_id"
                  name="case_id"
                  placeholder="Enter product id"
                  // onChange={(evt) => {
                  //   setCaseId(evt.target.value);
                  // }}
                  required  />
                   </div>
            </div>
          </div>

           <div className="row">
            <div className="col-sm-8">
              <div className="form-group required">
                <label htmlFor="company">EXHIBIT NAME - CODE</label>
                <input
                  className="form-control"
                  type="text"
                  id="exhibit_name"
                  name="exhibit_name"
                  placeholder="Type and code of uploaded exhibit."
                  onChange={(evt) => {
                    setExhibitName(evt.target.value);
                  }}
                  required
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-8">
              <div className="form-group required">
                <label htmlFor="par_rem">DESCRIPTION</label>
                <input
                  className="form-control"
                  type="text"
                  id="desc"
                  name="desc"
                  placeholder="One line description"
                  onChange={(evt) => {
                    setDesc(evt.target.value);
                  }}
                  required
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-8">
              <div className="form-group required">
                <label htmlFor="payment">
                  Documents (upload in .zip or .rar format)
                </label>
                <input
                  className="form-control"
                  type="file"
               //   accept="application/zip,application/x-zip,application/x-zip-compressed,application/octet-stream"
                  onChange={captureFile}
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-4">
              <div className="form-group required">
                <label htmlFor="fee">TIMESTAMP</label>
                <input
                  value={timestamp}
                  className="form-control"
                  readOnly
                  type="text"
                  id="timestamp" 
                  name="timestamp"
                  onChange={(evt) => {
                    setTimestamp(evt.target.value);
                  }}
                  required
                />
              </div>
            </div>
          </div>
          <div className="form-submit">
                        <button type="submit" className="dropbtn1" style={{marginTop:"10px"}}>Upload </button>  
                    </div>                                                                                     
            </form>     
            </div>
            </div>
        )

    }
    export default ViewForensic;


    //const [prodId, setProdId] = useState("");
  //const [prodStatus, setProdStatus] = useState("");
  //const [authority, setAuthority] = useState("");
  //const [web3, setWeb3] = useState(null);
 // const [accounts, setAccounts] = useState(null);
 // const [contract, setContract] = useState(null);
   /* render()
    {
        var crimeId = this.props.routeParams.caseId;
        console.log(this.props);
        return(
            <div>
            <ViewCaseNav crimeId = {crimeId}/>
            <h4 className="title-styled" style={{marginTop: "40px", marginLeft: "235px", marginBottom:"25px"}}>Upload Forensic Reports</h4>
            <div className="container">
            <form onSubmit={this.onSubmit} id="donateForm" className="donate-form">
                <div className="row">
                    <div className="col-sm-4">
                        <div className="form-group required">
                            <label for="report_type">CASE ID</label>
                            <input className="form-control" readOnly value = {crimeId} type="text" id="case_id" name="case_id" 
                            placeholder="Enter product id" onChange={(evt) => { this.state.prod_id =  evt.target.value; }} required />
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm-8">
                        <div className="form-group required">
                            <label for="company">EXHIBIT NAME - CODE</label> 
                            <input className="form-control" type="text" id="exhibit_name" name="exhibit_name" 
                            placeholder="Type and code of uploaded exhibit." onChange={(evt) => { this.state.prod_status =  evt.target.value; }}
                             required />
                        </div>
                    </div>                    
                </div>

                <div className="row">
                    <div className="col-sm-8">
                        <div className="form-group required">
                            <label for="par_rem">DESCRIPTION</label>
                            <input className="form-control" type="text" id="desc" name="desc" 
                            placeholder="One line description" onChange={(evt) => { this.state.authority =  evt.target.value; }} required />                                    
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-8">
                        <div className="form-group required">
                            <label for="payment">Documents (upload in .zip or .rar format)</label>
                            <input className="form-control" type="file" accept="application/zip,application/x-zip,application/x-zip-compressed,
                            application/octet-stream" onChange={this.captureFile}/>
                         </div>
                    </div>   
                </div>

                <div className="row">
                    <div className="col-sm-4">
                        <div className="form-group required">
                            <label for="fee">TIMESTAMP</label>
                            <input value={this.state.timestamp} className="form-control" readOnly type="text" id="timestamp" 
                            name="timestamp" onChange={(evt) => { this.state.timestamp =  evt.target.value; }} placeholder="2019-08-03 20:45"
                             required />
                        </div>
                    </div>                                                              
                    <div className="form-submit">
                        <button type="submit" className="dropbtn1" style={{marginTop:"10px"}}>Upload to Blockchain</button>  
                    </div>   
                </div>                                                                                   
            </form>     
            </div>
            </div>
        )

    }
}

export default ViewForensic;*/


/*class ViewForensic extends Component 
{
    state = {ipfsHash: '', buffer: null, web3: null, accounts: null, contract: null,
               case_id: '',
               exhibit_name: '',
               desc:'',
               timestamp:''
      }; */

      /*constructor(props)
      {
        super(props);
        this.captureFile = this.captureFile.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
      }*/

       /* componentDidMount = async () => {
        try {
          // Get network provider and web3 instance.
          const web3 = await getWeb3();           
          // Use web3 to get the user's accounts.
          const accounts = await web3.eth.getAccounts();      
    
          // Get the contract instance.
          const networkId = await web3.eth.net.getId();
          const deployedNetwork = SimpleStorageContract.networks[networkId];
          const instance = new web3.eth.Contract(
            SimpleStorageContract.abi,
            deployedNetwork && deployedNetwork.address,
          );
          console.log(deployedNetwork.address);    
          // Set web3, accounts, and contract to the state, and then proceed with an
          // example of interacting with the contract's methods.
          this.setState({ web3, accounts, contract: instance }, this.runExample);
          this.onGetDate();
        } catch (error) {
          // Catch any errors for any of the above operations.
          alert(
            `Failed to load web3, accounts, or contract. Check console for details.`,
          );
          console.error(error);
        }
      };*/

       /* captureFile(event) {
            event.preventDefault()
            const file = event.target.files[0]
            const reader = new window.FileReader()
            reader.readAsArrayBuffer(file)
            reader.onloadend = () => {
              this.setState({ buffer: Buffer(reader.result) })
              console.log('buffer', this.state.buffer)
            }
          }*/

          /*  onSubmit(event) {
            const { accounts, contract } = this.state;
            event.preventDefault()
            ipfs.files.add(this.state.buffer, (error, result) => {
            if(error) 
            {
                console.error(error)
                return
            }
            contract.methods.addReport(this.state.case_id, this.state.exhibit_name, this.state.desc, this.state.timestamp, result[0].hash).send({ from: accounts[0] });
    
            })        
          }*/

          /*getVal = async () => {
            const { accounts, contract } = this.state;
    
            // Get the value from the contract to prove it worked.
            const response = await contract.methods.get().call();
    
            // Update state with the result.
            this.setState({ ipfsHash: response });
    
             console.log("ipfsHash: " + this.state.ipfsHash);    
          };*/

           
        /* getImg = async () => {
            const { accounts, contract } = this.state;
    
            // Get the value from the contract to prove it worked.
            const response = await contract.methods.get().call();
    
            // Update state with the result.
            this.setState({ ipfsHash: response });
    
            var url = "https://ipfs.io/ipfs/"+this.state.ipfsHash;
    
            window.location = url;
          };*/

          /*onGetDate() {
        var date = new Date();
        var year = date.getFullYear().toString();
        var month = (date.getMonth() + 101).toString().substring(1);
        var day = (date.getDate() + 100).toString().substring(1);
        var hour = (date.getHours() + 100).toString().substring(1); 
        var mins = (date.getMinutes() + 100).toString().substring(1);
        var sec = (date.getSeconds() + 100).toString().substring(1);    
        this.setState({
            timestamp : year + "-" + month + "-" + day + " " + hour + ":" + mins + ":" + sec
        });
        // console.log(year + "-" + month + "-" + day + " " + hour + ":" + mins + ":" + sec);
      }*/
    