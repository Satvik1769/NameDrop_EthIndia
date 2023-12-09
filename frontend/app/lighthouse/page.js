"use client";
import React, { useState } from "react";
import lighthouse from "@lighthouse-web3/sdk";
import { ethers } from "ethers";
function App() {
  const [file, setFile] = useState(null);

  // Define your API Key (should be replaced with secure environment variables in production)
  const apiKey = "d38d63f8.41d275c7b4f24ed683f5d75c517069ea";

  const [fileURL, setFileURL] = React.useState(null);

  const encryptionSignature = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    const messageRequested = (await lighthouse.getAuthMessage(address)).data
      .message;
    const signedMessage = await signer.signMessage(messageRequested);
    return {
      signedMessage: signedMessage,
      publicKey: address,
    };
  };
  const decrypt = async () => {
    // Fetch file encryption key
    const cid = localStorage.getItem("cid"); //replace with your IPFS CID
    const { publicKey, signedMessage } = await encryptionSignature();
    /*
      fetchEncryptionKey(cid, publicKey, signedMessage)
        Parameters:
          CID: CID of the file to decrypt
          publicKey: public key of the user who has access to file or owner
          signedMessage: message signed by the owner of publicKey
    */
    const keyObject = await lighthouse.fetchEncryptionKey(
      cid,
      publicKey,
      signedMessage
    );

    // Decrypt file
    /*
      decryptFile(cid, key, mimeType)
        Parameters:
          CID: CID of the file to decrypt
          key: the key to decrypt the file
          mimeType: default null, mime type of file
    */

    const fileType = "image/jpeg";
    const decrypted = await lighthouse.decryptFile(
      cid,
      keyObject.data.key,
      fileType
    );
    console.log(decrypted);
    /*
      Response: blob
    */

    // View File
    const url = URL.createObjectURL(decrypted);
    console.log(url);
    setFileURL(url);
  };

  // Function to sign the authentication message using Wallet
  const signAuthMessage = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        if (accounts.length === 0) {
          throw new Error("No accounts returned from Wallet.");
        }
        const signerAddress = accounts[0];
        const { message } = (await lighthouse.getAuthMessage(signerAddress))
          .data;
        const signature = await window.ethereum.request({
          method: "personal_sign",
          params: [message, signerAddress],
        });
        return { signature, signerAddress };
      } catch (error) {
        console.error("Error signing message with Wallet", error);
        return null;
      }
    } else {
      console.log("Please install Wallet!");
      return null;
    }
  };

  // Function to upload the encrypted file
  const uploadEncryptedFile = async () => {
    console.log("clicked");
    if (!file) {
      console.error("No file selected.");
      return;
    }

    try {
      // This signature is used for authentication with encryption nodes
      // If you want to avoid signatures on every upload refer to JWT part of encryption authentication section
      const encryptionAuth = await signAuthMessage();
      if (!encryptionAuth) {
        console.error("Failed to sign the message.");
        return;
      }

      const { signature, signerAddress } = encryptionAuth;

      // Upload file with encryption
      const output = await lighthouse.uploadEncrypted(
        file,
        apiKey,
        signerAddress,
        signature
      );
      console.log("Encrypted File Status:", output);
      /* Sample Response
        {
          data: [
            Hash: "QmbMkjvpG4LjE5obPCcE6p79tqnfy6bzgYLBoeWx5PAcso",
            Name: "izanami.jpeg",
            Size: "174111"
          ]
        }
      */
      // If successful, log the URL for accessing the file
      console.log(signerAddress);
      console.log(
        `Decrypt at https://decrypt.mesh3.network/evm/${output.data[0].Hash}`
      );
      localStorage.setItem("cid", output.data[0].Hash);

      accessConditions(output.data[0].Hash);
    } catch (error) {
      console.error("Error uploading encrypted file:", error);
    }
  };

  // Function to handle file selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files;
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const accessConditions = async (cid) => {
    // Replace with your file's CID
    const response = await lighthouse.getAccessConditions(cid);

    // Print the access conditions
    console.log(response);
  };

  return (
    <div style={{ marginTop: 250 }}>
      <input type="file" onChange={handleFileChange} />
      <button onClick={uploadEncryptedFile} disabled={!file}>
        Upload Encrypted File
      </button>

      <button onClick={() => decrypt()}>decrypt</button>
      {fileURL ? (
        <a href={fileURL} target="_blank">
          viewFile
        </a>
      ) : null}
    </div>
  );
}

export default App;
