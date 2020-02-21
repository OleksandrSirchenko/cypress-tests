describe(`Base Suite`, () => {
    let userData: any;

    beforeEach(() => {
        cy.fixture('config').then(user => {
            userData = user;
            cy.visit(`${user.baseUrl}/login`).login(user);
        });
    });

    it(`should verify dashboard url`, () => {
        cy.url().then(url => {
            expect(url).to.equal(`${userData.baseUrl}/sites/${userId}/dashboard`);
        });
    });

    it(`should verify user organization data`, () => {
        
    });
});