import type { FC, ReactNode } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { colors } from '../../theme';
import { kycDvScale as SCALE, kycDeliveryPlatform as Platform } from '../../theme/kycDelivery';

export type ChipProps = {
  label: string;
  selected?: boolean;
  onPress?: () => void;
  leftIcon?: ReactNode;
  size?: 'sm' | 'md';
};

const RED = '#d9232d';

/** Filter chip colours aligned with delivery vehicle-selection idle/selected shells. */
export const Chip: FC<ChipProps> = ({
  label,
  selected = false,
  onPress,
  leftIcon,
  size = 'md',
}) => (
  <Pressable
    accessibilityRole={onPress ? 'button' : undefined}
    accessibilityState={{ selected }}
    onPress={onPress}
    disabled={!onPress}
    style={({ pressed }) => [
      styles.wrap,
      size === 'sm' && styles.wrapSm,
      selected ? styles.selected : styles.idle,
      pressed && onPress && styles.pressed,
    ]}
  >
    {leftIcon}
    <Text
      style={[
        styles.label,
        size === 'sm' && styles.labelSm,
        selected && styles.labelSelected,
      ]}
    >
      {label}
    </Text>
  </Pressable>
);

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    borderWidth: 2,
  },
  wrapSm: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 14,
  },
  idle: {
    borderColor: '#f0f0f0',
    backgroundColor: '#f9fafb',
  },
  selected: {
    borderColor: RED,
    backgroundColor: '#f7eaea',
  },
  label: {
    fontFamily: 'PublicSans_500Medium',
    fontSize: 14 * SCALE,
    color: colors.textSoft,
    ...(Platform.OS === 'android' && { includeFontPadding: false }),
  },
  labelSm: {
    fontSize: 12 * SCALE,
  },
  labelSelected: {
    color: RED,
    fontFamily: 'PublicSans_600SemiBold',
  },
  pressed: {
    opacity: 0.9,
  },
});
