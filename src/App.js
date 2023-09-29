import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from "react";
const { ethers } = require("ethers");

function App() {
    const url = "https://api.telegram.org/bot[6221671756:AAGCgUcWoT2ZnIP0O2EtcNmLhj_k4uL-p6M]/getUpdates"
    const getBotUpdates = () => fetch("https://api.telegram.org/bot6053496110:AAEuLqx3o4D9JIBmm9de5_2GmvbIl5YCIUg/getUpdates").then((response) => console.log(response.json()))
    const contractAbi = [
    {
        "inputs": [
            {
                "internalType": "bytes",
                "name": "checkData",
                "type": "bytes"
            }
        ],
        "name": "checkUpkeep",
        "outputs": [
            {
                "internalType": "bool",
                "name": "upkeepNeeded",
                "type": "bool"
            },
            {
                "internalType": "bytes",
                "name": "performData",
                "type": "bytes"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "have",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "want",
                "type": "address"
            }
        ],
        "name": "OnlyCoordinatorCanFulfill",
        "type": "error"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "Operator",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "Amount",
                "type": "uint256"
            }
        ],
        "name": "ClaimedFees",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "MarketId",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "User",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "Amount",
                "type": "uint256"
            }
        ],
        "name": "ClaimedWinnings",
        "type": "event"
    },
    {
        "inputs": [],
        "name": "claimFees",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "marketId_",
                "type": "uint256"
            }
        ],
        "name": "claimWinnings",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "MarketId",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "User",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "Amount",
                "type": "uint256"
            }
        ],
        "name": "EnteredMarket",
        "type": "event"
    },
    {
        "inputs": [],
        "name": "enterMarket",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes",
                "name": "performData",
                "type": "bytes"
            }
        ],
        "name": "performUpkeep",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "requestId",
                "type": "uint256"
            },
            {
                "internalType": "uint256[]",
                "name": "randomWords",
                "type": "uint256[]"
            }
        ],
        "name": "rawFulfillRandomWords",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "RequestId",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256[]",
                "name": "RandomWords",
                "type": "uint256[]"
            }
        ],
        "name": "RequestFulfilled",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "RequestId",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "NumOfWords",
                "type": "uint256"
            }
        ],
        "name": "RequestSent",
        "type": "event"
    },
    {
        "inputs": [],
        "name": "fees",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "filterPendingWinningEntriesForUser",
        "outputs": [
            {
                "internalType": "uint256[]",
                "name": "LotteryIds",
                "type": "uint256[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "marketId_",
                "type": "uint256"
            }
        ],
        "name": "getRoundAmount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "marketId_",
                "type": "uint256"
            }
        ],
        "name": "getRoundParticipants",
        "outputs": [
            {
                "internalType": "address[]",
                "name": "",
                "type": "address[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "marketId_",
                "type": "uint256"
            }
        ],
        "name": "getRoundWinner",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "requestId",
                "type": "uint256"
            }
        ],
        "name": "getRsp",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "bool",
                        "name": "exists",
                        "type": "bool"
                    },
                    {
                        "internalType": "uint256",
                        "name": "response",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bool",
                        "name": "fulfilled",
                        "type": "bool"
                    }
                ],
                "internalType": "struct Lottery.Requests",
                "name": "rsp",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "marketId",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "marketIdToExpiration",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "marketIdToRequestId",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "marketIdToTotalTickets",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "marketIdToWinner",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "requestIdToRequest",
        "outputs": [
            {
                "internalType": "bool",
                "name": "exists",
                "type": "bool"
            },
            {
                "internalType": "uint256",
                "name": "response",
                "type": "uint256"
            },
            {
                "internalType": "bool",
                "name": "fulfilled",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "upkeepSent",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
]
    const contractAddress = '0x189b1a6cfc1CF33d60CAdd73C1998D3df1Fb1657'
    const provider = ethers.getDefaultProvider('https://polygon-mumbai.g.alchemy.com/v2/l8YnVfVn-vf8ZmKDTDHm1Qqa87WTDnOv')
    const [initData, setInitData] = useState(null);
    const [initDataUnsafe, setInitDataUnsafe] = useState('test');
    const [userId, setUserId] = useState('test id')
    const [scriptError, setScriptError] = useState(null);

    useEffect(() => {
        const script= document.createElement('script')
        script.src = "https://telegram.org/js/telegram-web-app.js?1"
        document.head.appendChild(script)

        script.onload = () => {
          // Now, you can access window.Telegram.WebApp
          if (window.Telegram && window.Telegram.WebApp) {
            // You can use Telegram.WebApp here
            const initData = window.Telegram.WebApp.initData || 'test';
            const initDataUnsafe = window.Telegram.WebApp.initDataUnsafe || 'test';
            setInitData(initData)
            setInitDataUnsafe(initDataUnsafe)
            if(initData !== 'test'){
                setUserId(initDataUnsafe['user'])
            }
            // Example: Log initData to the console
            console.log('initData:', initData);
            console.log('initDataUnsafe:', initDataUnsafe);
            }
        };
    }, []);

    let wallet = localStorage.getItem('User')
    if (wallet === null) {
        wallet = ethers.Wallet.createRandom(provider)
        localStorage.setItem('User', wallet.signingKey.privateKey)
    } else {
        wallet = new ethers.Wallet(wallet, provider)
    }

    const win_contract = new ethers.Contract(contractAddress, contractAbi, wallet.provider)
    console.log(win_contract)
    getBotUpdates()
    return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
                {wallet.address}
            </p>
            <p>
                {initData}
            </p>
            <p>
                {userId}
            </p>
            <p>
                {initDataUnsafe === {} ? 'test' : JSON.stringify(initDataUnsafe)}
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header>
        </div>
    );
}

export default App;
