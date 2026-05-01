import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { FC } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import type { HomeStackParamList } from '../navigation/types';
import {
  AppCard,
  ListRow,
  ScreenHeader,
  ScreenScaffold,
  SectionTitle,
} from '../components/ui';
import { spacing } from '../theme';

type Props = NativeStackScreenProps<HomeStackParamList, 'TaxDocuments'>;

const ITEMS = [
  { title: 'GST invoice', subtitle: 'April 2026', icon: 'receipt-outline' as const },
  { title: 'TDS statement', subtitle: 'April 2026', icon: 'document-attach-outline' as const },
  { title: 'Form 16A', subtitle: 'FY 2025–26', icon: 'document-text-outline' as const },
];

/**
 * Spec #36 — Tax documents list with download (dummy).
 */
export const TaxDocumentsScreen: FC<Props> = ({ navigation }) => (
  <ScreenScaffold>
    <ScreenHeader title="Tax documents" onBack={() => navigation.goBack()} />
    <ScrollView
      contentContainerStyle={styles.body}
      showsVerticalScrollIndicator={false}
    >
      <SectionTitle title="Available downloads" caption="Tap any to download (dummy)" />
      <AppCard padded={false}>
        {ITEMS.map((it, i) => (
          <ListRow
            key={it.title}
            title={it.title}
            subtitle={it.subtitle}
            icon={it.icon}
            onPress={() => {}}
            position={
              i === 0
                ? 'first'
                : i === ITEMS.length - 1
                  ? 'last'
                  : 'middle'
            }
          />
        ))}
      </AppCard>
      <View />
    </ScrollView>
  </ScreenScaffold>
);

const styles = StyleSheet.create({
  body: {
    padding: spacing.lg,
    gap: spacing.md,
    paddingBottom: spacing.xxxl,
  },
});
