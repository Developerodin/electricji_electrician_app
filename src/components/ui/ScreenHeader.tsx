import { Ionicons } from '@expo/vector-icons';
import type { FC, ReactNode } from 'react';
import { Platform, Pressable, StatusBar, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, fonts, radii, shadows, spacing } from '../../theme';

export type ScreenHeaderProps = {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  right?: ReactNode;
  /** Render a red hero with rounded bottom (matches Home greeting block). */
  hero?: boolean;
  /** Force light text/icons (e.g. when overlaying photo). */
  light?: boolean;
};

/**
 * Top app bar — centered title (delivery `ScreenHeader` white band + hairline) or red rounded hero variant.
 */
export const ScreenHeader: FC<ScreenHeaderProps> = ({
  title,
  subtitle,
  onBack,
  right,
  hero = false,
  light = false,
}) => {
  const insets = useSafeAreaInsets();
  const topInset =
    insets.top ||
    (Platform.OS === 'ios' ? 56 : (StatusBar.currentHeight ?? 24) + 8);
  const lightText = light || hero;

  return (
    <View
      style={[
        {
          paddingTop: topInset + 6,
          paddingBottom: hero ? 22 : 14,
          paddingHorizontal: hero ? spacing.md : 10,
        },
        hero ? styles.wrapHero : styles.wrapWhite,
        hero && shadows.md,
      ]}
    >
      <View style={styles.row}>
        {onBack ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Back"
            hitSlop={12}
            onPress={onBack}
            style={({ pressed }) => [
              styles.back,
              hero && styles.backOnHero,
              pressed && styles.pressed,
            ]}
          >
            <Ionicons
              name="chevron-back"
              size={22}
              color={lightText ? colors.white : colors.text}
            />
          </Pressable>
        ) : (
          <View style={styles.sideSlot} />
        )}
        <View style={styles.titleCol} pointerEvents="none">
          <Text
            style={[styles.title, lightText && styles.titleLight]}
            numberOfLines={1}
          >
            {title}
          </Text>
          {subtitle ? (
            <Text
              style={[styles.subtitle, lightText && styles.subtitleLight]}
              numberOfLines={1}
            >
              {subtitle}
            </Text>
          ) : null}
        </View>
        <View style={styles.sideSlot}>{right}</View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapWhite: {
    backgroundColor: colors.white,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.borderLight,
  },
  wrapHero: {
    backgroundColor: colors.primary,
    borderBottomLeftRadius: radii.hero,
    borderBottomRightRadius: radii.hero,
  },
  row: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 36,
  },
  titleCol: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 48,
    gap: 2,
  },
  back: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  backOnHero: {
    width: 40,
    height: 40,
    borderRadius: radii.md,
    backgroundColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
    top: 2,
    left: 0,
  },
  sideSlot: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    minWidth: 44,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  title: {
    fontFamily: fonts.publicBold,
    fontSize: 18,
    color: colors.text,
    textAlign: 'center',
  },
  titleLight: {
    color: colors.white,
  },
  subtitle: {
    fontFamily: fonts.publicMedium,
    fontSize: 12,
    color: colors.muted,
    textAlign: 'center',
  },
  subtitleLight: {
    color: 'rgba(255,255,255,0.85)',
  },
  pressed: {
    opacity: 0.85,
  },
});
