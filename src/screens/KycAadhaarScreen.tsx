import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { FC } from 'react';
import { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import type { RootStackParamList } from '../navigation/types';
import { KycStepChrome } from '../components/KycStepChrome';
import {
  AppButton,
  FormField,
  SectionTitle,
  UploadCard,
} from '../components/ui';
import { spacing } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'KycAadhaar'>;

function formatAadhaar(raw: string): string {
  const d = raw.replace(/\D/g, '').slice(0, 12);
  return d.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
}

/**
 * Spec #10 — KYC 3 Aadhaar upload + OCR auto-fill (dummy).
 */
export const KycAadhaarScreen: FC<Props> = ({ navigation }) => {
  const [num, setNum] = useState('');
  const [frontUp, setFrontUp] = useState(false);
  const [backUp, setBackUp] = useState(false);
  const [ocrName, setOcrName] = useState('');
  const [ocrDob, setOcrDob] = useState('');
  const [ocrAddr, setOcrAddr] = useState('');

  const tryOcr = (front: boolean, back: boolean) => {
    if (front && back) {
      setOcrName('Arjun Mehta');
      setOcrDob('12/08/1994');
      setOcrAddr('Flat 502, Sunshine Apartments, Mumbai');
    }
  };

  return (
    <KycStepChrome
      step={3}
      title="Aadhaar verification"
      subtitle="We auto-fill details after upload"
      onBack={() => navigation.goBack()}
      footer={
        <AppButton
          label="Continue"
          onPress={() => navigation.navigate('KycPan')}
          block
        />
      }
    >
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <FormField
          label="Aadhaar number"
          accessibilityLabel="Aadhaar number"
          value={formatAadhaar(num)}
          onChangeText={(t) => setNum(t.replace(/\D/g, ''))}
          keyboardType="number-pad"
          placeholder="XXXX XXXX XXXX"
        />

        <SectionTitle title="Upload card" caption="Front and back" />
        <UploadCard
          title="Aadhaar front"
          subtitle="Tap to upload (dummy)"
          uploaded={frontUp}
          onPress={() => {
            setFrontUp(true);
            tryOcr(true, backUp);
          }}
        />
        <UploadCard
          title="Aadhaar back"
          subtitle="Tap to upload (dummy)"
          uploaded={backUp}
          onPress={() => {
            setBackUp(true);
            tryOcr(frontUp, true);
          }}
        />

        <SectionTitle title="Auto-filled details" caption="Edit if needed" />
        <FormField label="Full name" value={ocrName} onChangeText={setOcrName} />
        <FormField label="Date of birth" value={ocrDob} onChangeText={setOcrDob} />
        <FormField
          label="Address"
          multiline
          value={ocrAddr}
          onChangeText={setOcrAddr}
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
});
