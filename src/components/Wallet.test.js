import { render, screen } from "@testing-library/react"
import Wallet from "./Wallet"
import { BrowserRouter } from 'react-router-dom';

test('Send Crypto button enabled', () => {
    render(<BrowserRouter><Wallet /></BrowserRouter>)
    expect(screen.getByText(/send crypto/i)).toHaveProperty('disabled', false);
});