import { FunnelsElements as element } from './elements';

type ObjectLike = Cypress.ObjectLike;

declare global {
    namespace Cypress {
        interface Chainable {
            openFunnels: typeof funnels.openFunnels;
            createNewFunnel: typeof funnels.createNewFunnel;
            openEditFunnelForm: typeof funnels.openEditFunnelForm;
        }
    }
}

class Funnels {
    public openFunnels() {
        return cy.get(element.funnels)
            .eq(1).click();
    }

    public createNewFunnel(options: ObjectLike) {
        if (!options.name || !options.urls || !options.stepNames) {
            throw new Error(`Missed required option for create funnel`);
        }

        function _typeStepNames(options: ObjectLike) {
            return cy.get(element.steps).each((stepInput: string, index: number) => {
                cy.get(stepInput).type(options.stepNames[index]);
            });            
        }

        function _typeStepUrls(options: ObjectLike) {
            return cy.get(element.pathUrls).each((pathUrl: string, index: number) => {
                cy.get(pathUrl).type(options.urls[index]);
            });
        }

        cy.get(element.newFunnel).click()
            .get(element.nameField).type(options.name);

        _typeStepNames(options);
        _typeStepUrls(options);

        return cy.get(element.createFunnel).click();
    }

    public openEditFunnelForm() {
        return cy.get(element.editIcon).click({ force: true });
    }
}

const funnels = new Funnels();

Cypress.Commands.add('openFunnels', funnels.openFunnels);
Cypress.Commands.add('createNewFunnel', funnels.createNewFunnel);
Cypress.Commands.add('openEditFunnelForm', funnels.openEditFunnelForm);