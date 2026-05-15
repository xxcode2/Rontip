"use client";

import { useState, useEffect, useCallback } from "react";

declare global {
  interface Window {
    ronin?: {
      providers?: any[];
      isRonin?: boolean;
    };
    ethereum?: any;
  }
}

interface WalletState {
  address: string | null;
  isConnected: boolean;
  balance: string;
  isConnecting: boolean;
  error: string | null;
}

const RONIN_CHAIN_ID = "0x89"; // 137 in hex (Polygon) - wait, Ronin is different
// Ronin mainnet chain ID is 2020 in decimal, 0x7E4 in hex
const RONIN_MAINNET_CHAIN_ID = "0x7e4";

export function useWallet() {
  const [state, setState] = useState<WalletState>({
    address: null,
    isConnected: false,
    balance: "0",
    isConnecting: false,
    error: null,
  });

  // Check if wallet is already connected
  useEffect(() => {
    let provider: any = null;
    
    const checkConnection = async () => {
      if (typeof window === "undefined") return;

      // Safely get provider with fallback
      provider = window.ethereum;
      if (!provider || typeof provider !== "object") {
        console.log("No wallet provider found");
        return;
      }

      try {
        const accounts = await provider.request({ method: "eth_accounts" });
        if (accounts && accounts.length > 0) {
          const address = accounts[0];
          const balance = await provider.request({
            method: "eth_getBalance",
            params: [address, "latest"],
          });
          
          setState((prev) => ({
            ...prev,
            address,
            isConnected: true,
            balance: balance || "0",
          }));
        }
      } catch (error) {
        console.error("Error checking connection:", error);
      }
    };

    checkConnection();

    // Listen for account changes
    if (provider && typeof provider.on === "function") {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length === 0) {
          setState({
            address: null,
            isConnected: false,
            balance: "0",
            isConnecting: false,
            error: null,
          });
        } else {
          setState((prev) => ({
            ...prev,
            address: accounts[0],
            isConnected: true,
          }));
        }
      };

      provider.on("accountsChanged", handleAccountsChanged);
      
      return () => {
        if (provider && typeof provider.removeListener === "function") {
          provider.removeListener("accountsChanged", handleAccountsChanged);
        }
      };
    }
  }, []);

  const connect = useCallback(async () => {
    if (typeof window === "undefined") {
      setState((prev) => ({ ...prev, error: "Window is undefined" }));
      return;
    }

    const provider = window.ethereum;
    if (!provider) {
      setState((prev) => ({ 
        ...prev, 
        error: "No wallet provider found. Please install Ronin Wallet or Metamask.",
        isConnecting: false 
      }));
      return;
    }

    setState((prev) => ({ ...prev, isConnecting: true, error: null }));

    try {
      // Request account access
      const accounts = await provider.request({ 
        method: "eth_requestAccounts" 
      });

      if (accounts && accounts.length > 0) {
        const address = accounts[0];
        
        // Get balance
        const balance = await provider.request({
          method: "eth_getBalance",
          params: [address, "latest"],
        });

        // Switch to Ronin chain if needed
        try {
          await provider.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: RONIN_MAINNET_CHAIN_ID }],
          });
        } catch (switchError: any) {
          // Chain might not be added, that's okay for now
          console.log("Chain switch note:", switchError);
        }

        setState({
          address,
          isConnected: true,
          balance: balance || "0",
          isConnecting: false,
          error: null,
        });
      }
    } catch (error: any) {
      console.error("Connection error:", error);
      setState((prev) => ({
        ...prev,
        isConnecting: false,
        error: error.message || "Failed to connect wallet",
      }));
    }
  }, []);

  const disconnect = useCallback(() => {
    setState({
      address: null,
      isConnected: false,
      balance: "0",
      isConnecting: false,
      error: null,
    });
  }, []);

  const sendTransaction = useCallback(async (to: string, amount: string) => {
    if (!state.address) {
      throw new Error("Wallet not connected");
    }

    const provider = window.ethereum;
    if (!provider || typeof provider !== "object") {
      throw new Error("No wallet provider found");
    }
    
    // Convert RON to wei (assuming 18 decimals)
    const value = "0x" + (parseFloat(amount) * Math.pow(10, 18)).toString(16);

    const tx = await provider.request({
      method: "eth_sendTransaction",
      params: [
        {
          from: state.address,
          to: to,
          value: value,
        },
      ],
    });

    return tx;
  }, [state.address]);

  return {
    address: state.address,
    isConnected: state.isConnected,
    balance: state.balance,
    isConnecting: state.isConnecting,
    error: state.error,
    connect,
    disconnect,
    sendTransaction,
  };
}