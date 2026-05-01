import { Ionicons } from '@expo/vector-icons';
import type { ComponentProps, FC, ReactNode } from 'react';
import { useRef } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, fonts, radii, scaleFont, spacing } from '../../theme';

type IonName = ComponentProps<typeof Ionicons>['name'];

export type ListRowProps = {
  title: string;
  subtitle?: string;
  icon?: IonName;
  onPress?: () => void;
  right?: ReactNode;
  showChevron?: boolean;
  danger?: boolean;
  /** Visually separate as the first/last in a stack (rounds outer corners). */
  position?: 'first' | 'last' | 'middle' | 'standalone';
};

/**
 * Settings / menu / profile row. Optional leading icon + animated press feedback.
 */
export const ListRow: FC<ListRowProps> = ({
  title,
  subtitle,
  icon,
  onPress,
  right,
  showChevron = true,
  danger = false,
  position = 'standalone',
}) => {
  const scale = useRef(new Animated.Value(1)).current;
  const animate = (v: number) =>
    Animated.spring(scale, {
      toValue: v,
      friction: 7,
      tension: 220,
      useNativeDriver: true,
    }).start();

  return (
    <Animated.View
      style={[
        styles.shell,
        position === 'first' && styles.first,
        position === 'last' && styles.last,
        position === 'middle' && styles.middle,
        { transform: [{ scale }] },
      ]}
    >
      <Pressable
        accessibilityRole={onPress ? 'button' : undefined}
        accessibilityLabel={title}
        onPress={onPress}
        onPressIn={onPress ? () => animate(0.99) : undefined}
        onPressOut={onPress ? () => animate(1) : undefined}
        style={({ pressed }) => [
          styles.row,
          pressed && onPress && styles.pressed,
        ]}
      >
        {icon ? (
          <View style={[styles.iconWrap, danger && styles.iconWrapDanger]}>
            <Ionicons
              name={icon}
              size={18}
              color={danger ? colors.error : colors.primary}
            />
          </View>
        ) : null}
        <View style={styles.textCol}>
          <Text
            style={[styles.title, danger && styles.titleDanger]}
            numberOfLines={1}
          >
            {title}
          </Text>
          {subtitle ? (
            <Text style={styles.sub} numberOfLines={2}>
              {subtitle}
            </Text>
          ) : null}
        </View>
        {right}
        {onPress && showChevron ? (
          <Ionicons
            name="chevron-forward"
            size={18}
            color={colors.mutedSoft}
          />
        ) : null}
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  shell: {
    backgroundColor: colors.white,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.borderLight,
  },
  first: {
    borderTopLeftRadius: radii.lg,
    borderTopRightRadius: radii.lg,
    overflow: 'hidden',
  },
  last: {
    borderBottomLeftRadius: radii.lg,
    borderBottomRightRadius: radii.lg,
    overflow: 'hidden',
    borderBottomWidth: 0,
  },
  middle: {},
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md + 2,
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
    minHeight: 56,
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: radii.md,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapDanger: {
    backgroundColor: colors.errorSoft,
  },
  textCol: {
    flex: 1,
    gap: 2,
  },
  title: {
    fontFamily: fonts.publicSemiBold,
    fontSize: scaleFont(15),
    color: colors.text,
  },
  titleDanger: {
    color: colors.error,
  },
  sub: {
    fontFamily: fonts.publicRegular,
    fontSize: scaleFont(12.5),
    color: colors.muted,
  },
  pressed: {
    backgroundColor: colors.surfaceAlt,
  },
});
