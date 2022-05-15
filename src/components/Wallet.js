import React from 'react'
import useUser from '../hooks/useUser';
import {useNavigate} from 'react-router-dom'

const Wallet = () => {
  const { user, transactions, balance } = useUser();
  let navigate = useNavigate();
  
  const handleSendCrypto = () => {
    navigate('/send');
  }
  
  return (
    <div className="wallet-container">
      <div className="wallet-container__wallet">
        <div className="wallet-container__wallet__top">
          {user && <p>Hello <strong>{user.split('@')[0].charAt(0).toUpperCase() + user.split('@')[0].slice(1)}</strong>, welcome to your wallet.</p>}
        </div>
        <div className="wallet-container__wallet__balance">
          <p>Your account balance:</p>
          {balance && 
            <ul className="wallet-container__wallet__balance__list">
              {Object.entries(balance).map((item, i) =>  
                <li className="wallet-container__wallet__balance__list__item" key={i}>
                  <span className="wallet-container__wallet__balance__list__item__quantity">{item[1] !==0 ? item[1].toFixed(2) : item[1]}</span> <span className="wallet-container__wallet__balance__list__item__currency">{item[0]}</span>
                </li>
              )}
            </ul>
          }
        </div>
        <div className="wallet-container__wallet__transactions">
          <p>Your last transactions:</p>
          {transactions && transactions.length > 0 ? 
          <ul className="wallet-container__wallet__transactions__list">
            {transactions.slice(-5).reverse().map((transaction, i) =>  
              <li className="wallet-container__wallet__transactions__list__item" key={i}>
                <div>
                  <span>You paid {transaction.receiver.split('@')[0].charAt(0).toUpperCase() + transaction.receiver.split('@')[0].slice(1)}</span>
                  <span className="-negative-value">- {transaction.amount}{transaction.currency}</span>
                </div>
              </li>
            )}
          </ul>
          : <p>You don't have any transactions to show</p>}
        </div>
        <div className="wallet-container__wallet__bottom">
          <button onClick={handleSendCrypto}>SEND CRYPTO</button>
        </div>
      </div>
    </div>
  )
}

export default Wallet;