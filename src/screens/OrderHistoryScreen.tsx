import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { FC } from 'react';
import { useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import type { WholesaleStackParamList } from '../navigation/types';
import {
  AppCard,
  EmptyState,
  ScreenHeader,
  ScreenScaffold,
  Tag,
} from '../components/ui';
import { MOCK_ORDERS } from '../mocks';
import {
  colors,
  contentMaxWidth,
  DESIGN_W,
  fonts,
  radii,
  scaleFont,
  spacing,
} from '../theme';

type Props = NativeStackScreenProps<WholesaleStackParamList, 'OrderHistory'>;

type Filter = 'active' | 'completed' | 'cancelled';

const TONE: Record<string, 'warning' | 'success' | 'info' | 'danger'> = {
  Active: 'warning',
  Delivered: 'success',
  Cancelled: 'danger',
};

const SEGMENTS: { id: Filter; label: string }[] = [
  { id: 'active', label: 'Active' },
  { id: 'completed', label: 'Completed' },
  { id: 'cancelled', label: 'Cancelled' },
];

const CARD_MAX = contentMaxWidth;
const TILE_BORDER = 'rgba(216,217,221,0.16)';

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
      <View style={styles.segmentSection}>
        <View style={styles.segmentTrack}>
          {SEGMENTS.map((seg) => {
            const active = filter === seg.id;
            return (
              <Pressable
                key={seg.id}
                accessibilityRole="button"
                accessibilityState={{ selected: active }}
                onPress={() => setFilter(seg.id)}
                style={[
                  styles.segmentCell,
                  active && styles.segmentCellActive,
                ]}
              >
                <Text
                  style={[
                    styles.segmentLabel,
                    active && styles.segmentLabelActive,
                  ]}
                >
                  {seg.label}
                </Text>
              </Pressable>
            );
          })}
        </View>
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
              style={styles.orderCard}
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
  segmentSection: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    width: '100%',
    maxWidth: DESIGN_W,
    alignSelf: 'center',
  },
  segmentTrack: {
    flexDirection: 'row',
    backgroundColor: colors.segmentTrack,
    borderRadius: 12,
    padding: 4,
    maxWidth: CARD_MAX,
    width: '100%',
    alignSelf: 'center',
  },
  segmentCell: {
    flex: 1,
    minHeight: 42,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  segmentCellActive: {
    backgroundColor: colors.white,
  },
  segmentLabel: {
    fontFamily: fonts.publicSemiBold,
    fontSize: scaleFont(14),
    color: colors.muted,
  },
  segmentLabelActive: {
    color: colors.primary,
  },
  list: {
    padding: spacing.lg,
    gap: 12,
    paddingBottom: spacing.xxxl,
    alignSelf: 'center',
    width: '100%',
    maxWidth: DESIGN_W,
  },
  orderCard: {
    borderWidth: 2,
    borderColor: TILE_BORDER,
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
