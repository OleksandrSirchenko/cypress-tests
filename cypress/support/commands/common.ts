import { BaseElements as element } from '../elements';

declare global {
    namespace Cypress {
        interface Chainable {
            login: typeof commands.login;
            logout: typeof commands.logout;
            waitForRecourcesLoad: typeof commands.waitForRecourcesLoad;
        }
    }
}

class Commands {
    public login(user: any) {
        if (!user.email || !user.pswrd) {
            throw new Error(`Missed required option for user login`);
        }

        return cy.log('Logging in...')
            .get(element.email).type(user.email)
            .get(element.pswrd).type(user.pswrd)
            .then(() => {
                cy.get(element.submitButton).click();
            });
    }

    public logout() {
        return cy;
    }

    public waitForRecourcesLoad() {
        return cy.server()
            .route('**/resources').as('resources')
            .wait('@resources');
    }
}

const commands = new Commands();

Cypress.Commands.add('login', commands.login);
Cypress.Commands.add('logout', commands.logout);
Cypress.Commands.add('waitForRecourcesLoad', commands.waitForRecourcesLoad);