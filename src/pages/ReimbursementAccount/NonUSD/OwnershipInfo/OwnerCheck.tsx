import React, {useMemo, useState} from 'react';
import FormProvider from '@components/Form/FormProvider';
import type {Choice} from '@components/RadioButtons';
import RadioButtons from '@components/RadioButtons';
import Text from '@components/Text';
import useLocalize from '@hooks/useLocalize';
import useThemeStyles from '@hooks/useThemeStyles';
import ONYXKEYS from '@src/ONYXKEYS';

type OwnerCheckProps = {
    /** The title of the question */
    title: string;

    /** The default value of the radio button */
    defaultValue: boolean;

    /** Callback when the value is selected */
    onSelectedValue: (value: boolean) => void;
};

function OwnerCheck({title, onSelectedValue, defaultValue}: OwnerCheckProps) {
    const {translate} = useLocalize();
    const styles = useThemeStyles();
    const [value, setValue] = useState(defaultValue);

    const handleSubmit = () => {
        onSelectedValue(value);
    };
    const handleSelectValue = (newValue: string) => setValue(newValue === 'true');
    const options = useMemo<Choice[]>(
        () => [
            {
                label: translate('common.yes'),
                value: 'true',
            },
            {
                label: translate('common.no'),
                value: 'false',
            },
        ],
        [translate],
    );

    return (
        <FormProvider
            formID={ONYXKEYS.FORMS.NON_USD_REIMBURSEMENT_ACCOUNT_FORM}
            submitButtonText={translate('common.confirm')}
            onSubmit={handleSubmit}
            style={[styles.mh5, styles.flexGrow1]}
        >
            <Text style={[styles.textHeadlineLineHeightXXL]}>{title}</Text>
            <Text style={[styles.pv3, styles.textSupporting]}>{translate('ownershipInfoStep.regulationsRequire')}</Text>
            <RadioButtons
                items={options}
                onPress={handleSelectValue}
                defaultCheckedValue={defaultValue.toString()}
                radioButtonStyle={[styles.mb6]}
            />
        </FormProvider>
    );
}

OwnerCheck.displayName = 'OwnerCheck';

export default OwnerCheck;
