/// <reference types="Cypress" />

import './commands';

Cypress.Commands.add('dataCy', (value) => {
    return cy.get(`[data-cy=${value}]`)
})