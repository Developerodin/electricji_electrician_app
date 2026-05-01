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
  OtpInput,
  ScreenHeader,
  ScreenScaffold,
} from '../components/ui';
import { colors, fonts, radii, scaleFont, spacing } from '../theme';

type Props = NativeStackScreenProps<JobsStackParamList, 'EndOtp'>;

/**
 * Spec #30–31 — End OTP after customer approval.
 */
export const JobEndOtpScreen: FC<Props> = ({ navigation }) => {
  const [valid, setValid] = useState(false);
  return (
    <ScreenScaffold>
      <ScreenHeader title="End OTP" onBack={() => navigation.goBack()} />
      <ScrollView
        contentContainerStyle={styles.body}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.successRow}>
          <View style={styles.successCircle}>
            <Ionicons name="checkmark" size={20} color={colors.white} />
          </View>
          <View style={styles.successCol}>
            <Text style={styles.okTitle}>Customer approved</Text>
            <Text style={styles.okSub}>
              Ravi Sharma confirmed work completion
            </Text>
          </View>
        </View>

        <Text style={styles.h1}>Enter End OTP</Text>
        <Text style={styles.sub}>
          Ask the customer for the 4-digit code shown in their app.
        </Text>

        <View style={styles.otpWrap}>
          <OtpInput
            length={4}
            cellWidth={60}
            onComplete={(o) => setValid(o.length === 4)}
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
              After verification you’ll upload after-photos and generate the
              invoice.
            </Text>
          </View>
        </AppCard>
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

const styles = StyleSheet.create({
  body: { padding: spacing.lg, gap: spacing.md, paddingBottom: 140 },
  successRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.successSoft,
    borderRadius: radii.lg,
    padding: spacing.md,
  },
  successCircle: {
    width: 36,
    height: 36,
    borderRadius: radii.pill,
    backgroundColor: colors.success,
    alignItems: 'center',
    justifyContent: 'center',
  },
  successCol: { flex: 1, gap: 2 },
  okTitle: {
    fontFamily: fonts.publicBold,
    fontSize: scaleFont(14),
    color: colors.success,
  },
  okSub: {
    fontFamily: fonts.publicMedium,
    fontSize: scaleFont(12.5),
    color: colors.textSoft,
  },
  h1: {
    fontFamily: fonts.publicBold,
    fontSize: scaleFont(20),
    color: colors.text,
    textAlign: 'center',
    marginTop: spacing.md,
  },
  sub: {
    fontFamily: fonts.publicRegular,
    fontSize: scaleFont(13.5),
    color: colors.muted,
    textAlign: 'center',
    lineHeight: 20,
  },
  otpWrap: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: spacing.md,
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
});
