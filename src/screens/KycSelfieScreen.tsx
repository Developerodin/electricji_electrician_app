import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { FC } from 'react';
import { useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import type { RootStackParamList } from '../navigation/types';
import { KycStepChrome } from '../components/KycStepChrome';
import { AppButton } from '../components/ui';
import { colors, fonts, radii, scaleFont, shadows, spacing } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'KycSelfie'>;

/**
 * Spec #9 — KYC 2 Profile photo (dummy capture).
 */
export const KycSelfieScreen: FC<Props> = ({ navigation }) => {
  const [captured, setCaptured] = useState(false);

  return (
    <KycStepChrome
      step={2}
      title="Profile photo"
      subtitle="A clear face boosts customer trust"
      onBack={() => navigation.goBack()}
      footer={
        captured ? (
          <View style={styles.dualCta}>
            <View style={styles.flex1}>
              <AppButton
                label="Retake"
                variant="outline"
                onPress={() => setCaptured(false)}
                block
              />
            </View>
            <View style={styles.flex1}>
              <AppButton
                label="Use photo"
                onPress={() => navigation.navigate('KycAadhaar')}
                block
              />
            </View>
          </View>
        ) : (
          <AppButton label="Capture" onPress={() => setCaptured(true)} block />
        )
      }
    >
      <View style={styles.body}>
        <View style={[styles.frame, shadows.md]}>
          {captured ? (
            <Image
              source={require('../../assets/personal-info/upload-avatar.png')}
              style={styles.preview}
              resizeMode="cover"
            />
          ) : (
            <View style={styles.placeholder}>
              <Ionicons name="camera-outline" size={36} color={colors.primary} />
            </View>
          )}
        </View>
        <Text style={styles.title}>
          {captured ? 'Looks great!' : 'Center your face inside the oval'}
        </Text>
        <Text style={styles.hint}>
          {captured
            ? 'Tap “Use photo” or retake if blurry.'
            : 'Use natural daylight, no sunglasses or hats.'}
        </Text>

        <View style={styles.tips}>
          <Tip icon="sunny-outline" text="Bright, even lighting" />
          <Tip icon="happy-outline" text="Look directly at the lens" />
          <Tip icon="eye-off-outline" text="No filters or hats" />
        </View>
      </View>
    </KycStepChrome>
  );
};

const Tip: FC<{ icon: 'sunny-outline' | 'happy-outline' | 'eye-off-outline'; text: string }> = ({
  icon,
  text,
}) => (
  <View style={styles.tipRow}>
    <View style={styles.tipIcon}>
      <Ionicons name={icon} size={14} color={colors.primary} />
    </View>
    <Text style={styles.tipText}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  body: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    alignItems: 'center',
    gap: spacing.sm,
  },
  frame: {
    width: 220,
    height: 280,
    borderRadius: radii.hero + 80,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderWidth: 4,
    borderColor: colors.white,
    marginBottom: spacing.lg,
  },
  preview: {
    width: '100%',
    height: '100%',
  },
  placeholder: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primarySoft,
  },
  title: {
    fontFamily: fonts.publicBold,
    fontSize: scaleFont(18),
    color: colors.text,
    textAlign: 'center',
  },
  hint: {
    fontFamily: fonts.publicRegular,
    fontSize: scaleFont(13),
    color: colors.muted,
    textAlign: 'center',
    maxWidth: 280,
  },
  tips: {
    width: '100%',
    marginTop: spacing.xl,
    gap: spacing.sm,
  },
  tipRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.xs,
  },
  tipIcon: {
    width: 26,
    height: 26,
    borderRadius: radii.sm,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tipText: {
    fontFamily: fonts.publicMedium,
    fontSize: scaleFont(13),
    color: colors.textSoft,
  },
  dualCta: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  flex1: { flex: 1 },
});
