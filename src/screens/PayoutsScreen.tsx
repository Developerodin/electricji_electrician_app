import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { FC } from 'react';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import type { HomeStackParamList } from '../navigation/types';
import {
  AppCard,
  EmptyState,
  ScreenHeader,
  ScreenScaffold,
  SegmentedTabs,
  Tag,
} from '../components/ui';
import { MOCK_PAYOUTS } from '../mocks';
import { colors, fonts, radii, scaleFont, spacing } from '../theme';

type Props = NativeStackScreenProps<HomeStackParamList, 'Payouts'>;

/**
 * Spec #35 — Payouts (pending / completed) with status pills.
 */
export const PayoutsScreen: FC<Props> = ({ navigation }) => {
  const [tab, setTab] = useState<'Pending' | 'Completed'>('Pending');
  const rows = MOCK_PAYOUTS.filter((p) =>
    tab === 'Pending' ? p.state === 'Pending' : p.state === 'Completed',
  );

  return (
    <ScreenScaffold>
      <ScreenHeader title="Payouts" onBack={() => navigation.goBack()} />
      <View style={styles.tabsWrap}>
        <SegmentedTabs
          options={[
            { id: 'Pending', label: 'Pending' },
            { id: 'Completed', label: 'Completed' },
          ]}
          value={tab}
          onChange={setTab}
        />
      </View>
      <ScrollView
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      >
        {rows.length === 0 ? (
          <EmptyState
            icon="cash-outline"
            title={`No ${tab.toLowerCase()} payouts`}
            subtitle="Completed jobs will appear here once payouts are released."
          />
        ) : (
          rows.map((p) => (
            <AppCard key={p.id}>
              <View style={styles.row}>
                <View style={styles.iconWrap}>
                  <Ionicons
                    name={tab === 'Pending' ? 'hourglass-outline' : 'checkmark-circle'}
                    size={20}
                    color={tab === 'Pending' ? colors.warning : colors.success}
                  />
                </View>
                <View style={styles.col}>
                  <Text style={styles.amt}>{p.amount}</Text>
                  <Text style={styles.meta}>
                    Earned {p.earnedDate} · Payout {p.payoutDate}
                  </Text>
                  {p.utr ? (
                    <Text style={styles.meta}>UTR · {p.utr}</Text>
                  ) : null}
                </View>
                <Tag
                  label={tab === 'Pending' ? 'Pending' : 'Paid'}
                  tone={tab === 'Pending' ? 'warning' : 'success'}
                />
              </View>
              {p.gapHold ? (
                <View style={styles.gapRow}>
                  <Ionicons name="alert-circle-outline" size={14} color={colors.warning} />
                  <Text style={styles.gap}>{p.gapHold}</Text>
                </View>
              ) : null}
            </AppCard>
          ))
        )}
      </ScrollView>
    </ScreenScaffold>
  );
};

const styles = StyleSheet.create({
  tabsWrap: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
  },
  list: {
    padding: spacing.lg,
    gap: spacing.md,
    paddingBottom: spacing.xxxl,
  },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: radii.md,
    backgroundColor: colors.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },
  col: { flex: 1, gap: 2 },
  amt: {
    fontFamily: fonts.publicBold,
    fontSize: scaleFont(18),
    color: colors.text,
  },
  meta: {
    fontFamily: fonts.publicRegular,
    fontSize: scaleFont(12.5),
    color: colors.muted,
  },
  gapRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: spacing.sm,
    paddingTop: spacing.sm,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.borderLight,
  },
  gap: {
    fontFamily: fonts.publicSemiBold,
    fontSize: scaleFont(12.5),
    color: colors.warningInk,
  },
});
