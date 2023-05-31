const Web3 = require("web3");
const getWeb3 = async () => {
  // Wait for loading completion to avoid race conditions with web3 injection timing.
  await window.ethereum?.request({ method: "eth_requestAccounts" });

  // Modern dapp browsers...
  if (window.ethereum) {
    const web3 = new Web3(window.ethereum);
    return web3;
  }

  // Legacy dapp browsers...
  else if (window.web3) {
    // Use Mist/MetaMask's provider.
    const web3 = new Web3(window.web3.currentProvider);
    console.log("Injected web3 detected.");
    return web3;
  }

  // Fallback to localhost; use dev console port by default...
  else {
    const provider = new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545");
    const web3 = new Web3(provider);
    console.log("No web3 instance injected, using Local web3.");
    return web3;
  }
};

export default getWeb3;
