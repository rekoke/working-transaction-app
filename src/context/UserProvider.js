import {createContext, useState} from 'react';

const UserContext = createContext({});

export const UserProvider = ({children}) => {
    const [user, setUser] = useState({});
    const [transactions, setTransactions] = useState({});
    const [balance, setBalance] = useState({});
    const [contacts, setContacts] = useState({});
    const [contacTransaction, setcontacTransaction] = useState({email: '', name: ''});
    const [status, setStatus] = useState('');


    return(
        <UserContext.Provider value={{ 
            user, setUser,
            transactions, setTransactions,
            balance, setBalance,
            contacts, setContacts,
            contacTransaction, setcontacTransaction,
            status, setStatus
        }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext;