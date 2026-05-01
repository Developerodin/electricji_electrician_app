import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { FC } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import type { HomeStackParamList } from '../navigation/types';
import {
  AppButton,
  AppCard,
  BottomCtaBar,
  ScreenHeader,
  ScreenScaffold,
  SectionTitle,
  Tag,
} from '../components/ui';
import { MOCK_COMPLETED_JOBS } from '../mocks';
import { colors, fonts, radii, scaleFont, spacing } from '../theme';

type Props = NativeStackScreenProps<HomeStackParamList, 'JobEarningDetail'>;

type Line = { label: string; value: string; negative?: boolean };

const BREAKDOWN: Line[] = [
  { label: 'Base service', value: '₹350' },
  { label: 'Parts revenue', value: '₹120' },
  { label: 'Surge', value: '₹100' },
  { label: 'Tip', value: '₹40' },
  { label: 'Platform fee', value: '−₹40', negative: true },
  { label: 'GST', value: '−₹102.6', negative: true },
];

/**
 * Spec #34 — Job earning breakdown.
 */
export const JobEarningDetailScreen: FC<Props> = ({ navigation, route }) => {
  const job =
    MOCK_COMPLETED_JOBS.find((j) => j.id === route.params.jobId) ??
    MOCK_COMPLETED_JOBS[0];

  return (
    <ScreenScaffold>
      <ScreenHeader title="Job earnings" onBack={() => navigation.goBack()} />
      <ScrollView
        contentContainerStyle={styles.body}
        showsVerticalScrollIndicator={false}
      >
        <AppCard tone="tinted" style={styles.summary}>
          <View style={styles.summaryRow}>
            <View style={styles.iconWrap}>
              <Ionicons name="construct" size={22} color={colors.primary} />
            </View>
            <View style={styles.summaryCol}>
              <Text style={styles.id}>Job · #{job.id}</Text>
              <Text style={styles.title}>{job.serviceType}</Text>
              <Text style={styles.meta}>
                {job.customerName} · {job.date}
              </Text>
            </View>
            <Tag
              label={job.status}
              tone={job.status === 'Paid' ? 'success' : 'warning'}
            />
          </View>
        </AppCard>

        <SectionTitle title="Breakdown" />
        <AppCard padded={false}>
          {BREAKDOWN.map((l, i) => (
            <View
              key={l.label}
              style={[
                styles.line,
                i < BREAKDOWN.length - 1 && styles.lineDivider,
              ]}
            >
              <Text style={styles.lineLabel}>{l.label}</Text>
              <Text
                style={[
                  styles.lineValue,
                  l.negative && styles.lineValueNeg,
                ]}
              >
                {l.value}
              </Text>
            </View>
          ))}
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Net earnings</Text>
            <Text style={styles.totalValue}>{job.net}</Text>
          </View>
        </AppCard>
      </ScrollView>
      <BottomCtaBar>
        <AppButton
          label="Download invoice"
          variant="outline"
          onPress={() => {}}
          block
          leftIcon={
            <Ionicons name="download-outline" size={16} color={colors.text} />
          }
        />
      </BottomCtaBar>
    </ScreenScaffold>
  );
};

const styles = StyleSheet.create({
  body: {
    padding: spacing.lg,
    gap: spacing.md,
    paddingBottom: spacing.xxxl,
  },
  summary: { paddingVertical: spacing.md },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: radii.md,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  summaryCol: { flex: 1, gap: 2 },
  id: {
    fontFamily: fonts.publicSemiBold,
    fontSize: scaleFont(11.5),
    color: colors.muted,
    letterSpacing: 0.4,
    textTransform: 'uppercase',
  },
  title: {
    fontFamily: fonts.publicBold,
    fontSize: scaleFont(16),
    color: colors.text,
  },
  meta: {
    fontFamily: fonts.publicRegular,
    fontSize: scaleFont(12.5),
    color: colors.muted,
  },
  line: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md - 2,
  },
  lineDivider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.borderLight,
  },
  lineLabel: {
    fontFamily: fonts.publicMedium,
    fontSize: scaleFont(13.5),
    color: colors.muted,
  },
  lineValue: {
    fontFamily: fonts.publicSemiBold,
    fontSize: scaleFont(13.5),
    color: colors.text,
  },
  lineValueNeg: {
    color: colors.error,
  },
  totalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md + 2,
    backgroundColor: colors.successSoft,
  },
  totalLabel: {
    fontFamily: fonts.publicBold,
    fontSize: scaleFont(14),
    color: colors.success,
  },
  totalValue: {
    fontFamily: fonts.publicBold,
    fontSize: scaleFont(20),
    color: colors.success,
  },
});
