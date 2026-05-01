import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { FC } from 'react';
import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import type { RootStackParamList } from '../navigation/types';
import { KycStepChrome } from '../components/KycStepChrome';
import {
  AppButton,
  AppCard,
  FormField,
  SectionTitle,
  SegmentedTabs,
  Tag,
} from '../components/ui';
import { colors, spacing } from '../theme';

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
        <AppButton
          label="Submit for verification"
          onPress={() => navigation.navigate('KycStatus')}
          block
        />
      }
    >
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
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
          <>
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
          </>
        ) : (
          <>
            <FormField
              label="UPI ID"
              value={upi}
              onChangeText={setUpi}
              placeholder="name@paytm"
              autoCapitalize="none"
            />
            <AppButton
              label={verified ? 'Verified' : 'Verify UPI'}
              variant={verified ? 'success' : 'primary'}
              onPress={() => setVerified(true)}
              leftIcon={
                verified ? (
                  <Ionicons name="checkmark-done" size={18} color={colors.white} />
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
          </>
        )}
      </ScrollView>
    </KycStepChrome>
  );
};

const styles = StyleSheet.create({
  scroll: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xxxl,
    gap: spacing.md,
  },
  bankPreview: {
    paddingVertical: spacing.md,
  },
  bankRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
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
