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
import {
  colors,
  DESIGN_W,
  fonts,
  radii,
  scaleFont,
  spacing,
} from '../theme';

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
          <Ionicons name="cube-outline" size={48} color={colors.white} />
          <Text style={styles.heroTitle}>{p.name}</Text>
          <View style={styles.heroMeta}>
            {p.savePct ? (
              <View style={styles.heroChip}>
                <Ionicons name="pricetag" size={12} color={colors.white} />
                <Text style={styles.heroChipTxt}>Save {p.savePct}%</Text>
              </View>
            ) : null}
            {p.rating ? (
              <View style={styles.heroChip}>
                <Ionicons name="star" size={12} color={colors.white} />
                <Text style={styles.heroChipTxt}>★ {p.rating}</Text>
              </View>
            ) : null}
            {p.brand ? (
              <View style={styles.heroChip}>
                <Text style={styles.heroChipTxt}>{p.brand}</Text>
              </View>
            ) : null}
          </View>
        </View>

        <View style={styles.tagRow}>
          {p.category ? (
            <Tag label={p.category} tone="info" />
          ) : null}
        </View>

        <AppCard tone="tinted" style={styles.priceCard}>
          <Text style={styles.priceLabel}>Trade price</Text>
          <Text style={styles.b2b}>{p.b2b}</Text>
          {p.mrp ? <Text style={styles.mrp}>MRP {p.mrp}</Text> : null}
        </AppCard>

        <SectionTitle title="Highlights" />
        <AppCard padded={false}>
          {[
            {
              icon: 'shield-checkmark-outline',
              label: 'ISI certified · 1 year warranty',
            },
            {
              icon: 'flash-outline',
              label: 'Same-day dispatch from local warehouse',
            },
            {
              icon: 'pricetag-outline',
              label: 'Bulk discount on 10+ units',
            },
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
          leftIcon={
            <Ionicons name="cart-outline" size={18} color={colors.text} />
          }
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
    alignSelf: 'center',
    width: '100%',
    maxWidth: DESIGN_W,
  },
  hero: {
    height: 200,
    borderRadius: radii.lg,
    backgroundColor: colors.primary,
    padding: spacing.lg,
    justifyContent: 'flex-end',
    gap: spacing.xs,
  },
  heroTitle: {
    fontFamily: fonts.publicBold,
    fontSize: scaleFont(18),
    color: colors.white,
  },
  heroMeta: {
    flexDirection: 'row',
    gap: spacing.xs,
    flexWrap: 'wrap',
  },
  heroChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(255,255,255,0.18)',
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    borderRadius: radii.pill,
  },
  heroChipTxt: {
    fontFamily: fonts.publicSemiBold,
    fontSize: scaleFont(11),
    color: colors.white,
  },
  tagRow: {
    flexDirection: 'row',
    gap: 6,
    flexWrap: 'wrap',
  },
  priceCard: {
    paddingVertical: spacing.md,
  },
  priceLabel: {
    fontFamily: fonts.publicSemiBold,
    fontSize: scaleFont(11.5),
    color: colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  b2b: {
    fontFamily: fonts.publicBold,
    fontSize: scaleFont(28),
    color: colors.primary,
    marginTop: 2,
  },
  mrp: {
    fontFamily: fonts.publicRegular,
    fontSize: scaleFont(13),
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
