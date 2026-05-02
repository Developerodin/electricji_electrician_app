import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { FC } from 'react';
import { useState } from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import type { RootStackParamList } from '../navigation/types';
import { KycStepChrome } from '../components/KycStepChrome';
import {
  KycDeliveryButtonRow,
  KycDeliveryOutlineButton,
  KycDeliveryPrimaryButton,
} from '../components/ui';
import { colors, radii, shadows, spacing } from '../theme';
import { kycDvScale as SCALE } from '../theme/kycDelivery';

type Props = NativeStackScreenProps<RootStackParamList, 'KycSelfie'>;

const DV_RED = '#d9232d';

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
          <KycDeliveryButtonRow>
            <View style={styles.flex1}>
              <KycDeliveryOutlineButton
                label="Retake"
                onPress={() => setCaptured(false)}
              />
            </View>
            <View style={styles.flex1}>
              <KycDeliveryPrimaryButton
                label="Use photo"
                onPress={() => navigation.navigate('KycAadhaar')}
              />
            </View>
          </KycDeliveryButtonRow>
        ) : (
          <KycDeliveryPrimaryButton
            label="Capture"
            onPress={() => setCaptured(true)}
          />
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
              <Ionicons name="camera-outline" size={36} color={DV_RED} />
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

const Tip: FC<{
  icon: 'sunny-outline' | 'happy-outline' | 'eye-off-outline';
  text: string;
}> = ({ icon, text }) => (
  <View style={styles.tipRow}>
    <View style={styles.tipIcon}>
      <Ionicons name={icon} size={14} color={DV_RED} />
    </View>
    <Text style={styles.tipText}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  flex1: { flex: 1 },
  body: {
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    gap: 10,
    width: '100%',
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
    marginBottom: spacing.md,
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
    backgroundColor: '#fce8e9',
  },
  title: {
    fontFamily: 'PublicSans_700Bold',
    fontSize: 18 * SCALE,
    color: colors.text,
    textAlign: 'center',
    ...(Platform.OS === 'android' && { includeFontPadding: false }),
  },
  hint: {
    fontFamily: 'PublicSans_500Medium',
    fontSize: 14 * SCALE,
    color: colors.muted,
    textAlign: 'center',
    maxWidth: 320,
    lineHeight: Math.round(14 * SCALE * 1.45),
    ...(Platform.OS === 'android' && { includeFontPadding: false }),
  },
  tips: {
    width: '100%',
    marginTop: spacing.lg,
    gap: 10,
    maxWidth: 360,
    alignSelf: 'center',
  },
  tipRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#eaeff2',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  tipIcon: {
    width: 26,
    height: 26,
    borderRadius: radii.sm,
    backgroundColor: '#fce8e9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tipText: {
    fontFamily: 'PublicSans_500Medium',
    fontSize: 14 * SCALE,
    color: colors.textSoft,
    flex: 1,
    ...(Platform.OS === 'android' && { includeFontPadding: false }),
  },
});
