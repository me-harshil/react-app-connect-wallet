// WalletConnector.jsx
import React, { useState, useEffect } from 'react';

const WalletConnector = () => {
  const [walletState, setWalletState] = useState({
    address: '',
    connected: false,
    isExtensionAvailable: false,
    loading: false,
    error: null
  });

  // Listen for messages from the extension content script
  useEffect(() => {
    const messageHandler = (event) => {
      // Handle extension availability check
      if (event.data.type === "Z_WALLET_AVAILABLE") {
        setWalletState(prev => ({
          ...prev,
          isExtensionAvailable: true
        }));
      }
      
      // Handle wallet connection response
      if (event.data.type === "Z_WALLET_RESPONSE") {
        setWalletState(prev => ({
          ...prev,
          address: event.data.address,
          connected: event.data.connected,
          loading: false
        }));
      }
    };
    
    // Add event listener
    window.addEventListener("message", messageHandler);
    
    // Clean up
    return () => {
      window.removeEventListener("message", messageHandler);
    };
  }, []);

  // Function to connect wallet
  const connectWallet = () => {
    if (!walletState.isExtensionAvailable) {
      setWalletState(prev => ({
        ...prev,
        error: "Z-Wallet extension not detected. Please install it first."
      }));
      return;
    }
    
    setWalletState(prev => ({ ...prev, loading: true, error: null }));
    
    // Send connect request to content script
    window.postMessage({ type: "CONNECT_Z_WALLET" }, "*");
    
    // Add a timeout in case the extension doesn't respond
    setTimeout(() => {
      setWalletState(prev => {
        if (prev.loading) {
          return {
            ...prev,
            loading: false,
            error: "Connection timed out. Please try again."
          };
        }
        return prev;
      });
    }, 5000);
  };

  return (
    <div>

        {walletState.isExtensionAvailable ? (
          <p>Z-Wallet extension is available.</p>
        ) : (
          <p style={{ color: 'red' }}>Z-Wallet extension is not installed. Please install it.</p>
        )}
      <button 
        onClick={connectWallet}
        disabled={walletState.loading || walletState.connected || !walletState.isExtensionAvailable}
      >
        {walletState.loading ? 'Connecting...' : 
         walletState.connected ? 'Connected' : 
         walletState.isExtensionAvailable ? 'Connect Z-Wallet' : 'Z-Wallet Not Installed'}
      </button>
      
      
      {walletState.connected && (
        <div>
          <p>Connected Address: {walletState.address}</p>
        </div>
      )}
      
      {walletState.error && (
        <p style={{ color: 'red' }}>{walletState.error}</p>
      )}
    </div>
  );
};

export default WalletConnector; 