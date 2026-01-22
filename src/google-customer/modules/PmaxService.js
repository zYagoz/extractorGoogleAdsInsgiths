import { CampaignTypeBase, DateRange } from "../CampaignTypeBase.js";
import { PmaxQueries } from '../queries.js';

export class Pmax extends CampaignTypeBase {
    async getCampaigns(range = DateRange.LAST_7_DAYS) {
        return await this.customer.query(PmaxQueries.CampaignsQuery(range));
    }
    
    async getAssetGroups(campaign_id, range = DateRange.LAST_7_DAYS) {
        return await this.customer.query(PmaxQueries.AssetGroupsQuery(campaign_id, range));
    }
    
    async getAssets(campaign_id, asset_group_id = null, range = DateRange.LAST_7_DAYS) {
        return await this.customer.query(PmaxQueries.AssetsQuery(campaign_id, asset_group_id, range));
    }
    
    async getAudienceSignals(campaign_id, asset_group_id = null) {
        return await this.customer.query(PmaxQueries.AudienceSignalsQuery(campaign_id, asset_group_id));
    }
    
    // Métodos demográficos para PMAX retornam objetos vazios, pois não tem suporte atualmente
    async getAgeRange(campaign_id, range = DateRange.LAST_7_DAYS) {
        return await this.customer.query(PmaxQueries.AgeRangeQuery(campaign_id, range));
    }
    
    async getGender(campaign_id, range = DateRange.LAST_7_DAYS) {
        return await this.customer.query(PmaxQueries.GenderQuery(campaign_id, range));
    }
    
    async getIncomeRange(campaign_id, range = DateRange.LAST_7_DAYS) {
        return await this.customer.query(PmaxQueries.IncomeRangeQuery(campaign_id, range));
    }
    
    async getAllDemographics(campaign_id, range = DateRange.LAST_7_DAYS) {
        const [ageData, genderData, incomeData] = await Promise.all([
            this.getAgeRange(campaign_id, range),
            this.getGender(campaign_id, range),
            this.getIncomeRange(campaign_id, range)
        ]);
        return {
            age: ageData,
            gender: genderData,
            income: incomeData
        };
    }
}