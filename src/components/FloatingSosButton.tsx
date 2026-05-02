import type { FC } from 'react';
import { useEffect, useRef } from 'react';
import { Animated, Easing, Pressable, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, fonts, radii, scaleFont, shadows, spacing } from '../theme';

export type FloatingSosButtonProps = {
  onPress: () => void;
};

/**
 * Spec #76 — floating SOS entry with subtle pulsing halo for urgency.
 */
export const FloatingSosButton: FC<FloatingSosButtonProps> = ({ onPress }) => {
  const pulse = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1,
          duration: 1100,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [pulse]);

  const haloScale = pulse.interpolate({
    inputRange: [0, 1],
    outputRange: [0.8, 1.6],
  });
  const haloOpacity = pulse.interpolate({
    inputRange: [0, 1],
    outputRange: [0.45, 0],
  });

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Emergency SOS"
      onPress={onPress}
      style={({ pressed }) => [
        styles.wrap,
        pressed && { transform: [{ scale: 0.96 }] },
      ]}
    >
      <Animated.View
        style={[
          styles.halo,
          { opacity: haloOpacity, transform: [{ scale: haloScale }] },
        ]}
      />
      <Animated.View style={[styles.btn, shadows.lg]}>
        <Ionicons name="alert" size={18} color={colors.white} />
        <Text style={styles.label}>SOS</Text>
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    right: spacing.lg,
    bottom: 96,
    alignItems: 'center',
    justifyContent: 'center',
  },
  halo: {
    position: 'absolute',
    width: 64,
    height: 64,
    borderRadius: radii.pill,
    backgroundColor: colors.error,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.error,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: radii.pill,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.35)',
  },
  label: {
    fontFamily: fonts.publicBold,
    fontSize: scaleFont(14),
    color: colors.white,
    letterSpacing: 1.2,
  },
});
