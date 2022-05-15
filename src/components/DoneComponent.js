import React from 'react'
import useUser from '../hooks/useUser';
import logo from '../images/correct.png' ;


const StatusMessage = () => {
    const { status, contacTransaction } = useUser();
    switch(status) {
        case 'Done':
            return <div className="done-message"> <img src={logo} /> Your crypto was successfully sent to {contacTransaction.name}</div>;
        case 'Pending':
            return <p>Your crypto is being sent...</p>;
        case 'Reject':
            return <p>Sorry, we found a problem and we couldn't send your crypto</p>;
        default:
          return 'foo';
      }
}

const DoneComponent = () => {
    return (
        <div className="status-message"><StatusMessage/></div>
    )
}

export default DoneComponent