import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { FC } from 'react';
import { useMemo, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import {
  LayoutAnimation,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  UIManager,
  View,
} from 'react-native';
import type { ProfileStackParamList } from '../navigation/types';
import {
  AppCard,
  Chip,
  EmptyState,
  FormField,
  ScreenHeader,
  ScreenScaffold,
  SectionTitle,
} from '../components/ui';
import { colors, fonts, radii, scaleFont, spacing } from '../theme';

type Props = NativeStackScreenProps<ProfileStackParamList, 'FaqList'>;

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

type FaqItem = {
  q: string;
  a: string;
  category: 'Payout' | 'Jobs' | 'KYC' | 'App';
};

const FAQ: FaqItem[] = [
  {
    q: 'When do payouts arrive?',
    a: 'Payouts are processed within 24–48 hours after job closure. UPI is instant; bank transfer can take an extra working day.',
    category: 'Payout',
  },
  {
    q: 'How do I update my bank account?',
    a: 'Go to Profile → Settings → Bank & UPI manager. Add a new account and verify with the small test deposit.',
    category: 'Payout',
  },
  {
    q: 'Why was my lead missed?',
    a: 'Leads expire if not accepted within 30 seconds. Stay on the home screen and online to receive them in time.',
    category: 'Jobs',
  },
  {
    q: 'How long is KYC verification?',
    a: 'KYC is normally verified in 4–8 hours during business days. Police verification can take up to 7 days.',
    category: 'KYC',
  },
  {
    q: 'App is crashing — what to do?',
    a: 'Close all background apps, update to the latest Electric Ji version and clear cache from device Settings.',
    category: 'App',
  },
];

const CATS: Array<FaqItem['category'] | 'All'> = [
  'All',
  'Payout',
  'Jobs',
  'KYC',
  'App',
];

/**
 * Spec #72 — Searchable FAQ list with category chips and animated accordion.
 */
export const FaqListScreen: FC<Props> = ({ navigation }) => {
  const [open, setOpen] = useState<number | null>(0);
  const [cat, setCat] = useState<(typeof CATS)[number]>('All');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return FAQ.filter((f) => {
      if (cat !== 'All' && f.category !== cat) return false;
      if (!q) return true;
      return f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q);
    });
  }, [cat, query]);

  const toggle = (i: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpen(open === i ? null : i);
  };

  return (
    <ScreenScaffold>
      <ScreenHeader title="FAQ" onBack={() => navigation.goBack()} />
      <ScrollView
        contentContainerStyle={styles.body}
        showsVerticalScrollIndicator={false}
      >
        <FormField
          label=""
          placeholder="Search FAQs"
          value={query}
          onChangeText={setQuery}
          leftAdornment={
            <Ionicons name="search" size={18} color={colors.muted} />
          }
        />

        <View style={styles.chipRow}>
          {CATS.map((c) => (
            <Chip
              key={c}
              label={c}
              selected={cat === c}
              onPress={() => setCat(c)}
            />
          ))}
        </View>

        <SectionTitle
          title="Top questions"
          caption={`${filtered.length} ${filtered.length === 1 ? 'result' : 'results'}`}
        />

        {filtered.length === 0 ? (
          <EmptyState
            icon="help-circle-outline"
            title="No matching FAQs"
            subtitle="Try a different search or category."
          />
        ) : (
          filtered.map((f, i) => {
            const isOpen = open === i;
            return (
              <AppCard key={f.q} padded={false}>
                <Pressable
                  accessibilityRole="button"
                  accessibilityState={{ expanded: isOpen }}
                  onPress={() => toggle(i)}
                  style={({ pressed }) => [
                    styles.qRow,
                    pressed && { opacity: 0.92 },
                  ]}
                >
                  <Text style={styles.qTxt}>{f.q}</Text>
                  <View style={[styles.chevron, isOpen && styles.chevronOpen]}>
                    <Ionicons
                      name="chevron-down"
                      size={16}
                      color={colors.primary}
                    />
                  </View>
                </Pressable>
                {isOpen ? (
                  <View style={styles.aWrap}>
                    <Text style={styles.aTxt}>{f.a}</Text>
                  </View>
                ) : null}
              </AppCard>
            );
          })
        )}
      </ScrollView>
    </ScreenScaffold>
  );
};

const styles = StyleSheet.create({
  body: {
    padding: spacing.lg,
    gap: spacing.md,
    paddingBottom: spacing.xxxl,
  },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  qRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md + 2,
    gap: spacing.md,
  },
  qTxt: {
    flex: 1,
    fontFamily: fonts.publicBold,
    fontSize: scaleFont(14),
    color: colors.text,
  },
  chevron: {
    width: 28,
    height: 28,
    borderRadius: radii.pill,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chevronOpen: { transform: [{ rotate: '180deg' }] },
  aWrap: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md + 2,
    paddingTop: 0,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.borderLight,
  },
  aTxt: {
    fontFamily: fonts.publicRegular,
    fontSize: scaleFont(13),
    color: colors.textSoft,
    lineHeight: 20,
    marginTop: spacing.sm,
  },
});
