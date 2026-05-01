import { Ionicons } from '@expo/vector-icons';
import type { ComponentProps, FC } from 'react';
import { StyleSheet, Text, View, type ViewStyle } from 'react-native';
import { colors, fonts, radii, scaleFont, shadows, spacing } from '../../theme';

type IonName = ComponentProps<typeof Ionicons>['name'];

export type StatTileProps = {
  label: string;
  value: string;
  hint?: string;
  icon?: IonName;
  tone?: 'neutral' | 'success' | 'danger' | 'warning' | 'info';
  style?: ViewStyle;
};

const TONE_TEXT: Record<NonNullable<StatTileProps['tone']>, string> = {
  neutral: colors.text,
  success: colors.success,
  danger: colors.error,
  warning: colors.warningInk,
  info: colors.info,
};

const TONE_ICON_BG: Record<NonNullable<StatTileProps['tone']>, string> = {
  neutral: colors.primarySoft,
  success: colors.successSoft,
  danger: colors.errorSoft,
  warning: colors.warningSoft,
  info: colors.infoSoft,
};

const TONE_ICON_FG: Record<NonNullable<StatTileProps['tone']>, string> = {
  neutral: colors.primary,
  success: colors.success,
  danger: colors.error,
  warning: colors.warning,
  info: colors.info,
};

/**
 * Compact KPI tile — used for earnings, performance, jobs counts.
 */
export const StatTile: FC<StatTileProps> = ({
  label,
  value,
  hint,
  icon,
  tone = 'neutral',
  style,
}) => (
  <View style={[styles.tile, shadows.sm, style]}>
    {icon ? (
      <View
        style={[styles.iconWrap, { backgroundColor: TONE_ICON_BG[tone] }]}
      >
        <Ionicons name={icon} size={16} color={TONE_ICON_FG[tone]} />
      </View>
    ) : null}
    <Text style={styles.label}>{label}</Text>
    <Text style={[styles.value, { color: TONE_TEXT[tone] }]}>{value}</Text>
    {hint ? <Text style={styles.hint}>{hint}</Text> : null}
  </View>
);

const styles = StyleSheet.create({
  tile: {
    flex: 1,
    minWidth: 100,
    borderRadius: radii.lg,
    backgroundColor: colors.white,
    padding: spacing.md,
    gap: 4,
    borderWidth: 1,
    borderColor: 'rgba(216,217,221,0.45)',
  },
  iconWrap: {
    width: 28,
    height: 28,
    borderRadius: radii.sm,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xs,
  },
  label: {
    fontFamily: fonts.publicMedium,
    fontSize: scaleFont(11.5),
    color: colors.muted,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  value: {
    fontFamily: fonts.publicBold,
    fontSize: scaleFont(20),
  },
  hint: {
    fontFamily: fonts.publicRegular,
    fontSize: scaleFont(11.5),
    color: colors.muted,
  },
});
