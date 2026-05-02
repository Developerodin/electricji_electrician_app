import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { FC } from 'react';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import type { WholesaleStackParamList } from '../navigation/types';
import {
  AppButton,
  AppCard,
  BottomCtaBar,
  RadioRow,
  ScreenHeader,
  ScreenScaffold,
  SectionTitle,
} from '../components/ui';
import {
  colors,
  DESIGN_W,
  fonts,
  radii,
  scaleFont,
  spacing,
} from '../theme';

type Props = NativeStackScreenProps<WholesaleStackParamList, 'Checkout'>;

type Method = 'wallet' | 'upi' | 'paylater';

/**
 * Spec #45 — Checkout payment selection.
 */
export const CheckoutScreen: FC<Props> = ({ navigation }) => {
  const [method, setMethod] = useState<Method>('wallet');

  return (
    <ScreenScaffold>
      <ScreenHeader title="Checkout" onBack={() => navigation.goBack()} />
      <ScrollView
        contentContainerStyle={styles.body}
        showsVerticalScrollIndicator={false}
      >
        <SectionTitle title="Deliver to" />
        <AppCard>
          <View style={styles.row}>
            <View style={styles.iconWrap}>
              <Ionicons name="location" size={18} color={colors.primary} />
            </View>
            <View style={styles.col}>
              <Text style={styles.title}>Home — Andheri West</Text>
              <Text style={styles.meta}>
                Flat 502, Sunshine Apartments, Mumbai 400053
              </Text>
            </View>
            <Text style={styles.editLink}>Change</Text>
          </View>
        </AppCard>

        <SectionTitle title="Pay with" />
        <View style={styles.list}>
          <RadioRow
            label="Earnings wallet"
            description="Available ₹3,200 · used first"
            selected={method === 'wallet'}
            onPress={() => setMethod('wallet')}
          />
          <RadioRow
            label="UPI / Card"
            description="Razorpay (sandbox)"
            selected={method === 'upi'}
            onPress={() => setMethod('upi')}
          />
          <RadioRow
            label="Pay later · 30 days"
            description="Locked until 5 successful orders"
            selected={method === 'paylater'}
            onPress={() => setMethod('paylater')}
          />
        </View>

        <SectionTitle title="Order summary" />
        <AppCard padded={false}>
          <SummaryRow label="Subtotal" value="₹2,200" />
          <SummaryRow label="GST (18%)" value="₹396" />
          <SummaryRow label="Delivery" value="Free" tone="success" />
          <SummaryRow label="Total" value="₹2,596" strong />
        </AppCard>
      </ScrollView>
      <BottomCtaBar>
        <AppButton
          label="Place order · ₹2,596"
          onPress={() =>
            navigation.navigate('OrderConfirmation', { orderId: 'ORD-0421' })
          }
          block
        />
      </BottomCtaBar>
    </ScreenScaffold>
  );
};

const SummaryRow: FC<{
  label: string;
  value: string;
  strong?: boolean;
  tone?: 'success';
}> = ({ label, value, strong, tone }) => (
  <View style={[styles.summary, strong && styles.summaryStrong]}>
    <Text style={[styles.summaryLabel, strong && styles.summaryStrongText]}>
      {label}
    </Text>
    <Text
      style={[
        styles.summaryValue,
        strong && styles.summaryStrongText,
        tone === 'success' && styles.success,
      ]}
    >
      {value}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  body: {
    padding: spacing.lg,
    gap: spacing.md,
    paddingBottom: spacing.xxxl,
    alignSelf: 'center',
    width: '100%',
    maxWidth: DESIGN_W,
  },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: radii.md,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  col: { flex: 1, gap: 2 },
  title: {
    fontFamily: fonts.publicSemiBold,
    fontSize: scaleFont(14),
    color: colors.text,
  },
  meta: {
    fontFamily: fonts.publicRegular,
    fontSize: scaleFont(12.5),
    color: colors.muted,
  },
  editLink: {
    fontFamily: fonts.publicSemiBold,
    fontSize: scaleFont(13),
    color: colors.primary,
  },
  list: { gap: spacing.sm },
  summary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.borderLight,
  },
  summaryStrong: {
    borderBottomWidth: 0,
    backgroundColor: colors.primarySoft,
  },
  summaryLabel: {
    fontFamily: fonts.publicMedium,
    fontSize: scaleFont(13.5),
    color: colors.muted,
  },
  summaryValue: {
    fontFamily: fonts.publicSemiBold,
    fontSize: scaleFont(13.5),
    color: colors.text,
  },
  summaryStrongText: {
    fontFamily: fonts.publicBold,
    color: colors.primary,
    fontSize: scaleFont(15),
  },
  success: {
    color: colors.success,
  },
});
