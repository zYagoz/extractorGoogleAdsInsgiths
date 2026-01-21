import { CampaignTypeBase, DateRange } from "../CampaignTypeBase.js";
import { SearchQueries } from '../queries.js'

export class Search extends CampaignTypeBase {
    async getCampaigns(range = DateRange.LAST_7_DAYS) {
        return await this.customer.query(SearchQueries.CampaingsQuery(range));
    }
    
    async getAdGroups(campaign_id, range = DateRange.LAST_7_DAYS) {
        return await this.customer.query(SearchQueries.AdGroupsQuery(campaign_id, range));
    }
    
    async getKeywords(campaign_id, ad_group_id = null, range = DateRange.LAST_7_DAYS) {
        return await this.customer.query(SearchQueries.KeywordsQuery(campaign_id, ad_group_id, range));
    }
    
    async getAgeRange(campaign_id, ad_group_id = null, range = DateRange.LAST_7_DAYS) {
        return await this.customer.query(SearchQueries.AgeRangeQuery(campaign_id, ad_group_id, range));
    }
    
    async getGender(campaign_id, ad_group_id = null, range = DateRange.LAST_7_DAYS) {
        return await this.customer.query(SearchQueries.GenderQuery(campaign_id, ad_group_id, range));
    }
    
    async getIncomeRange(campaign_id, ad_group_id = null, range = DateRange.LAST_7_DAYS) {
        return await this.customer.query(SearchQueries.IncomeRangeQuery(campaign_id, ad_group_id, range));
    }
    
    async getAllDemographics(campaign_id, ad_group_id = null, range = DateRange.LAST_7_DAYS) {
        const [ageData, genderData, incomeData] = await Promise.all([
            this.getAgeRange(campaign_id, ad_group_id, range),
            this.getGender(campaign_id, ad_group_id, range),
            this.getIncomeRange(campaign_id, ad_group_id, range)
        ]);
        return {
            age: ageData,
            gender: genderData,
            income: incomeData
        };
    }
}