import ViewCaseNav from './Navbar/ViewCaseNav';
import CrimeScenePhotographs from './CrimeScenePhotographs';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import getWeb3 from '../utils/getWeb3';
import SimpleStorageContract from "../contracts/SimpleStorage.json";


function ViewCase(props) {
  const Id = useParams();
  const crimeId = Id.caseId;
  const [state, setState] = useState({
    web3: null,
    contract: null,
    accounts: null
  });
  const [path, setPath] = useState(null);
  const [code, setCode] = useState(null);
  const [desc, setDesc] = useState(null);
  const [timestamp, setTimestamp] = useState(null);

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
        const instance = await new web3.eth.Contract(
          SimpleStorageContract.abi,
          deployedNetwork && deployedNetwork.address,
        );

        // Set web3, accounts, and contract to the state
        await setState({ web3: web3, contract: instance, accounts: accounts });

        console.log(state);


      } catch (error) {
        console.error(error);
      }
    };

    init();
  }, [crimeId]);

  try {
    const obj = state.contract.methods.getCrimeById(crimeId).call()
      .then((obj) => {
        console.log(obj);
        setPath("http://127.0.0.1:9090/ipfs/" + obj.ipfsHash + "?filename=" + obj.ipfsHash);
        setCode(obj[2]);
        setDesc(obj[3]);
        setTimestamp(obj[1]);
      });
  } catch (err) {
    console.log(err);
  }
  return (
    <div>
      <ViewCaseNav crimeId={crimeId} />
      <div className='crime-details'>
        <h2 className='title'>Fir Details</h2>
        <div className='details'>
        {crimeId && <p><strong>Crime ID:</strong> {crimeId}</p>}
        {desc && <p><strong>Description:</strong> {desc}</p>}
        {code && <p><strong>Offense Code:</strong> {code}</p>}
        {timestamp && <p><strong>Date and Time of Case Record</strong> {timestamp}</p>}
        </div>
      </div>
    </div>
  );
}



export default ViewCase;