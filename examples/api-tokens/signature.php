<?php

/**
 * Example how to use API keys to generate and validate signature for http requests
 * All the keys in this example are for demo purpose only, they will not work on live system
 * Please contact our support to get actual keys
 */
define('API_KEY_ID', "7c00eeac-306b-6aa0-1181-78d20ff9d982");
define('API_PRIVATE_KEY_FILENAME', "./my_private_api_key.pem");
define('API_PUBLIC_KEY_FILENAME', "./my_public_api_key.pub");

// Function to generate signature for payload
function createSignature($payload)
{
  // Loading API private key from PEM file
  $privKeyId = openssl_get_privatekey(
    file_get_contents(API_PRIVATE_KEY_FILENAME),
    null
  );
  openssl_sign($payload, $signature, $privKeyId, OPENSSL_ALGO_SHA256);
  return base64_encode($signature);
}

// Function to verify signature for payload
// Usually, you don't need this on client side, it is just for demo purpose
function verifySignature($signature, $payload)
{
  // Loading API public key 
  $publicKeyId = openssl_get_publickey(
    file_get_contents(API_PUBLIC_KEY_FILENAME),
  );
  return openssl_verify($payload, base64_decode($signature), $publicKeyId, OPENSSL_ALGO_SHA256);
}

$payload = [
  "label" => "BTC Address for Order",
  "user_custom_data" => [
    "username" => "jenny.smith",
    "article" => "PN 12355",
  ]
];

$signature = createSignature(json_encode($payload));
$headers = [
  "Content-Type: application/json",
  "API-KEY-ID: " . API_KEY_ID,
  "API-SIGNATURE: " . $signature
];

print_r(["headers" => $headers]);

$isVerified = verifySignature($signature, json_encode($payload));
print_r([
  "isVerified" => $isVerified
]);

$ch = curl_init("https://nexus-pay.cryptosrvc.com/api/v1/wallet/BTC/address");
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

$result = curl_exec($ch);
