import React, {useCallback, useMemo, useState} from 'react';
import {View} from 'react-native';
import {useOnyx} from 'react-native-onyx';
import FormProvider from '@components/Form/FormProvider';
import InputWrapper from '@components/Form/InputWrapper';
import type {FormInputErrors, FormOnyxKeys, FormOnyxValues} from '@components/Form/types';
import PushRowWithModal from '@components/PushRowWithModal';
import Text from '@components/Text';
import TextInput from '@components/TextInput';
import useLocalize from '@hooks/useLocalize';
import useReimbursementAccountStepFormSubmit from '@hooks/useReimbursementAccountStepFormSubmit';
import useThemeStyles from '@hooks/useThemeStyles';
import type {BankInfoSubStepProps} from '@pages/ReimbursementAccount/NonUSD/BankInfo/types';
import getSubstepValues from '@pages/ReimbursementAccount/utils/getSubstepValues';
import * as FormActions from '@userActions/FormActions';
import CONST from '@src/CONST';
import ONYXKEYS from '@src/ONYXKEYS';
import type {ReimbursementAccountForm} from '@src/types/form/ReimbursementAccountForm';
import INPUT_IDS from '@src/types/form/ReimbursementAccountForm';

const {ACCOUNT_HOLDER_COUNTRY} = INPUT_IDS.ADDITIONAL_DATA;

function AccountHolderDetails({onNext, isEditing, corpayFields}: BankInfoSubStepProps) {
    const {translate} = useLocalize();
    const styles = useThemeStyles();

    const accountHolderDetailsFields = useMemo(() => {
        return corpayFields.filter((field) => field.id.includes(CONST.NON_USD_BANK_ACCOUNT.BANK_INFO_STEP_ACCOUNT_HOLDER_KEY_PREFIX));
    }, [corpayFields]);
    const fieldIds = accountHolderDetailsFields.map((field) => field.id);

    const subStepKeys = accountHolderDetailsFields.reduce((acc, field) => {
        acc[field.id] = field.id;
        return acc;
    }, {} as Record<keyof ReimbursementAccountForm, keyof ReimbursementAccountForm>);

    const [reimbursementAccount] = useOnyx(ONYXKEYS.REIMBURSEMENT_ACCOUNT);
    const [reimbursementAccountDraft] = useOnyx(ONYXKEYS.FORMS.REIMBURSEMENT_ACCOUNT_FORM_DRAFT);
    const defaultValues = useMemo(() => getSubstepValues(subStepKeys, reimbursementAccountDraft, reimbursementAccount), [subStepKeys, reimbursementAccount, reimbursementAccountDraft]);

    const [selectedCountry, setSelectedCountry] = useState<string>(defaultValues[ACCOUNT_HOLDER_COUNTRY]);

    const handleSubmit = useReimbursementAccountStepFormSubmit({
        fieldIds: fieldIds as Array<FormOnyxKeys<typeof ONYXKEYS.FORMS.REIMBURSEMENT_ACCOUNT_FORM>>,
        onNext,
        shouldSaveDraft: isEditing,
    });

    const handleSelectingCountry = (country: string) => {
        FormActions.setDraftValues(ONYXKEYS.FORMS.REIMBURSEMENT_ACCOUNT_FORM, {accountHolderCountry: country});
        setSelectedCountry(country);
    };

    const validate = useCallback(
        (values: FormOnyxValues<typeof ONYXKEYS.FORMS.REIMBURSEMENT_ACCOUNT_FORM>): FormInputErrors<typeof ONYXKEYS.FORMS.REIMBURSEMENT_ACCOUNT_FORM> => {
            const errors: FormInputErrors<typeof ONYXKEYS.FORMS.REIMBURSEMENT_ACCOUNT_FORM> = {};

            accountHolderDetailsFields.forEach((field) => {
                const fieldID = field.id as keyof FormOnyxValues<typeof ONYXKEYS.FORMS.REIMBURSEMENT_ACCOUNT_FORM>;

                if (field.isRequired && !values[fieldID]) {
                    errors[fieldID] = translate('common.error.fieldRequired');
                }

                field.validationRules.forEach((rule) => {
                    if (!rule.regEx) {
                        return;
                    }

                    if (new RegExp(rule.regEx).test(values[fieldID] ? String(values[fieldID]) : '')) {
                        return;
                    }

                    errors[fieldID] = rule.errorMessage;
                });
            });

            return errors;
        },
        [accountHolderDetailsFields, translate],
    );

    const inputs = useMemo(() => {
        return accountHolderDetailsFields.map((field) => {
            if (field.id === 'accountHolderCountry') {
                return (
                    <View
                        style={[styles.mb6, styles.mhn5]}
                        key={field.id}
                    >
                        <InputWrapper
                            InputComponent={PushRowWithModal}
                            optionsList={CONST.ALL_COUNTRIES}
                            selectedOption={selectedCountry}
                            onOptionChange={handleSelectingCountry}
                            description={field.label}
                            modalHeaderTitle={translate('countryStep.selectCountry')}
                            searchInputTitle={translate('countryStep.findCountry')}
                            value={selectedCountry}
                            inputID={field.id}
                        />
                    </View>
                );
            }

            return (
                <View
                    style={[styles.flex2, styles.mb6]}
                    key={field.id}
                >
                    <InputWrapper
                        InputComponent={TextInput}
                        inputID={field.id}
                        label={field.label}
                        aria-label={field.label}
                        role={CONST.ROLE.PRESENTATION}
                        defaultValue={String(defaultValues[field.id]) ?? ''}
                        shouldSaveDraft={!isEditing}
                    />
                </View>
            );
        });
    }, [accountHolderDetailsFields, styles.flex2, styles.mb6, styles.mhn5, defaultValues, isEditing, selectedCountry, translate]);

    return (
        <FormProvider
            formID={ONYXKEYS.FORMS.REIMBURSEMENT_ACCOUNT_FORM}
            submitButtonText={translate(isEditing ? 'common.confirm' : 'common.next')}
            validate={validate}
            onSubmit={handleSubmit}
            style={[styles.mh5, styles.flexGrow1]}
        >
            <View>
                <Text style={[styles.textHeadlineLineHeightXXL, styles.mb6]}>{translate('bankInfoStep.whatAreYour')}</Text>
                {inputs}
            </View>
        </FormProvider>
    );
}

AccountHolderDetails.displayName = 'AccountHolderDetails';

export default AccountHolderDetails;
