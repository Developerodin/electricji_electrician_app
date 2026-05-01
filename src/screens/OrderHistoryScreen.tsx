import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { FC } from 'react';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import type { WholesaleStackParamList } from '../navigation/types';
import {
  AppCard,
  EmptyState,
  ScreenHeader,
  ScreenScaffold,
  SegmentedTabs,
  Tag,
} from '../components/ui';
import { MOCK_ORDERS } from '../mocks';
import { colors, fonts, radii, scaleFont, spacing } from '../theme';

type Props = NativeStackScreenProps<WholesaleStackParamList, 'OrderHistory'>;

type Filter = 'active' | 'completed' | 'cancelled';

const TONE: Record<string, 'warning' | 'success' | 'info' | 'danger'> = {
  Active: 'warning',
  Delivered: 'success',
  Cancelled: 'danger',
};

/**
 * Spec #48 — Order history grouped by status.
 */
export const OrderHistoryScreen: FC<Props> = ({ navigation }) => {
  const [filter, setFilter] = useState<Filter>('active');

  const visible = MOCK_ORDERS.filter((o) => {
    if (filter === 'active') return o.status === 'Active';
    if (filter === 'completed') return o.status === 'Delivered';
    return o.status === 'Cancelled';
  });

  return (
    <ScreenScaffold>
      <ScreenHeader title="My orders" onBack={() => navigation.goBack()} />
      <View style={styles.tabsWrap}>
        <SegmentedTabs
          options={[
            { id: 'active', label: 'Active' },
            { id: 'completed', label: 'Completed' },
            { id: 'cancelled', label: 'Cancelled' },
          ]}
          value={filter}
          onChange={setFilter}
        />
      </View>
      <ScrollView
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      >
        {visible.length === 0 ? (
          <EmptyState
            icon="receipt-outline"
            title="No orders here yet"
            subtitle="Your past orders will appear in this tab."
          />
        ) : (
          visible.map((o) => (
            <AppCard
              key={o.id}
              onPress={() =>
                navigation.navigate('OrderTracking', { orderId: o.id })
              }
            >
              <View style={styles.row}>
                <View style={styles.iconWrap}>
                  <Ionicons name="cube" size={18} color={colors.primary} />
                </View>
                <View style={styles.col}>
                  <Text style={styles.id}>{o.id}</Text>
                  <Text style={styles.meta}>{o.date}</Text>
                </View>
                <Tag label={o.status} tone={TONE[o.status] ?? 'info'} />
              </View>
              <View style={styles.footer}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalValue}>{o.total}</Text>
              </View>
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
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  col: { flex: 1, gap: 2 },
  id: {
    fontFamily: fonts.publicBold,
    fontSize: scaleFont(15),
    color: colors.text,
  },
  meta: {
    fontFamily: fonts.publicRegular,
    fontSize: scaleFont(12.5),
    color: colors.muted,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.sm,
    paddingTop: spacing.sm,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.borderLight,
  },
  totalLabel: {
    fontFamily: fonts.publicMedium,
    fontSize: scaleFont(12.5),
    color: colors.muted,
  },
  totalValue: {
    fontFamily: fonts.publicBold,
    fontSize: scaleFont(15),
    color: colors.text,
  },
});
