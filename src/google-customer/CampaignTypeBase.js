export class CampaignTypeBase {
    constructor(customer) {
        this.customer = customer;
    }
}

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