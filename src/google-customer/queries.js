// Arquivo feito para estar com todas as queries 

export const queries = Object.freeze({
  CampaingsQuery: (range) => `
    SELECT 
      campaign.id,
      campaign.name,
      campaign.status,
      campaign.primary_status_reasons,
      campaign.optimization_score,
      campaign.bidding_strategy_type,
      campaign.advertising_channel_type,
      campaign_budget.name,
      campaign_budget.amount_micros,
      campaign_budget.type,
      customer.currency_code,
      metrics.impressions,
      metrics.clicks,
      metrics.ctr,
      metrics.average_cpc,
      metrics.cost_micros,
      metrics.conversions,
      metrics.all_conversions,
      metrics.phone_calls,
      metrics.cost_per_conversion,
      metrics.conversions_from_interactions_rate,
      metrics.search_absolute_top_impression_share,
      metrics.search_top_impression_share,
      metrics.search_budget_lost_absolute_top_impression_share,
      metrics.search_budget_lost_top_impression_share,
      metrics.search_rank_lost_absolute_top_impression_share,
      metrics.search_rank_lost_top_impression_share
    FROM 
      campaign
    WHERE
      campaign.status = "ENABLED"
      AND segments.date DURING ${range}
      AND metrics.cost_micros > 1000000
    LIMIT 20`,

  AdGroupsQuery: (campaign_id, range) => `
        SELECT 
            ad_group.id,
            ad_group.name,
            ad_group.status,
            ad_group.type,
            ad_group.ad_rotation_mode,
            ad_group.cpc_bid_micros,
            ad_group.cpm_bid_micros,
            ad_group.target_cpa_micros,
            ad_group.target_roas,
            ad_group.percent_cpc_bid_micros,
            ad_group.effective_target_cpa_micros,
            ad_group.effective_target_roas,
            campaign.id,
            campaign.name,
            customer.currency_code,
            metrics.impressions,
            metrics.clicks,
            metrics.ctr,
            metrics.average_cpc,
            metrics.cost_micros,
            metrics.conversions,
            metrics.all_conversions,
            metrics.phone_calls,
            metrics.cost_per_conversion,
            metrics.conversions_from_interactions_rate,
            metrics.search_absolute_top_impression_share,
            metrics.search_top_impression_share,
            metrics.search_budget_lost_absolute_top_impression_share,
            metrics.search_budget_lost_top_impression_share,
            metrics.search_rank_lost_absolute_top_impression_share,
            metrics.search_rank_lost_top_impression_share
        FROM 
            ad_group
        WHERE
            campaign.id = ${campaign_id}
            AND ad_group.status = "ENABLED"
            AND segments.date DURING ${range}
        ORDER BY metrics.cost_micros DESC
        LIMIT 50`,

  KeywordsQuery: (campaign_id, ad_group_id, range) => {
    let whereClause = `
      campaign.id = ${campaign_id}
      AND ad_group_criterion.status = "ENABLED"
      AND ad_group_criterion.type = "KEYWORD"
      AND segments.date DURING ${range}
    `;

    if (ad_group_id !== null && ad_group_id !== undefined) {
      whereClause += `
      AND ad_group.id = ${ad_group_id}`;
    }

    return `
      SELECT 
        ad_group_criterion.criterion_id,
        ad_group_criterion.keyword.text,
        ad_group_criterion.keyword.match_type,
        ad_group_criterion.status,
        ad_group_criterion.quality_info.quality_score,
        ad_group_criterion.quality_info.creative_quality_score,
        ad_group_criterion.quality_info.post_click_quality_score,
        ad_group_criterion.quality_info.search_predicted_ctr,
        ad_group_criterion.cpc_bid_micros,
        ad_group_criterion.effective_cpc_bid_micros,
        ad_group_criterion.position_estimates.first_page_cpc_micros,
        ad_group_criterion.position_estimates.top_of_page_cpc_micros,
        ad_group_criterion.position_estimates.first_position_cpc_micros,
        ad_group.id,
        ad_group.name,
        ad_group.status,
        campaign.id,
        campaign.name,
        customer.currency_code,
        metrics.impressions,
        metrics.clicks,
        metrics.ctr,
        metrics.average_cpc,
        metrics.cost_micros,
        metrics.conversions,
        metrics.all_conversions,
        metrics.cost_per_conversion,
        metrics.conversions_from_interactions_rate,
        metrics.search_absolute_top_impression_share,
        metrics.search_top_impression_share,
        metrics.search_budget_lost_absolute_top_impression_share,
        metrics.search_rank_lost_top_impression_share
      FROM 
        keyword_view
      WHERE
        ${whereClause}
      ORDER BY metrics.cost_micros DESC
      LIMIT 100`;
  },

  AgeRangeQuery: (campaign_id, ad_group_id, range) => {
    let whereClause = `
        campaign.id = ${campaign_id}
        AND segments.date DURING ${range}
    `;

    if (ad_group_id !== null && ad_group_id !== undefined) {
      whereClause += `
        AND ad_group.id = ${ad_group_id}`;
    }

    return `
      SELECT 
        ad_group_criterion.age_range.type,
        ad_group_criterion.criterion_id,
        ad_group_criterion.status,
        ad_group_criterion.bid_modifier,
        ad_group.id,
        ad_group.name,
        ad_group.status,
        campaign.id,
        campaign.name,
        customer.currency_code,
        metrics.impressions,
        metrics.clicks,
        metrics.ctr,
        metrics.average_cpc,
        metrics.cost_micros,
        metrics.conversions,
        metrics.all_conversions,
        metrics.conversions_value,
        metrics.cost_per_conversion,
        metrics.conversions_from_interactions_rate
      FROM 
        age_range_view
      WHERE
        ${whereClause}
      ORDER BY metrics.impressions DESC
      LIMIT 100`
  },

  GenderQuery: (campaign_id, ad_group_id, range) => {
    let whereClause = `
        campaign.id = ${campaign_id}
        AND segments.date DURING ${range}`;

    if (ad_group_id !== null && ad_group_id !== undefined) {
      whereClause += `
      AND ad_group.id = ${ad_group_id}
      `;
    }

    return `
      SELECT 
        ad_group_criterion.gender.type,
        ad_group_criterion.criterion_id,
        ad_group_criterion.status,
        ad_group_criterion.bid_modifier,
        ad_group.id,
        ad_group.name,
        ad_group.status,
        campaign.id,
        campaign.name,
        customer.currency_code,
        metrics.impressions,
        metrics.clicks,
        metrics.ctr,
        metrics.average_cpc,
        metrics.cost_micros,
        metrics.conversions,
        metrics.all_conversions,
        metrics.conversions_value,
        metrics.cost_per_conversion,
        metrics.conversions_from_interactions_rate
      FROM 
        gender_view
      WHERE
        ${whereClause}
      ORDER BY metrics.impressions DESC
      LIMIT 100`
  },

  IncomeRangeQuery: (campaign_id, ad_group_id, range) => {
    let whereClause = `
        campaign.id = ${campaign_id}
        AND segments.date DURING ${range}`;

    if (ad_group_id !== null && ad_group_id !== undefined) {
      whereClause += `
      AND ad_group.id = ${ad_group_id}
      `;
    }

    return `
      SELECT 
        ad_group_criterion.income_range.type,
        ad_group_criterion.criterion_id,
        ad_group_criterion.status,
        ad_group_criterion.bid_modifier,
        ad_group.id,
        ad_group.name,
        ad_group.status,
        campaign.id,
        campaign.name,
        customer.currency_code,
        metrics.impressions,
        metrics.clicks,
        metrics.ctr,
        metrics.average_cpc,
        metrics.cost_micros,
        metrics.conversions,
        metrics.all_conversions,
        metrics.conversions_value,
        metrics.cost_per_conversion,
        metrics.conversions_from_interactions_rate
      FROM 
        income_range_view
      WHERE
        ${whereClause}
      ORDER BY metrics.impressions DESC
      LIMIT 100`
  },
})