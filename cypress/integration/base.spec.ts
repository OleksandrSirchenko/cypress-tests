describe(`Base Suite`, () => {
    beforeEach(() => {
        cy.fixture('config').then(() => {
            cy.login();
        });
    });

    it(`should work`, () => {
        
    });
});