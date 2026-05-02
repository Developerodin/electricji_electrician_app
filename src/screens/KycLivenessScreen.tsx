import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { FC } from 'react';
import { useState } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import type { RootStackParamList } from '../navigation/types';
import { KycStepChrome } from '../components/KycStepChrome';
import { KycDeliveryPrimaryButton } from '../components/ui';
import { colors, radii, shadows, spacing } from '../theme';
import { kycDvScale as SCALE } from '../theme/kycDelivery';

type Props = NativeStackScreenProps<RootStackParamList, 'KycLiveness'>;

const STEPS = [
  { id: 1, icon: 'eye-outline' as const, label: 'Look straight' },
  { id: 2, icon: 'happy-outline' as const, label: 'Blink twice' },
  { id: 3, icon: 'sparkles-outline' as const, label: 'Smile gently' },
];

const DV_RED = '#d9232d';

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
          <KycDeliveryPrimaryButton
            label="Continue"
            onPress={() => navigation.navigate('KycCertificates')}
          />
        ) : (
          <KycDeliveryPrimaryButton
            label="Simulate capture"
            onPress={() => setDone(true)}
          />
        )
      }
    >
      <View style={styles.body}>
        <View style={[styles.faceFrame, shadows.md]}>
          <Ionicons
            name={done ? 'checkmark-circle' : 'scan-outline'}
            size={done ? 84 : 64}
            color={done ? colors.success : DV_RED}
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
              <View style={[styles.stepIcon, done && styles.stepIconDone]}>
                <Ionicons
                  name={done ? 'checkmark' : s.icon}
                  size={16}
                  color={done ? colors.white : DV_RED}
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
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    gap: 10,
    width: '100%',
  },
  faceFrame: {
    width: 200,
    height: 240,
    borderRadius: 120,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: '#eaeff2',
  },
  title: {
    fontFamily: 'PublicSans_700Bold',
    fontSize: 20 * SCALE,
    color: colors.text,
    ...(Platform.OS === 'android' && { includeFontPadding: false }),
  },
  hint: {
    fontFamily: 'PublicSans_500Medium',
    fontSize: 14 * SCALE,
    color: colors.muted,
    textAlign: 'center',
    maxWidth: 300,
    lineHeight: Math.round(14 * SCALE * 1.45),
    ...(Platform.OS === 'android' && { includeFontPadding: false }),
  },
  stepList: {
    width: '100%',
    marginTop: spacing.lg,
    gap: 10,
    maxWidth: 360,
    alignSelf: 'center',
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: colors.white,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#f0f0f0',
    width: '100%',
  },
  stepIcon: {
    width: 30,
    height: 30,
    borderRadius: 8,
    backgroundColor: '#fce8e9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepIconDone: {
    backgroundColor: colors.success,
  },
  stepText: {
    fontFamily: 'PublicSans_500Medium',
    fontSize: 14 * SCALE,
    color: colors.textSoft,
    flex: 1,
    ...(Platform.OS === 'android' && { includeFontPadding: false }),
  },
});
