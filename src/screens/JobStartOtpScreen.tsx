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

type Props = NativeStackScreenProps<JobsStackParamList, 'StartOtp'>;

const CONTENT_W = Math.min(380, Dimensions.get('window').width - 32);

/** Start OTP — section + OTP field pattern from delivery pickup verification (#S11). */
export const JobStartOtpScreen: FC<Props> = ({ navigation }) => {
  const [otp, setOtp] = useState('');
  const valid = otp.length === 4;

  return (
    <ScreenScaffold>
      <ScreenHeader title="Verify start" onBack={() => navigation.goBack()} />
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.headerCard}>
          <Text style={styles.jobId}>Job #J‑1042</Text>
          <Text style={styles.vendorName}>Ravi Sharma</Text>
          <Text style={styles.vendorAddr}>Andheri West · Fan repair</Text>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHead}>
            <View style={styles.sectionNumber}>
              <Text style={styles.sectionNumberText}>1</Text>
            </View>
            <Text style={styles.sectionTitle}>Customer OTP</Text>
            {valid ? (
              <Ionicons name="checkmark-circle" size={22} color={colors.success} />
            ) : null}
          </View>
          <Text style={styles.sectionHelper}>
            Ask the customer to share the OTP from their booking — it updates when
            you arrive on site.
          </Text>

          <OtpInput
            length={4}
            value={otp}
            onChange={setOtp}
            helper="Prototype: enter any 4 digits to continue."
            label="4-digit OTP"
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
              Never share OTPs publicly. Wrong codes trigger a short lock —
              escalate via SOS only for safety issues.
            </Text>
          </View>
        </AppCard>

        <ChecklistRow done={valid} label="OTP entered" />
      </ScrollView>

      <BottomCtaBar floating>
        <AppButton
          label="Verify & start job"
          disabled={!valid}
          onPress={() => navigation.navigate('JobInProgress')}
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
  headerCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    gap: 6,
    borderWidth: 2,
    borderColor: 'rgba(216,217,221,0.4)',
    maxWidth: CONTENT_W,
    alignSelf: 'center',
    width: '100%',
  },
  jobId: {
    fontFamily: fonts.publicBold,
    fontSize: 12,
    color: colors.primary,
    letterSpacing: 0.6,
  },
  vendorName: {
    fontFamily: fonts.publicBold,
    fontSize: 18,
    color: colors.text,
  },
  vendorAddr: {
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
    marginTop: 4,
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
