import { Dimensions } from 'react-native';

/** Figma reference width for proportional scaling */
export const DESIGN_W = 412;

const { width: SCREEN_W } = Dimensions.get('window');

/**
 * Maps logical width to device scale for typography/icon sizing.
 */
export function scaleFont(base: number): number {
  return base * (SCREEN_W / DESIGN_W);
}

export const contentMaxWidth = Math.min(380, SCREEN_W - 32);
