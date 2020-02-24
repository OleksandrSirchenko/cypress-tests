import { BaseElements as element } from '../elements';

declare global {
    namespace Cypress {
        interface Chainable {
            auth: typeof commands.auth;
            waitForRecourcesLoad: typeof commands.waitForRecourcesLoad;
        }
    }
}

class Commands {
    public auth(user: any) {
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

    public waitForRecourcesLoad() {
        return cy.server()
            .route('**/resources').as('resources')
            .wait('@resources', { timeout: 20000 });
    }
}

const commands = new Commands();

Cypress.Commands.add('auth', commands.auth);
Cypress.Commands.add('waitForRecourcesLoad', commands.waitForRecourcesLoad);