import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { FC } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import type { WholesaleStackParamList } from '../navigation/types';
import { ProductCard, ScreenHeader, ScreenScaffold } from '../components/ui';
import { MOCK_PRODUCTS } from '../mocks';
import { colors, DESIGN_W, fonts, scaleFont, spacing } from '../theme';

type Props = NativeStackScreenProps<WholesaleStackParamList, 'CategoryListing'>;

/**
 * Spec #41 — Category listing grid (2-up cards).
 */
export const CategoryListingScreen: FC<Props> = ({ navigation, route }) => {
  const filtered = MOCK_PRODUCTS.filter((p) => p.category === route.params.category);
  const rows = filtered.length ? filtered : MOCK_PRODUCTS;

  return (
    <ScreenScaffold>
      <ScreenHeader
        title={route.params.category}
        onBack={() => navigation.goBack()}
      />
      <View style={styles.metaStrip}>
        <Text style={styles.metaTitle}>{rows.length} products</Text>
        <Text style={styles.metaCap}>Trade rates apply</Text>
      </View>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.grid}>
          {rows.map((p) => (
            <ProductCard
              key={p.id}
              name={p.name}
              brand={p.brand}
              b2bPrice={p.b2b}
              mrp={p.mrp}
              savePct={p.savePct}
              rating={p.rating}
              layout="grid"
              onPress={() =>
                navigation.navigate('ProductDetail', { productId: p.id })
              }
            />
          ))}
        </View>
      </ScrollView>
    </ScreenScaffold>
  );
};

const styles = StyleSheet.create({
  metaStrip: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.white,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.borderLight,
    alignSelf: 'center',
    width: '100%',
    maxWidth: DESIGN_W,
  },
  metaTitle: {
    fontFamily: fonts.publicBold,
    fontSize: scaleFont(17),
    color: colors.text,
  },
  metaCap: {
    fontFamily: fonts.publicMedium,
    fontSize: scaleFont(12.5),
    color: colors.muted,
    marginTop: 2,
  },
  scroll: {
    padding: spacing.lg,
    gap: 12,
    paddingBottom: spacing.xxxl,
    alignSelf: 'center',
    width: '100%',
    maxWidth: DESIGN_W,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    rowGap: 12,
    justifyContent: 'space-between',
  },
});
