import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { FC } from 'react';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import type { RootStackParamList } from '../navigation/types';
import { KycStepChrome } from '../components/KycStepChrome';
import {
  Chip,
  FormField,
  KycDeliveryPrimaryButton,
  SectionTitle,
  UploadCard,
} from '../components/ui';

const PROOF_TYPES = [
  'Utility Bill',
  'Rent Agreement',
  'Voter ID',
  'Driving License',
] as const;

type Props = NativeStackScreenProps<RootStackParamList, 'KycAddressProof'>;

/**
 * Spec #12 — KYC 5 Address proof.
 */
export const KycAddressProofScreen: FC<Props> = ({ navigation }) => {
  const [kind, setKind] = useState<string>(PROOF_TYPES[0]);
  const [uploaded, setUploaded] = useState(false);
  const [addr, setAddr] = useState('Flat 502, Sunshine Apartments');
  const [pin, setPin] = useState('400053');
  const [city, setCity] = useState('Mumbai');
  const [state, setState] = useState('Maharashtra');

  return (
    <KycStepChrome
      step={5}
      title="Address proof"
      subtitle="Pick one document type and upload"
      onBack={() => navigation.goBack()}
      footer={
        <KycDeliveryPrimaryButton
          label="Continue"
          onPress={() => navigation.navigate('KycLiveness')}
        />
      }
    >
      <View style={{ gap: 12, width: '100%' }}>
        <SectionTitle title="Proof type" />
        <View style={styles.row}>
          {PROOF_TYPES.map((p) => (
            <Chip
              key={p}
              label={p}
              selected={kind === p}
              onPress={() => setKind(p)}
            />
          ))}
        </View>
      </View>

      <UploadCard
        title={kind}
        subtitle="Tap to upload (dummy)"
        uploaded={uploaded}
        onPress={() => setUploaded(true)}
      />

      <View style={{ gap: 16, width: '100%' }}>
        <SectionTitle title="Address" caption="Auto-filled where possible" />
        <FormField
          label="Current address"
          multiline
          value={addr}
          onChangeText={setAddr}
        />
        <FormField
          label="Pincode"
          keyboardType="number-pad"
          value={pin}
          onChangeText={(t) => {
            const next = t.replace(/\D/g, '').slice(0, 6);
            setPin(next);
            if (next.startsWith('400')) {
              setCity('Mumbai');
              setState('Maharashtra');
            }
          }}
        />
        <FormField
          label="City / State"
          value={`${city}, ${state}`}
          editable={false}
        />
      </View>
    </KycStepChrome>
  );
};

const styles = StyleSheet.create({
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
});
