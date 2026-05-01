import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { FC } from 'react';
import { useMemo, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Polyline } from 'react-native-svg';
import type { HomeStackParamList } from '../navigation/types';
import {
  AppCard,
  ScreenScaffold,
  SectionTitle,
  SegmentedTabs,
  StatTile,
  Tag,
} from '../components/ui';
import { MOCK_COMPLETED_JOBS } from '../mocks';
import { colors, fonts, radii, scaleFont, shadows, spacing } from '../theme';

type Period = 'today' | 'week' | 'month' | 'custom';
type Props = NativeStackScreenProps<HomeStackParamList, 'EarningsOverview'>;

const TOTALS: Record<Period, { value: string; jobs: string; avg: string; tips: string; surge: string; chart: string }> = {
  today: {
    value: '₹4,820',
    jobs: '12',
    avg: '₹401',
    tips: '₹120',
    surge: '₹340',
    chart: '0,60 40,40 80,55 120,25 160,35 200,20 240,30 280,15 300,22',
  },
  week: {
    value: '₹18,400',
    jobs: '47',
    avg: '₹391',
    tips: '₹520',
    surge: '₹980',
    chart: '0,55 40,30 80,45 120,28 160,38 200,18 240,25 280,12 300,8',
  },
  month: {
    value: '₹62,300',
    jobs: '162',
    avg: '₹384',
    tips: '₹2,200',
    surge: '₹3,600',
    chart: '0,70 40,55 80,40 120,30 160,28 200,20 240,15 280,8 300,5',
  },
  custom: {
    value: '₹12,000',
    jobs: '32',
    avg: '₹375',
    tips: '₹260',
    surge: '₹500',
    chart: '0,50 40,42 80,40 120,30 160,32 200,28 240,22 280,20 300,18',
  },
};

/**
 * Spec #33 — Earnings overview with period tabs + sparkline + breakdown.
 */
export const EarningsScreen: FC<Props> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [period, setPeriod] = useState<Period>('today');
  const totals = useMemo(() => TOTALS[period], [period]);

  return (
    <ScreenScaffold>
      <View
        style={[
          styles.hero,
          shadows.md,
          { paddingTop: insets.top + spacing.md },
        ]}
      >
        <View style={styles.heroRow}>
          <View
            accessibilityRole="button"
            accessibilityLabel="Back"
            onTouchEnd={() => navigation.goBack()}
            style={styles.backBtn}
          >
            <Ionicons name="chevron-back" size={20} color={colors.white} />
          </View>
          <Text style={styles.heroTitle}>Earnings</Text>
          <View style={styles.backBtn} />
        </View>
        <Text style={styles.heroAmount}>{totals.value}</Text>
        <Text style={styles.heroCaption}>
          Total earned · {period === 'custom' ? 'last 30 days' : period}
        </Text>

        <View style={styles.chartCard}>
          <Svg height={64} width="100%" viewBox="0 0 300 80">
            <Polyline
              fill="none"
              stroke={colors.white}
              strokeWidth="3"
              strokeLinejoin="round"
              strokeLinecap="round"
              points={totals.chart}
            />
          </Svg>
        </View>
      </View>

      <ScrollView
        style={styles.body}
        contentContainerStyle={styles.bodyContent}
        showsVerticalScrollIndicator={false}
      >
        <SegmentedTabs
          options={[
            { id: 'today', label: 'Today' },
            { id: 'week', label: 'Week' },
            { id: 'month', label: 'Month' },
            { id: 'custom', label: 'Custom' },
          ]}
          value={period}
          onChange={setPeriod}
        />

        <View style={styles.statRow}>
          <StatTile label="Jobs" value={totals.jobs} icon="briefcase-outline" tone="info" />
          <StatTile label="Avg / job" value={totals.avg} icon="cash-outline" tone="success" />
        </View>
        <View style={styles.statRow}>
          <StatTile label="Tips" value={totals.tips} icon="heart-outline" tone="danger" />
          <StatTile label="Surge" value={totals.surge} icon="flash-outline" tone="warning" />
        </View>

        <SectionTitle
          title="Recent jobs"
          trailingLabel="View payouts"
          onTrailingPress={() => navigation.navigate('Payouts')}
        />

        {MOCK_COMPLETED_JOBS.map((j) => (
          <AppCard
            key={j.id}
            onPress={() =>
              navigation.navigate('JobEarningDetail', { jobId: j.id })
            }
          >
            <View style={styles.jobRow}>
              <View style={styles.jobIcon}>
                <Ionicons name="construct" size={18} color={colors.primary} />
              </View>
              <View style={styles.jobCol}>
                <Text style={styles.jobTitle}>{j.serviceType}</Text>
                <Text style={styles.jobSub}>
                  {j.customerName} · {j.date}
                </Text>
              </View>
              <View style={styles.jobAmtCol}>
                <Text style={styles.jobAmt}>{j.net}</Text>
                <Tag
                  label={j.status}
                  tone={j.status === 'Paid' ? 'success' : 'warning'}
                />
              </View>
            </View>
          </AppCard>
        ))}
      </ScrollView>
    </ScreenScaffold>
  );
};

const styles = StyleSheet.create({
  hero: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
    borderBottomLeftRadius: radii.hero,
    borderBottomRightRadius: radii.hero,
    gap: spacing.xs,
  },
  heroRow: {
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
  heroTitle: {
    fontFamily: fonts.publicBold,
    fontSize: scaleFont(17),
    color: colors.white,
  },
  heroAmount: {
    fontFamily: fonts.publicBold,
    fontSize: scaleFont(36),
    color: colors.white,
    marginTop: spacing.xs,
  },
  heroCaption: {
    fontFamily: fonts.publicMedium,
    fontSize: scaleFont(13),
    color: 'rgba(255,255,255,0.85)',
  },
  chartCard: {
    marginTop: spacing.md,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: radii.lg,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm,
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
  jobRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  jobIcon: {
    width: 40,
    height: 40,
    borderRadius: radii.md,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  jobCol: { flex: 1, gap: 2 },
  jobTitle: {
    fontFamily: fonts.publicSemiBold,
    fontSize: scaleFont(14.5),
    color: colors.text,
  },
  jobSub: {
    fontFamily: fonts.publicRegular,
    fontSize: scaleFont(12.5),
    color: colors.muted,
  },
  jobAmtCol: {
    alignItems: 'flex-end',
    gap: 4,
  },
  jobAmt: {
    fontFamily: fonts.publicBold,
    fontSize: scaleFont(16),
    color: colors.text,
  },
});
