import { Ionicons } from '@expo/vector-icons';
import type { ComponentProps, FC } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { WholesaleStackParamList } from '../navigation/types';
import {
  ProductCard,
  ScreenScaffold,
  SectionTitle,
} from '../components/ui';
import { MOCK_PRODUCTS } from '../mocks';
import { colors, fonts, radii, scaleFont, shadows, spacing } from '../theme';

type IonName = ComponentProps<typeof Ionicons>['name'];
type Props = NativeStackScreenProps<WholesaleStackParamList, 'MarketplaceHome'>;

const CATS: { name: string; icon: IonName }[] = [
  { name: 'Wires', icon: 'git-network-outline' },
  { name: 'Switches', icon: 'toggle-outline' },
  { name: 'MCBs', icon: 'shield-checkmark-outline' },
  { name: 'Tools', icon: 'hammer-outline' },
  { name: 'Plumbing', icon: 'water-outline' },
  { name: 'AC Parts', icon: 'snow-outline' },
  { name: 'Lighting', icon: 'bulb-outline' },
  { name: 'Safety', icon: 'medkit-outline' },
];

/**
 * Spec #40 — Wholesale marketplace home (search, categories, deals).
 */
export const MarketplaceHomeScreen: FC<Props> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  return (
    <ScreenScaffold>
      <View
        style={[
          styles.hero,
          shadows.md,
          { paddingTop: insets.top + spacing.md },
        ]}
      >
        <View style={styles.heroTop}>
          <View>
            <Text style={styles.heroTitle}>Wholesale</Text>
            <Text style={styles.heroSub}>Stock up at trade prices</Text>
          </View>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Cart"
            onPress={() => navigation.navigate('Cart')}
            style={styles.cartBtn}
          >
            <Ionicons name="cart-outline" size={22} color={colors.white} />
          </Pressable>
        </View>
        <Pressable
          accessibilityRole="button"
          onPress={() => navigation.navigate('SearchFilter')}
          style={styles.search}
        >
          <Ionicons name="search" size={18} color={colors.muted} />
          <TextInput
            placeholder="Search SKUs, brands…"
            placeholderTextColor={colors.muted}
            style={styles.searchInput}
            editable={false}
            pointerEvents="none"
          />
          <Ionicons name="options-outline" size={18} color={colors.primary} />
        </Pressable>
      </View>

      <ScrollView
        style={styles.body}
        contentContainerStyle={styles.bodyContent}
        showsVerticalScrollIndicator={false}
      >
        <SectionTitle title="Categories" caption="Tap to browse" />
        <View style={styles.catGrid}>
          {CATS.map((c) => (
            <Pressable
              key={c.name}
              style={({ pressed }) => [
                styles.catTile,
                pressed && styles.catPressed,
              ]}
              onPress={() =>
                navigation.navigate('CategoryListing', { category: c.name })
              }
            >
              <View style={styles.catIcon}>
                <Ionicons name={c.icon} size={20} color={colors.primary} />
              </View>
              <Text style={styles.catTxt}>{c.name}</Text>
            </Pressable>
          ))}
        </View>

        <SectionTitle
          title="Today’s deals"
          trailingLabel="See all"
          onTrailingPress={() =>
            navigation.navigate('CategoryListing', { category: 'All' })
          }
        />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.dealRow}
        >
          {MOCK_PRODUCTS.map((p) => (
            <ProductCard
              key={p.id}
              name={p.name}
              brand={p.brand}
              b2bPrice={p.b2b}
              mrp={p.mrp}
              savePct={p.savePct}
              rating={p.rating}
              layout="horizontal"
              onPress={() =>
                navigation.navigate('ProductDetail', { productId: p.id })
              }
            />
          ))}
        </ScrollView>

        <Pressable
          accessibilityRole="button"
          onPress={() => navigation.navigate('OrderHistory')}
          style={({ pressed }) => [
            styles.historyBtn,
            pressed && styles.catPressed,
          ]}
        >
          <Ionicons name="receipt-outline" size={18} color={colors.primary} />
          <Text style={styles.historyTxt}>View order history</Text>
          <Ionicons name="chevron-forward" size={18} color={colors.primary} />
        </Pressable>
      </ScrollView>
    </ScreenScaffold>
  );
};

const styles = StyleSheet.create({
  hero: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
    borderBottomLeftRadius: radii.hero,
    borderBottomRightRadius: radii.hero,
    gap: spacing.md,
  },
  heroTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  heroTitle: {
    fontFamily: fonts.publicBold,
    fontSize: scaleFont(22),
    color: colors.white,
  },
  heroSub: {
    fontFamily: fonts.publicMedium,
    fontSize: scaleFont(13),
    color: 'rgba(255,255,255,0.85)',
  },
  cartBtn: {
    width: 40,
    height: 40,
    borderRadius: radii.md,
    backgroundColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.white,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 2,
    borderRadius: radii.md,
  },
  searchInput: {
    flex: 1,
    fontFamily: fonts.publicMedium,
    fontSize: scaleFont(14),
    color: colors.text,
    paddingVertical: 0,
  },
  body: { flex: 1 },
  bodyContent: {
    padding: spacing.lg,
    gap: spacing.md,
    paddingBottom: spacing.xxxl,
  },
  catGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  catTile: {
    width: '23.4%',
    aspectRatio: 1,
    backgroundColor: colors.white,
    borderRadius: radii.md,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  catIcon: {
    width: 36,
    height: 36,
    borderRadius: radii.sm,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
  },
  catTxt: {
    fontFamily: fonts.publicSemiBold,
    fontSize: scaleFont(11.5),
    color: colors.text,
    textAlign: 'center',
  },
  dealRow: {
    paddingRight: spacing.lg,
  },
  catPressed: {
    opacity: 0.94,
  },
  historyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.white,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  historyTxt: {
    flex: 1,
    fontFamily: fonts.publicSemiBold,
    fontSize: scaleFont(14),
    color: colors.primary,
  },
});
