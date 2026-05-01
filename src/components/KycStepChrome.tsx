import type { FC, ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { ProgressBar } from './ui/ProgressBar';
import { colors, fonts, radii, scaleFont, shadows, spacing } from '../theme';

export type KycStepChromeProps = {
  step: number;
  totalSteps?: number;
  title: string;
  subtitle?: string;
  onBack: () => void;
  onSkip?: () => void;
  /** Sticky bottom CTA (usually <AppButton>); avoids manual safe-area math. */
  footer?: ReactNode;
  children: ReactNode;
};

/**
 * Shared KYC layout: red-hero with back/skip, animated progress, scroll body
 * with optional sticky footer CTA.
 */
export const KycStepChrome: FC<KycStepChromeProps> = ({
  step,
  totalSteps = 10,
  title,
  subtitle,
  onBack,
  onSkip,
  footer,
  children,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.root}>
      <View
        style={[
          styles.hero,
          shadows.md,
          { paddingTop: insets.top + spacing.sm },
        ]}
      >
        <View style={styles.topRow}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Back"
            hitSlop={12}
            onPress={onBack}
            style={({ pressed }) => [
              styles.backBtn,
              pressed && styles.pressed,
            ]}
          >
            <Ionicons name="chevron-back" size={20} color={colors.white} />
          </Pressable>
          {onSkip ? (
            <Pressable onPress={onSkip} hitSlop={8} style={styles.skipBtn}>
              <Text style={styles.skip}>Skip for now</Text>
            </Pressable>
          ) : (
            <View style={styles.skipPlaceholder} />
          )}
        </View>
        <Text style={styles.heroTitle}>{title}</Text>
        {subtitle ? <Text style={styles.heroSubtitle}>{subtitle}</Text> : null}
        <View style={styles.progressWrap}>
          <ProgressBarLight step={step} totalSteps={totalSteps} />
        </View>
      </View>
      <View style={styles.body}>{children}</View>
      {footer ? <View style={styles.footer}>{footer}</View> : null}
    </View>
  );
};

/**
 * White-on-red progress variant for hero.
 */
const ProgressBarLight: FC<{ step: number; totalSteps: number }> = ({
  step,
  totalSteps,
}) => {
  const pct = Math.min(100, Math.max(0, (step / totalSteps) * 100));
  return (
    <View>
      <View style={styles.progressMeta}>
        <Text style={styles.progressLabel}>Step {step} of {totalSteps}</Text>
        <Text style={styles.progressLabel}>{Math.round(pct)}%</Text>
      </View>
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${pct}%` }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.pageBg,
  },
  hero: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg + 4,
    borderBottomLeftRadius: radii.hero,
    borderBottomRightRadius: radii.hero,
    gap: spacing.sm,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: radii.md,
    backgroundColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  skipBtn: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  skipPlaceholder: {
    width: 90,
  },
  heroTitle: {
    fontFamily: fonts.publicBold,
    fontSize: scaleFont(22),
    color: colors.white,
  },
  heroSubtitle: {
    fontFamily: fonts.publicMedium,
    fontSize: scaleFont(13),
    color: 'rgba(255,255,255,0.85)',
  },
  skip: {
    fontFamily: fonts.publicSemiBold,
    fontSize: scaleFont(13),
    color: colors.white,
  },
  progressWrap: {
    marginTop: spacing.sm,
  },
  progressMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  progressLabel: {
    fontFamily: fonts.publicSemiBold,
    fontSize: scaleFont(11),
    color: 'rgba(255,255,255,0.85)',
    letterSpacing: 0.4,
  },
  track: {
    height: 6,
    borderRadius: radii.xs,
    backgroundColor: 'rgba(255,255,255,0.25)',
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    backgroundColor: colors.white,
    borderRadius: radii.xs,
  },
  body: {
    flex: 1,
  },
  footer: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.md,
    backgroundColor: colors.white,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.borderLight,
  },
  pressed: {
    opacity: 0.85,
  },
});
