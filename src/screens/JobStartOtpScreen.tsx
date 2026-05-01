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

type Props = NativeStackScreenProps<JobsStackParamList, 'StartOtp'>;

/**
 * Spec #26 — Customer 4-digit Start OTP (any digits pass in prototype).
 */
export const JobStartOtpScreen: FC<Props> = ({ navigation }) => {
  const [valid, setValid] = useState(false);

  return (
    <ScreenScaffold>
      <ScreenHeader title="Start OTP" onBack={() => navigation.goBack()} />
      <ScrollView
        contentContainerStyle={styles.body}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.heroIcon}>
          <Ionicons name="key-outline" size={28} color={colors.primary} />
        </View>
        <Text style={styles.h1}>Enter Start OTP</Text>
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
              The OTP is only visible to the customer who booked this job.
            </Text>
          </View>
        </AppCard>
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

const styles = StyleSheet.create({
  body: {
    padding: spacing.lg,
    gap: spacing.md,
    paddingBottom: 140,
    alignItems: 'center',
  },
  heroIcon: {
    width: 64,
    height: 64,
    borderRadius: radii.pill,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.md,
  },
  h1: {
    fontFamily: fonts.publicBold,
    fontSize: scaleFont(20),
    color: colors.text,
  },
  sub: {
    fontFamily: fonts.publicRegular,
    fontSize: scaleFont(13.5),
    color: colors.muted,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: spacing.md,
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
