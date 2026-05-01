import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { FC } from 'react';
import {
  Pressable,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { ProfileStackParamList } from '../navigation/types';
import {
  AppButton,
  AppCard,
  ScreenScaffold,
  SectionTitle,
  StatTile,
  Tag,
} from '../components/ui';
import { MOCK_REFERRALS } from '../mocks';
import { colors, fonts, radii, scaleFont, shadows, spacing } from '../theme';

type Props = NativeStackScreenProps<ProfileStackParamList, 'ReferEarn'>;

const STATUS_TONE: Record<string, 'success' | 'warning' | 'info' | 'danger' | 'primary'> = {
  Invited: 'warning',
  Joined: 'info',
  Active: 'primary',
  Paid: 'success',
};

/**
 * Spec #77 — Refer & earn with hero and referral list.
 */
export const ReferEarnScreen: FC<Props> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const code = 'EJ-TECH-49201';

  const share = () =>
    Share.share({
      message: `Join Electric Ji Technician — use code ${code} to get ₹500 bonus.`,
    }).catch((e: unknown) => console.warn('[share]', e));

  return (
    <ScreenScaffold>
      <View
        style={[
          styles.hero,
          shadows.md,
          { paddingTop: insets.top + spacing.md },
        ]}
      >
        <View style={styles.heroTop}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Back"
            onPress={() => navigation.goBack()}
            style={styles.backBtn}
          >
            <Ionicons name="chevron-back" size={20} color={colors.white} />
          </Pressable>
          <Text style={styles.heroTopTitle}>Refer & Earn</Text>
          <View style={styles.backBtn} />
        </View>
        <View style={styles.giftRing}>
          <Ionicons name="gift" size={36} color={colors.white} />
        </View>
        <Text style={styles.heroBig}>Earn ₹500 per friend</Text>
        <Text style={styles.heroSub}>
          Plus ₹500 bonus when they complete 5 jobs
        </Text>
        <View style={styles.codeCard}>
          <View style={styles.codeCol}>
            <Text style={styles.codeLabel}>Your code</Text>
            <Text style={styles.code}>{code}</Text>
          </View>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Share code"
            onPress={share}
            style={styles.copyBtn}
          >
            <Ionicons name="share-social" size={18} color={colors.primary} />
          </Pressable>
        </View>
      </View>

      <ScrollView
        style={styles.body}
        contentContainerStyle={styles.bodyContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.statRow}>
          <StatTile label="Invited" value="12" icon="paper-plane-outline" />
          <StatTile label="Joined" value="4" tone="success" icon="people-outline" />
          <StatTile label="Earned" value="₹1,000" tone="warning" icon="cash-outline" />
        </View>

        <SectionTitle title="Your referrals" caption={`${MOCK_REFERRALS.length} total`} />
        {MOCK_REFERRALS.map((r) => (
          <AppCard key={r.id}>
            <View style={styles.row}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                  {r.name.charAt(0).toUpperCase()}
                </Text>
              </View>
              <View style={styles.col}>
                <Text style={styles.name}>{r.name}</Text>
                <Text style={styles.reward}>{r.reward}</Text>
              </View>
              <Tag label={r.status} tone={STATUS_TONE[r.status] ?? 'primary'} />
            </View>
          </AppCard>
        ))}

        <AppButton
          label="Share invite link"
          onPress={share}
          block
          leftIcon={
            <Ionicons name="share-outline" size={16} color={colors.white} />
          }
        />
      </ScrollView>
    </ScreenScaffold>
  );
};

const styles = StyleSheet.create({
  hero: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg + 4,
    borderBottomLeftRadius: radii.hero,
    borderBottomRightRadius: radii.hero,
    alignItems: 'center',
    gap: spacing.xs,
  },
  heroTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
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
  heroTopTitle: {
    fontFamily: fonts.publicBold,
    fontSize: scaleFont(17),
    color: colors.white,
  },
  giftRing: {
    width: 76,
    height: 76,
    borderRadius: radii.pill,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: spacing.sm,
  },
  heroBig: {
    fontFamily: fonts.publicBold,
    fontSize: scaleFont(22),
    color: colors.white,
  },
  heroSub: {
    fontFamily: fonts.publicMedium,
    fontSize: scaleFont(13),
    color: 'rgba(255,255,255,0.85)',
    textAlign: 'center',
  },
  codeCard: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: radii.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 2,
    marginTop: spacing.md,
  },
  codeCol: { flex: 1, gap: 2 },
  codeLabel: {
    fontFamily: fonts.publicMedium,
    fontSize: scaleFont(11),
    color: colors.muted,
    letterSpacing: 0.4,
    textTransform: 'uppercase',
  },
  code: {
    fontFamily: fonts.publicBold,
    fontSize: scaleFont(18),
    color: colors.primary,
    letterSpacing: 1,
  },
  copyBtn: {
    width: 40,
    height: 40,
    borderRadius: radii.md,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: { flex: 1 },
  bodyContent: {
    padding: spacing.lg,
    gap: spacing.md,
    paddingBottom: spacing.xxxl,
  },
  statRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: radii.pill,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontFamily: fonts.publicBold,
    fontSize: scaleFont(15),
    color: colors.primary,
  },
  col: { flex: 1, gap: 2 },
  name: {
    fontFamily: fonts.publicSemiBold,
    fontSize: scaleFont(14),
    color: colors.text,
  },
  reward: {
    fontFamily: fonts.publicRegular,
    fontSize: scaleFont(12.5),
    color: colors.muted,
  },
});
