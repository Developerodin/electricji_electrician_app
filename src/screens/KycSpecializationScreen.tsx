import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { FC } from 'react';
import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import type { RootStackParamList } from '../navigation/types';
import { KycStepChrome } from '../components/KycStepChrome';
import {
  AppButton,
  Chip,
  FormField,
  RadioRow,
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

const SUB_BY_PRIMARY: Record<(typeof PRIMARY)[number], string[]> = {
  Electrician: ['Wiring', 'Switchboard', 'Inverter', 'Fan', 'Geyser', 'Chandelier'],
  Plumber: ['Leak fix', 'Motor', 'Bathroom'],
  'AC Technician': ['Gas refill', 'Split install'],
  'Appliance Repair': ['Fridge', 'Washing machine', 'Microwave'],
  Carpenter: ['Door', 'Shelf'],
};

type Props = NativeStackScreenProps<RootStackParamList, 'KycSpecialization'>;

/**
 * Spec #15 — KYC 8 Specialization (primary trade + sub-skills + experience).
 */
export const KycSpecializationScreen: FC<Props> = ({ navigation }) => {
  const [primary, setPrimary] = useState<(typeof PRIMARY)[number]>('Electrician');
  const [subs, setSubs] = useState<string[]>([]);
  const [years, setYears] = useState('5');

  const toggle = (s: string) => {
    setSubs((p) => (p.includes(s) ? p.filter((x) => x !== s) : [...p, s]));
  };

  return (
    <KycStepChrome
      step={8}
      title="Your specialization"
      subtitle="Pick your trade and years of experience"
      onBack={() => navigation.goBack()}
      footer={
        <AppButton
          label="Continue"
          onPress={() => navigation.navigate('KycServiceArea')}
          block
        />
      }
    >
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <SectionTitle title="Primary trade" caption="Choose one" />
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
          {SUB_BY_PRIMARY[primary].map((s) => (
            <Chip
              key={s}
              label={s}
              selected={subs.includes(s)}
              onPress={() => toggle(s)}
            />
          ))}
        </View>

        <FormField
          label="Years of experience (0–25)"
          keyboardType="number-pad"
          value={years}
          onChangeText={(t) => setYears(t.replace(/\D/g, '').slice(0, 2))}
          helper="Helps us match you with the right jobs"
        />
      </ScrollView>
    </KycStepChrome>
  );
};

const styles = StyleSheet.create({
  scroll: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xxxl,
    gap: spacing.md,
  },
  list: { gap: spacing.sm },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
});
