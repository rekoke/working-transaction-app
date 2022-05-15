import React from 'react';
import useUser from '../hooks/useUser';
import ContactsList from './ContactsList';
import TransactionForm from './TransactionForm';
import DoneComponent from './DoneComponent';
import {useNavigate} from 'react-router-dom'

const SendView = () => {
    const { contacTransaction, status } = useUser();
    if(status) {
      return <DoneComponent />;
    } else if(contacTransaction && contacTransaction.email === ''){
        return <ContactsList />
    } else {
        return <TransactionForm />
    }
}

const SendText = () => {
    const { contacTransaction, status } = useUser();
    if(status) {
        return '3 - Done!'
    } else if(contacTransaction && contacTransaction.email === ''){
        return '1 - Select a contact from the list'
    } else {
        return '2 - Select currency and add amount'
    }
}

const Send = () => {
    const { setcontacTransaction, setStatus } = useUser();
    let navigate = useNavigate();

    const handleGoToWallet = () => {
        setcontacTransaction({email: '', name: ''});
        setStatus('');
        navigate('/wallet');
    }

    return (
        <div className="send-container">
            <div className="send-container__send">
                <div className="send-container__send__header"><SendText /></div>
                <SendView />
                <button className="send-container__send__button" onClick={handleGoToWallet}>Go to your wallet</button>
            </div>
        </div>
    )
}

export default Send;