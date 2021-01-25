import { SDKv2 } from "../src";

async function onAppReady() {
  const sdk = new SDKv2(
    process.env.SDK_EXCHANGE || "",
    process.env.SDK_ENVIRONMENT || ""
  );

  const tokens = await sdk.login(
    process.env.SDK_USERNAME || "",
    process.env.SDK_PASSWORD || ""
  );
  sdk.accessToken = tokens.client_access_token;

  await sdk.setSettings({
    param: "test",
    param2: "value",
  });

  const settings = await sdk.getSettings();
  console.log(settings);
}

onAppReady();
