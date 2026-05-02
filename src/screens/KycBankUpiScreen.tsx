import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { FC } from 'react';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import type { RootStackParamList } from '../navigation/types';
import { KycStepChrome } from '../components/KycStepChrome';
import {
  AppCard,
  FormField,
  KycDeliveryOutlineButton,
  KycDeliveryPrimaryButton,
  SectionTitle,
  SegmentedTabs,
  Tag,
} from '../components/ui';
import { colors } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'KycBankUpi'>;

/**
 * Spec #17 — KYC 10 Bank / UPI payouts.
 */
export const KycBankUpiScreen: FC<Props> = ({ navigation }) => {
  const [tab, setTab] = useState<'bank' | 'upi'>('bank');
  const [holder, setHolder] = useState('Arjun Mehta');
  const [acct, setAcct] = useState('');
  const [acctConfirm, setAcctConfirm] = useState('');
  const [ifsc, setIfsc] = useState('HDFC0001234');
  const [bankName, setBankName] = useState('HDFC Bank');
  const [upi, setUpi] = useState('');
  const [verified, setVerified] = useState(false);

  const fetchBank = () => {
    if (ifsc.toUpperCase().startsWith('HDFC')) setBankName('HDFC Bank');
    else setBankName('Demo Bank Ltd.');
  };

  return (
    <KycStepChrome
      step={10}
      title="Payouts"
      subtitle="Where your earnings will be credited"
      onBack={() => navigation.goBack()}
      footer={
        <KycDeliveryPrimaryButton
          label="Submit for verification"
          onPress={() => navigation.navigate('KycStatus')}
        />
      }
    >
      <SegmentedTabs
        options={[
          { id: 'bank', label: 'Bank account' },
          { id: 'upi', label: 'UPI' },
        ]}
        value={tab}
        onChange={setTab}
      />

      {tab === 'bank' ? (
        <View style={{ gap: 16, width: '100%' }}>
          <FormField
            label="Account holder name"
            value={holder}
            onChangeText={setHolder}
          />
          <FormField
            label="Account number"
            value={acct}
            onChangeText={setAcct}
            keyboardType="number-pad"
            placeholder="As on passbook"
            secureTextEntry
          />
          <FormField
            label="Confirm account number"
            value={acctConfirm}
            onChangeText={setAcctConfirm}
            keyboardType="number-pad"
            error={
              acctConfirm.length > 0 && acct !== acctConfirm
                ? 'Account numbers do not match'
                : undefined
            }
          />
          <FormField
            label="IFSC code"
            value={ifsc}
            onChangeText={setIfsc}
            autoCapitalize="characters"
            onBlur={fetchBank}
          />
          <AppCard tone="tinted" style={styles.bankPreview}>
            <View style={styles.bankRow}>
              <View style={styles.bankIcon}>
                <Ionicons name="business" size={18} color={colors.primary} />
              </View>
              <SectionTitle title={bankName} caption="Verified by IFSC" />
            </View>
          </AppCard>
        </View>
      ) : (
        <View style={{ gap: 16, width: '100%' }}>
          <FormField
            label="UPI ID"
            value={upi}
            onChangeText={setUpi}
            placeholder="name@paytm"
            autoCapitalize="none"
          />
          <KycDeliveryOutlineButton
            label={verified ? 'Verified' : 'Verify UPI'}
            onPress={() => setVerified(true)}
            disabled={verified}
            leftIcon={
              verified ? (
                <Ionicons name="checkmark-done" size={18} color={colors.success} />
              ) : null
            }
          />
          {verified ? (
            <AppCard tone="tinted">
              <View style={styles.bankRow}>
                <Tag label="Verified" tone="success" />
                <SectionTitle
                  title={`Holder: ${holder}`}
                  caption="Funds will be sent here"
                />
              </View>
            </AppCard>
          ) : null}
        </View>
      )}
    </KycStepChrome>
  );
};

const styles = StyleSheet.create({
  bankPreview: {
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#d3d3d3',
  },
  bankRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  bankIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
