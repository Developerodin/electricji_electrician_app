import type { FC, ReactNode } from 'react';
import { useRef } from 'react';
import { Animated, Pressable, StyleSheet, Text } from 'react-native';
import { colors, fonts, radii, scaleFont, spacing } from '../../theme';

export type ChipProps = {
  label: string;
  selected?: boolean;
  onPress?: () => void;
  leftIcon?: ReactNode;
  size?: 'sm' | 'md';
};

/**
 * Multi-select / filter chip with subtle press scale. Selected = red ring + tinted bg.
 */
export const Chip: FC<ChipProps> = ({
  label,
  selected = false,
  onPress,
  leftIcon,
  size = 'md',
}) => {
  const scale = useRef(new Animated.Value(1)).current;
  const animate = (v: number) =>
    Animated.spring(scale, {
      toValue: v,
      friction: 7,
      tension: 220,
      useNativeDriver: true,
    }).start();

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <Pressable
        accessibilityRole={onPress ? 'button' : undefined}
        accessibilityState={{ selected }}
        onPress={onPress}
        onPressIn={onPress ? () => animate(0.95) : undefined}
        onPressOut={onPress ? () => animate(1) : undefined}
        style={({ pressed }) => [
          styles.wrap,
          size === 'sm' && styles.wrapSm,
          selected && styles.selected,
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
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.md + 2,
    paddingVertical: spacing.sm + 2,
    borderRadius: radii.pill,
    borderWidth: 1.25,
    borderColor: colors.border,
    backgroundColor: colors.white,
  },
  wrapSm: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs + 2,
  },
  selected: {
    borderColor: colors.primary,
    backgroundColor: colors.primarySoft,
  },
  label: {
    fontFamily: fonts.publicMedium,
    fontSize: scaleFont(14),
    color: colors.textSoft,
  },
  labelSm: {
    fontSize: scaleFont(12.5),
  },
  labelSelected: {
    color: colors.primary,
    fontFamily: fonts.publicSemiBold,
  },
  pressed: {
    opacity: 0.9,
  },
});
