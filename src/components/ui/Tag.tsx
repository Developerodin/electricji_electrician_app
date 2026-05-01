import type { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, fonts, radii, scaleFont, spacing } from '../../theme';

type TagTone =
  | 'neutral'
  | 'primary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info';

type TagSize = 'sm' | 'md';

export type TagProps = {
  label: string;
  tone?: TagTone;
  size?: TagSize;
};

const BG: Record<TagTone, string> = {
  neutral: colors.borderLight,
  primary: colors.primarySoft,
  success: colors.successSoft,
  warning: colors.warningSoft,
  danger: colors.errorSoft,
  info: colors.infoSoft,
};

const FG: Record<TagTone, string> = {
  neutral: colors.textSoft,
  primary: colors.primary,
  success: colors.success,
  warning: colors.warningInk,
  danger: colors.error,
  info: colors.info,
};

/**
 * Status pill (e.g. "Approved", "Pending", "Active").
 */
export const Tag: FC<TagProps> = ({ label, tone = 'neutral', size = 'md' }) => (
  <View
    style={[
      styles.wrap,
      size === 'sm' ? styles.wrapSm : styles.wrapMd,
      { backgroundColor: BG[tone] },
    ]}
  >
    <Text
      style={[
        size === 'sm' ? styles.labelSm : styles.labelMd,
        { color: FG[tone] },
      ]}
    >
      {label}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  wrap: {
    alignSelf: 'flex-start',
    borderRadius: radii.pill,
  },
  wrapMd: {
    paddingHorizontal: spacing.sm + 2,
    paddingVertical: 4,
  },
  wrapSm: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
  },
  labelMd: {
    fontFamily: fonts.publicSemiBold,
    fontSize: scaleFont(11.5),
    letterSpacing: 0.2,
  },
  labelSm: {
    fontFamily: fonts.publicSemiBold,
    fontSize: scaleFont(10.5),
    letterSpacing: 0.2,
  },
});
