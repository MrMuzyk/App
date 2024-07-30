import React from 'react';
import ConnectionLayout from '@components/ConnectionLayout';
import MenuItemWithTopDescription from '@components/MenuItemWithTopDescription';
import useLocalize from '@hooks/useLocalize';
import useThemeStyles from '@hooks/useThemeStyles';
import * as Connections from '@libs/actions/connections';
import * as ErrorUtils from '@libs/ErrorUtils';
import {settingsPendingAction} from '@libs/PolicyUtils';
import type {WithPolicyProps} from '@pages/workspace/withPolicy';
import withPolicyConnections from '@pages/workspace/withPolicyConnections';
import ToggleSettingOptionRow from '@pages/workspace/workflows/ToggleSettingsOptionRow';
import * as Policy from '@userActions/Policy/Policy';
import CONST from '@src/CONST';

function QuickbooksClassesPage({policy}: WithPolicyProps) {
    const {translate} = useLocalize();
    const styles = useThemeStyles();
    const policyID = policy?.id ?? '-1';
    const qboConfig = policy?.connections?.quickbooksOnline?.config;
    const isSwitchOn = !!(qboConfig?.syncClasses && qboConfig.syncClasses !== CONST.INTEGRATION_ENTITY_MAP_TYPES.NONE);
    const isReportFieldsSelected = qboConfig?.syncClasses === CONST.INTEGRATION_ENTITY_MAP_TYPES.REPORT_FIELD;

    return (
        <ConnectionLayout
            displayName={QuickbooksClassesPage.displayName}
            headerTitle="workspace.qbo.classes"
            title="workspace.qbo.classesDescription"
            accessVariants={[CONST.POLICY.ACCESS_VARIANTS.ADMIN]}
            policyID={policyID}
            featureName={CONST.POLICY.MORE_FEATURES.ARE_CONNECTIONS_ENABLED}
            contentContainerStyle={[styles.pb2, styles.ph5]}
            connectionName={CONST.POLICY.CONNECTIONS.NAME.QBO}
        >
            <ToggleSettingOptionRow
                title={translate('workspace.accounting.import')}
                switchAccessibilityLabel={translate('workspace.qbo.classes')}
                isActive={isSwitchOn}
                onToggle={() =>
                    Connections.updatePolicyConnectionConfig(
                        policyID,
                        CONST.POLICY.CONNECTIONS.NAME.QBO,
                        CONST.QUICKBOOKS_CONFIG.SYNC_CLASSES,
                        isSwitchOn ? CONST.INTEGRATION_ENTITY_MAP_TYPES.NONE : CONST.INTEGRATION_ENTITY_MAP_TYPES.TAG,
                    )
                }
                subMenuItems={
                    <MenuItemWithTopDescription
                        interactive={false}
                        title={isReportFieldsSelected ? translate('workspace.common.reportFields') : translate('workspace.common.tags')}
                        description={translate('workspace.common.displayedAs')}
                        wrapperStyle={styles.sectionMenuItemTopDescription}
                    />
                }
                pendingAction={settingsPendingAction([CONST.QUICKBOOKS_CONFIG.SYNC_CLASSES], qboConfig?.pendingFields)}
                errors={ErrorUtils.getLatestErrorField(qboConfig ?? {}, CONST.QUICKBOOKS_CONFIG.SYNC_CLASSES)}
                onCloseError={() => Policy.clearQBOErrorField(policyID, CONST.QUICKBOOKS_CONFIG.SYNC_CLASSES)}
            />
        </ConnectionLayout>
    );
}

QuickbooksClassesPage.displayName = 'QuickbooksClassesPage';

export default withPolicyConnections(QuickbooksClassesPage);
