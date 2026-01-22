import { client } from "../google-client/index.js";
import { GoogleAdsSerive } from "./authenticate.js";
import { Search } from "./modules/SearchService.js";
import { Pmax } from "./modules/PmaxService.js";
import { AllCampaings } from "./queries.js";
import {DateRange} from './CampaignTypeBase.js'

const googleService = new GoogleAdsSerive();
export class Customer {
    constructor(customer_id) {
        this.customer = client.Customer({
            customer_id: customer_id,
            login_customer_id: process.env.LOGIN_CUSTOMER_ID,
            refresh_token: process.env.REFRESH_TOKEN,
        });

        this.search = new Search(this.customer);
        this.pmax = new Pmax(this.customer)
    }

    async getAllCampaigns(range = DateRange.LAST_7_DAYS) {
            return await this.customer.query(AllCampaings(range));
        }

}

// id colocado na .env para não expor mais o id da conta
const plano = new Customer(process.env.CONTA_CLIENTE)

// console.log(await googleService.listAccounts())
// console.log(await plano.getAllCampaigns())
// console.log(await plano.pmax.getAssets(21088544529))
// console.log(await plano.pmax.getAllDemographics(21088544529, 6493283884))
console.log(await plano.pmax.getAgeRange(21088544529))