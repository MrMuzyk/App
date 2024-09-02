import React from 'react';
import {View} from 'react-native';
import {useOnyx} from 'react-native-onyx';
import Button from '@components/Button';
import * as Expensicons from '@components/Icon/Expensicons';
import MenuItem from '@components/MenuItem';
import MenuItemWithTopDescription from '@components/MenuItemWithTopDescription';
import SafeAreaConsumer from '@components/SafeAreaConsumer';
import ScrollView from '@components/ScrollView';
import Text from '@components/Text';
import useLocalize from '@hooks/useLocalize';
import useNetwork from '@hooks/useNetwork';
import useThemeStyles from '@hooks/useThemeStyles';
import getValuesForOwner from '@pages/ReimbursementAccount/NonUSD/utils/getValuesForOwner';
import CONST from '@src/CONST';
import ONYXKEYS from '@src/ONYXKEYS';
import INPUT_IDS from '@src/types/form/NonUSDReimbursementAccountForm';

type OwnersListProps = {
    /** Method called when user confirms data */
    handleConfirmation: () => void;

    /** Method called when user presses on one of owners to edit its data */
    handleOwnerEdit: (value: string) => void;

    /** Method called when user presses on ownership chart push row */
    handleOwnershipChartEdit: () => void;

    /** List of owner keys */
    ownerKeys: string[];
};

function OwnersList({handleConfirmation, ownerKeys, handleOwnerEdit, handleOwnershipChartEdit}: OwnersListProps) {
    const {translate} = useLocalize();
    const styles = useThemeStyles();
    const {isOffline} = useNetwork();

    const [nonUSDReimbursementAccountDraft] = useOnyx(ONYXKEYS.FORMS.NON_USD_REIMBURSEMENT_ACCOUNT_FORM_DRAFT);
    const ownershipChartValue = nonUSDReimbursementAccountDraft?.[INPUT_IDS.OWNERSHIP_INFO_STEP.ENTITY_CHART] ?? '';

    const [reimbursementAccount] = useOnyx(ONYXKEYS.REIMBURSEMENT_ACCOUNT);
    const policyID = reimbursementAccount?.achData?.policyID ?? '-1';
    const [policy] = useOnyx(`${ONYXKEYS.COLLECTION.POLICY}${policyID}`);
    const currency = policy?.outputCurrency ?? '';

    const owners =
        nonUSDReimbursementAccountDraft &&
        ownerKeys.map((ownerKey) => {
            const ownerData = getValuesForOwner(ownerKey, nonUSDReimbursementAccountDraft);

            return (
                <MenuItem
                    key={ownerKey}
                    title={`${ownerData.firstName} ${ownerData.lastName}`}
                    description={`${ownerData.street}, ${ownerData.city}, ${ownerData.state} ${ownerData.zipCode}`}
                    wrapperStyle={[styles.ph5]}
                    icon={Expensicons.FallbackAvatar}
                    iconType={CONST.ICON_TYPE_AVATAR}
                    onPress={() => {
                        handleOwnerEdit(ownerKey);
                    }}
                    iconWidth={40}
                    iconHeight={40}
                    interactive
                    shouldShowRightIcon
                    displayInDefaultIconColor
                />
            );
        });

    return (
        <SafeAreaConsumer>
            {({safeAreaPaddingBottomStyle}) => (
                <ScrollView
                    style={styles.pt0}
                    contentContainerStyle={[styles.flexGrow1, styles.ph0, safeAreaPaddingBottomStyle]}
                >
                    <Text style={[styles.textHeadlineLineHeightXXL, styles.ph5]}>{translate('beneficialOwnerInfoStep.letsDoubleCheck')}</Text>
                    <Text style={[styles.p5, styles.textSupporting]}>{translate('beneficialOwnerInfoStep.regulationRequiresUsToVerifyTheIdentity')}</Text>
                    {owners && (
                        <View>
                            <Text style={[styles.textSupporting, styles.pv1, styles.ph5]}>{`${translate('beneficialOwnerInfoStep.owners')}:`}</Text>
                            {owners}
                        </View>
                    )}
                    {currency === CONST.CURRENCY.AUD && (
                        <MenuItemWithTopDescription
                            description={translate('ownershipInfoStep.certified')}
                            title={ownershipChartValue}
                            shouldShowRightIcon
                            onPress={handleOwnershipChartEdit}
                            style={[styles.mt8]}
                        />
                    )}
                    <View style={styles.mtAuto}>
                        <Button
                            success
                            large
                            isDisabled={isOffline}
                            style={[styles.w100, styles.mt2, styles.pb5, styles.ph5]}
                            onPress={handleConfirmation}
                            text={translate('common.confirm')}
                        />
                    </View>
                </ScrollView>
            )}
        </SafeAreaConsumer>
    );
}

OwnersList.displayName = 'OwnersList';

export default OwnersList;
