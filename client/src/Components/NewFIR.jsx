import { useState, useEffect } from "react";
import "../CSS/newFIR.css";
import GenericNavbar from "./Navbar/GenericNavbar";

import SimpleStorageContract from "../contracts/SimpleStorage.json";
import getWeb3 from "../utils/getWeb3";

function NewFIR() {
  const [state, setState] = useState({
    web3: null,
    buffer: null,
    contract: null,
    accounts: null,
  });
  // const [buffer, setBuffer] = useState(null);
  // const [web3, setWeb3] = useState(null);
  //const [accounts, setAccounts] = useState(null);
  //const [contract, setContract] = useState(null);
  const [crime_id, setCrimeId] = useState("");
  const [timestamp, setTimestamp] = useState("");
  const [offense_code, setOffenseCode] = useState("");
  const [description, setDescription] = useState("");


  async function loadWeb3() {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();
      //  console.log(web3);
      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();
      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SimpleStorageContract.networks[networkId];
      const instance = new web3.eth.Contract(
        SimpleStorageContract.abi,
        deployedNetwork && deployedNetwork.address
      );
      console.log(deployedNetwork);
      await setState({ web3: web3, contract: instance, accounts: accounts });
      console.log(state);
      onGetDate();
      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  }

  useEffect(() => {
    loadWeb3();
  }, []);
  /* useEffect(() => {
    async function loadWeb3() {
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
        console.log(deployedNetwork);
        // Set web3, accounts, and contract to the state, and then proceed with an
        // example of interacting with the contract's methods.
        setWeb3(web3);
        setAccounts(accounts);
        setContract(instance);
      //  runExample();
        onGetDate();
      } catch (error) {
        // Catch any errors for any of the above operations.
        alert(
          `Failed to load web3, accounts, or contract. Check console for details.`,
        );
        console.error(error);
      }
    }
    loadWeb3();
  }, []);*/

  const onSubmit = async (event) => {
    const { accounts, contract } = state;
    //const {accounts} =accounts;
    event.preventDefault();
    await onGetDate();

    await contract.methods
      .addCrimeReport(crime_id, timestamp, offense_code, description)
      .send({ from: accounts[0] });
    //contract.methods.addCrimeReport(this.state.crime_id, this.state.timestamp, this.state.offense_code, this.state.description).send({from: accounts[0]});
  };
  const onGetDate = async () => {
    var date = new Date();
    var year = date.getFullYear().toString();
    var month = (date.getMonth() + 101).toString().substring(1);
    var day = (date.getDate() + 100).toString().substring(1);
    var hour = (date.getHours() + 100).toString().substring(1);
    var mins = (date.getMinutes() + 100).toString().substring(1);
    var sec = (date.getSeconds() + 100).toString().substring(1);
     setTimestamp(
      year + "-" + month + "-" + day + " " + hour + ":" + mins + ":" + sec
    );
    // console.log(year + "-" + month + "-" + day + " " + hour + ":" + mins + ":" + sec);
  };

  return (
    <div className="">
      <GenericNavbar />
      <div className="container">
        <div className="row">
          <div className="col s6">
            <div className="card reportCard">
              <div className="card-title cardTitle2">
                <h4 className="cardTitle">New FIR</h4>
              </div>
              <div className="card-content">
                <form onSubmit={onSubmit}>
                  <div className="input-field">
                    <label htmlFor="caseId">Case ID</label>
                    <input
                      type="text"
                      id="caseId"
                      value={crime_id}
                      onChange={(evt) => setCrimeId(evt.target.value)}
                      required
                    />
                  </div>
                  <div className="input-field">
                    <label htmlFor="timestamp">Time Stamp</label>
                    <input
                      type="text"
                      id="timestamp"
                      value={timestamp}
                      readOnly
                      onChange={(evt) => setTimestamp(evt.target.value)}
                      required
                    />
                  </div>
                  <div className="input-field">
                    <label htmlFor="offCode">Offense Code</label>
                    <input
                      type="text"
                      id="offCode"
                      value={offense_code}
                      onChange={(evt) => setOffenseCode(evt.target.value)}
                      required
                    />
                  </div>

                  <div className="form-submit center">
                    <button
                      type="submit"
                      className="dropbtn1"
                      style={{ marginTop: "10px" }}
                    >
                      Upload to Blockchain
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="col s6">
            <div className="card reportCard">
              <div className="card-title cardTitle">
                <h4 className="cardTitle">Enter Description</h4>
              </div>
              <div className="card-content">
                <div className="input-field ">
                  <textarea
                    id="report"
                    className="textAreaHeight"
                    value={description}
                    onChange={(evt) => setDescription(evt.target.value)}
                    required
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewFIR;

/*import React, { Component } from 'react';
import '../CSS/newFIR.css';
import GenericNavbar from './Navbar/GenericNavbar';

//import SimpleStorageContract from "../contracts/SimpleStorage.json";
//import getWeb3 from "../utils/getWeb3";

class NewFIR extends Component
{
    state = {buffer: null, web3: null, accounts: null, contract: null,
        crime_id: '',
        timestamp: '',
        offense_code: '',
        description: ''
    };
    
    constructor(props)
    {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }

    /*componentDidMount = async () => {
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
          console.log(deployedNetwork);    
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

/* onSubmit(event) {
        const { accounts, contract } = this.state;
        event.preventDefault()
        this.onGetDate();
        contract.methods.addCrimeReport(this.state.crime_id, this.state.timestamp, this.state.offense_code, this.state.description).send({from: accounts[0]});
    }

    onGetDate() {
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
      }

    render()
    {
        return(
            <div className = "">
                <GenericNavbar/>
                <div className="container">
                <div className="row">
                    <div className="col s6">
                        <div className="card reportCard">
                            <div className="card-title cardTitle2">
                                <h4 className = "cardTitle">New FIR</h4>
                            </div>
                            <div className="card-content">
                                <form onSubmit={this.onSubmit}>
                                    <div className="input-field">
                                        <input type="text" id="caseId" onChange={(evt) => { this.state.crime_id =  evt.target.value; }} required/>
                                        <label htmlFor="email">Case ID</label>
                                    </div>
                                    <div className="input-field">
                                        <input value={this.state.timestamp} type="text" id="timestamp" readOnly onChange={(evt) => { this.state.timestamp =  evt.target.value; }} required/>
                                        {/* <label htmlFor="email">Time Stamp</label> */
/*      </div>
                                    <div className="input-field">
                                        <input type="text" id="offCode" onChange={(evt) => { this.state.offense_code =  evt.target.value; }} required/>
                                        <label htmlFor="offCode">Offense Code</label>
                                    </div>

                                    <div className="form-submit center">
                                        <button type="submit" className="dropbtn1" style={{marginTop:"10px"}}>Upload to Blockchain</button>  
                                    </div>
                                    
                                </form> 
                            </div>
                        </div>
                    </div>
                    <div className="col s6">
                        <div className="card reportCard">
                            <div className="card-title cardTitle">
                                <h4 className = "cardTitle">Enter Description</h4>
                            </div>
                            <div className="card-content">
                                <div className="input-field ">
                                    <textarea id = "report"  className = "textAreaHeight" onChange={(evt) => { this.state.description =  evt.target.value; }} required></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        )
    }
}

export default NewFIR;*/
