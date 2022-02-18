"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    production: {
        auth_api_url: "https://authentication.cryptosrvc.com/api",
        wis_api_url: "https://wallet-integration-service.cryptosrvc.com/v1",
        eds_api_url: "https://exchange-data-service.cryptosrvc.com/v1",
        eds_ws_url: "wss://exchange-data-service.cryptosrvc.com",
        trade_api_url: "https://trade-service.cryptosrvc.com/v1",
        trade_api_sls_url: "https://trade-service-sls.cryptosrvc.com/v1",
        rfq_sls_url: "https://rfq.cryptosrvc.com/v1",
        notification_ws_url: "wss://85rsrffqz0.execute-api.us-east-1.amazonaws.com/prod",
        notification_api_url: "",
        kyc_api_url: "https://kyc-integration.cryptosrvc.com/api",
        settings_api_url: "https://api.cryptosrvc.com/user-settings",
        lending_api_url: "https://lending-service.cryptosrvc.com/v1",
    },
    staging: {
        auth_api_url: "https://authentication-staging.cryptosrvc.com/api",
        wis_api_url: "https://wallet-integration-service.cryptosrvc-staging.com/v1",
        eds_api_url: "https://exchange-data-service.cryptosrvc-staging.com/v1",
        eds_ws_url: "wss://exchange-data-service.cryptosrvc-staging.com",
        trade_api_url: "https://trade-service.cryptosrvc.com/v1",
        trade_api_sls_url: "https://trade-service-sls.cryptosrvc.com/v1",
        rfq_sls_url: "https://rfq.cryptosrvc.com/v1",
        notification_ws_url: "wss://85rsrffqz0.execute-api.us-east-1.amazonaws.com/prod",
        // notification_ws_url:
        //   "wss://0a0oum2kkj.execute-api.us-east-1.amazonaws.com/dev",
        notification_api_url: "https://3b5hneboa4.execute-api.us-east-1.amazonaws.com",
        kyc_api_url: "https://kyc-integration.cryptosrvc-staging.com/api",
        settings_api_url: "https://sandbox.shiftmarkets.com/user-settings",
        lending_api_url: "https://lending-service.cryptosrvc-staging.com/v1",
    },
};
