import type { FC, ReactNode } from 'react';
import { useRef } from 'react';
import {
  Animated,
  Pressable,
  StyleSheet,
  View,
  type ViewStyle,
} from 'react-native';
import { colors, radii, shadows, spacing } from '../../theme';

type Tone = 'surface' | 'soft' | 'tinted';

export type AppCardProps = {
  children: ReactNode;
  dashed?: boolean;
  tone?: Tone;
  padded?: boolean;
  onPress?: () => void;
  style?: ViewStyle;
};

/**
 * Soft rounded card — matches delivery-app stat / task / promo cards.
 * Pass `onPress` to get an animated tappable card with spring scale.
 */
export const AppCard: FC<AppCardProps> = ({
  children,
  dashed = false,
  tone = 'surface',
  padded = true,
  onPress,
  style,
}) => {
  const scale = useRef(new Animated.Value(1)).current;
  const animate = (v: number) =>
    Animated.spring(scale, {
      toValue: v,
      friction: 7,
      tension: 220,
      useNativeDriver: true,
    }).start();

  const cardStyle = [
    styles.card,
    padded && styles.padded,
    tone === 'soft' && styles.soft,
    tone === 'tinted' && styles.tinted,
    dashed && styles.dashed,
    !dashed && shadows.sm,
    style,
  ];

  if (onPress) {
    return (
      <Animated.View style={{ transform: [{ scale }] }}>
        <Pressable
          accessibilityRole="button"
          onPressIn={() => animate(0.98)}
          onPressOut={() => animate(1)}
          onPress={onPress}
          style={({ pressed }) => [cardStyle, pressed && styles.pressed]}
        >
          {children}
        </Pressable>
      </Animated.View>
    );
  }

  return <View style={cardStyle}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: 'rgba(216,217,221,0.45)',
  },
  padded: {
    padding: spacing.lg,
  },
  soft: {
    backgroundColor: colors.surfaceAlt,
    borderColor: colors.borderLight,
  },
  tinted: {
    backgroundColor: colors.primarySoft,
    borderColor: colors.primaryRing,
  },
  dashed: {
    borderStyle: 'dashed',
    borderColor: colors.cardBorderDashed,
    borderRadius: radii.hero,
    borderWidth: 1.5,
  },
  pressed: {
    opacity: 0.96,
  },
});
