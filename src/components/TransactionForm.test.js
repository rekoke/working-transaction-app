import { render, screen } from "@testing-library/react"
import TransactionForm from "./TransactionForm"
import { BrowserRouter } from 'react-router-dom';
import userEvent from "@testing-library/user-event";

test('If values added, the SEND button becomes enabled', () => {
    render(<BrowserRouter><TransactionForm /></BrowserRouter>)
    expect(screen.getByRole('button', {name: /send/i})).toHaveProperty('disabled', true);
    userEvent.type(screen.getByRole('spinbutton', {name: /amount/i}), "0.2");
    userEvent.click(screen.getByRole('button', {name: /eth/i}));
    expect(screen.getByRole('button', {name: /send/i})).toHaveProperty('disabled', false);
});