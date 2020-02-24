import { HeatMapElements as element } from './elements';

type ObjectLike = Cypress.ObjectLike;

declare global {
    namespace Cypress {
        interface Chainable {
            openHeatMaps: typeof heatMap.openHeatMaps;
            createNewHeatMap: typeof heatMap.createNewHeatMap;
        }
    }
}

class HeatMap {
    public openHeatMaps() {
        return cy.get(element.heatMap)
            .eq(1).click();
    }

    public createNewHeatMap(options: ObjectLike) {
        if (!options.name || !options.urls) {
            throw new Error(`Missed required option for create heat map`);
        }

        return cy.get(element.newHeatMap).click()
            .get(element.nameField).type(options.name)
            .get(element.badgeCircle).eq(2).click()
            .get(element.pathUrl).type(options.urls)
            .get(element.badgeCircle).eq(3).click()
            .get(element.createHeatMap).click();
    }
}

const heatMap = new HeatMap();

Cypress.Commands.add('openHeatMaps', heatMap.openHeatMaps);
Cypress.Commands.add('createNewHeatMap', heatMap.createNewHeatMap);