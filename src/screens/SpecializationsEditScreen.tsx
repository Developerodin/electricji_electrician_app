import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { FC } from 'react';
import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import type { ProfileStackParamList } from '../navigation/types';
import {
  AppButton,
  BottomCtaBar,
  Chip,
  FormField,
  RadioRow,
  ScreenHeader,
  ScreenScaffold,
  SectionTitle,
} from '../components/ui';
import { spacing } from '../theme';

const PRIMARY = [
  'Electrician',
  'Plumber',
  'AC Technician',
  'Appliance Repair',
  'Carpenter',
] as const;

const SUB: Record<(typeof PRIMARY)[number], string[]> = {
  Electrician: ['Wiring', 'Switchboard', 'Inverter', 'Fan', 'Geyser', 'Chandelier'],
  Plumber: ['Leak fix', 'Motor', 'Bathroom'],
  'AC Technician': ['Gas refill', 'Split install'],
  'Appliance Repair': ['Fridge', 'Washing machine'],
  Carpenter: ['Door', 'Shelf'],
};

type Props = NativeStackScreenProps<ProfileStackParamList, 'SpecializationsEdit'>;

/**
 * Spec #65 — Specializations edit (post-KYC).
 */
export const SpecializationsEditScreen: FC<Props> = ({ navigation }) => {
  const [primary, setPrimary] = useState<(typeof PRIMARY)[number]>('Electrician');
  const [subs, setSubs] = useState<string[]>(['Wiring']);
  const [years, setYears] = useState('5');

  const toggle = (s: string) =>
    setSubs((p) => (p.includes(s) ? p.filter((x) => x !== s) : [...p, s]));

  return (
    <ScreenScaffold>
      <ScreenHeader title="Specializations" onBack={() => navigation.goBack()} />
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <SectionTitle title="Primary trade" />
        <View style={styles.list}>
          {PRIMARY.map((p) => (
            <RadioRow
              key={p}
              label={p}
              selected={primary === p}
              onPress={() => setPrimary(p)}
            />
          ))}
        </View>

        <SectionTitle title="Sub-skills" caption="Tap any that apply" />
        <View style={styles.chips}>
          {SUB[primary].map((s) => (
            <Chip
              key={s}
              label={s}
              selected={subs.includes(s)}
              onPress={() => toggle(s)}
            />
          ))}
        </View>

        <FormField
          label="Years of experience"
          keyboardType="number-pad"
          value={years}
          onChangeText={(t) => setYears(t.replace(/\D/g, '').slice(0, 2))}
        />
      </ScrollView>
      <BottomCtaBar>
        <AppButton label="Save changes" onPress={() => navigation.goBack()} block />
      </BottomCtaBar>
    </ScreenScaffold>
  );
};

const styles = StyleSheet.create({
  scroll: {
    padding: spacing.lg,
    gap: spacing.md,
    paddingBottom: spacing.xxxl,
  },
  list: { gap: spacing.sm },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
});
