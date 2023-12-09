import lighthouse from "@lighthouse-web3/sdk";

async function handler(req, res) {
  const { signature, signerAddress, file } = req.body;

  try {
    //   const encryptionAuth = ;
    //   if (!encryptionAuth) {
    //     console.error("Failed to sign the message.");
    //     return;
    //   }

    //   const { signature, signerAddress } = encryptionAuth;

    // Upload file with encryption
    const apiKey = "d38d63f8.41d275c7b4f24ed683f5d75c517069ea";

    const output = await lighthouse.uploadEncrypted(
      file,
      apiKey,
      signerAddress,
      signature
    );

    console.log(
      `Decrypt at https://decrypt.mesh3.network/evm/${output.data[0].Hash}`
    );
    return new Response(
      JSON.stringify({
        message: `https://decrypt.mesh3.network/evm/${output.data[0].Hash}`,
        output: output,
      })
    );
  } catch (error) {
    return new Response(JSON.stringify({ message: `${error}` }));
  }
}

export { handler as POST };
