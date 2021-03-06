import { HeatMapElements as element } from '../support/commands/heat-maps/elements';
import { RecordBuilder } from '../fixtures/recordBuilder';
import { Constants } from '../support/constants';

type ObjectLike = Cypress.ObjectLike;

describe(`Heat Maps`, () => {
    const heatMapType = Constants.RECORD_TYPE.HEAT_MAP;
    let data: ObjectLike;

    it(`should create new heat map`, () => {
        const heatMap = new RecordBuilder(heatMapType)
            .setName('New Heat Map')
            .setUrls('http://localhost:8080');

        cy.openHeatMaps()
            .createNewHeatMap(heatMap)
            .get(element.iconMore).then((element: JQuery<HTMLElement>) => {
                expect(element).to.be.visible;
            })
            .get(element.heatMapsTable).then((element: JQuery<HTMLElement>) => {
                expect(element).to.contain(heatMap.urls)
                    .and.to.contain(heatMap.name);
            });
    });

    before(() => {
        cy.fixture('config').then(config => {
            data = config;
        });
    });

    beforeEach(() => {
        cy.visit(`/login`).auth(data.user)
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