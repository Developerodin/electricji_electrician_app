import type { FC, ReactNode } from 'react';
import { useRef } from 'react';
import {
  ActivityIndicator,
  Animated,
  Pressable,
  StyleSheet,
  Text,
  type ViewStyle,
} from 'react-native';
import { colors, fonts, radii, scaleFont, shadows, spacing } from '../../theme';

type ButtonVariant = 'primary' | 'outline' | 'ghost' | 'danger' | 'success';
type ButtonSize = 'sm' | 'md' | 'lg';

export type AppButtonProps = {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: ButtonVariant;
  size?: ButtonSize;
  block?: boolean;
  accessibilityLabel?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  style?: ViewStyle;
};

/**
 * Animated pill CTA — spring scale on press matches delivery hero CTAs.
 * `variant` switches paint, `size` switches height, `block` stretches full width.
 */
export const AppButton: FC<AppButtonProps> = ({
  label,
  onPress,
  disabled = false,
  loading = false,
  variant = 'primary',
  size = 'md',
  block = false,
  accessibilityLabel,
  leftIcon,
  rightIcon,
  style,
}) => {
  const scale = useRef(new Animated.Value(1)).current;

  const animateTo = (v: number): void => {
    Animated.spring(scale, {
      toValue: v,
      friction: 7,
      tension: 220,
      useNativeDriver: true,
    }).start();
  };

  const isInactive = disabled || loading;
  const isFilled = variant === 'primary' || variant === 'danger' || variant === 'success';

  return (
    <Animated.View
      style={[
        block && styles.block,
        { transform: [{ scale }] },
        isFilled && !isInactive && shadows.md,
        style,
      ]}
    >
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel ?? label}
        accessibilityState={{ disabled: isInactive }}
        onPress={onPress}
        onPressIn={() => animateTo(0.97)}
        onPressOut={() => animateTo(1)}
        disabled={isInactive}
        style={({ pressed }) => [
          styles.base,
          size === 'sm' && styles.sizeSm,
          size === 'md' && styles.sizeMd,
          size === 'lg' && styles.sizeLg,
          variant === 'primary' && styles.primary,
          variant === 'outline' && styles.outline,
          variant === 'ghost' && styles.ghost,
          variant === 'danger' && styles.danger,
          variant === 'success' && styles.success,
          isInactive && styles.disabled,
          pressed && !isInactive && styles.pressed,
        ]}
      >
        {loading ? (
          <ActivityIndicator
            color={isFilled ? colors.white : colors.primary}
            size="small"
          />
        ) : (
          <>
            {leftIcon}
            <Text
              style={[
                styles.label,
                size === 'sm' && styles.labelSm,
                variant === 'primary' && styles.labelOnFilled,
                variant === 'danger' && styles.labelOnFilled,
                variant === 'success' && styles.labelOnFilled,
                variant === 'outline' && styles.labelOutline,
                variant === 'ghost' && styles.labelGhost,
              ]}
            >
              {label}
            </Text>
            {rightIcon}
          </>
        )}
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  block: {
    alignSelf: 'stretch',
  },
  base: {
    paddingHorizontal: spacing.xxl,
    borderRadius: radii.pill,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  sizeSm: {
    minHeight: 38,
    paddingHorizontal: spacing.lg,
  },
  sizeMd: {
    minHeight: 48,
  },
  sizeLg: {
    minHeight: 56,
    paddingHorizontal: spacing.xxxl,
  },
  primary: {
    backgroundColor: colors.primary,
  },
  outline: {
    borderWidth: 1.25,
    borderColor: colors.border,
    backgroundColor: colors.white,
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  danger: {
    backgroundColor: colors.error,
  },
  success: {
    backgroundColor: colors.success,
  },
  disabled: {
    opacity: 0.45,
  },
  pressed: {
    opacity: 0.92,
  },
  label: {
    fontFamily: fonts.publicBold,
    fontSize: scaleFont(16),
    letterSpacing: 0.18,
  },
  labelSm: {
    fontSize: scaleFont(14),
  },
  labelOnFilled: {
    color: colors.white,
  },
  labelOutline: {
    color: colors.text,
  },
  labelGhost: {
    color: colors.primary,
  },
});
