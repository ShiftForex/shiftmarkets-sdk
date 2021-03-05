import { SDKv2 } from "../src";

async function onAppReady() {
  const sdk = new SDKv2(
    process.env.SDK_EXCHANGE || "",
    process.env.SDK_ENVIRONMENT || ""
  );

  const config = await sdk.getWebConfig();
  console.log("WEB CONFIG", JSON.stringify(config, undefined, " "));

}

onAppReady();
