"use client";
import React, { useState } from "react";
import { ethers } from "ethers";
import {
  Connection,
  PublicKey,
  Transaction,
  SystemProgram,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import Image from "next/image";

// Define the supported networks and their RPC URLs
const networks = {
  ethereum: {
    id: "0x1", // Mainnet
    name: "Ethereum",
    rpcUrl: "https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID",
    symbol: "ETH",
  },
  polygon: {
    id: "0x89", // Polygon Mainnet
    name: "Polygon",
    rpcUrl: "https://polygon-rpc.com",
    symbol: "MATIC",
  },
  bnb: {
    id: "0x38", // Binance Smart Chain Mainnet
    name: "BNB",
    rpcUrl: "https://bsc-dataseed.binance.org",
    symbol: "BNB",
  },
  solana: {
    id: "solana",
    name: "Solana",
    rpcUrl: "https://api.mainnet-beta.solana.com",
    symbol: "SOL",
  },
  base: {
    id: "0x2105", // Base Mainnet
    name: "Base",
    rpcUrl: "https://mainnet.base.org",
    symbol: "ETH",
  },
};

type Network = keyof typeof networks; // This type will be "ethereum", "polygon", "bnb", "solana"
type WalletType = "metamask" | "phantom"; // Wallet selection types

declare global {
  interface Window {
    ethereum: any; // Add a custom type for MetaMask
    solana: any; // Add a custom type for Phantom wallet
  }
}

interface WalletConnectProps {
  goBack: () => void;
  goToNextStep: (walletAddress: string, transactionHash: string) => void;
  handleCryptoChange: (value: string) => void;
  convertedPrice: any;
  productName: any;
}

const WalletConnect: React.FC<WalletConnectProps> = ({
  goBack,
  goToNextStep,
  handleCryptoChange,
  convertedPrice,
  productName,
}) => {
  const [walletAddress, setWalletAddress] = useState("null");
  const [transactionHash, setTransactionHash] = useState("null");
  const [metamaskAddress, setMetamaskAddress] = useState<string | null>(null);
  const [network, setNetwork] = useState<Network | null>(null); // No default network selected
  const [wallet, setWallet] = useState<WalletType | null>(null); // No default wallet selected
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [transactionStatus, setTransactionStatus] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [paymentSucess, SetpaymentSucess] = useState(false);

  // Set the owner's wallet address (ensure this is a valid Ethereum address)
  const ownerAddressEthereum = "0x9c8b34d2C463cA3CB2152e9810EaC96c70997cB8";
  const ownerAddressSolana = new PublicKey(
    "9gmZNpYqSwuPLtzjVNs5NkEg9EQbs8bAR53foGMX6zQE"
  );

  // Reset error and success messages
  const resetMessages = () => {
    setError(null);
    setSuccessMessage(null);
    setTransactionStatus("");
  };

  // Connect to MetaMask
  const connectMetaMask = async () => {
    resetMessages();
    try {
      const provider = window.ethereum;
      if (!provider) {
        setError("MetaMask is not installed. Please install it to proceed.");
        setLoading(false);
        return;
      }
      const accounts = await provider.request({
        method: "eth_requestAccounts",
      });
      if (accounts.length > 0) {
        setMetamaskAddress(accounts[0]);
        setWalletAddress(accounts[0]);
        setSuccessMessage("Connected to MetaMask successfully.");
        setLoading(false);
      }
    } catch (error: any) {
      if (error.code === 4001) {
        console.log(
          "Connection request was rejected or popup closed by the user."
        );
      } else {
        setError(
          `Unexpected error during MetaMask connection: ${error.message}`
        );
        console.error(error);
      }
    }
  };

  // Connect to Phantom wallet
  const connectPhantom = async () => {
    resetMessages();
    try {
      const provider = window.solana;
      if (!provider) {
        setError(
          "Phantom wallet is not installed. Please install it to proceed."
        );
        setLoading(false);
        return;
      }
      const response = await provider.connect();
      console.log(
        "Phantom connected with address:",
        response.publicKey.toString()
      );
      setMetamaskAddress(response.publicKey.toString());
      setWalletAddress(response.publicKey.toString());
      setSuccessMessage("Connected to Phantom wallet successfully.");
      setLoading(false);
    } catch (error: any) {
      if (error.code === 4001) {
        console.log("Phantom wallet connection request was rejected.");
      } else {
        setError(
          `Unexpected error during Phantom connection: ${error.message}`
        );
        setLoading(false);
        console.error(error);
      }
    }
  };

  // Handle network change when the user selects a network from the dropdown
  const handleNetworkChange = async (selectedNetwork: Network) => {
    resetMessages();
    handleCryptoChange(selectedNetwork);
    try {
      const provider = window.ethereum;
      const networkData = networks[selectedNetwork];
      if (provider && networkData) {
        const chainId = networkData.id;
        await provider.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId }], // Change the network on MetaMask
        });
        setNetwork(selectedNetwork); // Update state with selected network
        setSuccessMessage(
          `Switched to ${networkData.name} network successfully.`
        );
        setLoading(false);
      }
    } catch (error: any) {
      if (error.code === 4001) {
        console.log(
          "Network change request was rejected or popup closed by the user."
        );
      } else if (error.code === 4902) {
        setError("The requested network is not added to MetaMask.");
        setLoading(false);
      } else {
        setError(`Unexpected error during network switch: ${error.message}`);
        console.error(error);
        setLoading(false);
      }
    }
  };

  // Send transaction for Ethereum-based networks
  const sendTransactionEthereum = async () => {
    resetMessages();
    setLoading(true);
    // Store use data
    try {
      const res = await fetch("/api/postdata", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productName, walletAddress }),
      });

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem(
          "productData",
          JSON.stringify({ productName, walletAddress })
        );
      } else {
        const error = await res.json();
        alert(error.message || "Failed to save product.");
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("An error occurred. Please try again.");
    }

    if (!metamaskAddress) {
      alert("Please connect your MetaMask wallet first.");
      return;
    }

    const provider = new ethers.BrowserProvider(window.ethereum);

    try {
      const valueInEth = ethers.parseUnits(convertedPrice.toFixed(4), 18); // Fixed amount of 1 token (ETH)

      // Estimate gas limit
      const gasLimit = await provider.estimateGas({
        to: ownerAddressEthereum,
        value: valueInEth,
      });

      console.log(
        `Sending transaction to ${ownerAddressEthereum} with value ${valueInEth.toString()} and gas limit ${gasLimit.toString()}`
      );

      const signer = await provider.getSigner();
      const tx = await signer.sendTransaction({
        to: ownerAddressEthereum,
        value: valueInEth,
        gasLimit,
      });

      await tx.wait(); // Wait for transaction confirmation
      setTransactionHash(tx.hash);
      goToNextStep(walletAddress, tx.hash);
      // alert(`Transaction successful! Tx hash: ${tx.hash}`);
      setSuccessMessage("Transaction completed successfully.");
      setLoading(false);
    } catch (error: any) {
      if (error.code === 4001) {
        setError("Transaction canceled by user.");
        setLoading(false);
      } else if (error.code === "INSUFFICIENT_FUNDS") {
        setError("Insufficient funds for the transaction.");
        setLoading(false);
      } else if (error.message.includes("nonce too low")) {
        setError("Transaction failed: Nonce issue. Please try again.");
        setLoading(false);
      } else if (error.message.includes("gas limit exceeded")) {
        setError("Transaction failed: Gas limit too low.");
        setLoading(false);
      } else if (error.message.includes("invalid recipient address")) {
        setError("Invalid recipient address.");
        setLoading(false);
      } else {
        setError(`Transaction failed:`);
        setLoading(false);
      }

      console.error("Transaction error:", error);
    }
  };

  // Send transaction for Phantom wallet
  const sendTransactionSolana = async () => {
    resetMessages();
    setLoading(true);

    try {
      const res = await fetch("/api/postdata", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productName, walletAddress }),
      });

      if (res.ok) {
        const data = await res.json();
        // Save productName and walletAddress to localStorage for `/view`
        localStorage.setItem(
          "productData",
          JSON.stringify({ productName, walletAddress })
        );
      } else {
        const error = await res.json();
        alert(error.message || "Failed to save product.");
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("An error occurred. Please try again.");
    }

    if (!metamaskAddress) {
      alert("Please connect your Phantom wallet first.");
      setLoading(false);
      return;
    }

    const connection = new Connection(
      "https://compatible-wispy-orb.solana-mainnet.quiknode.pro/9accaeef791b57063e1fd7bb0a688c3bb1982bcb",
      "confirmed"
    );

    try {
      // Fetch the recent blockhash
      const { blockhash: latestBlockHash } =
        await connection.getLatestBlockhash();

      // Prepare the transaction to send 0.001 SOL
      const transaction = new Transaction({
        recentBlockhash: latestBlockHash,
        feePayer: new PublicKey(metamaskAddress), // Use the connected wallet as the fee payer
      }).add(
        SystemProgram.transfer({
          fromPubkey: new PublicKey(metamaskAddress),
          toPubkey: ownerAddressSolana, // Recipient wallet address as PublicKey object
          lamports: LAMPORTS_PER_SOL * convertedPrice.toFixed(4), // Sending 0.001 SOL
        })
      );

      console.log("Signing transaction:", transaction);

      // Sign and send the transaction using Phantom wallet
      const signature = await window.solana.signTransaction(transaction);
      const txid = await connection.sendRawTransaction(signature.serialize());
      console.log("Sending raw transaction:", txid);

      // Wait for transaction confirmation
      const confirmation = await connection.confirmTransaction(
        txid,
        "processed"
      );
      if (confirmation.value.err) {
        setTransactionStatus("Transaction failed: " + confirmation.value.err);
        console.error("Transaction failed:", confirmation.value.err);
        setLoading(false);
      } else {
        setTransactionStatus("Transaction successful!");
        goToNextStep(walletAddress, txid);
        console.log("Transaction successful, txid:", txid);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error sending transaction:", error.message);
        setTransactionStatus("Transaction failed: " + error.message);
        setLoading(false);
      } else {
        console.error("Unknown error sending transaction:", error);
        setTransactionStatus("Transaction failed: Unknown error");
        setLoading(false);
      }
    }
  };

  // Handle wallet selection change
  const handleWalletChange = (selectedWallet: WalletType) => {
    setWallet(selectedWallet);
    resetMessages();

    if (selectedWallet === "metamask") {
      setNetwork(null); // Reset network when MetaMask is selected
      connectMetaMask();
    } else if (selectedWallet === "phantom") {
      setNetwork("solana"); // Set Solana network by default when Phantom wallet is selected
      handleCryptoChange("solana");
      connectPhantom();
    }
  };

  // Render network options based on the selected wallet
  const renderNetworkOptions = () => {
    if (wallet === "metamask") {
      return Object.entries(networks)
        .filter(([key]) => key !== "solana") // Exclude Solana network
        .map(([key, networkDetails]) => (
          <option key={key} value={key} className="text-black">
            {networkDetails.name}
          </option>
        ));
    } else if (wallet === "phantom") {
      return (
        <option value="solana" className="text-black">
          {networks.solana.name}
        </option>
      );
    }

    return (
      <option value="" disabled>
        Select a Network
      </option>
    );
  };

  const handleNext = () => {
    goToNextStep(walletAddress, transactionHash);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full relative mt-5">
      <div className="flex flex-col items-center justify-center gap-3 w-[60%] h-full">
        <div className="w-full">
          <select
            id="wallet"
            value={wallet || ""}
            onChange={(e) => handleWalletChange(e.target.value as WalletType)}
            className="px-3 py-2 border rounded bg-transparent w-full"
          >
            <option value="" disabled className="text-black">
              Select a Wallet
            </option>
            <option value="metamask" className="text-black">
              MetaMask
            </option>
            <option value="phantom" className="text-black">
              Phantom
            </option>
          </select>
        </div>

        <div className="w-full">
          <select
            id="network"
            value={network || ""}
            onChange={(e) => handleNetworkChange(e.target.value as Network)}
            className="px-3 py-2 border rounded bg-transparent w-full"
          >
            <option value="" disabled>
              Select a Network
            </option>{" "}
            {/* This will show as a placeholder */}
            {renderNetworkOptions()}
          </select>
        </div>

        <div className="flex gap-2 w-full">
          <button
            onClick={goBack}
            className="h-10 w-[100px] rounded-full bg-gradient-to-r from-[#4a66fe] via-[#9852fe] to-[#ce45ff] text-white hover:bg-gradient-to-l active:bg-[#B529DC] hover:scale-105 duration-300 mt-3 flex-1"
          >
            Back
          </button>
          {wallet === "phantom" ? (
            <button
              onClick={sendTransactionSolana}
              className="h-10 w-[100px] rounded-full bg-gradient-to-r from-[#4a66fe] via-[#9852fe] to-[#ce45ff] text-white hover:bg-gradient-to-l active:bg-[#B529DC] hover:scale-105 duration-300 mt-3 flex-1"
            >
              Pay
            </button>
          ) : (
            <button
              onClick={sendTransactionEthereum}
              className="h-10 w-[100px] rounded-full bg-gradient-to-r from-[#4a66fe] via-[#9852fe] to-[#ce45ff] text-white hover:bg-gradient-to-l active:bg-[#B529DC] hover:scale-105 duration-300 mt-3 flex-1"
            >
              Pay
            </button>
          )}
        </div>
        {successMessage && (
          <div className="text-green-600 mt-3 w-full text-center">
            <strong className="text-wrap">Success:</strong> {successMessage}
          </div>
        )}

        {error && (
          <div className="text-red-600 mt-3 text-center">
            <strong>Error:</strong> {error}
          </div>
        )}

        {/* Display transaction status */}
        {transactionStatus && (
          <p className="mt-2 text-sm">{transactionStatus}</p>
        )}

        {loading && (
          <div className="w-full text-center absolute h-full bg-[#071c32] flex items-center justify-center">
            <div className="w-full h-full flex items-center justify-center gap-5 text-xl flex-col">
              <div className="spinner"></div>
              <span>Payment is Processing</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WalletConnect;
