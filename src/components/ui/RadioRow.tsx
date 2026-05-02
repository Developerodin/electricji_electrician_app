import { Ionicons } from '@expo/vector-icons';
import type { FC } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../../theme';
import { kycDvScale as SCALE, kycDeliveryPlatform as Platform } from '../../theme/kycDelivery';

export type RadioRowProps = {
  label: string;
  description?: string;
  selected: boolean;
  onPress: () => void;
};

const RED = '#d9232d';

/** Card radio row — idle/selected shells match delivery `VehicleDetailsScreen` tiles. */
export const RadioRow: FC<RadioRowProps> = ({
  label,
  description,
  selected,
  onPress,
}) => (
  <Pressable
    accessibilityRole="radio"
    accessibilityState={{ selected }}
    onPress={onPress}
    style={({ pressed }) => [
      styles.row,
      selected ? styles.rowOn : styles.rowIdle,
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
);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 16,
    minHeight: 56,
    borderWidth: 2,
    width: '100%',
  },
  rowIdle: {
    backgroundColor: '#f9fafb',
    borderColor: '#f0f0f0',
  },
  rowOn: {
    backgroundColor: '#f7eaea',
    borderColor: RED,
  },
  circle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#d3d3d3',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  circleOn: {
    backgroundColor: RED,
    borderColor: RED,
  },
  textCol: {
    flex: 1,
    gap: 2,
  },
  label: {
    fontFamily: 'PublicSans_500Medium',
    fontSize: 16 * SCALE,
    color: colors.text,
    ...(Platform.OS === 'android' && { includeFontPadding: false }),
  },
  labelOn: {
    color: RED,
  },
  description: {
    fontFamily: 'PublicSans_500Medium',
    fontSize: 14 * SCALE,
    color: '#77878f',
    ...(Platform.OS === 'android' && { includeFontPadding: false }),
  },
  pressed: {
    opacity: 0.96,
  },
});
