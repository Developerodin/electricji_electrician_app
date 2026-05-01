import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { FC } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import type { HomeStackParamList } from '../navigation/types';
import {
  AppCard,
  ScreenHeader,
  ScreenScaffold,
  Tag,
} from '../components/ui';
import { colors, fonts, radii, scaleFont, spacing } from '../theme';

type Props = NativeStackScreenProps<HomeStackParamList, 'WithdrawalHistory'>;

const ROWS = [
  { id: '1', amt: '₹2,000', date: '28 Apr', status: 'Processed', utr: 'UTR882131', tone: 'success' as const },
  { id: '2', amt: '₹4,500', date: '12 Apr', status: 'Failed', utr: 'Bank rejected', tone: 'danger' as const },
  { id: '3', amt: '₹1,800', date: '02 Apr', status: 'Processed', utr: 'UTR772019', tone: 'success' as const },
];

/**
 * Spec #39 — Withdrawal history list with status pills.
 */
export const WithdrawalHistoryScreen: FC<Props> = ({ navigation }) => (
  <ScreenScaffold>
    <ScreenHeader title="Withdrawals" onBack={() => navigation.goBack()} />
    <ScrollView
      contentContainerStyle={styles.list}
      showsVerticalScrollIndicator={false}
    >
      {ROWS.map((r) => (
        <AppCard key={r.id}>
          <View style={styles.row}>
            <View
              style={[
                styles.iconWrap,
                { backgroundColor: r.tone === 'success' ? colors.successSoft : colors.errorSoft },
              ]}
            >
              <Ionicons
                name={r.tone === 'success' ? 'checkmark-circle' : 'close-circle'}
                size={20}
                color={r.tone === 'success' ? colors.success : colors.error}
              />
            </View>
            <View style={styles.col}>
              <Text style={styles.amt}>{r.amt}</Text>
              <Text style={styles.meta}>{r.date}</Text>
              <Text style={styles.meta}>{r.utr}</Text>
            </View>
            <Tag label={r.status} tone={r.tone} />
          </View>
        </AppCard>
      ))}
    </ScrollView>
  </ScreenScaffold>
);

const styles = StyleSheet.create({
  list: {
    padding: spacing.lg,
    gap: spacing.md,
    paddingBottom: spacing.xxxl,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: radii.md,
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
});
