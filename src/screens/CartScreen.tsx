import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { FC } from 'react';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import type { WholesaleStackParamList } from '../navigation/types';
import {
  AppButton,
  AppCard,
  BottomCtaBar,
  EmptyState,
  ScreenHeader,
  ScreenScaffold,
  SectionTitle,
} from '../components/ui';
import { MOCK_PRODUCTS } from '../mocks';
import { colors, fonts, radii, scaleFont, spacing } from '../theme';

type Props = NativeStackScreenProps<WholesaleStackParamList, 'Cart'>;

type Line = {
  id: string;
  name: string;
  brand: string;
  price: number;
  qty: number;
};

/**
 * Spec #44 — Cart with quantity steppers + total summary.
 */
export const CartScreen: FC<Props> = ({ navigation }) => {
  const [items, setItems] = useState<Line[]>(() =>
    MOCK_PRODUCTS.slice(0, 2).map((p, i) => ({
      id: p.id,
      name: p.name,
      brand: p.brand ?? 'Generic',
      price: 1100 + i * 250,
      qty: 1 + i,
    })),
  );

  const setQty = (id: string, delta: number) =>
    setItems((prev) =>
      prev
        .map((l) =>
          l.id === id ? { ...l, qty: Math.max(0, l.qty + delta) } : l,
        )
        .filter((l) => l.qty > 0),
    );

  const subtotal = items.reduce((s, l) => s + l.price * l.qty, 0);
  const gst = Math.round(subtotal * 0.18);
  const total = subtotal + gst;

  return (
    <ScreenScaffold>
      <ScreenHeader title="Cart" onBack={() => navigation.goBack()} />
      {items.length === 0 ? (
        <EmptyState
          icon="cart-outline"
          title="Your cart is empty"
          subtitle="Browse the wholesale catalog to fill it up."
          actionLabel="Browse products"
          onAction={() => navigation.goBack()}
        />
      ) : (
        <>
          <ScrollView
            contentContainerStyle={styles.body}
            showsVerticalScrollIndicator={false}
          >
            <SectionTitle
              title={`${items.length} items`}
              caption="Trade prices applied"
            />
            {items.map((l) => (
              <AppCard key={l.id} padded={false} style={styles.card}>
                <View style={styles.thumb}>
                  <Ionicons name="cube-outline" size={28} color={colors.primary} />
                </View>
                <View style={styles.info}>
                  <Text style={styles.brand}>{l.brand}</Text>
                  <Text style={styles.name} numberOfLines={2}>
                    {l.name}
                  </Text>
                  <Text style={styles.price}>₹{l.price.toLocaleString('en-IN')}</Text>
                </View>
                <View style={styles.stepper}>
                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel="Decrease"
                    onPress={() => setQty(l.id, -1)}
                    style={styles.stepBtn}
                  >
                    <Ionicons name="remove" size={16} color={colors.text} />
                  </Pressable>
                  <Text style={styles.qty}>{l.qty}</Text>
                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel="Increase"
                    onPress={() => setQty(l.id, 1)}
                    style={styles.stepBtn}
                  >
                    <Ionicons name="add" size={16} color={colors.text} />
                  </Pressable>
                </View>
              </AppCard>
            ))}

            <SectionTitle title="Order summary" />
            <AppCard padded={false}>
              <SummaryRow label="Subtotal" value={`₹${subtotal.toLocaleString('en-IN')}`} />
              <SummaryRow label="GST (18%)" value={`₹${gst.toLocaleString('en-IN')}`} />
              <SummaryRow
                label="Total"
                value={`₹${total.toLocaleString('en-IN')}`}
                strong
              />
            </AppCard>
          </ScrollView>
          <BottomCtaBar>
            <AppButton
              label={`Proceed · ₹${total.toLocaleString('en-IN')}`}
              onPress={() => navigation.navigate('Checkout')}
              block
            />
          </BottomCtaBar>
        </>
      )}
    </ScreenScaffold>
  );
};

const SummaryRow: FC<{ label: string; value: string; strong?: boolean }> = ({
  label,
  value,
  strong,
}) => (
  <View style={[styles.summary, strong && styles.summaryStrong]}>
    <Text style={[styles.summaryLabel, strong && styles.summaryStrongText]}>
      {label}
    </Text>
    <Text style={[styles.summaryValue, strong && styles.summaryStrongText]}>
      {value}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  body: {
    padding: spacing.lg,
    gap: spacing.md,
    paddingBottom: spacing.xxxl,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.md,
  },
  thumb: {
    width: 64,
    height: 64,
    borderRadius: radii.md,
    backgroundColor: colors.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: { flex: 1, gap: 2 },
  brand: {
    fontFamily: fonts.publicMedium,
    fontSize: scaleFont(11),
    color: colors.muted,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  name: {
    fontFamily: fonts.publicSemiBold,
    fontSize: scaleFont(13.5),
    color: colors.text,
  },
  price: {
    fontFamily: fonts.publicBold,
    fontSize: scaleFont(14),
    color: colors.primary,
  },
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    backgroundColor: colors.surfaceAlt,
    paddingHorizontal: 4,
    paddingVertical: 4,
    borderRadius: radii.pill,
  },
  stepBtn: {
    width: 28,
    height: 28,
    borderRadius: radii.pill,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qty: {
    fontFamily: fonts.publicSemiBold,
    fontSize: scaleFont(13),
    color: colors.text,
    minWidth: 18,
    textAlign: 'center',
  },
  summary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.borderLight,
  },
  summaryStrong: {
    borderBottomWidth: 0,
    backgroundColor: colors.primarySoft,
  },
  summaryLabel: {
    fontFamily: fonts.publicMedium,
    fontSize: scaleFont(13.5),
    color: colors.muted,
  },
  summaryValue: {
    fontFamily: fonts.publicSemiBold,
    fontSize: scaleFont(13.5),
    color: colors.text,
  },
  summaryStrongText: {
    fontFamily: fonts.publicBold,
    color: colors.primary,
    fontSize: scaleFont(15),
  },
});
