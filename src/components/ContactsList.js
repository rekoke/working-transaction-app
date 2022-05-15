import React from 'react'
import useUser from '../hooks/useUser';

const ContactsList = () => {
    const { contacts, setcontacTransaction } = useUser();
    const selectedContact = (contact) => {
        setcontacTransaction(contact);
    }
    return (
        <ul>
            {contacts.map((contact, i) =>
                <li onClick={ () => selectedContact(contact)} key={i}>
                    <span>{contact.name}</span>
                    <span>{contact.email}</span>
                </li>
            )}
        </ul>
    )
}

export default ContactsList;