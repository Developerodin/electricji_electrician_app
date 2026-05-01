import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { FC } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import type { HomeStackParamList } from '../navigation/types';
import {
  AppCard,
  EmptyState,
  ScreenHeader,
  ScreenScaffold,
  SectionTitle,
  Tag,
} from '../components/ui';
import { MOCK_INSPECTIONS } from '../mocks';
import { colors, fonts, radii, scaleFont, spacing } from '../theme';

type Props = NativeStackScreenProps<HomeStackParamList, 'InspectionHistory'>;

const tone = (s: number): 'success' | 'warning' | 'danger' => {
  if (s >= 85) return 'success';
  if (s >= 70) return 'warning';
  return 'danger';
};

const grade = (s: number): string => {
  if (s >= 85) return 'A';
  if (s >= 70) return 'B';
  if (s >= 55) return 'C';
  return 'D';
};

/**
 * Spec #59 — Inspection history list with score chips.
 */
export const InspectionHistoryScreen: FC<Props> = ({ navigation }) => (
  <ScreenScaffold>
    <ScreenHeader
      title="Inspection history"
      onBack={() => navigation.goBack()}
    />
    <ScrollView
      contentContainerStyle={styles.list}
      showsVerticalScrollIndicator={false}
    >
      <SectionTitle
        title="All reports"
        caption={`${MOCK_INSPECTIONS.length} inspections`}
      />
      {MOCK_INSPECTIONS.length === 0 ? (
        <EmptyState
          icon="document-text-outline"
          title="No inspections yet"
          subtitle="Start a safety inspection from the Safety menu."
        />
      ) : (
        MOCK_INSPECTIONS.map((i) => (
          <AppCard
            key={i.id}
            onPress={() => navigation.navigate('ReportPreviewSend')}
          >
            <View style={styles.row}>
              <View style={styles.scoreCircle}>
                <Text style={styles.scoreVal}>{i.score}</Text>
                <Text style={styles.scoreUnit}>{grade(i.score)}</Text>
              </View>
              <View style={styles.col}>
                <Text style={styles.cust}>{i.customer}</Text>
                <Text style={styles.meta}>{i.date}</Text>
              </View>
              <Tag
                label={`${i.score}/100`}
                tone={tone(i.score)}
                size="sm"
              />
              <Ionicons
                name="chevron-forward"
                size={16}
                color={colors.muted}
              />
            </View>
          </AppCard>
        ))
      )}
    </ScrollView>
  </ScreenScaffold>
);

const styles = StyleSheet.create({
  list: {
    padding: spacing.lg,
    gap: spacing.sm,
    paddingBottom: spacing.xxxl,
  },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  scoreCircle: {
    width: 52,
    height: 52,
    borderRadius: radii.pill,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreVal: {
    fontFamily: fonts.publicBold,
    fontSize: scaleFont(15),
    color: colors.primary,
    lineHeight: 17,
  },
  scoreUnit: {
    fontFamily: fonts.publicSemiBold,
    fontSize: scaleFont(10),
    color: colors.primary,
    letterSpacing: 0.4,
  },
  col: { flex: 1, gap: 2 },
  cust: {
    fontFamily: fonts.publicBold,
    fontSize: scaleFont(14.5),
    color: colors.text,
  },
  meta: {
    fontFamily: fonts.publicRegular,
    fontSize: scaleFont(12),
    color: colors.muted,
  },
});
