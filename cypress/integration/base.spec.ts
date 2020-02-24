import { BaseElements as element } from '../support/elements';

describe(`Base Suite`, () => {
    let data: any;

    it(`should verify dashboard url`, () => {
        const dashboard = `/sites/${data.dashBoardId}/dashboard`;

        cy.url().then((url: string) => {
            expect(url).to.contain(dashboard);
        });
    });

    it(`should verify user organization data`, () => {
        cy.get(element.siteBar).then((element: JQuery<HTMLElement>) => {
            expect(element).to.contain(data.company.name);
            expect(element).to.contain(data.company.url);
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
        });
    });
});