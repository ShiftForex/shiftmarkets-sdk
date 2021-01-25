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

  const schema = await sdk.getExtendedProfileSchema("personal", "widget");
  console.log("KYC_SCHEMA", JSON.stringify(schema, undefined, " "));
  // After receiving the schema, generate form from it.

  // Put profile payload from form as first argument.
  // Payload params should be ordered as schema's.
  const updateResult = await sdk.updateUserProfile(
    {
      Personal: {
        first_name: "George",
        last_name: "Smith",
        date_of_birth: 781394400000,
        phone_number: "02342334234",
      },
      Address: {
        primary_country: "US",
        primary_city: "city",
        primary_region: "state",
        primary_postal_code: "34234",
        primary_address_street: "street",
        ssn: "4455",
      },
      Documents: {
        document_1:
          "data:image/png;base64,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",
        document_2: null,
        document_3: null,
        document_4: null,
      },
    },
    "personal"
  );

  console.log("UPDATE_USER_PROFILE", updateResult);
  if (updateResult.allSuccess) return;

  const message = updateResult.responsesWithError
    .map((resp) => resp.errorMsg)
    .join("; ");

  throw new Error(`Update status error: ${message}`);
}

onAppReady().catch((err) => console.error(err));

/** OUTPUT
KYC_SCHEMA {
 "components": {
  "schemas": {
   "Verify": {
    "provider": null,
    "type": "object",
    "required": [
     "Personal",
     "Address",
     "Documents"
    ],
    "properties": {
     "Personal": {
      "type": "object",
      "required": [
       "first_name",
       "last_name",
       "date_of_birth",
       "phone_number"
      ],
      "properties": {
       "first_name": {
        "type": "string",
        "required": true,
        "order": 50,
        "title": "first_name",
        "description": "FirstName",
        "maxLength": 64,
        "writeOnce": false
       },
       "last_name": {
        "type": "string",
        "required": true,
        "order": 40,
        "title": "last_name",
        "description": null,
        "maxLength": 64,
        "writeOnce": false
       },
       "date_of_birth": {
        "type": "integer",
        "required": true,
        "order": 30,
        "title": "date_of_birth",
        "description": null,
        "writeOnce": false,
        "customFormat": "age",
        "minimum": 18,
        "validations": {
         "onChange": [
          {
           "name": "over18"
          }
         ]
        },
        "format": "date"
       },
       "phone_number": {
        "type": "string",
        "required": true,
        "order": 60,
        "title": "phone_number",
        "description": "Contact Number with country extension",
        "maxLength": 64,
        "validations": {
         "onChange": [
          {
           "name": "minLength",
           "minLength": 6
          },
          {
           "name": "integer"
          }
         ]
        }
       }
      }
     },
     "Address": {
      "type": "object",
      "required": [
       "primary_address_street",
       "primary_city",
       "primary_region",
       "primary_country",
       "primary_postal_code"
      ],
      "properties": {
       "primary_address_street": {
        "type": "string",
        "required": true,
        "order": 110,
        "title": "primary_address_street",
        "description": null
       },
       "primary_city": {
        "type": "string",
        "required": true,
        "order": 90,
        "title": "primary_city",
        "description": null,
        "maxLength": 64
       },
       "primary_region": {
        "type": "string",
        "required": true,
        "order": 80,
        "title": "primary_region",
        "description": null,
        "maxLength": 64
       },
       "primary_country": {
        "type": "string",
        "required": true,
        "order": 10,
        "title": "primary_country",
        "description": "Country of Residence",
        "writeOnce": false,
        "enum": [
         "Canada",
         "United States"
        ]
       },
       "primary_postal_code": {
        "type": "string",
        "required": true,
        "order": 70,
        "title": "primary_postal_code",
        "description": "Zip",
        "maxLength": 64
       }
      }
     },
     "Documents": {
      "type": "object",
      "required": [],
      "properties": {
       "document_1": {
        "type": "string",
        "required": false,
        "order": 100,
        "title": "document_1",
        "description": "Proof of Residence (Utility Bill/Bank Statement)",
        "maxLength": 5242880,
        "contentEncoding": "relative",
        "format": "base64"
       },
       "document_2": {
        "type": "string",
        "required": false,
        "order": 20,
        "title": "document_2",
        "description": "Proof of Identity (Passport/ID card)",
        "maxLength": 5242880,
        "contentEncoding": "relative",
        "format": "base64"
       }
      }
     }
    }
   }
  }
 }
}
UPDATE_USER_PROFILE {
  allSuccess: true,
  successfulResponses: [
    {
      statusCode: 200,
      errorMsg: null,
      callback_uuid: null,
      serviceResponse: {
        "exchange-kyc-status": "pending",
        "message": null,
        "result": true,
        "user_id": "8076EDDE-132F-40C2-A642-8FF11F2A27FD",
        "client_user_id": "409a10a8-4497-4006-94c1-7ed1c994ef41",
        "group_id": "30B464C0-8E02-4A16-AF49-6AADD7EBAAE8",
        "group_name": null,
        "business_unit_name": null,
        "business_unit_id": null,
        "broker_name": null,
        "broker_id": null,
        "profile": {
            "given_name": "George",
            "surname": "Smith",
            "phone_number": "02342334234",
            "date_of_birth": 781394400000,
            "street_address": "street ",
            "address1": null,
            "address2": null,
            "city": "city",
            "state": "state",
            "postal_code": "34234",
            "country": "United States",
            "affiliate_code": null,
            "email": null,
            "reasons_for_use": null,
            "expected_volume": null,
            "expected_transactions": null,
            "funds_source": null,
            "pep_compliance": null,
            "direct_affiliation": null,
            "occupation": null,
            "userid": "8076EDDE-132F-40C2-A642-8FF11F2A27FD",
            "ssn": "4455",
            "question_1": null,
            "question_2": null,
            "question_3": null,
            "question_4": null,
            "tax_id_number": null,
            "id_number": null,
            "birthplace": null,
            "number": null,
            "floor": null,
            "marital_status": null,
            "nationality": null,
            "document": null,
            "document1": "files/8076EDDE-132F-40C2-A642-8FF11F2A27FD/979ea6df-0445-4910-9583-0deed7a2462c.png",
            "document1_description": null,
            "document1_title": null,
            "document1_type": null,
            "document1_other_type": null,
            "document_1": null,
            "document2": "",
            "document2_description": null,
            "document2_title": null,
            "document2_type": null,
            "document2_other_type": null,
            "document_2": null,
            "document3": null,
            "document3_description": null,
            "document3_title": null,
            "document3_type": null,
            "document3_other_type": null,
            "document_3": null,
            "document4": null,
            "document4_description": null,
            "document4_title": null,
            "document4_type": null,
            "document4_other_type": null,
            "document_4": null
        }
    }
  ],
  responsesWithError: []
}
*/
