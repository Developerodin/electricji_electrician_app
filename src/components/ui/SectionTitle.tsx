import type { FC, ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, fonts, scaleFont, spacing } from '../../theme';

export type SectionTitleProps = {
  title: string;
  caption?: string;
  trailingLabel?: string;
  onTrailingPress?: () => void;
  children?: ReactNode;
};

/**
 * Bold section header with optional trailing link / right slot.
 * Usage: <SectionTitle title="Recent jobs" trailingLabel="See all" onTrailingPress={...} />.
 */
export const SectionTitle: FC<SectionTitleProps> = ({
  title,
  caption,
  trailingLabel,
  onTrailingPress,
  children,
}) => (
  <View style={styles.wrap}>
    <View style={styles.row}>
      <View style={styles.textCol}>
        <Text style={styles.title}>{title}</Text>
        {caption ? <Text style={styles.caption}>{caption}</Text> : null}
      </View>
      {trailingLabel && onTrailingPress ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={trailingLabel}
          onPress={onTrailingPress}
          hitSlop={8}
        >
          <Text style={styles.trailing}>{trailingLabel}</Text>
        </Pressable>
      ) : (
        children
      )}
    </View>
  </View>
);

const styles = StyleSheet.create({
  wrap: {
    paddingTop: spacing.sm,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textCol: {
    flex: 1,
    gap: 2,
  },
  title: {
    fontFamily: fonts.publicBold,
    fontSize: scaleFont(17),
    color: colors.text,
  },
  caption: {
    fontFamily: fonts.publicRegular,
    fontSize: scaleFont(12.5),
    color: colors.muted,
  },
  trailing: {
    fontFamily: fonts.publicSemiBold,
    fontSize: scaleFont(13),
    color: colors.primary,
  },
});
