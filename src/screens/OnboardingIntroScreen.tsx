import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { FC } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import type { RootStackParamList } from '../navigation/types';
import { AppButton } from '../components/ui/Button';
import { ProgressBar } from '../components/ui/ProgressBar';
import { colors, fonts, scaleFont, spacing } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'OnboardingIntro'>;

/**
 * Spec #7 — onboarding intro with progress 0/10.
 */
export const OnboardingIntroScreen: FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.root}>
      <View style={styles.body}>
        <Image
          source={require('../../assets/login-mascot.png')}
          style={styles.img}
          resizeMode="contain"
          accessibilityIgnoresInvertColors
        />
        <ProgressBar step={0} totalSteps={10} title="Profile setup" />
        <Text style={styles.h1} accessibilityRole="header">
          Let&apos;s set up your profile
        </Text>
        <Text style={styles.sub}>
          Takes about 10 minutes. You&apos;ll need Aadhaar, PAN, and qualification
          certificates ready.
        </Text>
      </View>
      <View style={styles.footer}>
        <AppButton
          label="Start profile setup"
          onPress={() => navigation.navigate('KycPersonal')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.white },
  body: { flex: 1, padding: spacing.lg, paddingTop: spacing.xxxl },
  img: { width: '100%', height: 180, marginBottom: spacing.lg },
  h1: {
    fontFamily: fonts.publicBold,
    fontSize: scaleFont(22),
    color: colors.text,
    marginTop: spacing.md,
  },
  sub: {
    marginTop: spacing.sm,
    fontFamily: fonts.publicRegular,
    fontSize: scaleFont(15),
    color: colors.muted,
    lineHeight: 22,
  },
  footer: {
    padding: spacing.lg,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.borderLight,
  },
});
