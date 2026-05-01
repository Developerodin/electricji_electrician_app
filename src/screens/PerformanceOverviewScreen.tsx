import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { FC } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import type { HomeStackParamList } from '../navigation/types';
import {
  AppCard,
  ScreenHeader,
  ScreenScaffold,
  SectionTitle,
  StatTile,
  Tag,
} from '../components/ui';
import { MOCK_REVIEWS, TECHNICIAN_PROFILE } from '../mocks';
import { colors, fonts, radii, scaleFont, spacing } from '../theme';

type Props = NativeStackScreenProps<HomeStackParamList, 'PerformanceOverview'>;

/**
 * Spec #60 — Performance overview with hero score and review list.
 */
export const PerformanceOverviewScreen: FC<Props> = ({ navigation }) => (
  <ScreenScaffold>
    <ScreenHeader title="Performance" onBack={() => navigation.goBack()} />
    <ScrollView
      contentContainerStyle={styles.body}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.hero}>
        <Text style={styles.heroLbl}>OVERALL SCORE</Text>
        <Text style={styles.heroVal}>
          {TECHNICIAN_PROFILE.perfScore}
          <Text style={styles.heroValMax}>/100</Text>
        </Text>
        <View style={styles.heroChips}>
          <Tag label={`Grade ${TECHNICIAN_PROFILE.grade}`} tone="success" />
          <Tag label="Top 8% in your zone" tone="warning" size="sm" />
        </View>
      </View>

      <View style={styles.statRow}>
        <StatTile
          label="Avg rating"
          value={`${TECHNICIAN_PROFILE.rating}`}
          hint="Last 30 days"
          icon="star-outline"
          tone="warning"
        />
        <StatTile
          label="Acceptance"
          value="92%"
          hint="Above target"
          icon="checkmark-done"
          tone="success"
        />
      </View>
      <View style={styles.statRow}>
        <StatTile
          label="Completion"
          value="98%"
          icon="trophy-outline"
          tone="success"
        />
        <StatTile
          label="On-time"
          value="89%"
          hint="Watch this metric"
          icon="time-outline"
        />
      </View>

      <SectionTitle
        title="Recent reviews"
        caption={`${MOCK_REVIEWS.length} customers`}
        trailingLabel="See all"
      />
      {MOCK_REVIEWS.slice(0, 4).map((r) => (
        <AppCard key={r.id}>
          <View style={styles.revHeader}>
            <View style={styles.avatar}>
              <Text style={styles.avatarTxt}>
                {r.customer.charAt(0).toUpperCase()}
              </Text>
            </View>
            <View style={styles.revCol}>
              <Text style={styles.revName}>{r.customer}</Text>
              <Text style={styles.revDate}>{r.date}</Text>
            </View>
            <View style={styles.starRow}>
              {Array.from({ length: 5 }).map((_, idx) => (
                <Ionicons
                  key={idx}
                  name={idx < r.rating ? 'star' : 'star-outline'}
                  size={14}
                  color={idx < r.rating ? '#f59e0b' : colors.border}
                />
              ))}
            </View>
          </View>
          {r.comment ? (
            <Text style={styles.revBody}>{r.comment}</Text>
          ) : (
            <Text style={styles.revEmpty}>No written feedback</Text>
          )}
        </AppCard>
      ))}
    </ScrollView>
  </ScreenScaffold>
);

const styles = StyleSheet.create({
  body: {
    padding: spacing.lg,
    gap: spacing.md,
    paddingBottom: spacing.xxxl,
  },
  hero: {
    backgroundColor: colors.primary,
    borderRadius: radii.lg,
    padding: spacing.xl,
    alignItems: 'center',
    gap: spacing.xs,
  },
  heroLbl: {
    fontFamily: fonts.publicBold,
    fontSize: scaleFont(11),
    color: 'rgba(255,255,255,0.85)',
    letterSpacing: 0.6,
  },
  heroVal: {
    fontFamily: fonts.publicBold,
    fontSize: scaleFont(54),
    color: colors.white,
    lineHeight: 60,
  },
  heroValMax: {
    fontFamily: fonts.publicSemiBold,
    fontSize: scaleFont(20),
    color: 'rgba(255,255,255,0.85)',
  },
  heroChips: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  statRow: { flexDirection: 'row', gap: spacing.sm },
  revHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: radii.pill,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarTxt: {
    fontFamily: fonts.publicBold,
    fontSize: scaleFont(14),
    color: colors.primary,
  },
  revCol: { flex: 1, gap: 2 },
  revName: {
    fontFamily: fonts.publicSemiBold,
    fontSize: scaleFont(13.5),
    color: colors.text,
  },
  revDate: {
    fontFamily: fonts.publicRegular,
    fontSize: scaleFont(11.5),
    color: colors.muted,
  },
  starRow: { flexDirection: 'row', gap: 2 },
  revBody: {
    fontFamily: fonts.publicRegular,
    fontSize: scaleFont(13),
    color: colors.textSoft,
    lineHeight: 19,
    marginTop: spacing.sm,
  },
  revEmpty: {
    fontFamily: fonts.publicRegular,
    fontSize: scaleFont(12.5),
    color: colors.mutedSoft,
    fontStyle: 'italic',
    marginTop: spacing.sm,
  },
});
