import type {Country} from '@src/CONST';
import type DeepValueOf from '@src/types/utils/DeepValueOf';
import type Form from './Form';

const INPUT_IDS = {
    COUNTRY_STEP: {
        COUNTRY: 'country',
    },
    BANK_INFO_STEP: {
        ACCOUNT_HOLDER_NAME: 'accountHolderName',
        ACCOUNT_NUMBER: 'accountNumber',
        ROUTING_CODE: 'routingCode',
        SWIFT_BIC_CODE: 'swiftBicCode',
        IBAN: 'iban',
        ACCOUNT_HOLDER_COUNTRY: 'accountHolderCountry',
        ACCOUNT_HOLDER_REGION: 'accountHolderRegion',
        ACCOUNT_HOLDER_ADDRESS_LINE1: 'accountHolderAddress1',
        ACCOUNT_HOLDER_ADDRESS_LINE2: 'accountHolderAddress2',
        ACCOUNT_HOLDER_CITY: 'accountHolderCity',
        ACCOUNT_HOLDER_POSTAL_CODE: 'accountHolderPostal',
        ACCOUNT_HOLDER_PHONE: 'accountHolderPhoneNumber',
        ACCOUNT_HOLDER_EMAIL: 'accountHolderEmail',
        BANK_STATEMENT: 'bankStatement',
    },
    BUSINESS_INFO_STEP: {
        NAME: 'companyName',
        STREET: 'street',
        CITY: 'city',
        STATE: 'state',
        ZIP_CODE: 'zipCode',
        COUNTRY: 'country',
        PHONE: 'businessContactNumber',
        REGISTRATION_NUMBER: 'businessRegistrationIncorporationNumber',
        BUSINESS_TYPE: 'applicantType',
        BUSINESS_CATEGORY: 'natureOfBusiness',
        PAYMENT_VOLUME: 'annualVolume',
    },
    OWNERSHIP_INFO_STEP: {
        OWNS_MORE_THAN_25_PERCENT: 'ownsMoreThan25Percent',
        HAS_OTHER_BENEFICIAL_OWNERS: 'hasOtherBeneficialOwners',
        ENTITY_CHART: 'entityChart',
        BENEFICIAL_OWNERS: 'beneficialOwners',
        OWNED_PERCENTAGE: 'ownedPercentage',
        FIRST_NAME: 'firstName',
        LAST_NAME: 'lastName',
        DOB: 'dob',
        STREET: 'street',
        CITY: 'city',
        STATE: 'state',
        ZIP_CODE: 'zipCode',
        COUNTRY: 'country',
        SSN_LAST_4: 'ssnLast4',
    },
    SIGNER_INFO_STEP: {
        IS_DIRECTOR: 'isDirector',
        FIRST_NAME: 'firstName',
        LAST_NAME: 'lastName',
        JOB_TITLE: 'jobTitle',
        DOB: 'dob',
        ID: 'id',
        PROOF_OF_ADDRESS: 'proofOfAddress',
        DIRECTOR_EMAIL_ADDRESS: 'directorEmailAddress',
        SECOND_DIRECTOR_EMAIL_ADDRESS: 'secondDirectorEmailAddress',
        DIRECTORS: 'directors',
    },
    AGREEMENT_STEP: {
        AUTHORIZED: 'authorized',
        CERTIFY: 'certify',
        TERMS: 'terms',
    },
} as const;

type InputID = DeepValueOf<typeof INPUT_IDS>;

type CountryStep = {
    [INPUT_IDS.COUNTRY_STEP.COUNTRY]: Country | '';
};

type BankInfoStep = {
    [INPUT_IDS.BANK_INFO_STEP.ACCOUNT_HOLDER_NAME]: string;
    [INPUT_IDS.BANK_INFO_STEP.ACCOUNT_NUMBER]: string;
    [INPUT_IDS.BANK_INFO_STEP.ROUTING_CODE]: string;
    [INPUT_IDS.BANK_INFO_STEP.SWIFT_BIC_CODE]: string;
    [INPUT_IDS.BANK_INFO_STEP.IBAN]: string;
    [INPUT_IDS.BANK_INFO_STEP.ACCOUNT_HOLDER_COUNTRY]: string;
    [INPUT_IDS.BANK_INFO_STEP.ACCOUNT_HOLDER_REGION]: string;
    [INPUT_IDS.BANK_INFO_STEP.ACCOUNT_HOLDER_ADDRESS_LINE1]: string;
    [INPUT_IDS.BANK_INFO_STEP.ACCOUNT_HOLDER_ADDRESS_LINE2]: string;
    [INPUT_IDS.BANK_INFO_STEP.ACCOUNT_HOLDER_CITY]: string;
    [INPUT_IDS.BANK_INFO_STEP.ACCOUNT_HOLDER_POSTAL_CODE]: string;
    [INPUT_IDS.BANK_INFO_STEP.ACCOUNT_HOLDER_PHONE]: string;
    [INPUT_IDS.BANK_INFO_STEP.ACCOUNT_HOLDER_EMAIL]: string;
    [INPUT_IDS.BANK_INFO_STEP.BANK_STATEMENT]: string;
};

