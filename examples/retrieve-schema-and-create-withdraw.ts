import { SDKv2 } from "../src";

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

  // Retrieving a withdraw schema so that the user can provide additional schemaData
  const schemas = await sdk.getSchemas("BTC", "withdraw");
  console.log(schemas);

  // Set corresponding user data from form related to the schema
  const schemaData = { email: "test@gmail.com", phone: "311499212" };

  // Create withdraw request and wait till it will be completed/failed
  const btcAddress = "3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy";
  const data = {
    product: "BTC",
    amount: 0.001,
    btcAddress,
    schemaName: "Sell",
    schemaData,
  };
  let withdrawTransaction = await sdk.createWithdraw(data);
  while (!withdrawTransaction.iframe_url && withdrawTransaction.success) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const { txid, state_hash } = withdrawTransaction;
    withdrawTransaction = await sdk.getWalletTransaction(txid, state_hash, 5);
  }

  if (!withdrawTransaction.success) {
    console.error("Withdraw error", withdrawTransaction.message);
    return;
  }

  console.log("Iframe URL", withdrawTransaction.iframe_url);
})();
