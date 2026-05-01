import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { FC } from 'react';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import type { RootStackParamList } from '../navigation/types';
import { KycStepChrome } from '../components/KycStepChrome';
import {
  AppButton,
  AppCard,
  Chip,
  FormField,
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
        <AppButton
          label="Continue"
          onPress={() => navigation.navigate('KycBankUpi')}
          block
        />
      }
    >
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <AppCard style={styles.mapCard} padded={false}>
          <View style={styles.mapInner}>
            <View style={styles.pinDot}>
              <Ionicons name="location" size={20} color={colors.white} />
            </View>
            <Text style={styles.mapText}>Map preview · base location</Text>
          </View>
          <View style={styles.mapFooter}>
            <AppButton
              label="Set base location"
              variant="outline"
              size="sm"
              onPress={() => {}}
            />
          </View>
        </AppCard>

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

        <SectionTitle title="Additional pincodes" caption="Up to 5" />
        <FormField
          label="Pincodes"
          placeholder="400001, 400050"
          value={pinInput}
          onChangeText={setPinInput}
        />
        <AppButton
          label="Add pincodes"
          variant="outline"
          size="sm"
          onPress={addPins}
        />

        {pins.length > 0 ? (
          <View style={styles.chips}>
            {pins.map((p) => (
              <Chip key={p} label={`${p} ×`} selected onPress={() => remove(p)} />
            ))}
          </View>
        ) : null}
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
  mapCard: {
    overflow: 'hidden',
    padding: 0,
  },
  mapInner: {
    height: 140,
    backgroundColor: colors.surfaceAlt,
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
    borderTopColor: colors.borderLight,
    alignItems: 'flex-start',
  },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
});
