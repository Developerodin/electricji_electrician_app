import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { FC } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import type { WholesaleStackParamList } from '../navigation/types';
import {
  AppButton,
  AppCard,
  BottomCtaBar,
  ScreenHeader,
  ScreenScaffold,
  SectionTitle,
  Tag,
} from '../components/ui';
import { MOCK_PRODUCTS } from '../mocks';
import { colors, fonts, radii, scaleFont, scaleFont as sf, spacing } from '../theme';

type Props = NativeStackScreenProps<WholesaleStackParamList, 'ProductDetail'>;

/**
 * Spec #43 — Product detail with hero image, price block, specs and CTA bar.
 */
export const ProductDetailScreen: FC<Props> = ({ navigation, route }) => {
  const p =
    MOCK_PRODUCTS.find((x) => x.id === route.params.productId) ??
    MOCK_PRODUCTS[0];

  return (
    <ScreenScaffold>
      <ScreenHeader title="Product" onBack={() => navigation.goBack()} />
      <ScrollView
        contentContainerStyle={styles.body}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.hero}>
          <Ionicons name="cube-outline" size={64} color={colors.primary} />
        </View>

        <View style={styles.tagRow}>
          {p.savePct ? (
            <Tag label={`Save ${p.savePct}%`} tone="success" />
          ) : null}
          {p.rating ? <Tag label={`★ ${p.rating}`} tone="warning" /> : null}
          {p.brand ? <Tag label={p.brand} tone="primary" /> : null}
        </View>

        <Text style={styles.name}>{p.name}</Text>

        <AppCard tone="tinted" style={styles.priceCard}>
          <Text style={styles.priceLabel}>Trade price</Text>
          <Text style={styles.b2b}>{p.b2b}</Text>
          {p.mrp ? <Text style={styles.mrp}>MRP {p.mrp}</Text> : null}
        </AppCard>

        <SectionTitle title="Highlights" />
        <AppCard padded={false}>
          {[
            { icon: 'shield-checkmark-outline', label: 'ISI certified · 1 year warranty' },
            { icon: 'flash-outline', label: 'Same-day dispatch from local warehouse' },
            { icon: 'pricetag-outline', label: 'Bulk discount on 10+ units' },
          ].map((row, i, arr) => (
            <View
              key={row.label}
              style={[
                styles.bulletRow,
                i < arr.length - 1 && styles.bulletDivider,
              ]}
            >
              <View style={styles.bulletIcon}>
                <Ionicons
                  name={row.icon as never}
                  size={16}
                  color={colors.primary}
                />
              </View>
              <Text style={styles.bulletText}>{row.label}</Text>
            </View>
          ))}
        </AppCard>
      </ScrollView>
      <BottomCtaBar>
        <AppButton
          label="Add to cart"
          variant="outline"
          onPress={() => navigation.navigate('Cart')}
          block
          leftIcon={<Ionicons name="cart-outline" size={18} color={colors.text} />}
        />
        <AppButton
          label="Buy now"
          onPress={() => navigation.navigate('Checkout')}
          block
        />
      </BottomCtaBar>
    </ScreenScaffold>
  );
};

const styles = StyleSheet.create({
  body: {
    padding: spacing.lg,
    gap: spacing.md,
    paddingBottom: spacing.xxxl,
  },
  hero: {
    height: 200,
    borderRadius: radii.lg,
    backgroundColor: colors.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  tagRow: {
    flexDirection: 'row',
    gap: 6,
    flexWrap: 'wrap',
  },
  name: {
    fontFamily: fonts.publicBold,
    fontSize: sf(20),
    color: colors.text,
  },
  priceCard: {
    paddingVertical: spacing.md,
  },
  priceLabel: {
    fontFamily: fonts.publicSemiBold,
    fontSize: sf(11.5),
    color: colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  b2b: {
    fontFamily: fonts.publicBold,
    fontSize: sf(28),
    color: colors.primary,
    marginTop: 2,
  },
  mrp: {
    fontFamily: fonts.publicRegular,
    fontSize: sf(13),
    color: colors.muted,
    textDecorationLine: 'line-through',
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  bulletDivider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.borderLight,
  },
  bulletIcon: {
    width: 28,
    height: 28,
    borderRadius: radii.sm,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bulletText: {
    flex: 1,
    fontFamily: fonts.publicMedium,
    fontSize: scaleFont(13.5),
    color: colors.textSoft,
  },
});
