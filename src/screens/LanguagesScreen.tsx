import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { FC } from 'react';
import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import type { ProfileStackParamList } from '../navigation/types';
import {
  AppButton,
  BottomCtaBar,
  Chip,
  ScreenHeader,
  ScreenScaffold,
  SectionTitle,
} from '../components/ui';
import { spacing } from '../theme';

type Props = NativeStackScreenProps<ProfileStackParamList, 'Languages'>;

const LANGS = ['English', 'Hindi', 'Marathi', 'Tamil', 'Telugu', 'Gujarati', 'Kannada', 'Bengali'];

/**
 * Spec #67 — Languages multi-select.
 */
export const LanguagesScreen: FC<Props> = ({ navigation }) => {
  const [sel, setSel] = useState<string[]>(['English', 'Hindi']);

  const toggle = (l: string) =>
    setSel((p) => (p.includes(l) ? p.filter((x) => x !== l) : [...p, l]));

  return (
    <ScreenScaffold>
      <ScreenHeader title="Languages" onBack={() => navigation.goBack()} />
      <ScrollView
        contentContainerStyle={styles.body}
        showsVerticalScrollIndicator={false}
      >
        <SectionTitle
          title="Languages you speak"
          caption={`${sel.length} selected`}
        />
        <View style={styles.row}>
          {LANGS.map((l) => (
            <Chip
              key={l}
              label={l}
              selected={sel.includes(l)}
              onPress={() => toggle(l)}
            />
          ))}
        </View>
      </ScrollView>
      <BottomCtaBar>
        <AppButton label="Save" onPress={() => navigation.goBack()} block />
      </BottomCtaBar>
    </ScreenScaffold>
  );
};

const styles = StyleSheet.create({
  body: {
    padding: spacing.lg,
    gap: spacing.md,
  },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
});
