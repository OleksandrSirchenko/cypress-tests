import { FormElements as element } from '../support/commands/forms/elements';
import { HeatMapBuilder } from '../fixtures/recordBuilder';

describe(`Forms`, () => {
    let data: any;

    it(`should create new form`, () => {
        const heatMap = new HeatMapBuilder()
            .setMapName('New Heat Map')
            .setMapUrl('http://localhost:8080');

        cy.openHeatMaps()
            .createNewHeatMap(heatMap)
            .get(element.iconMore).then(element => {
                expect(element).to.be.visible;
            })
            .get(element.heatMapsTable).then(element => {
                expect(element).to.contain(heatMap.url)
                    .and.to.contain(heatMap.name);
            });
    });

    before(() => {
        cy.fixture('config').then(config => {
            data = config;
        });
    });

    beforeEach(() => {
        cy.visit(`/login`).login(data.user)
            .waitForRecourcesLoad()
            .getDashboardId().then(id => {
                data.dashBoardId = id;
        })
        .getHeatMapsIds(data).then(heatMaps => {
            data.heatMapsData = heatMaps;
        })
        .openHeatMaps()
        .deleteRecord(data);
    });
});