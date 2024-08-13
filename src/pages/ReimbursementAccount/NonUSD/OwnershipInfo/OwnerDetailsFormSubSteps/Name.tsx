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

type NameProps = SubStepProps & {isUserEnteringHisOwnData: boolean};

const OWNERSHIP_INFO_STEP_KEY = INPUT_IDS.OWNERSHIP_INFO_STEP;

function Name({onNext, isEditing, isUserEnteringHisOwnData}: NameProps) {
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
            <Text style={[styles.textHeadlineLineHeightXXL]}>{translate(isUserEnteringHisOwnData ? 'ownershipInfoStep.whatsYourName' : 'ownershipInfoStep.whatsTheOwnersName')}</Text>
            <InputWrapper
                InputComponent={TextInput}
                label={translate('ownershipInfoStep.legalFirstName')}
                aria-label={translate('ownershipInfoStep.legalFirstName')}
                role={CONST.ROLE.PRESENTATION}
                inputID={OWNERSHIP_INFO_STEP_KEY.FIRST_NAME}
                containerStyles={[styles.mt6]}
                shouldSaveDraft={!isEditing}
            />
            <InputWrapper
                InputComponent={TextInput}
                label={translate('ownershipInfoStep.legalLastName')}
                aria-label={translate('ownershipInfoStep.legalLastName')}
                role={CONST.ROLE.PRESENTATION}
                inputID={OWNERSHIP_INFO_STEP_KEY.LAST_NAME}
                containerStyles={[styles.mt6]}
                shouldSaveDraft={!isEditing}
            />
        </FormProvider>
    );
}

Name.displayName = 'Name';

export default Name;
