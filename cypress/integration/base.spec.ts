import { Commands } from '../support/commands';

describe('Base Suite', () => {
    beforeEach(() => {
        const user: any = cy.fixture('user');
        console.log(cy.fixture('user.json'));
        const client = new Commands(user);
        cy.visit('https://diib.com/')
            .log(user);
        client.login()
            .logout();
    });

    afterEach(() => {
    });

    it('should work', () => {

    });
});