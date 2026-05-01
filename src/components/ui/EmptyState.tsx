import { Ionicons } from '@expo/vector-icons';
import type { ComponentProps, FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, fonts, radii, scaleFont, spacing } from '../../theme';
import { AppButton } from './Button';

type IonName = ComponentProps<typeof Ionicons>['name'];

export type EmptyStateProps = {
  title: string;
  subtitle?: string;
  icon?: IonName;
  actionLabel?: string;
  onAction?: () => void;
};

/**
 * Centered empty list / pre-data placeholder with optional icon + CTA.
 */
export const EmptyState: FC<EmptyStateProps> = ({
  title,
  subtitle,
  icon = 'sparkles-outline',
  actionLabel,
  onAction,
}) => (
  <View style={styles.wrap} accessibilityRole="summary">
    <View style={styles.iconRing}>
      <Ionicons name={icon} size={28} color={colors.primary} />
    </View>
    <Text style={styles.title}>{title}</Text>
    {subtitle ? <Text style={styles.sub}>{subtitle}</Text> : null}
    {actionLabel && onAction ? (
      <View style={styles.btn}>
        <AppButton label={actionLabel} onPress={onAction} variant="outline" />
      </View>
    ) : null}
  </View>
);

const styles = StyleSheet.create({
  wrap: {
    paddingHorizontal: spacing.xxl,
    paddingVertical: spacing.xxxl,
    alignItems: 'center',
    gap: spacing.sm,
  },
  iconRing: {
    width: 64,
    height: 64,
    borderRadius: radii.pill,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  title: {
    fontFamily: fonts.publicBold,
    fontSize: scaleFont(18),
    color: colors.text,
    textAlign: 'center',
  },
  sub: {
    fontFamily: fonts.publicRegular,
    fontSize: scaleFont(14),
    color: colors.muted,
    textAlign: 'center',
    maxWidth: 280,
  },
  btn: {
    marginTop: spacing.md,
    width: '100%',
    maxWidth: 280,
  },
});
