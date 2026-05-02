import type { FC, ReactNode } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import {
  DV_RED,
  DV_TEXT,
  kycDeliveryPlatform as Platform,
  kycDvScale as SCALE,
} from '../../theme/kycDelivery';

export type KycDeliveryPrimaryButtonProps = {
  label: string;
  onPress: () => void;
  disabled?: boolean;
};

/**
 * Red footer CTA matching delivery `KycVerificationScreen` / `VehicleDetailsScreen`.
 */
export const KycDeliveryPrimaryButton: FC<KycDeliveryPrimaryButtonProps> = ({
  label,
  onPress,
  disabled,
}) => (
  <Pressable
    accessibilityRole="button"
    accessibilityState={{ disabled: !!disabled }}
    disabled={disabled}
    onPress={onPress}
    style={({ pressed }) => [
      styles.primary,
      disabled && styles.disabled,
      pressed && !disabled && styles.pressed,
    ]}
  >
    <Text style={styles.primaryLabel}>{label}</Text>
    <Image
      accessibilityElementsHidden
      importantForAccessibility="no"
      source={require('../../../assets/personal-info/icon-arrow-next.png')}
      style={styles.arrow}
      resizeMode="contain"
    />
  </Pressable>
);

export type KycDeliveryOutlineButtonProps = {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  size?: 'sm' | 'md';
  leftIcon?: ReactNode;
};

/** Outline secondary CTA aligned with auth secondary buttons on delivery flows. */
export const KycDeliveryOutlineButton: FC<KycDeliveryOutlineButtonProps> = ({
  label,
  onPress,
  disabled,
  size = 'md',
  leftIcon,
}) => (
  <Pressable
    accessibilityRole="button"
    accessibilityState={{ disabled: !!disabled }}
    disabled={disabled}
    onPress={onPress}
    style={({ pressed }) => [
      styles.outline,
      size === 'sm' && styles.outlineSm,
      disabled && styles.outlineDisabled,
      pressed && !disabled && styles.pressed,
    ]}
  >
    <View style={styles.outlineInner}>
      {leftIcon}
      <Text style={[styles.outlineLabel, size === 'sm' && styles.outlineLabelSm]}>
        {label}
      </Text>
    </View>
  </Pressable>
);

export const KycDeliveryButtonRow: FC<{ children: ReactNode }> = ({
  children,
}) => <View style={styles.row}>{children}</View>;

const styles = StyleSheet.create({
  primary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: DV_RED,
    borderRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: 24,
    minHeight: 48,
    width: '100%',
    maxWidth: 380,
    alignSelf: 'center',
  },
  primaryLabel: {
    fontFamily: 'PublicSans_700Bold',
    color: '#FFFFFF',
    fontSize: 16 * SCALE,
    lineHeight: 24,
    letterSpacing: 0.192,
    ...(Platform.OS === 'android' && { includeFontPadding: false }),
  },
  arrow: {
    width: 24,
    height: 24,
    tintColor: '#FFFFFF',
  },
  disabled: { opacity: 0.45 },
  pressed: { opacity: 0.92 },
  outline: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#77878f',
    borderRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: 16,
    minHeight: 48,
    backgroundColor: '#FFFFFF',
    width: '100%',
  },
  outlineSm: {
    minHeight: 40,
    paddingVertical: 8,
    paddingHorizontal: 14,
  },
  outlineDisabled: { opacity: 0.45 },
  outlineInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  outlineLabel: {
    fontFamily: 'PublicSans_700Bold',
    fontSize: 16 * SCALE,
    color: DV_TEXT,
    letterSpacing: 0.192,
    ...(Platform.OS === 'android' && { includeFontPadding: false }),
  },
  outlineLabelSm: {
    fontSize: 14 * SCALE,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'stretch',
    gap: 12,
    width: '100%',
    maxWidth: 380,
    alignSelf: 'center',
  },
});
