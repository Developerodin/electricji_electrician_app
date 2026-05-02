import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { FC } from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { RootStackParamList } from '../navigation/types';
import { KycStepChrome } from '../components/KycStepChrome';
import {
  AppCard,
  Chip,
  FormField,
  KycDeliveryOutlineButton,
  KycDeliveryPrimaryButton,
  SectionTitle,
} from '../components/ui';
import { colors, fonts, radii, scaleFont, spacing } from '../theme';

const RADII_KM = [5, 10, 15, 25] as const;

type Props = NativeStackScreenProps<RootStackParamList, 'KycServiceArea'>;

/**
 * Spec #16 — KYC 9 Service area (map placeholder + radius + pincodes).
 */
export const KycServiceAreaScreen: FC<Props> = ({ navigation }) => {
  const [radius, setRadius] = useState<(typeof RADII_KM)[number]>(10);
  const [pins, setPins] = useState<string[]>(['400053']);
  const [pinInput, setPinInput] = useState('');

  const addPins = () => {
    const parts = pinInput.split(/[\s,]+/).filter(Boolean).slice(0, 5);
    setPins((p) => Array.from(new Set([...p, ...parts])).slice(0, 5));
    setPinInput('');
  };

  const remove = (p: string) => setPins((x) => x.filter((y) => y !== p));

  return (
    <KycStepChrome
      step={9}
      title="Service area"
      subtitle="Where you’ll get jobs from"
      onBack={() => navigation.goBack()}
      footer={
        <KycDeliveryPrimaryButton
          label="Continue"
          onPress={() => navigation.navigate('KycBankUpi')}
        />
      }
    >
      <AppCard style={styles.mapCard} padded={false}>
        <View style={styles.mapInner}>
          <View style={styles.pinDot}>
            <Ionicons name="location" size={20} color={colors.white} />
          </View>
          <Text style={styles.mapText}>Map preview · base location</Text>
        </View>
        <View style={styles.mapFooter}>
          <KycDeliveryOutlineButton
            label="Set base location"
            size="sm"
            onPress={() => {}}
          />
        </View>
      </AppCard>

      <View style={{ gap: 12, width: '100%' }}>
        <SectionTitle title="Service radius" caption={`${radius} km from base`} />
        <View style={styles.chips}>
          {RADII_KM.map((r) => (
            <Chip
              key={r}
              label={`${r} km`}
              selected={radius === r}
              onPress={() => setRadius(r)}
            />
          ))}
        </View>
      </View>

      <View style={{ gap: 12, width: '100%' }}>
        <SectionTitle title="Additional pincodes" caption="Up to 5" />
        <FormField
          label="Pincodes"
          placeholder="400001, 400050"
          value={pinInput}
          onChangeText={setPinInput}
        />
        <KycDeliveryOutlineButton
          label="Add pincodes"
          size="sm"
          onPress={addPins}
        />
      </View>

      {pins.length > 0 ? (
        <View style={styles.chips}>
          {pins.map((p) => (
            <Chip key={p} label={`${p} ×`} selected onPress={() => remove(p)} />
          ))}
        </View>
      ) : null}
    </KycStepChrome>
  );
};

const styles = StyleSheet.create({
  mapCard: {
    overflow: 'hidden',
    padding: 0,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#d3d3d3',
  },
  mapInner: {
    height: 140,
    backgroundColor: '#f9fafb',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  pinDot: {
    width: 38,
    height: 38,
    borderRadius: radii.pill,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapText: {
    fontFamily: fonts.publicMedium,
    fontSize: scaleFont(13),
    color: colors.muted,
  },
  mapFooter: {
    padding: spacing.md,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#e4e6ea',
    alignItems: 'stretch',
  },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
});
