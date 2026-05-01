import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { FC } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import type { HomeStackParamList } from '../navigation/types';
import { ScreenHeader } from '../components/ui/ScreenHeader';
import { MOCK_REVIEWS, TECHNICIAN_PROFILE } from '../mocks';
import { colors, fonts, scaleFont, spacing } from '../theme';

type Props = NativeStackScreenProps<HomeStackParamList, 'PerformanceOverview'>;

/**
 * Spec #60 — Performance overview.
 */
export const PerformanceOverviewScreen: FC<Props> = ({ navigation }) => (
  <View style={styles.root}>
    <ScreenHeader title="Performance" onBack={() => navigation.goBack()} />
    <ScrollView contentContainerStyle={styles.body}>
      <Text style={styles.score}>{TECHNICIAN_PROFILE.perfScore}/100</Text>
      <Text style={styles.grade}>Grade {TECHNICIAN_PROFILE.grade}</Text>
      <View style={styles.grid}>
        <Tile title="Avg rating" value={`${TECHNICIAN_PROFILE.rating} ★`} />
        <Tile title="Acceptance" value="92%" />
        <Tile title="Completion" value="98%" />
        <Tile title="On-time" value="89%" />
      </View>
      <Text style={styles.h2}>Recent reviews</Text>
      {MOCK_REVIEWS.slice(0, 4).map((r) => (
        <View key={r.id} style={styles.rev}>
          <Text style={styles.revTitle}>
            {r.customer} · {r.rating}★
          </Text>
          <Text style={styles.revBody}>{r.comment || 'No comment'}</Text>
        </View>
      ))}
    </ScrollView>
  </View>
);

function Tile({ title, value }: { title: string; value: string }) {
  return (
    <View style={styles.tile}>
      <Text style={styles.tileVal}>{value}</Text>
      <Text style={styles.tileLbl}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.pageBg },
  body: { padding: spacing.lg, gap: spacing.md, paddingBottom: 48 },
  score: {
    fontFamily: fonts.publicBold,
    fontSize: scaleFont(40),
    color: colors.text,
    textAlign: 'center',
  },
  grade: {
    fontFamily: fonts.publicSemiBold,
    fontSize: scaleFont(16),
    color: colors.success,
    textAlign: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    justifyContent: 'space-between',
  },
  tile: {
    width: '47%',
    backgroundColor: colors.white,
    borderRadius: 14,
    padding: spacing.md,
    gap: 4,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  tileVal: {
    fontFamily: fonts.publicBold,
    fontSize: scaleFont(18),
    color: colors.text,
  },
  tileLbl: {
    fontFamily: fonts.publicRegular,
    fontSize: scaleFont(12),
    color: colors.muted,
  },
  h2: {
    fontFamily: fonts.publicBold,
    fontSize: scaleFont(18),
    color: colors.text,
    marginTop: spacing.md,
  },
  rev: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.borderLight,
    gap: 4,
  },
  revTitle: {
    fontFamily: fonts.publicSemiBold,
    fontSize: scaleFont(14),
    color: colors.text,
  },
  revBody: {
    fontFamily: fonts.publicRegular,
    fontSize: scaleFont(13),
    color: colors.muted,
  },
});
