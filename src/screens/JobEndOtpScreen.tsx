import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { FC } from 'react';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import type { JobsStackParamList } from '../navigation/types';
import { FloatingSosButton } from '../components/FloatingSosButton';
import {
  AppCard,
  AppButton,
  BottomCtaBar,
  OtpInput,
  ScreenHeader,
  ScreenScaffold,
} from '../components/ui';
import { colors, DESIGN_W, fonts, scaleFont, spacing } from '../theme';

type Props = NativeStackScreenProps<JobsStackParamList, 'EndOtp'>;

const CONTENT_W = Math.min(380, Dimensions.get('window').width - 32);

/** End OTP after customer approval — delivery-style numbered OTP block + checklist. */
export const JobEndOtpScreen: FC<Props> = ({ navigation }) => {
  const [otp, setOtp] = useState('');
  const valid = otp.length === 4;

  return (
    <ScreenScaffold>
      <ScreenHeader title="Complete job" onBack={() => navigation.goBack()} />
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.successRow}>
          <View style={styles.successCircle}>
            <Ionicons name="checkmark" size={22} color={colors.white} />
          </View>
          <View style={styles.successCol}>
            <Text style={styles.okTitle}>Customer approved</Text>
            <Text style={styles.okSub}>
              Ravi Sharma confirmed work completion. Collect the OTP to finalize.
            </Text>
          </View>
        </View>

        <View style={styles.headerCard}>
          <Text style={styles.jobId}>Job #J‑1042</Text>
          <Text style={styles.meta}>Upload proof and invoice unlock after OTP.</Text>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHead}>
            <View style={styles.sectionNumber}>
              <Text style={styles.sectionNumberText}>2</Text>
            </View>
            <Text style={styles.sectionTitle}>Completion OTP</Text>
            {valid ? (
              <Ionicons name="checkmark-circle" size={22} color={colors.success} />
            ) : null}
          </View>
          <Text style={styles.sectionHelper}>
            Same flow as rider delivery drop-off OTP: confirm the digits the customer sees
            in their app — then continue to payout proof upload.
          </Text>

          <OtpInput
            length={4}
            value={otp}
            onChange={setOtp}
            label="4-digit OTP"
            helper="Prototype: any 4 digits continue. Wrong codes retry in-app."
          />
        </View>

        <AppCard tone="soft">
          <View style={styles.tipRow}>
            <Ionicons
              name="information-circle-outline"
              size={18}
              color={colors.primary}
            />
            <Text style={styles.tipTxt}>
              After OTP you&apos;ll capture after‑photos and send the invoice for payment.
            </Text>
          </View>
        </AppCard>

        <ChecklistRow done label="Customer signed off job" />
        <ChecklistRow done={valid} label="OTP entered" />
      </ScrollView>

      <BottomCtaBar floating>
        <AppButton
          label="Verify & continue"
          disabled={!valid}
          onPress={() => navigation.navigate('UploadProof')}
          block
          rightIcon={
            <Ionicons name="arrow-forward" size={16} color={colors.white} />
          }
        />
      </BottomCtaBar>
      <FloatingSosButton onPress={() => navigation.navigate('SosModal')} />
    </ScreenScaffold>
  );
};

const ChecklistRow: FC<{ done: boolean; label: string }> = ({ done, label }) => (
  <View style={styles.checkRow}>
    <Ionicons
      name={done ? 'checkmark-circle' : 'ellipse-outline'}
      size={20}
      color={done ? colors.success : '#c8ccd4'}
    />
    <Text style={[styles.checkLabel, done && styles.checkLabelDone]}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  scroll: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 160,
    gap: 16,
    width: '100%',
    maxWidth: DESIGN_W,
    alignSelf: 'center',
  },
  successRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.successSoft,
    borderRadius: 16,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(34,153,121,0.2)',
    maxWidth: CONTENT_W,
    width: '100%',
    alignSelf: 'center',
  },
  successCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.success,
    alignItems: 'center',
    justifyContent: 'center',
  },
  successCol: { flex: 1, gap: 4 },
  okTitle: {
    fontFamily: fonts.publicBold,
    fontSize: scaleFont(15),
    color: colors.success,
  },
  okSub: {
    fontFamily: fonts.publicMedium,
    fontSize: scaleFont(12.5),
    color: colors.textSoft,
    lineHeight: 18,
  },
  headerCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    gap: 6,
    borderWidth: 2,
    borderColor: 'rgba(216,217,221,0.4)',
    maxWidth: CONTENT_W,
    width: '100%',
    alignSelf: 'center',
  },
  jobId: {
    fontFamily: fonts.publicBold,
    fontSize: 14,
    color: colors.primary,
  },
  meta: {
    fontFamily: fonts.publicMedium,
    fontSize: 13,
    color: colors.muted,
    lineHeight: 18,
  },
  section: {
    gap: 10,
    maxWidth: CONTENT_W,
    width: '100%',
    alignSelf: 'center',
  },
  sectionHead: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  sectionNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionNumberText: {
    fontFamily: fonts.publicBold,
    fontSize: 14,
    color: colors.primary,
  },
  sectionTitle: {
    flex: 1,
    fontFamily: fonts.publicBold,
    fontSize: 16,
    color: colors.text,
  },
  sectionHelper: {
    fontFamily: fonts.publicMedium,
    fontSize: 13,
    color: colors.muted,
    lineHeight: 18,
  },
  tipRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
  },
  tipTxt: {
    flex: 1,
    fontFamily: fonts.publicMedium,
    fontSize: scaleFont(12.5),
    color: colors.textSoft,
    lineHeight: 18,
  },
  checkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    maxWidth: CONTENT_W,
    alignSelf: 'center',
    width: '100%',
  },
  checkLabel: {
    fontFamily: fonts.publicMedium,
    fontSize: 14,
    color: colors.muted,
  },
  checkLabelDone: {
    color: colors.text,
  },
});
