import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { FC } from 'react';
import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import type { WholesaleStackParamList } from '../navigation/types';
import {
  AppButton,
  BottomCtaBar,
  Chip,
  FormField,
  ScreenHeader,
  ScreenScaffold,
  SectionTitle,
} from '../components/ui';
import { colors, DESIGN_W, radii, spacing } from '../theme';

type Props = NativeStackScreenProps<WholesaleStackParamList, 'SearchFilter'>;

const BRANDS = ['Polycab', 'Anchor', 'Legrand', 'Havells', 'Crompton'];
const CATS = ['Wires', 'Switches', 'MCBs', 'Tools', 'Plumbing'];
const SORT = ['Price: Low → High', 'Price: High → Low', 'Top rated', 'Save %'];

/**
 * Spec #42 — Search & filter sheet.
 */
export const SearchFilterScreen: FC<Props> = ({ navigation }) => {
  const [query, setQuery] = useState('');
  const [brands, setBrands] = useState<string[]>(['Polycab']);
  const [cat, setCat] = useState<string | null>('Wires');
  const [sort, setSort] = useState<string | null>(null);

  const toggleBrand = (b: string) =>
    setBrands((p) => (p.includes(b) ? p.filter((x) => x !== b) : [...p, b]));

  return (
    <ScreenScaffold bg="white" style={styles.sheetRoot}>
      <View style={styles.grabberRow}>
        <View style={styles.grabber} />
      </View>
      <ScreenHeader title="Search & filter" onBack={() => navigation.goBack()} />
      <ScrollView
        contentContainerStyle={styles.body}
        showsVerticalScrollIndicator={false}
      >
        <FormField
          label="Search"
          value={query}
          onChangeText={setQuery}
          placeholder="Wire, MCB, switchboard…"
          leftAdornment={
            <Ionicons name="search" size={18} color={colors.muted} />
          }
        />

        <SectionTitle title="Brand" caption={`${brands.length} selected`} />
        <View style={styles.row}>
          {BRANDS.map((b) => (
            <Chip
              key={b}
              label={b}
              selected={brands.includes(b)}
              onPress={() => toggleBrand(b)}
            />
          ))}
        </View>

        <SectionTitle title="Category" />
        <View style={styles.row}>
          {CATS.map((c) => (
            <Chip
              key={c}
              label={c}
              selected={cat === c}
              onPress={() => setCat(cat === c ? null : c)}
            />
          ))}
        </View>

        <SectionTitle title="Sort by" />
        <View style={styles.row}>
          {SORT.map((s) => (
            <Chip
              key={s}
              label={s}
              selected={sort === s}
              onPress={() => setSort(sort === s ? null : s)}
            />
          ))}
        </View>
      </ScrollView>
      <BottomCtaBar>
        <AppButton
          label="Clear"
          variant="outline"
          onPress={() => {
            setBrands([]);
            setCat(null);
            setSort(null);
            setQuery('');
          }}
          block
        />
        <AppButton
          label="Apply filters"
          onPress={() => navigation.goBack()}
          block
        />
      </BottomCtaBar>
    </ScreenScaffold>
  );
};

const styles = StyleSheet.create({
  sheetRoot: {
    flex: 1,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    overflow: 'hidden',
  },
  grabberRow: {
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 6,
  },
  grabber: {
    width: 40,
    height: 4,
    borderRadius: radii.sm,
    backgroundColor: 'rgba(17,24,39,0.14)',
  },
  body: {
    padding: spacing.lg,
    gap: spacing.md,
    paddingBottom: spacing.xxxl,
    alignSelf: 'center',
    width: '100%',
    maxWidth: DESIGN_W,
  },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
});
