import React, {useCallback, useState} from 'react';
import {useOnyx} from 'react-native-onyx';
import FormProvider from '@components/Form/FormProvider';
import InputWrapper from '@components/Form/InputWrapper';
import type {FormInputErrors, FormOnyxValues} from '@components/Form/types';
import PushRowWithModal from '@components/PushRowWithModal';
import Text from '@components/Text';
import useLocalize from '@hooks/useLocalize';
import useNonUSDReimbursementAccountStepFormSubmit from '@hooks/useNonUSDReimbursementAccountStepFormSubmit';
import type {SubStepProps} from '@hooks/useSubStep/types';
import useThemeStyles from '@hooks/useThemeStyles';
import * as ValidationUtils from '@libs/ValidationUtils';
import {annualVolumeRange} from '@pages/ReimbursementAccount/NonUSD/BusinessInfo/mockedCorpayLists';
import * as FormActions from '@userActions/FormActions';
import CONST from '@src/CONST';
import ONYXKEYS from '@src/ONYXKEYS';
import INPUT_IDS from '@src/types/form/NonUSDReimbursementAccountForm';

type PaymentVolumeProps = SubStepProps;

const {PAYMENT_VOLUME} = INPUT_IDS.BUSINESS_INFO_STEP;
const STEP_FIELDS = [PAYMENT_VOLUME];

function PaymentVolume({onNext, isEditing}: PaymentVolumeProps) {
    const {translate} = useLocalize();
    const styles = useThemeStyles();
    const [nonUSDReimbursementAccountDraft] = useOnyx(ONYXKEYS.FORMS.NON_USD_REIMBURSEMENT_ACCOUNT_FORM_DRAFT);

    const annualVolumeDefaultValue = nonUSDReimbursementAccountDraft?.[PAYMENT_VOLUME] ?? '';

    const [selectedAnnualVolume, setSelectedAnnualVolume] = useState(annualVolumeDefaultValue);

    const handleSelectingAnnualVolume = (paymentVolume: string) => {
        FormActions.setDraftValues(ONYXKEYS.FORMS.NON_USD_REIMBURSEMENT_ACCOUNT_FORM, {[PAYMENT_VOLUME]: paymentVolume});
        setSelectedAnnualVolume(paymentVolume);
    };

    const validate = useCallback(
        (values: FormOnyxValues<typeof ONYXKEYS.FORMS.NON_USD_REIMBURSEMENT_ACCOUNT_FORM>): FormInputErrors<typeof ONYXKEYS.FORMS.NON_USD_REIMBURSEMENT_ACCOUNT_FORM> => {
            return ValidationUtils.getFieldRequiredErrors(values, STEP_FIELDS);
        },
        [],
    );

    const handleSubmit = useNonUSDReimbursementAccountStepFormSubmit({
        fieldIds: STEP_FIELDS,
        onNext,
        shouldSaveDraft: isEditing,
    });

    const annualVolumeRangeListOptions = annualVolumeRange.reduce((accumulator, currentValue) => {
        accumulator[currentValue.name] = currentValue.stringValue;
        return accumulator;
    }, {} as Record<string, string>);

    return (
        <FormProvider
            formID={ONYXKEYS.FORMS.NON_USD_REIMBURSEMENT_ACCOUNT_FORM}
            submitButtonText={translate(isEditing ? 'common.confirm' : 'common.next')}
            onSubmit={handleSubmit}
            validate={validate}
            style={[styles.flexGrow1]}
            submitButtonStyles={[styles.mh5]}
        >
            <Text style={[styles.textHeadlineLineHeightXXL, styles.mh5, styles.mb3]}>{translate('businessInfoStep.whatsTheBusinessAnnualPayment')}</Text>
            <InputWrapper
                InputComponent={PushRowWithModal}
                optionsList={annualVolumeRangeListOptions}
                selectedOption={selectedAnnualVolume}
                onOptionChange={handleSelectingAnnualVolume}
                description={translate('businessInfoStep.annualPaymentVolumeInCurrency', {currencyCode: CONST.CURRENCY.USD})}
                modalHeaderTitle={translate('businessInfoStep.selectAnnualPaymentVolume')}
                searchInputTitle={translate('businessInfoStep.findAnnualPaymentVolume')}
                inputID={PAYMENT_VOLUME}
            />
        </FormProvider>
    );
}

PaymentVolume.displayName = 'PaymentVolume';

export default PaymentVolume;
