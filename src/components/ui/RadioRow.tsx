import { Ionicons } from '@expo/vector-icons';
import type { FC } from 'react';
import { useRef } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, fonts, radii, scaleFont, shadows, spacing } from '../../theme';

export type RadioRowProps = {
  label: string;
  description?: string;
  selected: boolean;
  onPress: () => void;
};

/**
 * Card-style radio option row used across KYC + edit screens.
 */
export const RadioRow: FC<RadioRowProps> = ({
  label,
  description,
  selected,
  onPress,
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
        accessibilityRole="radio"
        accessibilityState={{ selected }}
        onPress={onPress}
        onPressIn={() => animate(0.99)}
        onPressOut={() => animate(1)}
        style={({ pressed }) => [
          styles.row,
          selected ? styles.rowOn : null,
          !selected && shadows.sm,
          pressed && styles.pressed,
        ]}
      >
        <View style={[styles.circle, selected && styles.circleOn]}>
          {selected ? (
            <Ionicons name="checkmark" size={14} color={colors.white} />
          ) : null}
        </View>
        <View style={styles.textCol}>
          <Text
            style={[styles.label, selected && styles.labelOn]}
            numberOfLines={1}
          >
            {label}
          </Text>
          {description ? (
            <Text style={styles.description} numberOfLines={2}>
              {description}
            </Text>
          ) : null}
        </View>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md + 2,
    backgroundColor: colors.white,
    borderRadius: radii.lg,
    borderWidth: 1.25,
    borderColor: colors.borderLight,
  },
  rowOn: {
    borderColor: colors.primary,
    backgroundColor: colors.primarySoft,
  },
  circle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  circleOn: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  textCol: {
    flex: 1,
    gap: 2,
  },
  label: {
    fontFamily: fonts.publicSemiBold,
    fontSize: scaleFont(15),
    color: colors.text,
  },
  labelOn: {
    color: colors.primary,
  },
  description: {
    fontFamily: fonts.publicRegular,
    fontSize: scaleFont(12.5),
    color: colors.muted,
  },
  pressed: {
    opacity: 0.95,
  },
});
