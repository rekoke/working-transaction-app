import React from 'react'
import {useState, useEffect} from 'react';
import useAuth from '../hooks/useAuth';
import useUser from '../hooks/useUser';
import axios from '../api/axios';
import logo from '../images/belvo.svg' ;
import {useNavigate} from 'react-router-dom'


const LOGIN_URL = '/login';
const WALLET_URL = '/wallet';
const CONTACTS_URL = '/contacts';

const Login = () => {
    const {setAuth, tokenExp} = useAuth();
    const {setUser, setTransactions, setBalance, setContacts} = useUser();
    const [usr, setUsr] = useState('');
    const [pwd, setPwd] = useState('');
    const [error, setError] = useState('');
    let navigate = useNavigate();

    useEffect(()=>{
        setError('');
    }, [usr, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const res = await axios.post(LOGIN_URL,
                JSON.stringify(
                {
                    "password": pwd,
                    "username": usr
                }),
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: false
                } 
            );
            const accessToken = res?.data?.access_token;
            setAuth({accessToken});
            const user = await axios.get(WALLET_URL, {headers: {Authorization: `Bearer ${accessToken}`}});
            const userData = user?.data;
            setUser(userData.email);
            setTransactions(userData.transactions);
            setBalance(userData.balance);
            const contactsReq = await axios.get(CONTACTS_URL, {headers: {Authorization: `Bearer ${accessToken}`}});
            const contactsRes = contactsReq?.data;
            setContacts(contactsRes);

            setUsr('');
            setPwd('');
            setAuth({accessToken});
            navigate('/wallet');

        } catch (err){
            console.log('error', err)
            if(!err?.response){
                setError('No server response');
            } else if(err.response?.status === 400){
                setError('Missing username or password');
            } else if(err.response?.status === 401){
                setError('Unauthorized');
            } else {
                setError('Login failed');
            }
        }
    }

  return (
    <div className="login-container">
        <div className="login-container__login">
        {tokenExp < 0 && <p className="login-container__login__expired-session">your session has expired, please log in again {usr}</p>}
            <h1>KOKE APP</h1>
            <h2>Sign in</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">username</label>
                <input
                    placeholder="username"
                    type="text"
                    id="username"
                    autoComplete="off"
                    onChange={(e) => setUsr(e.target.value)}
                    value={usr}
                    required
                />
                <label htmlFor="password">password</label>
                <input
                    placeholder="password"
                    type="password"
                    name="password"
                    id="password"
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    required
                />
                <button disabled={!usr || !pwd || error}>Sign in</button>
                {error && <p> {error}</p> }
            </form>
            <img alt="belvo_logo" src={logo} />
        </div>
    </div>
  )
}

export default Login