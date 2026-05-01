import type { FC } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { colors, spacing } from '../../theme';

export type AppToggleProps = {
  value: boolean;
  onValueChange: (v: boolean) => void;
  accessibilityLabel?: string;
};

/**
 * iOS-style switch track matching Home online toggle dimensions.
 */
export const AppToggle: FC<AppToggleProps> = ({
  value,
  onValueChange,
  accessibilityLabel = 'Toggle',
}) => (
  <Pressable
    accessibilityRole="switch"
    accessibilityState={{ checked: value }}
    accessibilityLabel={accessibilityLabel}
    onPress={() => onValueChange(!value)}
    style={[
      styles.track,
      value ? styles.trackOn : styles.trackOff,
    ]}
  >
    <View style={styles.knob} />
  </Pressable>
);

const styles = StyleSheet.create({
  track: {
    width: 53,
    height: 28,
    borderRadius: 119,
    padding: 2,
    justifyContent: 'center',
  },
  trackOn: {
    backgroundColor: colors.success,
    borderWidth: 0.5,
    borderColor: 'rgba(34,153,121,0.15)',
    alignItems: 'flex-end',
  },
  trackOff: {
    backgroundColor: colors.iconMuted,
    borderWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.1)',
    alignItems: 'flex-start',
  },
  knob: {
    width: 25,
    height: 25,
    borderRadius: 13,
    backgroundColor: colors.white,
  },
});
