import React from 'react';
import {useOnyx} from 'react-native-onyx';
import FormProvider from '@components/Form/FormProvider';
import InputWrapper from '@components/Form/InputWrapper';
import Text from '@components/Text';
import TextInput from '@components/TextInput';
import useLocalize from '@hooks/useLocalize';
import useThemeStyles from '@hooks/useThemeStyles';
import CONST from '@src/CONST';
import ONYXKEYS from '@src/ONYXKEYS';
import INPUT_IDS from '@src/types/form/NonUSDReimbursementAccountForm';

type EnterEmailProps = {
    onSubmit: () => void;

    isUserDirector: boolean;
};

const SIGNER_INFO_STEP_KEY = INPUT_IDS.SIGNER_INFO_STEP;

function EnterEmail({onSubmit, isUserDirector}: EnterEmailProps) {
    const {translate} = useLocalize();
    const styles = useThemeStyles();

    const [reimbursementAccount] = useOnyx(ONYXKEYS.REIMBURSEMENT_ACCOUNT);
    const policyID = reimbursementAccount?.achData?.policyID ?? '-1';
    const [policy] = useOnyx(`${ONYXKEYS.COLLECTION.POLICY}${policyID}`);
    const currency = policy?.outputCurrency ?? '';

    const isAUDAccount = currency === 'AUD';
    const shouldGatherBothEmails = isAUDAccount && !isUserDirector;

    return (
        <FormProvider
            formID={ONYXKEYS.FORMS.NON_USD_REIMBURSEMENT_ACCOUNT_FORM}
            submitButtonText={translate('common.next')}
            onSubmit={onSubmit}
            style={[styles.mh5, styles.flexGrow1]}
        >
            <Text style={[styles.textHeadlineLineHeightXXL]}>{translate(isAUDAccount ? 'signerInfoStep.enterTwoEmails' : 'signerInfoStep.enterOneEmail')}</Text>
            <InputWrapper
                InputComponent={TextInput}
                label={shouldGatherBothEmails ? `${translate('common.email')} 1` : translate('common.email')}
                aria-label={shouldGatherBothEmails ? `${translate('common.email')} 1` : translate('common.email')}
                role={CONST.ROLE.PRESENTATION}
                inputID={SIGNER_INFO_STEP_KEY.DIRECTOR_EMAIL_ADDRESS}
                containerStyles={[styles.mt6]}
            />
            {shouldGatherBothEmails && (
                <InputWrapper
                    InputComponent={TextInput}
                    label={`${translate('common.email')} 2`}
                    aria-label={`${translate('common.email')} 2`}
                    role={CONST.ROLE.PRESENTATION}
                    inputID={SIGNER_INFO_STEP_KEY.SECOND_DIRECTOR_EMAIL_ADDRESS}
                    containerStyles={[styles.mt6]}
                />
            )}
        </FormProvider>
    );
}

EnterEmail.displayName = 'EnterEmail';

export default EnterEmail;
