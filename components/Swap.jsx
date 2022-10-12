import Web3Modal from 'web3modal'
import { ethers } from 'ethers'
import { useState, useEffect } from 'react'
import WalletConnectProvider from '@walletconnect/web3-provider'

const Swap = () => {
  const [provider, setProvider] = useState();
  const [library, setLibrary] = useState();
  const [web3Modal, setWeb3Modal] = useState(null)
  const [account, setAccount] = useState()
  const [signature, setSignature] = useState('')
  const [error, setError] = useState('')
  const [chainId, setChainId] = useState()
  const [network, setNetwork] = useState()
  const [message, setMessage] = useState('')
  const [signedMessage, setSignedMessage] = useState('')
  const [verified, setVerified] = useState()
  
  const [toWolfge, setToWolfge] = useState(true)
  const [fromBNB, setFromBNB] = useState(true)

  useEffect(() => {
    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          rpc: {
            56: 'https://bsc-dataseed.binance.org/',
          },
          network: 'binance',
          chainId: 56,
        },
      },
    }

    const newWeb3Modal = new Web3Modal({
      cacheProvider: true,
      network: 'mainnet',
      providerOptions,
    })

    setWeb3Modal(newWeb3Modal)
  }, [])

  const connectWallet = async () => {
    try {
      const provider = await web3Modal.connect()
      const library = new ethers.providers.Web3Provider(provider)
      const accounts = await library.listAccounts()
      const network = await library.getNetwork()
      setProvider(provider)
      setLibrary(library)
      if (accounts) setAccount(accounts[0])
      setChainId(network.chainId)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="swap">
      <div className="swap-header">
        Swap
        <div className="slippage">
          <span className="">SLIPPAGE: </span>
          <input
            type="number"
            name="slippage"
            id="slippage"
            placeholder="0.00"
            value="15"
          />
          <span className="">%</span>
        </div>
      </div>
      <div className="swap-body">
        <div className="from">
          <div className="balance">
            <span>You Sell</span>
            <span className="">
              Balance: <span id="fr_balance">0.00000</span>
            </span>
          </div>
          <div className="token">
            <div className="" id="fr_token_select">
              {fromBNB ? (
                <div>
                  <img src="img/bnb.png" className="token-icon" /> BNB
                </div>
              ) : (
                <div>
                  <img src="img/wolfgetoken.png" className="token-icon" />
                  Wolfge
                </div>
              )}
            </div>
            <input
              type="number"
              name="fr_amt"
              id="fr_amt"
              className="w-full bg-transparent text-3xl text-right border-none rounded-md hover:border-transparent outline-none hover:outline-none"
              placeholder="0.00"
            />
          </div>
        </div>
        <div
          id="arrow_switch_tokens"
          onClick={() => setFromBNB(!fromBNB)}
          height="20"
          width="20"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="currentColor"
            class="bi bi-arrow-down-short"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4z"
            />
          </svg>
        </div>
        <div className="to">
          <div className="balance">
            <span>You Buy</span>
            <span className="">
              Balance: <span id="to_balance">0.00000</span>
            </span>
          </div>
          <div className="token">
            <div className="" id="to_token_select">
              {!fromBNB ? (
                <div>
                  <img src="img/bnb.png" className="token-icon" /> BNB
                </div>
              ) : (
                <div>
                  <img src="img/wolfgetoken.png" className="token-icon" />
                  Wolfge
                </div>
              )}
            </div>
            <input
              type="number"
              name="to_amt"
              id="to_amt"
              className="w-full bg-transparent text-3xl text-right border-none rounded-md hover:border-transparent outline-none hover:outline-none"
              placeholder="0.00"
            />
          </div>
        </div>
      </div>
      <div className="swap-footer">
        {!account ? (
          <a href="#" className="" id="swap_btn" onClick={connectWallet}>
            CONNECT YOUR WALLET
          </a>
        ) : (
          <a href="#" className="" id="swap_btn" onClick={connectWallet}>
            SWAP
          </a>
        )}
        <a href="#" className="hide" id="swap_btn_disabled"></a>
      </div>
    </div>
  )
}

export default Swap
