import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { FC } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import type { HomeStackParamList } from '../navigation/types';
import {
  AppButton,
  AppCard,
  BottomCtaBar,
  ScreenHeader,
  ScreenScaffold,
  SectionTitle,
  StatTile,
  Tag,
} from '../components/ui';
import { colors, fonts, radii, scaleFont, spacing } from '../theme';

type Props = NativeStackScreenProps<HomeStackParamList, 'ScoreRecommendations'>;

const RECS: Array<{
  title: string;
  detail: string;
  severity: 'high' | 'med';
}> = [
  {
    title: 'Replace ageing MCB in kitchen DB',
    detail: '32A → 25A, kitchen sub-circuit shows browning at terminals',
    severity: 'high',
  },
  {
    title: 'Add earth continuity to geyser line',
    detail: 'Earth resistance > 5Ω; suggest dedicated 4mm² earth',
    severity: 'high',
  },
  {
    title: 'Tighten loose sockets in bedroom',
    detail: '3 sockets backplate movement detected during inspection',
    severity: 'med',
  },
];

/**
 * Spec #57 — Score & recommendations with hero score and prioritised list.
 */
export const ScoreRecommendationsScreen: FC<Props> = ({ navigation }) => (
  <ScreenScaffold>
    <ScreenHeader title="Inspection score" onBack={() => navigation.goBack()} />
    <ScrollView
      contentContainerStyle={styles.body}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.heroCard}>
        <Text style={styles.heroLbl}>OVERALL SCORE</Text>
        <Text style={styles.heroVal}>
          78<Text style={styles.heroValSmall}>/100</Text>
        </Text>
        <Tag label="Grade B · Good" tone="warning" />
      </View>

      <View style={styles.statRow}>
        <StatTile label="Pass" value="22" tone="success" icon="checkmark-circle-outline" />
        <StatTile label="Attention" value="5" tone="warning" icon="alert-circle-outline" />
        <StatTile label="Fail" value="3" tone="danger" icon="close-circle-outline" />
      </View>

      <SectionTitle title="Top recommendations" caption="Sorted by risk" />
      {RECS.map((r) => (
        <AppCard key={r.title}>
          <View style={styles.recRow}>
            <View
              style={[
                styles.recIcon,
                r.severity === 'high' && styles.recIconHigh,
              ]}
            >
              <Ionicons
                name={r.severity === 'high' ? 'warning' : 'alert-circle'}
                size={18}
                color={r.severity === 'high' ? colors.error : colors.warningInk}
              />
            </View>
            <View style={styles.recCol}>
              <Text style={styles.recTitle}>{r.title}</Text>
              <Text style={styles.recDetail}>{r.detail}</Text>
            </View>
            <Tag
              label={r.severity === 'high' ? 'High' : 'Medium'}
              tone={r.severity === 'high' ? 'danger' : 'warning'}
              size="sm"
            />
          </View>
        </AppCard>
      ))}
    </ScrollView>

    <BottomCtaBar floating>
      <AppButton
        label="Preview & send report"
        onPress={() => navigation.navigate('ReportPreviewSend')}
        block
        rightIcon={
          <Ionicons name="arrow-forward" size={16} color={colors.white} />
        }
      />
    </BottomCtaBar>
  </ScreenScaffold>
);

const styles = StyleSheet.create({
  body: { padding: spacing.lg, gap: spacing.md, paddingBottom: 140 },
  heroCard: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: radii.lg,
    padding: spacing.xl,
    gap: spacing.xs,
  },
  heroLbl: {
    fontFamily: fonts.publicBold,
    fontSize: scaleFont(11.5),
    color: 'rgba(255,255,255,0.85)',
    letterSpacing: 0.6,
  },
  heroVal: {
    fontFamily: fonts.publicBold,
    fontSize: scaleFont(56),
    color: colors.white,
    lineHeight: 60,
  },
  heroValSmall: {
    fontFamily: fonts.publicSemiBold,
    fontSize: scaleFont(20),
    color: 'rgba(255,255,255,0.85)',
  },
  statRow: { flexDirection: 'row', gap: spacing.sm },
  recRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  recIcon: {
    width: 38,
    height: 38,
    borderRadius: radii.md,
    backgroundColor: colors.warningSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  recIconHigh: { backgroundColor: colors.errorSoft },
  recCol: { flex: 1, gap: 2 },
  recTitle: {
    fontFamily: fonts.publicBold,
    fontSize: scaleFont(13.5),
    color: colors.text,
  },
  recDetail: {
    fontFamily: fonts.publicRegular,
    fontSize: scaleFont(12),
    color: colors.muted,
    lineHeight: 17,
  },
});
