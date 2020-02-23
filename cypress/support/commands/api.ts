import { Constants } from '../constants';
import * as _ from 'lodash';

declare global {
    namespace Cypress {
        interface Chainable {
            deleteRecord: typeof api.deleteRecord;
            getDashboardId: typeof api.getDashboardId;
            getHeatMapsIds: typeof api.getHeatMapsIds;
        }
    }
}

class ApiCalls {
    public deleteRecord(options: any) {
        const record = _.find(options, 'recordType');

        if (_.isEmpty(record.ids)) {
            return cy;
        }

        Cypress._.each(record.ids, id => {
            cy.request({
                method: 'DELETE',
                url: `/api/v1/sites/${options.dashBoardId}/${record.recordType}/${id}`
            });
        });

        return cy;
    }

    public getDashboardId() {
        let userId,
            dashboardId;

        return cy.request({
            url: `/api/v2/users/me`,
            headers: {
                accept: 'application/json'
            }
        }).its('body').then(body => {
            userId = body.user_id;

            cy.request({
                url: `/api/v1/users/${userId}/resources`,
                headers: {
                    accept: 'application/json'
                }
            }).its('body').then(body => {
                dashboardId = body.sites[0].id;
                return dashboardId;
            });
        });
    }

    public getHeatMapsIds(options: any) {
        const qs = '?fields=id,name,created_epoch_time,enabled,visit_count,targeting,screenshots_done,screenshots_failed,screenshots_status,completed,shared,public_url,description,created_by_user&filter_join_operator=or&sort=-id&amount=100&offset=0&count=true&unfiltered_count=true&filter=name__ct__,targeting_rules.pattern__ct__';
        const heatMap = {
            recordType: Constants.RECORD_TYPE.HEAT_MAP
        }

        let ids = new Array();

        return cy.request({
            url: `/api/v2/sites/${options.dashBoardId}/heatmaps${qs}`,
            headers: {
                accept: 'application/json'
            }
        }).its('body').then(heatMaps => {
            heatMaps = heatMaps.data;

            Cypress._.each(heatMaps, data => ids.push(data.id));

            return Object.assign(heatMap, { ids: ids });
        });
    }

    public getFunnelsIds(options: any) {
        const funnel = {
            recordType: Constants.RECORD_TYPE.FUNNEL
        }

        let ids = new Array();

        return cy.request({
            url: `/api/v1/sites/${options.dashBoardId}/${funnel.recordType}`,
            headers: {
                accept: 'application/json'
            }
        }).its('body').then(funnels => {
            Cypress._.each(funnels, funnel => ids.push(funnel.id));

            return Object.assign(funnel, { ids: ids });
        });
    }
}

const api = new ApiCalls();

Cypress.Commands.add('deleteRecord', api.deleteRecord);
Cypress.Commands.add('getDashboardId', api.getDashboardId);
Cypress.Commands.add('getHeatMapsIds', api.getHeatMapsIds);