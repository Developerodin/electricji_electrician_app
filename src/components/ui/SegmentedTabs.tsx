import type { ReactElement } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../../theme';
import { kycDvScale as SCALE, kycDeliveryPlatform as Platform } from '../../theme/kycDelivery';

export type SegmentOption<T extends string> = { id: T; label: string };

export type SegmentedTabsProps<T extends string> = {
  options: readonly SegmentOption<T>[];
  value: T;
  onChange: (id: T) => void;
};

const RED = '#d9232d';

/** Segment rail — idle/active shells aligned with delivery vehicle-selection cards. */
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
              active ? styles.cellActive : styles.cellIdle,
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
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    padding: 4,
    gap: 6,
    width: '100%',
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  cell: {
    flex: 1,
    minHeight: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    paddingHorizontal: 8,
    borderWidth: 2,
  },
  cellIdle: {
    borderColor: 'transparent',
    backgroundColor: 'transparent',
  },
  cellActive: {
    backgroundColor: '#f7eaea',
    borderColor: RED,
  },
  label: {
    fontFamily: 'PublicSans_500Medium',
    fontSize: 14 * SCALE,
    color: colors.muted,
    textAlign: 'center',
    ...(Platform.OS === 'android' && { includeFontPadding: false }),
  },
  labelActive: {
    fontFamily: 'PublicSans_600SemiBold',
    color: RED,
  },
});
