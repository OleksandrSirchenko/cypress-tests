declare namespace Cypress {
    interface Chainable {
        login: typeof commands.login;
        logout: typeof commands.logout;
    }
}

const elements = {
    loginButton: `a[href$='login']`,
    loginField: `input[name$="username"]`,
    pswrdField: `input[name$="password"]`,
    logoutButton: `a[href$='logout']`,
};

export const commands = {
    login: (user: any) => {
        return cy.get(elements.loginButton).click()
            .get(elements.loginField).type(user.name)
            .get(elements.pswrdField).type(user.pswrd);
    },
    logout: () => {
        return cy.get(elements.logoutButton).click();
    }
};

Cypress.Commands.add('login', commands.login);
Cypress.Commands.add('login', commands.logout);