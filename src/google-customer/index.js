import { client } from "../google-client/index.js";
import { enums } from "google-ads-api";
import { GoogleAdsSerive } from "./authenticate.js";
import { Search } from "./modules/SearchService.js";

const googleService = new GoogleAdsSerive();
export class Customer {
    constructor(customer_id) {
        this.customer = client.Customer({
            customer_id: customer_id,
            login_customer_id: process.env.LOGIN_CUSTOMER_ID,
            refresh_token: process.env.REFRESH_TOKEN,
        });

        this.search = new Search(this.customer);
    }

}

// id colocado na .env para não expor mais o id da conta
const plano = new Customer(process.env.CONTA_CLIENTE)

// console.log(await googleService.listAccounts())
console.log(await plano.search.getCampaigns())
// console.log(await plano.search.getAdGroups(22373042150))
// console.log(await plano.search.getKeywords(22373042150, 177779484220))
// console.log(await plano.search.getIncomeRange(22373042150, 177779484220))
// console.log(await plano.search.getAllDemographics(22373042150, 177779484220))
