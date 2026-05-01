import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { FC } from 'react';
import { useEffect, useRef, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import {
  Animated,
  Easing,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import type { JobsStackParamList } from '../navigation/types';
import {
  AppButton,
  AppCard,
  BottomCtaBar,
  ScreenHeader,
  ScreenScaffold,
  SectionTitle,
  Tag,
} from '../components/ui';
import { colors, fonts, radii, scaleFont, spacing } from '../theme';

type Props = NativeStackScreenProps<JobsStackParamList, 'JobSummary'>;

/**
 * Spec #32 — Job summary celebration + payout card + customer rating.
 */
export const JobSummaryScreen: FC<Props> = ({ navigation }) => {
  const [stars, setStars] = useState(5);
  const scale = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(scale, {
      toValue: 1,
      friction: 5,
      tension: 120,
      useNativeDriver: true,
    }).start();
  }, [scale]);

  return (
    <ScreenScaffold>
      <ScreenHeader title="Completed" />
      <ScrollView
        contentContainerStyle={styles.body}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.celebrate}>
          <Animated.View
            style={[styles.celebrateCircle, { transform: [{ scale }] }]}
          >
            <Ionicons name="checkmark" size={36} color={colors.white} />
          </Animated.View>
          <Text style={styles.h1}>Job completed!</Text>
          <Text style={styles.sub}>Great work — payout will reflect soon.</Text>
        </View>

        <AppCard tone="tinted">
          <Text style={styles.payoutLbl}>YOU EARNED</Text>
          <Text style={styles.payoutVal}>₹570</Text>
          <View style={styles.payoutMetaRow}>
            <Tag label="Pending payout" tone="warning" size="sm" />
            <Text style={styles.payoutMeta}>by tomorrow 6 PM</Text>
          </View>
        </AppCard>

        <SectionTitle title="Rate the customer" caption="Stays anonymous" />
        <AppCard>
          <View style={styles.starsRow}>
            {[1, 2, 3, 4, 5].map((s) => {
              const filled = s <= stars;
              return (
                <Pressable
                  key={s}
                  accessibilityRole="button"
                  accessibilityLabel={`${s} stars`}
                  onPress={() => setStars(s)}
                  style={({ pressed }) => [
                    pressed && { transform: [{ scale: 0.92 }] },
                  ]}
                >
                  <Ionicons
                    name={filled ? 'star' : 'star-outline'}
                    size={36}
                    color={filled ? '#f59e0b' : colors.border}
                  />
                </Pressable>
              );
            })}
          </View>
          <Text style={styles.starsTxt}>{labelForStars(stars)}</Text>
        </AppCard>

        <SectionTitle title="Quick actions" />
        <View style={styles.quickRow}>
          <QuickAction
            icon="document-text-outline"
            label="Invoice"
            onPress={() => {}}
          />
          <QuickAction
            icon="share-outline"
            label="Share"
            onPress={() => {}}
          />
          <QuickAction
            icon="flag-outline"
            label="Report"
            onPress={() => {}}
          />
        </View>
      </ScrollView>

      <BottomCtaBar floating>
        <AppButton
          label="Back to home"
          onPress={() =>
            navigation
              .getParent()
              ?.navigate('HomeTab', { screen: 'HomeMain' })
          }
          block
          rightIcon={
            <Ionicons name="home" size={16} color={colors.white} />
          }
        />
      </BottomCtaBar>
    </ScreenScaffold>
  );
};

const QuickAction: FC<{
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
}> = ({ icon, label, onPress }) => (
  <Pressable
    accessibilityRole="button"
    accessibilityLabel={label}
    onPress={onPress}
    style={({ pressed }) => [
      styles.quickTile,
      pressed && { transform: [{ scale: 0.98 }] },
    ]}
  >
    <Ionicons name={icon} size={20} color={colors.primary} />
    <Text style={styles.quickLbl}>{label}</Text>
  </Pressable>
);

const labelForStars = (s: number): string => {
  if (s >= 5) return 'Excellent customer ★';
  if (s >= 4) return 'Good experience';
  if (s >= 3) return 'Average';
  if (s >= 2) return 'Below average';
  return 'Poor';
};

const styles = StyleSheet.create({
  body: { padding: spacing.lg, gap: spacing.md, paddingBottom: 140 },
  celebrate: {
    alignItems: 'center',
    gap: spacing.xs,
    paddingVertical: spacing.md,
  },
  celebrateCircle: {
    width: 80,
    height: 80,
    borderRadius: radii.pill,
    backgroundColor: colors.success,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  h1: {
    fontFamily: fonts.publicBold,
    fontSize: scaleFont(22),
    color: colors.text,
  },
  sub: {
    fontFamily: fonts.publicMedium,
    fontSize: scaleFont(13.5),
    color: colors.muted,
  },
  payoutLbl: {
    fontFamily: fonts.publicBold,
    fontSize: scaleFont(11.5),
    color: colors.primary,
    letterSpacing: 0.6,
  },
  payoutVal: {
    fontFamily: fonts.publicBold,
    fontSize: scaleFont(34),
    color: colors.primary,
    marginTop: 2,
  },
  payoutMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  payoutMeta: {
    fontFamily: fonts.publicMedium,
    fontSize: scaleFont(12.5),
    color: colors.textSoft,
  },
  starsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: spacing.sm,
  },
  starsTxt: {
    fontFamily: fonts.publicSemiBold,
    fontSize: scaleFont(13.5),
    color: colors.textSoft,
    textAlign: 'center',
    marginTop: spacing.xs,
  },
  quickRow: { flexDirection: 'row', gap: spacing.sm },
  quickTile: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: radii.md,
    paddingVertical: spacing.md,
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  quickLbl: {
    fontFamily: fonts.publicSemiBold,
    fontSize: scaleFont(12.5),
    color: colors.text,
  },
});
