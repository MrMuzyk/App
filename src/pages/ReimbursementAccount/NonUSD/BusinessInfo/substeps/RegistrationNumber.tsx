import React from 'react';
import FormProvider from '@components/Form/FormProvider';
import InputWrapper from '@components/Form/InputWrapper';
import Text from '@components/Text';
import TextInput from '@components/TextInput';
import useLocalize from '@hooks/useLocalize';
import type {SubStepProps} from '@hooks/useSubStep/types';
import useThemeStyles from '@hooks/useThemeStyles';
import CONST from '@src/CONST';
import ONYXKEYS from '@src/ONYXKEYS';
import INPUT_IDS from '@src/types/form/NonUSDReimbursementAccountForm';

type RegistrationNumberProps = SubStepProps;

const BUSINESS_INFO_STEP_KEY = INPUT_IDS.BUSINESS_INFO_STEP;

function RegistrationNumber({onNext, isEditing}: RegistrationNumberProps) {
    const {translate} = useLocalize();
    const styles = useThemeStyles();

    const handleSubmit = () => {
        onNext();
    };

    return (
        <FormProvider
            formID={ONYXKEYS.FORMS.NON_USD_REIMBURSEMENT_ACCOUNT_FORM}
            submitButtonText={translate(isEditing ? 'common.confirm' : 'common.next')}
            onSubmit={handleSubmit}
            style={[styles.mh5, styles.flexGrow1]}
        >
            <Text style={[styles.textHeadlineLineHeightXXL]}>{translate('businessInfoStep.whatsTheBusinessRegistrationNumber')}</Text>
            <InputWrapper
                InputComponent={TextInput}
                label={translate('businessInfoStep.registrationNumber')}
                aria-label={translate('businessInfoStep.registrationNumber')}
                role={CONST.ROLE.PRESENTATION}
                inputID={BUSINESS_INFO_STEP_KEY.REGISTRATION_NUMBER}
                containerStyles={[styles.mt6]}
            />
        </FormProvider>
    );
}

RegistrationNumber.displayName = 'RegistrationNumber';

export default RegistrationNumber;
