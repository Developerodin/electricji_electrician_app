import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { FC } from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { RootStackParamList } from '../navigation/types';
import { KycStepChrome } from '../components/KycStepChrome';
import { AppButton } from '../components/ui';
import { colors, fonts, radii, scaleFont, shadows, spacing } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'KycLiveness'>;

const STEPS = [
  { id: 1, icon: 'eye-outline' as const, label: 'Look straight' },
  { id: 2, icon: 'happy-outline' as const, label: 'Blink twice' },
  { id: 3, icon: 'sparkles-outline' as const, label: 'Smile gently' },
];

/**
 * Spec #13 — KYC 6 Liveness (dummy capture).
 */
export const KycLivenessScreen: FC<Props> = ({ navigation }) => {
  const [done, setDone] = useState(false);

  return (
    <KycStepChrome
      step={6}
      title="Face match"
      subtitle="Quick liveness check"
      onBack={() => navigation.goBack()}
      footer={
        done ? (
          <AppButton
            label="Continue"
            onPress={() => navigation.navigate('KycCertificates')}
            block
          />
        ) : (
          <AppButton label="Simulate capture" onPress={() => setDone(true)} block />
        )
      }
    >
      <View style={styles.body}>
        <View style={[styles.faceFrame, shadows.md]}>
          <Ionicons
            name={done ? 'checkmark-circle' : 'scan-outline'}
            size={done ? 84 : 64}
            color={done ? colors.success : colors.primary}
          />
        </View>

        {done ? (
          <>
            <Text style={styles.title}>Face matched</Text>
            <Text style={styles.hint}>You’re good to go to certificates.</Text>
          </>
        ) : (
          <>
            <Text style={styles.title}>Hold steady</Text>
            <Text style={styles.hint}>
              Follow the prompts. We’ll capture automatically.
            </Text>
          </>
        )}

        <View style={styles.stepList}>
          {STEPS.map((s) => (
            <View key={s.id} style={styles.stepRow}>
              <View
                style={[
                  styles.stepIcon,
                  done && styles.stepIconDone,
                ]}
              >
                <Ionicons
                  name={done ? 'checkmark' : s.icon}
                  size={16}
                  color={done ? colors.white : colors.primary}
                />
              </View>
              <Text style={styles.stepText}>{s.label}</Text>
            </View>
          ))}
        </View>
      </View>
    </KycStepChrome>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    alignItems: 'center',
    gap: spacing.sm,
  },
  faceFrame: {
    width: 200,
    height: 240,
    borderRadius: 120,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  title: {
    fontFamily: fonts.publicBold,
    fontSize: scaleFont(20),
    color: colors.text,
  },
  hint: {
    fontFamily: fonts.publicRegular,
    fontSize: scaleFont(13),
    color: colors.muted,
    textAlign: 'center',
    maxWidth: 280,
  },
  stepList: {
    width: '100%',
    marginTop: spacing.xl,
    gap: spacing.sm,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.white,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 2,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  stepIcon: {
    width: 28,
    height: 28,
    borderRadius: radii.sm,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepIconDone: {
    backgroundColor: colors.success,
  },
  stepText: {
    fontFamily: fonts.publicMedium,
    fontSize: scaleFont(14),
    color: colors.textSoft,
  },
});
