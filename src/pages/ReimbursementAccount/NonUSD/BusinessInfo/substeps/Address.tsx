import React, {useState} from 'react';
import FormProvider from '@components/Form/FormProvider';
import PushRowWithModal from '@components/PushRowWithModal';
import Text from '@components/Text';
import useLocalize from '@hooks/useLocalize';
import type {SubStepProps} from '@hooks/useSubStep/types';
import useThemeStyles from '@hooks/useThemeStyles';
import AddressFormFields from '@pages/ReimbursementAccount/AddressFormFields';
import CONST from '@src/CONST';
import ONYXKEYS from '@src/ONYXKEYS';
import INPUT_IDS from '@src/types/form/NonUSDReimbursementAccountForm';

type NameProps = SubStepProps;

const BUSINESS_INFO_STEP_KEY = INPUT_IDS.BUSINESS_INFO_STEP;

const INPUT_KEYS = {
    street: BUSINESS_INFO_STEP_KEY.STREET,
    city: BUSINESS_INFO_STEP_KEY.CITY,
    state: BUSINESS_INFO_STEP_KEY.STATE,
    zipCode: BUSINESS_INFO_STEP_KEY.ZIP_CODE,
};
function Name({onNext, isEditing}: NameProps) {
    const {translate} = useLocalize();
    const styles = useThemeStyles();
    const [selectedCountry, setSelectedCountry] = useState('PL');

    const handleSubmit = () => {
        onNext();
    };

    return (
        <FormProvider
            formID={ONYXKEYS.FORMS.NON_USD_REIMBURSEMENT_ACCOUNT_FORM}
            submitButtonText={translate(isEditing ? 'common.confirm' : 'common.next')}
            onSubmit={handleSubmit}
            style={[styles.flexGrow1]}
            submitButtonStyles={[styles.mh5]}
        >
            <Text style={[styles.textHeadlineLineHeightXXL, styles.mh5]}>{translate('businessInfoStep.enterTheNameOfYourBusiness')}</Text>
            <AddressFormFields
                inputKeys={INPUT_KEYS}
                shouldSaveDraft={!isEditing}
                streetTranslationKey="common.companyAddress"
                containerStyles={[styles.mh5]}
            />
            <PushRowWithModal
                optionsList={CONST.ALL_COUNTRIES}
                selectedOption={selectedCountry}
                onOptionChange={setSelectedCountry}
                description={translate('common.country')}
                modalHeaderTitle={translate('countryStep.selectCountry')}
                searchInputTitle={translate('countryStep.findCountry')}
            />
        </FormProvider>
    );
}

Name.displayName = 'Name';

export default Name;
