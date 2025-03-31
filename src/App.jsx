import React, { useState, useEffect } from 'react';
import {ConnectButton } from 'thirdweb/react';
import './App.css';
import WalletConnect from './WalletConnector';

// function App() {
//   const [walletInstalled, setWalletInstalled] = useState(false);
//   const [ethereumAccount, setEthereumAccount] = useState(null);
//   const [solanaAccount, setSolanaAccount] = useState(null);
//   const [transactionStatus, setTransactionStatus] = useState(null);
//   const [selectedBlockchain, setSelectedBlockchain] = useState('ethereum');
  
//   // Check if the wallet extension is installed
//   useEffect(() => {
//     // Wait for the multiChainWallet provider to be injected
//     const checkWalletInstalled = () => {
//       if (window.zwallet) {
//         setWalletInstalled(true);
//       } else {
//         setWalletInstalled(false);
//       }
//     };
    
//     // Check immediately
//     checkWalletInstalled();
    
//     // Set up event listener for when the extension injects the provider
//     window.addEventListener('multiChainWalletReady', checkWalletInstalled);
    
//     // Clean up event listener
//     return () => {
//       window.removeEventListener('multiChainWalletReady', checkWalletInstalled);
//     };
//   }, []);
  
//   // Connect to the wallet
//   const connectWallet = async (blockchain) => {
//     try {
//       setTransactionStatus({ type: 'info', message: `Connecting to ${blockchain}...` });
      
//       const account = await window.multiChainWallet.connect(blockchain);
      
//       if (blockchain === 'ethereum') {
//         setEthereumAccount(account);
//       } else if (blockchain === 'solana') {
//         setSolanaAccount(account);
//       }
      
//       setTransactionStatus({ 
//         type: 'success', 
//         message: `Successfully connected to ${blockchain} wallet!` 
//       });
//     } catch (error) {
//       setTransactionStatus({ 
//         type: 'error', 
//         message: `Error connecting to ${blockchain} wallet: ${error.message}` 
//       });
//     }
//   };
  
//   // Sign a transaction
//   const signTransaction = async () => {
//     try {
//       if (!ethereumAccount && !solanaAccount) {
//         throw new Error('Please connect a wallet first');
//       }
      
//       setTransactionStatus({ 
//         type: 'info', 
//         message: `Requesting approval for ${selectedBlockchain} transaction...` 
//       });
      
//       let transaction;
      
//       if (selectedBlockchain === 'ethereum') {
//         // Example Ethereum transaction
//         transaction = {
//           to: '0x1234567890123456789012345678901234567890',
//           value: '0.001',
//           data: '0x',
//           gasLimit: '21000',
//           gasPrice: '20000000000'
//         };
//       } else {
//         // Example Solana transaction
//         transaction = {
//           to: 'CqJYiWhmmwA7ZbEGK6zbp2W9DFrAXb7R3fQRkH6r1Jnz',
//           amount: '0.001',
//           memo: 'Test transaction'
//         };
//       }
      
//       const signedTx = await window.multiChainWallet.signTransaction(
//         transaction,
//         selectedBlockchain
//       );
      
//       setTransactionStatus({ 
//         type: 'success', 
//         message: 'Transaction signed successfully!',
//         data: signedTx
//       });
//     } catch (error) {
//       setTransactionStatus({ 
//         type: 'error', 
//         message: `Error signing transaction: ${error.message}` 
//       });
//     }
//   };
  
//   // Get network information
//   const getNetworkInfo = async () => {
//     try {
//       setTransactionStatus({ 
//         type: 'info', 
//         message: `Getting ${selectedBlockchain} network info...` 
//       });
      
//       const network = await window.multiChainWallet.getNetwork(selectedBlockchain);
      
//       setTransactionStatus({ 
//         type: 'success', 
//         message: `Network information retrieved`,
//         data: network
//       });
//     } catch (error) {
//       setTransactionStatus({ 
//         type: 'error', 
//         message: `Error getting network info: ${error.message}` 
//       });
//     }
//   };
  
//   return (
//     <div className="App">
//       <header className="App-header">
//         <h1>MultiChain Wallet Demo</h1>
//         <p>A simple dApp to demonstrate wallet integration</p>
//       </header>
      
//       <main className="App-main">
//         <div className="card">
//           <h2>Wallet Connection Status</h2>
//           <div className="status-container">
//             <div className="status-item">
//               <span className="status-label">Extension Installed:</span>
//               <span className={`status-value ${walletInstalled ? 'green' : 'red'}`}>
//                 {walletInstalled ? 'Yes' : 'No'}
//               </span>
//             </div>
            
//             <div className="status-item">
//               <span className="status-label">Ethereum Account:</span>
//               <span className="status-value">
//                 {ethereumAccount ? ethereumAccount.address : 'Not connected'}
//               </span>
//             </div>
            
//             <div className="status-item">
//               <span className="status-label">Solana Account:</span>
//               <span className="status-value">
//                 {solanaAccount ? solanaAccount.address : 'Not connected'}
//               </span>
//             </div>
//           </div>
//         </div>
        
//         <div className="card">
//           <h2>Connect Wallet</h2>
//           {!walletInstalled ? (
//             <div className="install-message">
//               <p>MultiChain Wallet extension is not installed. Please install it from the Chrome Web Store.</p>
//             </div>
//           ) : (
//             <div className="button-container">
//               <button 
//                 className="connect-button ethereum"
//                 onClick={() => connectWallet('ethereum')}
//                 disabled={!!ethereumAccount}
//               >
//                 {ethereumAccount ? 'Ethereum Connected' : 'Connect Ethereum'}
//               </button>
              
//               <button 
//                 className="connect-button solana"
//                 onClick={() => connectWallet('solana')}
//                 disabled={!!solanaAccount}
//               >
//                 {solanaAccount ? 'Solana Connected' : 'Connect Solana'}
//               </button>
//             </div>
//           )}
//         </div>
        
//         <div className="card">
//           <h2>Test Wallet Actions</h2>
//           <div className="blockchain-selector">
//             <label>
//               Select Blockchain:
//               <select 
//                 value={selectedBlockchain} 
//                 onChange={(e) => setSelectedBlockchain(e.target.value)}
//               >
//                 <option value="ethereum">Ethereum</option>
//                 <option value="solana">Solana</option>
//               </select>
//             </label>
//           </div>
          
//           <div className="button-container">
//             <button 
//               className="action-button"
//               onClick={signTransaction}
//               disabled={!walletInstalled || (selectedBlockchain === 'ethereum' && !ethereumAccount) || (selectedBlockchain === 'solana' && !solanaAccount)}
//             >
//               Sign Test Transaction
//             </button>
            
//             <button 
//               className="action-button"
//               onClick={getNetworkInfo}
//               disabled={!walletInstalled}
//             >
//               Get Network Info
//             </button>
//           </div>
//         </div>
        
//         {transactionStatus && (
//           <div className={`transaction-status ${transactionStatus.type}`}>
//             <h3>{transactionStatus.type === 'success' ? 'Success' : transactionStatus.type === 'error' ? 'Error' : 'Info'}</h3>
//             <p>{transactionStatus.message}</p>
//             {transactionStatus.data && (
//               <pre>{JSON.stringify(transactionStatus.data, null, 2)}</pre>
//             )}
//           </div>
//         )}
//       </main>
//     </div>
//   );


// }

function App(){
  return (
<WalletConnect/>
  )
}

export default App;