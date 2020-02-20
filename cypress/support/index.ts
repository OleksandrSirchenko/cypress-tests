/// <reference types="Cypress" />

import { commands } from './commands';

Cypress.Commands.add('createNewUser', commands.createNewUser);