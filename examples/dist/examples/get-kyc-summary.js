"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("../src");
async function onAppReady() {
    const sdk = new src_1.SDKv2(process.env.SDK_EXCHANGE || "", process.env.SDK_ENVIRONMENT || "");
    const tokens = await sdk.login(process.env.SDK_USERNAME || "", process.env.SDK_PASSWORD || "");
    sdk.accessToken = tokens.client_access_token;
    const summary = await sdk.getKycSummary();
    console.log("KYC_SUMMARY", summary);
}
onAppReady();
/** OUTPUT
KYC_SUMMARY {
  provider: 'Deltix',
  provider_user_id: '(unknown)',
  exchange_user_id: '8076EDDE-132F-40C2-A642-8FF11F2A27FD',
  client_user_id: '409a10a8-4497-4006-94c1-7ed1c994ef41',
  exchange_kyc_status: 'pending',
  current_tier: 0,
  organization_structure: [
    {
      orgUnitType: 'Group',
      orgUnitName: 'Test',
      orgUnitId: '30B464C0-8E02-4A16-AF49-6AADD7EBAAE8'
    },
    {
      orgUnitType: 'Business Unit',
      orgUnitName: 'Test',
      orgUnitId: 'BBC47FF0-B2BF-48CB-B348-B07BFBE4AE70'
    },
    {
      orgUnitType: 'Broker',
      orgUnitName: 'BaseBroker',
      orgUnitId: '9D08BEAB-1EAC-44EE-B00E-8A360425529D'
    }
  ],
  profile: {
    personal: {
      first_name: 'George',
      last_name: 'Smith',
      date_of_birth: '1994-10-05'
    },
    address: {
      primary_address_street: 'street ',
      primary_postal_code: '34234',
      primary_region: 'state',
      primary_country: 'United States',
      primary_city: 'city'
    },
    phone: { phone_number: '02342334234' },
    questions: {}
  },
  message: null
}
*/
