import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { FC } from 'react';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import type { RootStackParamList } from '../navigation/types';
import { KycStepChrome } from '../components/KycStepChrome';
import {
  Chip,
  FormField,
  KycDeliveryPrimaryButton,
  RadioRow,
  SectionTitle,
} from '../components/ui';

const LANG_OPTIONS = ['Hindi', 'English', 'Marathi', 'Gujarati', 'Tamil', 'Telugu'];

type Props = NativeStackScreenProps<RootStackParamList, 'KycPersonal'>;

/**
 * Spec #8 — KYC 1 Personal details: name, DOB, gender, languages.
 */
export const PersonalInfoScreen: FC<Props> = ({ navigation }) => {
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState<'Male' | 'Female' | 'Other' | null>(
    null,
  );
  const [langs, setLangs] = useState<string[]>([]);

  const toggleLang = (l: string) => {
    setLangs((prev) =>
      prev.includes(l) ? prev.filter((x) => x !== l) : [...prev, l],
    );
  };

  const canNext =
    name.trim().length > 1 && dob.length > 0 && gender !== null && langs.length > 0;

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <KycStepChrome
        step={1}
        title="About you"
        subtitle="Just the basics — takes 30 seconds"
        onBack={() => navigation.goBack()}
        footer={
          <KycDeliveryPrimaryButton
            label="Continue"
            disabled={!canNext}
            onPress={() => navigation.navigate('KycSelfie')}
          />
        }
      >
        <View style={styles.fields}>
          <FormField
            label="Full name"
            accessibilityLabel="Full name"
            value={name}
            onChangeText={setName}
            placeholder="As per Aadhaar"
            autoCapitalize="words"
          />
          <FormField
            label="Date of birth"
            accessibilityLabel="Date of birth"
            value={dob}
            onChangeText={setDob}
            placeholder="DD / MM / YYYY"
            keyboardType="number-pad"
          />
        </View>

        <View style={styles.block}>
          <SectionTitle title="Gender" />
          <View style={styles.list}>
            {(['Male', 'Female', 'Other'] as const).map((g) => (
              <RadioRow
                key={g}
                label={g}
                selected={gender === g}
                onPress={() => setGender(g)}
              />
            ))}
          </View>
        </View>

        <View style={styles.block}>
          <SectionTitle
            title="Languages you speak"
            caption="Pick all that apply"
          />
          <View style={styles.chips}>
            {LANG_OPTIONS.map((l) => (
              <Chip
                key={l}
                label={l}
                selected={langs.includes(l)}
                onPress={() => toggleLang(l)}
              />
            ))}
          </View>
        </View>
      </KycStepChrome>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  flex: { flex: 1 },
  fields: { gap: 16, width: '100%' },
  block: { gap: 16, width: '100%' },
  list: { gap: 12 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
});
