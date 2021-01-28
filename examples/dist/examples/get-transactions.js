"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("../src");
(async () => {
    const sdk = new src_1.SDKv2(process.env.SDK_EXCHANGE || "", process.env.SDK_ENVIRONMENT || "");
    const tokens = await sdk.login(process.env.SDK_USERNAME || "", process.env.SDK_PASSWORD || "");
    sdk.accessToken = tokens.client_access_token;
    // Get list of last completed transactions
    const completedTx = await sdk.getWalletTransactionHistory({
        filter: { status: "COMPLETED" },
        sort: { field: "updated_at", direction: "desc" },
    });
    console.log("COMPLETED TRANSACTIONS", completedTx);
    const allDeposits = await sdk.getWalletTransactionHistory({
        filter: { type: "DEPOSIT" },
    });
    console.log("DEPOSITS", allDeposits);
})();
/* OUTPUT
COMPLETED TRANSACTIONS {
  success: true,
  transactions: [
    {
      txid: '802c97e1-1c66-46f6-8922-371d1cdbe45c',
      status: 'COMPLETED',
      type: 'DEPOSIT',
      exchange: 'DEMO',
      user_id: 'f4a26b49-9f07-4e81-ae0c-e6ff0da966df',
      product: 'BCH',
      address: '3HqwsVjZjSCWQZiGFCJi7jgwKeCWhwdTVA',
      tag: null,
      amount: '0.2875',
      confirmations_required: 6,
      confirmations_count: 0,
      txid_hash: null,
      state_hash: 'dad5c3de-fae4-4a15-acc2-ca5dcb51467f',
      created_at: '2020-09-16T20:55:07.000Z',
      updated_at: '2020-09-16T20:55:13.000Z',
      iframe_url: null,
      message: null,
      schema_name: null,
      schema_data: {},
      validation: {},
      details: {}
    },
    {
      txid: 'e31d0128-6530-44df-b432-0e338f7a6705',
      status: 'COMPLETED',
      type: 'DEPOSIT',
      exchange: 'DEMO',
      user_id: 'f4a26b49-9f07-4e81-ae0c-e6ff0da966df',
      product: 'ETH',
      address: '0xd618eed1e71bcbbe5ad0d2fedd2659ab6d75537c',
      tag: null,
      amount: '0.1996',
      confirmations_required: 6,
      confirmations_count: 0,
      txid_hash: null,
      state_hash: '0ad1d930-4155-4460-95dc-c597ae29afdc',
      created_at: '2020-09-16T18:41:04.000Z',
      updated_at: '2020-09-16T18:41:11.000Z',
      iframe_url: null,
      message: null,
      schema_name: null,
      schema_data: {},
      validation: {},
      details: {}
    },
    ...
  ],
  pager_limit: 50,
  pager_offset: 0,
  pager_total_rows: 25

DEPOSITS {
  success: true,
  transactions: [
    {
      txid: '802c97e1-1c66-46f6-8922-371d1cdbe45c',
      status: 'COMPLETED',
      type: 'DEPOSIT',
      exchange: 'DEMO',
      user_id: 'f4a26b49-9f07-4e81-ae0c-e6ff0da966df',
      product: 'BCH',
      address: '3HqwsVjZjSCWQZiGFCJi7jgwKeCWhwdTVA',
      tag: null,
      amount: '0.2875',
      confirmations_required: 6,
      confirmations_count: 0,
      txid_hash: null,
      state_hash: 'dad5c3de-fae4-4a15-acc2-ca5dcb51467f',
      created_at: '2020-09-16T20:55:07.000Z',
      updated_at: '2020-09-16T20:55:13.000Z',
      iframe_url: null,
      message: null,
      schema_name: null,
      schema_data: {},
      validation: {},
      details: {}
    },
    {
      txid: 'e31d0128-6530-44df-b432-0e338f7a6705',
      status: 'COMPLETED',
      type: 'DEPOSIT',
      exchange: 'DEMO',
      user_id: 'f4a26b49-9f07-4e81-ae0c-e6ff0da966df',
      product: 'ETH',
      address: '0xd618eed1e71bcbbe5ad0d2fedd2659ab6d75537c',
      tag: null,
      amount: '0.1996',
      confirmations_required: 6,
      confirmations_count: 0,
      txid_hash: null,
      state_hash: '0ad1d930-4155-4460-95dc-c597ae29afdc',
      created_at: '2020-09-16T18:41:04.000Z',
      updated_at: '2020-09-16T18:41:11.000Z',
      iframe_url: null,
      message: null,
      schema_name: null,
      schema_data: {},
      validation: {},
      details: {}
    },
    {
      txid: '808cdaaa-46b8-4366-8625-bc55ae2285f3',
      status: 'COMPLETED',
      type: 'DEPOSIT',
      exchange: 'DEMO',
      user_id: 'f4a26b49-9f07-4e81-ae0c-e6ff0da966df',
      product: 'XLM',
      address: 'GCP5TKBTBBYII3VEOAU3GZ52B3PKT4OURQA2IQ6GZO6TVU3AO7OQ4NFN?memoId=622',
      tag: null,
      amount: '0.6170',
      confirmations_required: 6,
      confirmations_count: 0,
      txid_hash: null,
      state_hash: '030d006e-db71-43df-aa18-8823a9d894f2',
      created_at: '2020-09-14T23:08:11.000Z',
      updated_at: '2020-09-14T23:08:17.000Z',
      iframe_url: null,
      message: null,
      schema_name: null,
      schema_data: {},
      validation: {},
      details: {}
    },
    ...
  ],
  pager_limit: 50,
  pager_offset: 0,
  pager_total_rows: 25
}
*/
