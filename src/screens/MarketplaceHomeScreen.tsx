import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import type { ComponentProps, FC } from 'react';
import {
  Platform,
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
import {
  colors,
  DESIGN_W,
  fonts,
  radii,
  scaleFont,
  shadows,
  spacing,
} from '../theme';

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

/** Hero / label text — mirrors `HomeScreen` (Public Sans + muted white line). */
const heroText = Platform.select({
  ios: {},
  android: { includeFontPadding: false },
  default: {},
});

/**
 * Spec #40 — Wholesale marketplace home (search, categories, deals).
 */
export const MarketplaceHomeScreen: FC<Props> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const topPad = insets.top + spacing.lg;

  return (
    <ScreenScaffold>
      <View style={styles.heroShell}>
        <View style={[styles.hero, shadows.hero, { paddingTop: topPad }]}>
          <LinearGradient
            colors={['rgba(0,0,0,0.12)', 'transparent']}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={StyleSheet.absoluteFill}
            pointerEvents="none"
          />

          <View style={styles.heroTop}>
            <View style={styles.heroTitles}>
              <Text style={[styles.heroEyebrow, heroText]}>Trade catalog</Text>
              <Text style={[styles.heroTitle, heroText]}>Wholesale</Text>
              <Text style={[styles.heroSub, heroText]}>
                Stock up at B2B prices — same warehouse, electrician rates.
              </Text>
            </View>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Cart"
              onPress={() => navigation.navigate('Cart')}
              style={({ pressed }) => [
                styles.cartBtn,
                pressed && styles.pressedOpacity,
              ]}
            >
              <Ionicons name="cart-outline" size={24} color={colors.white} />
            </Pressable>
          </View>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Search and filter catalogue"
            onPress={() => navigation.navigate('SearchFilter')}
            style={({ pressed }) => [
              styles.search,
              shadows.sm,
              pressed && styles.searchPressed,
            ]}
          >
            <View style={styles.searchIconCircle}>
              <Ionicons name="search" size={18} color={colors.primary} />
            </View>
            <TextInput
              placeholder="Search by SKU, brand, or product…"
              placeholderTextColor={colors.muted}
              style={[styles.searchInput, heroText]}
              editable={false}
              pointerEvents="none"
            />
            <View style={styles.filterHint}>
              <Ionicons name="options-outline" size={18} color={colors.muted} />
            </View>
          </Pressable>
        </View>
      </View>

      <ScrollView
        style={styles.body}
        contentContainerStyle={styles.bodyContent}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled
      >
        <SectionTitle
          title="Shop by category"
          caption="Swipe for more · tap to open"
        />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.catRow}
          nestedScrollEnabled
        >
          {CATS.map((c) => (
            <Pressable
              key={c.name}
              style={({ pressed }) => [
                styles.catChip,
                pressed && styles.pressedOpacity,
              ]}
              onPress={() =>
                navigation.navigate('CategoryListing', { category: c.name })
              }
              accessibilityRole="button"
              accessibilityLabel={`Browse ${c.name}`}
            >
              <View style={styles.catChipIcon}>
                <Ionicons name={c.icon} size={20} color={colors.primary} />
              </View>
              <Text style={[styles.catChipLabel, heroText]}>{c.name}</Text>
            </Pressable>
          ))}
        </ScrollView>

        <SectionTitle
          title="Deals for you"
          caption="Today’s wholesale savings"
          trailingLabel="See all"
          onTrailingPress={() =>
            navigation.navigate('CategoryListing', { category: 'All' })
          }
        />
        <View style={styles.dealsBleed}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.dealRow}
            nestedScrollEnabled
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
        </View>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="View order history"
          onPress={() => navigation.navigate('OrderHistory')}
          style={({ pressed }) => [
            styles.historyBtn,
            pressed && styles.pressedOpacity,
          ]}
        >
          <View style={styles.historyIcon}>
            <Ionicons name="receipt-outline" size={20} color={colors.primary} />
          </View>
          <View style={styles.historyTextCol}>
            <Text style={[styles.historyTitle, heroText]}>Orders & receipts</Text>
            <Text style={[styles.historySub, heroText]}>
              Track deliveries and reorder in one tap
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.muted} />
        </Pressable>
      </ScrollView>
    </ScreenScaffold>
  );
};

