interface InputSchema {
  first_name: string;
  last_name: string;
  middle_name: string;
  gender: string;
  date_of_birth: string;
  tax_number: string;
  marital_status: string;
  study_qualification: string;
  email: string;
  affiliate_code: string;
  ssn: string;
  tax_id_number: string;
  id_number: string;

  primary_address_number: string;
  primary_postal_code: string;
  primary_region: string;
  primary_country: string;
  primary_city: string;
  birthplace: string;
  floor: string;

  secondary_address_street: string;
  secondary_address_number: string;
  secondary_postal_code: string;
  secondary_region: string;
  secondary_country: string;
  secondary_city: string;
  country_of_birth: string;
  birth_region: string;
  city_of_birth: string;
  citizenship: string;
  tax_country: string;
  formation_region: string;

  phone_number: string;
  number: string;
  sms: boolean;

  doc_expiration_date: string;
  doc_number: string;
  doc_release_date: string;
  doc_released_by: string;
  doc_type: string;
  document_1: string;
  document1_description: string;
  document1_title: string;
  document1_type: string;
  document1_other_type: string;
  document_1b: string;
  document_2: string;
  document2_description: string;
  document2_title: string;
  document2_type: string;
  document2_other_type: string;
  document_3: string;
  document3_description: string;
  document3_title: string;
  document3_type: string;
  document3_other_type: string;
  document_4: string;
  document4_description: string;
  document4_title: string;
  document4_type: string;
  document4_other_type: string;
  document_1_replace: string;
  document_2_replace: string;
  docs_as_array: string[];

  Sub_applicants: UserProfilePayload[];
  label: string;
  account_id: string;

  occupation: string;
  other_works: string;
  working_status: string;
  heritage_from_activities: string;
  heritage_value: string;
  yearly_income: string;
  yearly_income_from_activities: string;

  reasons_for_use: string;
  expected_volume: string;
  expected_transactions: string;
  funds_source: string;
  pep_compliance: string;
  direct_affiliation: string;
  dec_first_name: string;
  dec_last_name: string;
  person_type: string;
  provider_relation: string;
  role_type: string;
  question_1: string;
  question_2: string;
  question_3: string;
  question_4: string;
  nature_type: string;
  other_nature: string;
  reason_type: string;
  other_reason: string;

  currently_exposed_politically: boolean;
  exposed_last_year_politically: boolean;
  exposed_name_politically: string;
  has_familiar_exposed_politically: boolean;
};

export type UserProfilePayload = object | Record<any, Partial<InputSchema>>;
