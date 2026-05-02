import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { FC } from 'react';
import { useState } from 'react';
import { View } from 'react-native';
import type { RootStackParamList } from '../navigation/types';
import { KycStepChrome } from '../components/KycStepChrome';
import {
  FormField,
  KycDeliveryPrimaryButton,
  SectionTitle,
  UploadCard,
} from '../components/ui';

type Props = NativeStackScreenProps<RootStackParamList, 'KycPan'>;

/**
 * Spec #11 — KYC 4 PAN.
 */
export const KycPanScreen: FC<Props> = ({ navigation }) => {
  const [pan, setPan] = useState('');
  const [uploaded, setUploaded] = useState(false);

  const valid = /^[A-Z]{5}[0-9]{4}[A-Z]$/.test(pan);

  return (
    <KycStepChrome
      step={4}
      title="PAN details"
      subtitle="Required for tax compliance"
      onBack={() => navigation.goBack()}
      footer={
        <KycDeliveryPrimaryButton
          label="Continue"
          onPress={() => navigation.navigate('KycAddressProof')}
        />
      }
    >
      <FormField
        label="PAN number"
        autoCapitalize="characters"
        value={pan}
        onChangeText={(t) =>
          setPan(t.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 10))
        }
        placeholder="ABCDE1234F"
        helper="10 characters, format: ABCDE1234F"
        error={pan.length === 10 && !valid ? 'Invalid PAN format' : undefined}
      />

      <View style={{ gap: 12, width: '100%' }}>
        <SectionTitle title="Upload PAN card" caption="Front side only" />
        <UploadCard
          title="PAN card image"
          subtitle="JPG or PDF, up to 5MB"
          uploaded={uploaded}
          onPress={() => setUploaded(true)}
        />
      </View>
    </KycStepChrome>
  );
};
