import { client } from "../google-client/index.js";
import { enums } from "google-ads-api";
import { GoogleAdsSerive } from "./authenticate.js";
import { queries } from './queries.js'

const googleService = new GoogleAdsSerive();

export const DateRange = Object.freeze({
    TODAY: 'TODAY',
    YESTERDAY: 'YESTERDAY',
    LAST_7_DAYS: 'LAST_7_DAYS',
    LAST_BUSINESS_WEEK: 'LAST_BUSINESS_WEEK',
    THIS_MONTH: 'THIS_MONTH',
    LAST_MONTH: 'LAST_MONTH',
    LAST_14_DAYS: 'LAST_14_DAYS',
    LAST_30_DAYS: 'LAST_30_DAYS',
    THIS_WEEK_SUN_TODAY: 'THIS_WEEK_SUN_TODAY',
    THIS_WEEK_MON_TODAY: 'THIS_WEEK_MON_TODAY',
    LAST_WEEK_SUN_SAT: 'LAST_WEEK_SUN_SAT',
    LAST_WEEK_MON_SUN: 'LAST_WEEK_MON_SUN',
});

export class Customer {
    constructor(customer_id) {
        this.customer = client.Customer({
            customer_id: customer_id,
            login_customer_id: process.env.LOGIN_CUSTOMER_ID,
            refresh_token: process.env.REFRESH_TOKEN,
        })
    }

    async getCampaingsQuery(range = DateRange.LAST_7_DAYS) {
        return await this.customer.query(queries.CampaingsQuery(range));
    }

    async getAdGroupsQuery(campaign_id, range = DateRange.LAST_7_DAYS) {
        return await this.customer.query(queries.AdGroupsQuery(campaign_id, range));
    }

    async getKeywordsQuery(campaign_id, ad_group_id = null, range = DateRange.LAST_7_DAYS) {
        return await this.customer.query(queries.KeywordsQuery(campaign_id, ad_group_id, range));
    }

    async getAgeRangeQuery(campaign_id, ad_group_id = null, range = DateRange.LAST_7_DAYS) {
        return await this.customer.query(queries.AgeRangeQuery(campaign_id, ad_group_id, range));
    }
    
    async getGenderQuery(campaign_id, ad_group_id = null, range = DateRange.LAST_7_DAYS) {
        return await this.customer.query(queries.GenderQuery(campaign_id, ad_group_id, range));
    }

    async getIncomeRangeQuery(campaign_id, ad_group_id = null, range = DateRange.LAST_7_DAYS) {
        return await this.customer.query(queries.IncomeRangeQuery(campaign_id, ad_group_id, range));
    }

    async getAllDemographicsQuery(campaign_id, ad_group_id = null, range = DateRange.LAST_7_DAYS) {
        const [ageData, genderData, incomeData] = await Promise.all([
            this.getAgeRangeQuery(campaign_id, ad_group_id, range),
            this.getGenderQuery(campaign_id, ad_group_id, range),
            this.getIncomeRangeQuery(campaign_id, ad_group_id, range)
        ]);

        return {
            age: ageData,
            gender: genderData,
            income: incomeData
        };
    }
}

// const plano = new Customer(8689974096)

// console.log(await googleService.listAccounts())
// console.log(await plano.getCampaingsQuery())
// console.log(await plano.getAdGroupsQuery(23167708680))
// console.log(await plano.getKeywordsQuery(23167708680, 186122948846))
// console.log(await plano.getIncomeRangeQuery(23167708680, 186122948846))
// console.log(await plano.getAllDemographicsQuery(23167708680, 186122948846))
