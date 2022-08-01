import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import SampleContract from "../../artifacts/contracts/Sample.sol/Sample.json";

// TODO: read from environment variable
const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

const App: React.FC = () => {
  const [message, setMessage] = useState("");
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    getSampleContractMessage();
  }, []);

  // request access to the user's MetaMask account
  const requestAccount = async () => {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  };

  // call the smart contract, read the current message value
  const getSampleContractMessage = async () => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const sampleContract = new ethers.Contract(
        contractAddress,
        SampleContract.abi,
        provider
      );
      try {
        const data = await sampleContract.getMessage();
        setMessage(data);
      } catch (err) {
        console.log("Error: ", err);
      }
    }
  };

  // call the smart contract, send an update
  const setSampleContractMessage = async () => {
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        SampleContract.abi,
        signer
      );
      const transaction = await contract.setMessage(inputValue);
      await transaction.wait();
    }
  };

  const handleUpdateClick = async () => {
    try {
      await setSampleContractMessage();
      await getSampleContractMessage();
    } catch (err) {
      console.error(err);
    } finally {
      setInputValue("");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: 300,
        padding: 8,
      }}
    >
      <p>{`Contract message: ${message}`} </p>

      <br />
      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Update Message"
      />
      <br />
      <button disabled={!inputValue} onClick={handleUpdateClick}>
        Update Message
      </button>
    </div>
  );
};

export default App;
