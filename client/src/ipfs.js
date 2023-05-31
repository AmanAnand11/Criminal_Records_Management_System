//import { create } from 'ipfs-http-client';
//const ipfs = create({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

import { create } from 'ipfs-http-client';

const ipfs = create({url: "http://127.0.0.1:5002/"});

export default ipfs;



//const IPFS = require('ipfs-api');
//const ipfs = new IPFS({host: 'ipfs.infura.io', port: 5001, protocol: 'https'});
//const {create} =require("ipfs-http-client");
//async function ipfsClient(){
  //  const ipfs =await create(
    //    {
      //      host:"ipfs.infura.io",
      //      port :5000,
      //      protocol:"https"
    //    }
    //)//;return ipfs
//}

//export default ipfs;
