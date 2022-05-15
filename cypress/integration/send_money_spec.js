describe('send', () => {
    it('User can send crypto', () => {
        //login
        cy.visit('/');
        cy.findByRole('textbox').type('vicky');
        cy.findByLabelText(/password/i).type('secret');
        cy.findByRole('button', {  name: /sign in/i}).click();
        cy.wait(2000);
        //check my crypto
        var oldCryptoBalance = cy.get(':nth-child(1) > .wallet-container__wallet__balance__list__item__quantity').then($balance => oldCryptoBalance = $balance.text());
        //send crypto button
        cy.findByRole('button', {  name: /send crypto/i}).click();
        cy.wait(1000);
         //select user from list 
        const userSelected = 'pablo';
        cy.findByText(`${userSelected}@belvo.com`).click();
        cy.wait(1000);
        //select crypto
        cy.findByRole('button', {  name: /eth/i}).click();
        //amount
        const amomuntSent = 0.01;
        cy.findByRole('spinbutton').type(amomuntSent);
        cy.wait(500);
        //click send
        cy.findByRole('button', {  name: /send/i}).click();
        cy.wait(1000);
        //return to wallet
        cy.findByRole('button', {  name: /go to your wallet/i}).click();
        //verify if transtaction was made
        var newCryptoBalance = cy.get(':nth-child(1) > .wallet-container__wallet__balance__list__item__quantity').then($balance => newCryptoBalance = $balance.text()).then(balance => {
            expect((oldCryptoBalance - newCryptoBalance).toFixed(2)).to.equal(amomuntSent.toFixed(2));
        });
    })
})