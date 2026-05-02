import type { FC, ReactNode } from 'react';
import {
  Alert,
  Dimensions,
  Image,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const DESIGN_W = 412;
const RED = '#d9232d';
const TEXT = '#202020';
const SUBTLE = '#77878f';
const { width: SCREEN_W } = Dimensions.get('window');
const SCALE = SCREEN_W / DESIGN_W;

export type KycStepChromeProps = {
  step: number;
  totalSteps?: number;
  title: string;
  subtitle?: string;
  onBack: () => void;
  /** Replaces Help on the trailing header slot. */
  onSkip?: () => void;
  onHelp?: () => void;
  /** Sticky footer (use `KycDeliveryPrimaryButton`). */
  footer?: ReactNode;
  children: ReactNode;
};

/**
 * KYC chrome aligned with delivery `VehicleDetailsScreen` header + grey body +
 * delivery `KycVerificationScreen`-style footer CTA spacing.
 */
export const KycStepChrome: FC<KycStepChromeProps> = ({
  step,
  totalSteps = 10,
  title,
  subtitle,
  onBack,
  onSkip,
  onHelp,
  footer,
  children,
}) => {
  const insets = useSafeAreaInsets();
  const pct = Math.min(100, Math.max(0, (step / totalSteps) * 100));
  const pctRounded = Math.round(pct);
  const pctLabel =
    pctRounded >= 100
      ? '100% complete'
      : pctRounded <= 0
        ? '0% complete'
        : `${pctRounded}% complete`;

  const footerBottomPad = 16 + insets.bottom;

  const handleHelp =
    onHelp ??
    (() =>
      Alert.alert(
        'Help',
        'For assistance with onboarding, please contact ElectricJi support.',
      ));

  /** Same rule as `OnboardingIntroScreen` topBar (`useLoginScreenChrome` inset + modest gap). */
  const topPad = insets.top + Math.max(8, 12 * SCALE);

  return (
    <View style={styles.root}>
      <View style={styles.sheet}>
        <View style={styles.headerWrap}>
          <View style={[styles.headerRow, styles.headerRowPad, { paddingTop: topPad }]}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Go back"
              hitSlop={12}
              onPress={onBack}
              style={styles.headerSide}
            >
              <Image
                accessibilityIgnoresInvertColors
                source={require('../../assets/login/icon-back.png')}
                style={styles.backIcon}
                resizeMode="contain"
              />
            </Pressable>
            <Text style={styles.headerTitle} numberOfLines={1}>
              {title}
            </Text>
            {onSkip ? (
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Skip"
                hitSlop={8}
                onPress={onSkip}
                style={styles.skipTrailing}
              >
                <Text style={styles.skipTrailingText}>Skip for now</Text>
              </Pressable>
            ) : (
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Help"
                hitSlop={12}
                onPress={handleHelp}
                style={[styles.headerSide, styles.helpSlot]}
              >
                <Image
                  accessibilityIgnoresInvertColors
                  source={require('../../assets/personal-info/icon-help.png')}
                  style={styles.helpIcon}
                  resizeMode="contain"
                />
              </Pressable>
            )}
          </View>
          <View style={styles.headerDivider} />
          <View style={styles.progressBlock}>
            <View style={styles.stepRow}>
              <Text style={styles.stepLabel}>
                Step {step} of {totalSteps}
              </Text>
              <Text style={styles.stepPercent}>{pctLabel}</Text>
            </View>
            <View style={styles.progressTrack}>
              <View style={[styles.progressFill, { width: `${pct}%` }]} />
            </View>
          </View>
        </View>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {subtitle ? (
            <>
              <View style={styles.sectionIntro}>
                <Text style={styles.uploadHint}>{subtitle}</Text>
              </View>
              <View style={styles.introDivider} />
            </>
          ) : null}
          <View style={styles.stack}>{children}</View>
          <View style={{ height: 100 + insets.bottom }} />
        </ScrollView>

        {footer ? (
          <View style={[styles.footer, { paddingBottom: footerBottomPad }]}>
            {footer}
          </View>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#f6f6f8',
  },
  sheet: {
    flex: 1,
  },
  headerWrap: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    alignSelf: 'stretch',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: 412,
    width: '100%',
    alignSelf: 'center',
  },
  headerRowPad: {
    paddingHorizontal: 16,
  },
  headerDivider: {
    marginTop: 10,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#e4e6ea',
    width: '100%',
  },
  progressBlock: {
    width: '100%',
    maxWidth: 412,
    alignSelf: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 16,
    gap: 7,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    maxWidth: 380,
    width: '100%',
    alignSelf: 'center',
  },
  stepLabel: {
    fontFamily: 'PublicSans_500Medium',
    fontSize: 14 * SCALE,
    color: TEXT,
    ...(Platform.OS === 'android' && { includeFontPadding: false }),
  },
  stepPercent: {
    fontFamily: 'PublicSans_500Medium',
    fontSize: 14 * SCALE,
    color: SUBTLE,
    ...(Platform.OS === 'android' && { includeFontPadding: false }),
  },
  progressTrack: {
    height: 10,
    borderRadius: 12,
    backgroundColor: '#eaeff2',
    overflow: 'hidden',
    width: '100%',
    maxWidth: 380,
    alignSelf: 'center',
  },
  progressFill: {
    height: 10,
    borderRadius: 12,
    backgroundColor: RED,
  },
  headerSide: {
    width: 40,
    justifyContent: 'center',
    minHeight: 28,
  },
  skipTrailing: {
    minWidth: 40,
    maxWidth: 108,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingLeft: 4,
  },
  skipTrailingText: {
    fontFamily: 'PublicSans_600SemiBold',
    fontSize: 13 * SCALE,
    color: SUBTLE,
    textAlign: 'right',
    ...(Platform.OS === 'android' && { includeFontPadding: false }),
  },
  helpSlot: {
    alignItems: 'flex-end',
  },
  helpIcon: {
    width: 28,
    height: 28,
  },
  backIcon: {
    width: 24,
    height: 24,
  },
  headerTitle: {
    flex: 1,
    fontFamily: 'PublicSans_700Bold',
    color: '#000000',
    fontSize: 18 * SCALE,
    textAlign: 'center',
    ...(Platform.OS === 'android' && { includeFontPadding: false }),
  },
  scroll: {
    flex: 1,
    backgroundColor: '#f6f6f8',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 24,
    maxWidth: 380 + 32,
    width: '100%',
    alignSelf: 'center',
    paddingBottom: 8,
  },
  stack: {
    gap: 24,
    width: '100%',
    maxWidth: 380,
    alignSelf: 'center',
  },
  sectionIntro: {
    gap: 4,
    marginBottom: 4,
    maxWidth: 380,
    width: '100%',
    alignSelf: 'center',
  },
  uploadHint: {
    fontFamily: 'PublicSans_500Medium',
    fontSize: 14 * SCALE,
    lineHeight: Math.round(14 * SCALE * 1.45),
    color: SUBTLE,
    ...(Platform.OS === 'android' && { includeFontPadding: false }),
  },
  introDivider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#e4e6ea',
    width: '100%',
    maxWidth: 380,
    alignSelf: 'center',
    marginBottom: 8,
  },
  footer: {
    paddingHorizontal: 16,
    paddingTop: 12,
    backgroundColor: '#FFFFFF',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#f0f0f0',
  },
});
