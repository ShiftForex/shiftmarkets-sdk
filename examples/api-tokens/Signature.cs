using Newtonsoft.Json;
using System;
using System.Net.Http;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace TestSignature
{
    class Program
    {
        /**
 * Example how to use API keys to generate and validate signature for http requests
 * All the keys in this example are for demo purpose only, they will not work on live system
 * Please contact our support to get actual keys
 */
        private const string ApiKeyId = "7c00eeac-306b-6aa0-1181-78d20ff9d982";
        private const string PrivateKey = "MIIEowIBAAKCAQEAqvBnozm+kuqENrF8/P7xNr2qOIliRkgnG58+hVk9Jw9MTqU7cf0C4HKses931LDsqqAZswj1IzAYKrF8TNyswvP7WCtwt3DJvI/04aMolBn+ZEd5EVeVyuxw8dXhIAgkimasu9uVIkBjjH4TBomSg/l6lDITjBqep1DPPQWZbyN4QTkjSa92JKbO9W0WR2gxGQDF5FPRc5nFzHzWXLC+59yjWV/7n+gOGJ7v4446qqQekXzHTDDhOshloWZUQKHvVcSIqtcimZo3CKUPYnIxAm6vSVfm6RQAxswRbOITOPQd/IIrv4KeLpqmDa1nrcfXZ5G9uEZnMJkYl2GJry/c4QIDAQABAoIBAH1pV3/nk6wSJuJBoaO0H6C70jEcil9p/FdFpAcNi9ImZSOmElD1AbFOMMEBibcf/uLIB1LVFZS1amWYRcvWc2GswxDS/iV3uGqBa3ZH0DOoRn2n+mkAy0NP6SVkd4CauMRZxA0ncujoOKEQtkCrmjT9SjOD8dduiEvU+9aXTxS7zDQgp+NNOfkcol2Iu3w0WZkVMZnzpbcPU1GNBuT3NiCoZzvGExcLH5q79OdZX4Wl8Uj2u8pturMy9SRmsf74kIMSPBNZZWC7okI/lzcYxsrD/T+pUu0gohpigcxBeDPwfDmPi5HW1O5HJLgg7iwAyZCGrlwsdOSeV1dj4bBUU2kCgYEA1OaYlHlwJmFjtyDz9PlagJabGloWByvPiUOtGOGmcbJKI5DQ2F3rsJfhOxcnBuMEzoFSqks0S725Am1Ny9Uo/MCtc8qh/DGGqi8/bt7Vp2I2cn6pF9+U/hWkG7aBiC470mQCtsF1GUSAyKAmledgSfgedyzTezlQvP4JmLbuFyMCgYEAzYst/adXMHcO8Iv+aWEi7HEnLmHjPL9uQ3j5sVogD67dwKRxdLD7/+98zkM9F/MqskIw4be01tKXKhanVmUiNTY6xOW3N5/bvHr/wYKUIDrMp+VdaJ4eh13ZjdqQhdEOA8AMK6uWwK2uYnPVGENRELEumUzU3xNYb+2pi6NCvisCgYBSAoXR47mEv00m9MWknwzyrZEPpJYJqyGlsXETPZDdCR2v94/LWNp6SvcSyQdaisaGOaC7Qn7hkjKbMbmfA/xm6F2oVezx9a33Dn4z2hiZAqcQkaPXM2P0QCfYGQRqjcyzbZzyAzF1S0MEhVR3uAoKVE5//79zHw/vzTerIQQz2wKBgFWyPY6QAm4WdYgdFglhkmn6E1fnQBLHzXUcLx6ecNeZFKOI7DS2xZpDg0mMByDBJYAE0NSK/z7Btny5zTLcH5MH9SC6ldT/NWIz9gX8Jz34xfMKUhOYOSo/GsFl6vOf4bP2khxzAft7bkVl/eaLynSnKsKHogkPy8N+1z186ArZAoGBAKoYv9P3q8McC/Eun2gT2qvGYfmGNgcvLp0Dw+VhnTLZ2jDUWB3t83YHSK+cF2wB2hH9qtvHrVMUiz7w/Ss81a9xuNXfVpG8q49HJbsQhacyqoZF69WSkec7J6a+iwnwn01cmdsTT3QGZSF/xACS3BPRWymZ210wyV90+Qfrsy8v";
        private const string PublicKey = "MIIBCgKCAQEAqvBnozm+kuqENrF8/P7xNr2qOIliRkgnG58+hVk9Jw9MTqU7cf0C4HKses931LDsqqAZswj1IzAYKrF8TNyswvP7WCtwt3DJvI/04aMolBn+ZEd5EVeVyuxw8dXhIAgkimasu9uVIkBjjH4TBomSg/l6lDITjBqep1DPPQWZbyN4QTkjSa92JKbO9W0WR2gxGQDF5FPRc5nFzHzWXLC+59yjWV/7n+gOGJ7v4446qqQekXzHTDDhOshloWZUQKHvVcSIqtcimZo3CKUPYnIxAm6vSVfm6RQAxswRbOITOPQd/IIrv4KeLpqmDa1nrcfXZ5G9uEZnMJkYl2GJry/c4QIDAQAB";

        // Function to generate signature for payload
        public static string CreateSignature(string payload)
        {
            var privateKeyBytes = Convert.FromBase64String(PrivateKey);
            var dataBytes = Encoding.UTF8.GetBytes(payload);
            using var rsa = RSA.Create();
            rsa.ImportRSAPrivateKey(privateKeyBytes, out _);
            byte[] signature = rsa.SignData(dataBytes, HashAlgorithmName.SHA256, RSASignaturePadding.Pkcs1);
            return Convert.ToBase64String(signature);
        }

        // Function to verify signature for payload
        // Usually, you don't need this on client side, it is just for demo purpose
        public static bool VerifySignature(object payload, string signature)
        {
            var publicKeyBytes = Convert.FromBase64String(PublicKey);
            var signatureBytes = Convert.FromBase64String(signature);
            var dataBytes = Encoding.UTF8.GetBytes(JsonConvert.SerializeObject(payload));

            try
            {
                using var Rsa = RSA.Create();
                Rsa.ImportRSAPublicKey(publicKeyBytes, out _);
                return Rsa.VerifyData(dataBytes, signatureBytes, HashAlgorithmName.SHA256, RSASignaturePadding.Pkcs1);
            }
            catch (CryptographicException e)
            {
                Console.WriteLine(e.Message);
                return false;
            }
        }
        static async Task Main(string[] args)
        {
            try
            {
                var payload = new
                {
                    label = "BTC Address for Order",
                    user_custom_data = new
                    {
                        username = "jenny.smith",
                        article = "PN 12355"
                    }
                };

                var payloadString = JsonConvert.SerializeObject(payload);

                var signature = CreateSignature(payloadString);

                var isVerified = VerifySignature(payload, signature);
                Console.WriteLine($"Verified signature: {isVerified}");

                var httpContent = new StringContent(payloadString, Encoding.UTF8, "application/json");
                HttpClient httpClient = new HttpClient();
                httpClient.DefaultRequestHeaders.Add("API-KEY-ID", ApiKeyId);
                httpClient.DefaultRequestHeaders.Add("API-SIGNATURE", $"{signature}");

                var response = await httpClient.PostAsync("https://nexus-pay.cryptosrvc.com/api/v1/wallet/BTC/address", httpContent);

                Console.WriteLine(await response.Content.ReadAsStringAsync());
                Console.ReadKey();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw;
            }
        }
    }
}
