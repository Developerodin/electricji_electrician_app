import type { FC, ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, shadows, spacing } from '../../theme';

export type BottomCtaBarProps = {
  children: ReactNode;
  /** When true the bar floats over content with no top divider. */
  floating?: boolean;
};

/**
 * Safe-area aware sticky bottom bar for primary CTAs.
 */
export const BottomCtaBar: FC<BottomCtaBarProps> = ({ children, floating = false }) => {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={[
        styles.bar,
        floating ? styles.floating : styles.fixed,
        floating && shadows.lg,
        { paddingBottom: Math.max(insets.bottom, spacing.md) + spacing.xs },
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  bar: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    backgroundColor: colors.white,
    gap: spacing.sm,
  },
  fixed: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.borderLight,
  },
  floating: {},
});
