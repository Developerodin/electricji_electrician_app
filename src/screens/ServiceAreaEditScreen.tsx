import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { FC } from 'react';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import type { ProfileStackParamList } from '../navigation/types';
import {
  AppButton,
  AppCard,
  BottomCtaBar,
  Chip,
  FormField,
  ScreenHeader,
  ScreenScaffold,
  SectionTitle,
} from '../components/ui';
import { colors, fonts, radii, scaleFont, spacing } from '../theme';

const RADII_KM = [5, 10, 15, 25] as const;

type Props = NativeStackScreenProps<ProfileStackParamList, 'ServiceAreaEdit'>;

/**
 * Spec #64 — Service area edit (post-KYC).
 */
export const ServiceAreaEditScreen: FC<Props> = ({ navigation }) => {
  const [radius, setRadius] = useState<(typeof RADII_KM)[number]>(10);
  const [pins, setPins] = useState<string[]>(['400053']);
  const [pinInput, setPinInput] = useState('');

  const addPins = () => {
    const parts = pinInput.split(/[\s,]+/).filter(Boolean).slice(0, 5);
    setPins((p) => Array.from(new Set([...p, ...parts])).slice(0, 5));
    setPinInput('');
  };

  return (
    <ScreenScaffold>
      <ScreenHeader title="Service area" onBack={() => navigation.goBack()} />
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <AppCard padded={false} style={styles.mapCard}>
          <View style={styles.mapInner}>
            <View style={styles.pinDot}>
              <Ionicons name="location" size={20} color={colors.white} />
            </View>
            <Text style={styles.mapText}>Map preview · base location</Text>
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
          value={pinInput}
          onChangeText={setPinInput}
          placeholder="comma separated"
        />
        <AppButton
          label="Add"
          variant="outline"
          size="sm"
          onPress={addPins}
        />
        <View style={styles.chips}>
          {pins.map((p) => (
            <Chip
              key={p}
              label={`${p} ×`}
              selected
              onPress={() =>
                setPins((x) => x.filter((y) => y !== p))
              }
            />
          ))}
        </View>
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
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
});
