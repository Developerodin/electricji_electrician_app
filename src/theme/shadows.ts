import { Platform, type ViewStyle } from 'react-native';
import { colors } from './colors';

/**
 * Soft elevation tokens that match the approved delivery-app card stack.
 * Each style merges iOS shadow + Android elevation in one object.
 */
type ShadowStyle = Pick<
  ViewStyle,
  | 'shadowColor'
  | 'shadowOffset'
  | 'shadowOpacity'
  | 'shadowRadius'
  | 'elevation'
>;

const make = (
  offsetY: number,
  radius: number,
  opacity: number,
  elevation: number,
): ShadowStyle => ({
  shadowColor: colors.shadow,
  shadowOffset: { width: 0, height: offsetY },
  shadowOpacity: opacity,
  shadowRadius: radius,
  ...(Platform.OS === 'android' ? { elevation } : null),
});

export const shadows = {
  sm: make(1, 4, 0.06, 1),
  md: make(2, 8, 0.08, 3),
  lg: make(4, 14, 0.12, 6),
  hero: make(7, 13, 0.14, 8),
  pressedNudge: make(0, 2, 0.04, 0),
} as const;

export const radii = {
  xs: 6,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  hero: 32,
  pill: 999,
} as const;
