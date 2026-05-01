import type { FC } from 'react';
import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { colors, fonts, radii, scaleFont, spacing } from '../../theme';

export type ProgressBarProps = {
  step: number;
  totalSteps: number;
  title?: string;
};

/**
 * KYC-style linear progress with animated fill (Step X of N).
 */
export const ProgressBar: FC<ProgressBarProps> = ({
  step,
  totalSteps,
  title,
}) => {
  const target = Math.min(100, Math.max(0, (step / totalSteps) * 100));
  const width = useRef(new Animated.Value(target)).current;

  useEffect(() => {
    Animated.spring(width, {
      toValue: target,
      friction: 9,
      tension: 80,
      useNativeDriver: false,
    }).start();
  }, [target, width]);

  const widthInterpolated = width.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.wrap}>
      <View style={styles.row}>
        {title ? <Text style={styles.title}>{title}</Text> : <View />}
        <Text style={styles.stepLabel}>
          Step {step} of {totalSteps}
        </Text>
      </View>
      <View style={styles.track}>
        <Animated.View style={[styles.fill, { width: widthInterpolated }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: fonts.publicSemiBold,
    fontSize: scaleFont(13),
    color: colors.muted,
  },
  stepLabel: {
    fontFamily: fonts.publicBold,
    fontSize: scaleFont(13),
    color: colors.primary,
  },
  track: {
    height: 8,
    borderRadius: radii.xs,
    backgroundColor: colors.borderLight,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: radii.xs,
  },
});
