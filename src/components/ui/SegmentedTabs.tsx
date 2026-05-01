import type { ReactElement } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, fonts, radii, scaleFont, shadows, spacing } from '../../theme';

export type SegmentOption<T extends string> = { id: T; label: string };

export type SegmentedTabsProps<T extends string> = {
  options: readonly SegmentOption<T>[];
  value: T;
  onChange: (id: T) => void;
};

/**
 * iOS-style pill segment control. Used for Earnings period tabs, list filters.
 */
export function SegmentedTabs<T extends string>({
  options,
  value,
  onChange,
}: SegmentedTabsProps<T>): ReactElement {
  return (
    <View style={styles.track}>
      {options.map((seg) => {
        const active = value === seg.id;
        return (
          <Pressable
            key={seg.id}
            accessibilityRole="button"
            accessibilityState={{ selected: active }}
            onPress={() => onChange(seg.id)}
            style={[
              styles.cell,
              active && styles.cellActive,
              active && shadows.sm,
            ]}
          >
            <Text style={[styles.label, active && styles.labelActive]}>
              {seg.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    flexDirection: 'row',
    backgroundColor: colors.segmentTrack,
    borderRadius: radii.md,
    padding: 4,
    width: '100%',
  },
  cell: {
    flex: 1,
    minHeight: 38,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radii.sm,
    paddingHorizontal: spacing.sm,
  },
  cellActive: {
    backgroundColor: colors.white,
  },
  label: {
    fontFamily: fonts.publicSemiBold,
    fontSize: scaleFont(13.5),
    color: colors.muted,
  },
  labelActive: {
    color: colors.primary,
  },
});
