declare namespace Cypress {
    interface Chainable {
        createNewUser: typeof commands.createNewUser;
    }
}

export const commands = {
    createNewUser: () => {
        return cy;
    }
};