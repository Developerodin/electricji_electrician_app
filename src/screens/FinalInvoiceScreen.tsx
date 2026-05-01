import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { FC } from 'react';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import type { JobsStackParamList } from '../navigation/types';
import { FloatingSosButton } from '../components/FloatingSosButton';
import {
  AppButton,
  AppCard,
  BottomCtaBar,
  ScreenHeader,
  ScreenScaffold,
  SectionTitle,
} from '../components/ui';
import { colors, fonts, radii, scaleFont, spacing } from '../theme';

type Props = NativeStackScreenProps<JobsStackParamList, 'FinalInvoice'>;

/**
 * Spec #29–30 — Invoice breakdown with summary card and send-for-approval flow.
 */
export const FinalInvoiceScreen: FC<Props> = ({ navigation }) => {
  const [busy, setBusy] = useState(false);

  const send = () => {
    setBusy(true);
    setTimeout(() => {
      setBusy(false);
      navigation.navigate('EndOtp');
    }, 1800);
  };

  return (
    <ScreenScaffold>
      <ScreenHeader title="Invoice" onBack={() => navigation.goBack()} />
      <ScrollView
        contentContainerStyle={styles.body}
        showsVerticalScrollIndicator={false}
      >
        <SectionTitle title="Customer" />
        <AppCard>
          <View style={styles.custRow}>
            <View style={styles.avatar}>
              <Text style={styles.avatarTxt}>R</Text>
            </View>
            <View style={styles.custCol}>
              <Text style={styles.custName}>Ravi Sharma</Text>
              <Text style={styles.custSub}>Fan repair · Andheri West</Text>
            </View>
            <Ionicons name="receipt-outline" size={20} color={colors.muted} />
          </View>
        </AppCard>

        <SectionTitle title="Invoice breakdown" />
        <AppCard>
          <Row label="Service charge" value="₹350" />
          <Row label="Parts" value="₹120" />
          <Row label="Surge bonus" value="+₹100" highlight />
          <View style={styles.divider} />
          <Row label="Subtotal" value="₹570" subtle />
          <Row label="GST 18%" value="₹102.6" subtle />
          <View style={styles.divider} />
          <View style={styles.totalRow}>
            <Text style={styles.totalLbl}>Total</Text>
            <Text style={styles.totalVal}>₹672.6</Text>
          </View>
        </AppCard>

        <AppCard tone="soft">
          <View style={styles.tipRow}>
            <Ionicons
              name="information-circle-outline"
              size={18}
              color={colors.primary}
            />
            <Text style={styles.tipTxt}>
              Customer will tap “Approve” in their app to release payment.
            </Text>
          </View>
        </AppCard>
      </ScrollView>

      <BottomCtaBar floating>
        <AppButton
          label={busy ? 'Sending…' : 'Send for approval'}
          loading={busy}
          disabled={busy}
          onPress={send}
          block
          rightIcon={
            !busy ? (
              <Ionicons name="send" size={16} color={colors.white} />
            ) : undefined
          }
        />
      </BottomCtaBar>
      <FloatingSosButton onPress={() => navigation.navigate('SosModal')} />
    </ScreenScaffold>
  );
};

const Row: FC<{
  label: string;
  value: string;
  highlight?: boolean;
  subtle?: boolean;
}> = ({ label, value, highlight, subtle }) => (
  <View style={styles.row}>
    <Text style={[styles.lbl, subtle && styles.subtle]}>{label}</Text>
    <Text
      style={[
        styles.val,
        subtle && styles.subtle,
        highlight && styles.hl,
      ]}
    >
      {value}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  body: { padding: spacing.lg, gap: spacing.md, paddingBottom: 140 },
  custRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: radii.pill,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarTxt: {
    fontFamily: fonts.publicBold,
    fontSize: scaleFont(18),
    color: colors.primary,
  },
  custCol: { flex: 1, gap: 2 },
  custName: {
    fontFamily: fonts.publicBold,
    fontSize: scaleFont(15),
    color: colors.text,
  },
  custSub: {
    fontFamily: fonts.publicRegular,
    fontSize: scaleFont(12.5),
    color: colors.muted,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
  },
  lbl: {
    fontFamily: fonts.publicMedium,
    fontSize: scaleFont(13.5),
    color: colors.text,
  },
  val: {
    fontFamily: fonts.publicSemiBold,
    fontSize: scaleFont(14),
    color: colors.text,
  },
  subtle: { color: colors.muted, fontFamily: fonts.publicRegular },
  hl: { color: colors.success, fontFamily: fonts.publicBold },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.borderLight,
    marginVertical: spacing.sm,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: spacing.xs,
  },
  totalLbl: {
    fontFamily: fonts.publicBold,
    fontSize: scaleFont(15),
    color: colors.text,
  },
  totalVal: {
    fontFamily: fonts.publicBold,
    fontSize: scaleFont(22),
    color: colors.primary,
  },
  tipRow: { flexDirection: 'row', alignItems: 'flex-start', gap: spacing.sm },
  tipTxt: {
    flex: 1,
    fontFamily: fonts.publicMedium,
    fontSize: scaleFont(12.5),
    color: colors.textSoft,
    lineHeight: 18,
  },
});
