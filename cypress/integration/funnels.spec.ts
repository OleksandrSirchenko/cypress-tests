import { FunnelsElements as element } from '../support/commands/funnels/elements';
import { RecordBuilder } from '../fixtures/recordBuilder';
import { Constants } from '../support/constants';

type ObjectLike = Cypress.ObjectLike;

describe(`Funnels`, () => {
    const funnelType = Constants.RECORD_TYPE.FUNNEL;
    let data: ObjectLike;

    it(`should create new funnel`, () => {
        const funnel = new RecordBuilder(funnelType)
            .setName('New Funnel')
            .setUrls(['http://localhost:8080', 'http://localhost:8081'])
            .setStepNames(['First Step', 'Second Step']);

        cy.openFunnels()
            .createNewFunnel(funnel)
            .get(element.iconMore).then(element => {
                expect(element).to.be.visible;
            })
            .get(element.funnelsTable).then((element: JQuery<HTMLElement>) => {
                expect(element).to.contain(funnel.name);
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
        .getFunnelsIds(data).then(funnels => {
            data.funnelsData = funnels;
        })
        .openFunnels()
        .deleteRecord(data);
    });
});