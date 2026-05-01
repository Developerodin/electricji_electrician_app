import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { FC } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import type { HomeStackParamList } from '../navigation/types';
import {
  AppCard,
  ScreenHeader,
  ScreenScaffold,
  SectionTitle,
  Tag,
} from '../components/ui';
import { MOCK_INSPECTIONS } from '../mocks';
import { colors, fonts, radii, scaleFont, spacing } from '../theme';

type Props = NativeStackScreenProps<HomeStackParamList, 'SafetyToolHome'>;

/**
 * Spec #55 — Safety tool home (start inspection + history).
 */
export const SafetyToolHomeScreen: FC<Props> = ({ navigation }) => (
  <ScreenScaffold>
    <ScreenHeader title="Safety tool" onBack={() => navigation.goBack()} />
    <ScrollView
      contentContainerStyle={styles.body}
      showsVerticalScrollIndicator={false}
    >
      <SectionTitle
        title="Start inspection"
        caption="Quick checklist for any wiring job"
      />
      <View style={styles.row}>
        <AppCard
          tone="tinted"
          style={styles.bigBtn}
          onPress={() => navigation.navigate('InspectionChecklist', {})}
        >
          <View style={styles.iconWrap}>
            <Ionicons name="construct" size={24} color={colors.primary} />
          </View>
          <Text style={styles.bigTitle}>After a job</Text>
          <Text style={styles.bigSub}>Use latest job context</Text>
        </AppCard>
        <AppCard
          style={styles.bigBtn}
          onPress={() => navigation.navigate('InspectionChecklist', {})}
        >
          <View style={styles.iconWrap}>
            <Ionicons name="shield-half" size={24} color={colors.primary} />
          </View>
          <Text style={styles.bigTitle}>Standalone</Text>
          <Text style={styles.bigSub}>Paid safety visit</Text>
        </AppCard>
      </View>

      <SectionTitle
        title="Past inspections"
        caption={`${MOCK_INSPECTIONS.length} reports`}
        trailingLabel="View all"
        onTrailingPress={() => navigation.navigate('InspectionHistory')}
      />
      {MOCK_INSPECTIONS.map((i) => (
        <AppCard
          key={i.id}
          onPress={() => navigation.navigate('InspectionHistory')}
        >
          <View style={styles.cardRow}>
            <View style={styles.smallIcon}>
              <Ionicons name="clipboard" size={18} color={colors.primary} />
            </View>
            <View style={styles.col}>
              <Text style={styles.cardTitle}>{i.customer}</Text>
              <Text style={styles.cardSub}>{i.date}</Text>
            </View>
            <Tag
              label={`Score ${i.score}`}
              tone={i.score >= 80 ? 'success' : i.score >= 60 ? 'warning' : 'danger'}
            />
          </View>
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
  row: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  bigBtn: {
    flex: 1,
    gap: spacing.xs,
    minHeight: 130,
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: radii.md,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xs,
  },
  bigTitle: {
    fontFamily: fonts.publicBold,
    fontSize: scaleFont(15),
    color: colors.text,
  },
  bigSub: {
    fontFamily: fonts.publicRegular,
    fontSize: scaleFont(12),
    color: colors.muted,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  smallIcon: {
    width: 36,
    height: 36,
    borderRadius: radii.md,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  col: { flex: 1, gap: 2 },
  cardTitle: {
    fontFamily: fonts.publicSemiBold,
    fontSize: scaleFont(14.5),
    color: colors.text,
  },
  cardSub: {
    fontFamily: fonts.publicRegular,
    fontSize: scaleFont(12.5),
    color: colors.muted,
  },
});
