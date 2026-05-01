import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { FC } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import type { WholesaleStackParamList } from '../navigation/types';
import {
  ProductCard,
  ScreenHeader,
  ScreenScaffold,
  SectionTitle,
} from '../components/ui';
import { MOCK_PRODUCTS } from '../mocks';
import { spacing } from '../theme';

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
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <SectionTitle
          title={`${rows.length} products`}
          caption="At your trade rate"
        />
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
  scroll: {
    padding: spacing.lg,
    gap: spacing.md,
    paddingBottom: spacing.xxxl,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    rowGap: spacing.md,
  },
});
