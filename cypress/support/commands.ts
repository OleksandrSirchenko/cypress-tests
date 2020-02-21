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

    public login() {
        return cy.request('https://dash.readme.io/to/k6')
            .then(resp => {
                const _cert = resp.allRequestResponses[0]['Response Headers']['set-cookie'][0];
                const cookie = resp.allRequestResponses[0]['Response Headers']['set-cookie'];
                cy.request({
                    method: 'POST',
                    url: 'https://dash.readme.io/to/k6',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        Cookie: cookie
                    },
                    body: {
                        _cert,
                        email: 'cypress\@gmail.com',
                        password: 'testUser'
                    }
                }).then(resp => {
                    console.log(resp);                    
                });                       
            });
    }

    public logout() {
        return cy.get(Elements.logoutButton).click({ force: true });
    }
}

const commands = new Commands();

Cypress.Commands.add('login', commands.login);
Cypress.Commands.add('logout', commands.logout);