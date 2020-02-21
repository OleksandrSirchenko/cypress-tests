import { Elements } from './elements';

declare global {
    namespace Cypress {
        interface Chainable {
            login: typeof commands.login;
            logout: typeof commands.logout;
        }
    }
}

class Commands {
    constructor() {
    }

    public login(user: any) {
        return cy.get(Elements.email).type(user.email)
            .get(Elements.pswrd).type(user.pswrd)
            .get(Elements.submitButton).click();
    }

    public logout() {
        return cy;
    }
}

const commands = new Commands();

Cypress.Commands.add('login', commands.login);
Cypress.Commands.add('logout', commands.logout);