const styles = StyleSheet.create({
  heroShell: {
    width: '100%',
    maxWidth: DESIGN_W,
    alignSelf: 'center',
  },
  hero: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
    borderBottomLeftRadius: radii.hero,
    borderBottomRightRadius: radii.hero,
    overflow: 'hidden',
    gap: spacing.lg,
  },
  heroTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  heroTitles: {
    flex: 1,
    minWidth: 0,
    gap: spacing.xs,
  },
  heroEyebrow: {
    fontFamily: fonts.publicSemiBold,
    fontSize: scaleFont(11),
    color: 'rgba(255,255,255,0.78)',
    textTransform: 'uppercase',
    letterSpacing: 1.05,
    marginBottom: 2,
  },
  heroTitle: {
    fontFamily: fonts.publicBold,
    fontSize: scaleFont(22),
    lineHeight: scaleFont(28),
    color: colors.white,
  },
  heroSub: {
    fontFamily: fonts.publicMedium,
    fontSize: scaleFont(14),
    lineHeight: scaleFont(20),
    color: '#e2e2e2',
    marginTop: spacing.sm,
    maxWidth: 280,
  },
  cartBtn: {
    width: 48,
    height: 48,
    borderRadius: radii.lg,
    backgroundColor: colors.primaryMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.white,
    paddingLeft: spacing.sm,
    paddingRight: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radii.lg,
    minHeight: 52,
  },
  searchPressed: {
    opacity: 0.92,
    transform: [{ scale: 0.995 }],
  },
  searchIconCircle: {
    width: 40,
    height: 40,
    borderRadius: radii.md,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchInput: {
    flex: 1,
    fontFamily: fonts.publicMedium,
    fontSize: scaleFont(14),
    lineHeight: scaleFont(19),
    color: colors.text,
    paddingVertical: 0,
  },
  filterHint: {
    paddingVertical: spacing.xs,
  },
  body: { flex: 1 },
  bodyContent: {
    padding: spacing.lg,
    gap: spacing.lg,
    paddingBottom: spacing.xxxl,
    width: '100%',
    maxWidth: DESIGN_W,
    alignSelf: 'center',
  },
  catRow: {
    gap: spacing.md,
    paddingVertical: spacing.xs,
    paddingRight: spacing.lg,
    marginHorizontal: -2,
  },
  catChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg - 2,
    backgroundColor: colors.white,
    borderRadius: radii.lg,
    borderWidth: 2,
    borderColor: 'rgba(216,217,221,0.22)',
    maxWidth: 200,
    ...shadows.sm,
  },
  catChipIcon: {
    width: 38,
    height: 38,
    borderRadius: radii.md,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  catChipLabel: {
    flex: 1,
    flexShrink: 1,
    fontFamily: fonts.publicSemiBold,
    fontSize: scaleFont(14),
    lineHeight: scaleFont(19),
    color: colors.text,
  },
  dealsBleed: {
    marginHorizontal: -spacing.lg,
    marginTop: -spacing.sm,
  },
  dealRow: {
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xs,
    paddingVertical: spacing.xs,
  },
  pressedOpacity: {
    opacity: 0.9,
  },
  historyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.white,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    borderRadius: radii.lg,
    borderWidth: 2,
    borderColor: 'rgba(216,217,221,0.16)',
    ...shadows.sm,
  },
  historyIcon: {
    width: 44,
    height: 44,
    borderRadius: radii.md,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  historyTextCol: {
    flex: 1,
    minWidth: 0,
    gap: spacing.xs,
  },
  historyTitle: {
    fontFamily: fonts.publicBold,
    fontSize: scaleFont(16),
    lineHeight: scaleFont(21),
    color: colors.text,
  },
  historySub: {
    fontFamily: fonts.publicMedium,
    fontSize: scaleFont(12.5),
    lineHeight: scaleFont(17),
    color: colors.muted,
  },
});
