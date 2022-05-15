import { render, screen } from "@testing-library/react"
import Login from "./Login"
import { BrowserRouter } from 'react-router-dom';
import userEvent from "@testing-library/user-event";

test('If values added, the SIGN IN button becomes enabled', () => {
    render(<BrowserRouter><Login /></BrowserRouter>)
    expect(screen.getByRole('button', {name: /sign in/i})).toHaveProperty('disabled', true);
    userEvent.type(screen.getByRole('textbox', {name: /username/i}), "koke");
    userEvent.type(screen.getByLabelText(/password/i), "random");
    expect(screen.getByRole('button', {name: /sign in/i})).toHaveProperty('disabled', false);
});