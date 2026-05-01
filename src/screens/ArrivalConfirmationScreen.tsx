import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { FC } from 'react';
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

type Props = NativeStackScreenProps<JobsStackParamList, 'ArrivalConfirmation'>;

/**
 * Spec #25 — Arrival confirmation: hero confirm + checklist + Start OTP CTA.
 */
export const ArrivalConfirmationScreen: FC<Props> = ({ navigation }) => (
  <ScreenScaffold>
    <ScreenHeader title="Arrived" onBack={() => navigation.goBack()} />
    <ScrollView
      contentContainerStyle={styles.body}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.heroWrap}>
        <View style={styles.heroCircle}>
          <Ionicons name="location" size={32} color={colors.white} />
        </View>
        <Text style={styles.h1}>You’ve arrived</Text>
        <Text style={styles.sub}>
          Ask the customer for the Start OTP shown on their app to begin the
          job.
        </Text>
      </View>

      <SectionTitle title="Before you start" />
      <AppCard padded={false}>
        {[
          ['phone-portrait-outline', 'Confirm customer’s app shows your photo'],
          ['shield-checkmark-outline', 'Wear ID badge & gloves'],
          ['camera-outline', 'Take 2 before-photos in the next step'],
        ].map(([icon, label], idx) => (
          <View
            key={label}
            style={[styles.checkRow, idx !== 2 && styles.checkDivider]}
          >
            <View style={styles.checkIcon}>
              <Ionicons
                name={icon as never}
                size={16}
                color={colors.primary}
              />
            </View>
            <Text style={styles.checkText}>{label}</Text>
          </View>
        ))}
      </AppCard>
    </ScrollView>

    <BottomCtaBar floating>
      <AppButton
        label="I have the OTP — Continue"
        onPress={() => navigation.navigate('StartOtp')}
        block
        rightIcon={
          <Ionicons name="arrow-forward" size={16} color={colors.white} />
        }
      />
    </BottomCtaBar>
    <FloatingSosButton onPress={() => navigation.navigate('SosModal')} />
  </ScreenScaffold>
);

const styles = StyleSheet.create({
  body: { padding: spacing.lg, gap: spacing.md, paddingBottom: 140 },
  heroWrap: {
    alignItems: 'center',
    backgroundColor: colors.primarySoft,
    borderRadius: radii.lg,
    padding: spacing.lg,
    gap: spacing.xs,
    borderWidth: 1,
    borderColor: colors.primaryRing,
  },
  heroCircle: {
    width: 64,
    height: 64,
    borderRadius: radii.pill,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
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
  },
  checkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  checkDivider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.borderLight,
  },
  checkIcon: {
    width: 32,
    height: 32,
    borderRadius: radii.sm,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkText: {
    flex: 1,
    fontFamily: fonts.publicSemiBold,
    fontSize: scaleFont(13.5),
    color: colors.text,
  },
});