type BusinessInfoStep = {
    [INPUT_IDS.BUSINESS_INFO_STEP.NAME]: string;
    [INPUT_IDS.BUSINESS_INFO_STEP.STREET]: string;
    [INPUT_IDS.BUSINESS_INFO_STEP.CITY]: string;
    [INPUT_IDS.BUSINESS_INFO_STEP.STATE]: string;
    [INPUT_IDS.BUSINESS_INFO_STEP.ZIP_CODE]: string;
    [INPUT_IDS.BUSINESS_INFO_STEP.COUNTRY]: Country;
    [INPUT_IDS.BUSINESS_INFO_STEP.PHONE]: string;
    [INPUT_IDS.BUSINESS_INFO_STEP.REGISTRATION_NUMBER]: string;
    [INPUT_IDS.BUSINESS_INFO_STEP.BUSINESS_TYPE]: string;
    [INPUT_IDS.BUSINESS_INFO_STEP.BUSINESS_CATEGORY]: string;
    [INPUT_IDS.BUSINESS_INFO_STEP.PAYMENT_VOLUME]: string;
};

type OwnershipInfoStep = {
    [INPUT_IDS.OWNERSHIP_INFO_STEP.OWNS_MORE_THAN_25_PERCENT]: boolean;
    [INPUT_IDS.OWNERSHIP_INFO_STEP.HAS_OTHER_BENEFICIAL_OWNERS]: boolean;
    [INPUT_IDS.OWNERSHIP_INFO_STEP.BENEFICIAL_OWNERS]: string;
    [INPUT_IDS.OWNERSHIP_INFO_STEP.ENTITY_CHART]: string;

    [INPUT_IDS.OWNERSHIP_INFO_STEP.OWNED_PERCENTAGE]: string;
    [INPUT_IDS.OWNERSHIP_INFO_STEP.FIRST_NAME]: string;
    [INPUT_IDS.OWNERSHIP_INFO_STEP.LAST_NAME]: string;
    [INPUT_IDS.OWNERSHIP_INFO_STEP.DOB]: string;
    [INPUT_IDS.OWNERSHIP_INFO_STEP.STREET]: string;
    [INPUT_IDS.OWNERSHIP_INFO_STEP.CITY]: string;
    [INPUT_IDS.OWNERSHIP_INFO_STEP.STATE]: string;
    [INPUT_IDS.OWNERSHIP_INFO_STEP.ZIP_CODE]: string;
    [INPUT_IDS.OWNERSHIP_INFO_STEP.COUNTRY]: Country;
    [INPUT_IDS.OWNERSHIP_INFO_STEP.SSN_LAST_4]: string;
};

type SignerInfoStep = {
    [INPUT_IDS.SIGNER_INFO_STEP.IS_DIRECTOR]: boolean;
    [INPUT_IDS.SIGNER_INFO_STEP.DIRECTORS]: string;
    [INPUT_IDS.SIGNER_INFO_STEP.DIRECTOR_EMAIL_ADDRESS]: string;
    [INPUT_IDS.SIGNER_INFO_STEP.SECOND_DIRECTOR_EMAIL_ADDRESS]: string;

    [INPUT_IDS.SIGNER_INFO_STEP.FIRST_NAME]: string;
    [INPUT_IDS.SIGNER_INFO_STEP.LAST_NAME]: string;
    [INPUT_IDS.SIGNER_INFO_STEP.JOB_TITLE]: string;
    [INPUT_IDS.SIGNER_INFO_STEP.DOB]: string;
    [INPUT_IDS.SIGNER_INFO_STEP.ID]: string;
    [INPUT_IDS.SIGNER_INFO_STEP.PROOF_OF_ADDRESS]: string;
};

type AgreementStep = {
    [INPUT_IDS.AGREEMENT_STEP.AUTHORIZED]: boolean;
    [INPUT_IDS.AGREEMENT_STEP.CERTIFY]: boolean;
    [INPUT_IDS.AGREEMENT_STEP.TERMS]: boolean;
};

type NonUSDReimbursementAccountForm = Form<InputID, CountryStep & BankInfoStep & BusinessInfoStep & OwnershipInfoStep & SignerInfoStep & AgreementStep>;

export type {NonUSDReimbursementAccountForm, CountryStep, BankInfoStep, BusinessInfoStep, OwnershipInfoStep, SignerInfoStep, AgreementStep, InputID};
export default INPUT_IDS;
