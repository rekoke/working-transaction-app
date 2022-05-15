import React from 'react';
import {useState} from 'react';
import axios from '../api/axios';
import useUser from '../hooks/useUser';
import useAuth from '../hooks/useAuth';
import {useNavigate} from 'react-router-dom'

const CRYPTO = {
    ETH: 'ETH',
    BTC: 'BTC',
    DOGE: 'DOGE'
}
const SENDING_URL = '/wallet/send';
const WALLET_URL = '/wallet';

const TransactionForm = () => {

    const { contacTransaction, setTransactions, setBalance, setStatus } = useUser();
    const { auth } = useAuth();
    const [amount, setAmount] = useState('');
    const [crypto, setCrypto] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const res = await axios.post(SENDING_URL,
                JSON.stringify(
                {
                    "description": "",
                    "amount": amount,
                    "currency": crypto,
                    "receiver": contacTransaction.email
                }),
                {headers: {Authorization: `Bearer ${auth.accessToken}`}}

            );
            const status = res?.data?.status;
            const user = await axios.get(WALLET_URL, {headers: {Authorization: `Bearer ${auth.accessToken}`}});
            const userData = user?.data;
            setTransactions(userData.transactions);
            setBalance(userData.balance);
            setStatus(status);

        } catch (err){
            if(!err?.response){
                setErrorMsg('No server response');
            } else if(err.response?.status === 422){
                setErrorMsg('Something went wrong, make sure you have enough funds');
                setAmount('');
            } else {
                setErrorMsg('Sent failed');
                navigate('/login');
            }
        }
    }
    return (
        <div className="transactionForm-container">
            <div className="transactionForm-container__cryptos">
                <button className={`${crypto === CRYPTO.ETH ? '-selected' : '' }`} onClick={() => setCrypto(CRYPTO.ETH)}><p>{CRYPTO.ETH}</p></button>
                <button className={`${crypto === CRYPTO.BTC ? '-selected' : '' }`} onClick={() => setCrypto(CRYPTO.BTC)}><p>{CRYPTO.BTC}</p></button>
                <button className={`${crypto === CRYPTO.DOGE ? '-selected' : '' }`} onClick={() => setCrypto(CRYPTO.DOGE)}><p>{CRYPTO.DOGE}</p></button>
            </div>
            <form className="transactionForm-container__form" onSubmit={handleSubmit}>
                <label htmlFor="amount">amount</label>
                <input
                    placeholder="Amount"
                    type="number"
                    id="amount"
                    autoComplete="off"
                    onChange={(e) => setAmount(e.target.value)}
                    value={amount}
                    required
                    step="any"
                    min="0"
                />
                <button disabled={!amount || !crypto}>Send</button>
                {errorMsg && <p className="transactionForm-container__form__error-msg"> {errorMsg}</p> }
            </form>
        </div>
    )
}

export default TransactionForm