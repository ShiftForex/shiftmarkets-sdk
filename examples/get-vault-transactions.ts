import { SDKv2, VaultAccountType } from "../src";

(async () => {
  const sdk = new SDKv2(
    process.env.SDK_EXCHANGE || "",
    process.env.SDK_ENVIRONMENT || ""
  );

  const tokens = await sdk.login(
    process.env.SDK_USERNAME || "",
    process.env.SDK_PASSWORD || ""
  );
  sdk.accessToken = tokens.client_access_token;
  const response = await sdk.getLendingTransactions({ accountType: VaultAccountType.OperatorFee });
  console.log('TRANSACTIONS', JSON.stringify(response));
});
