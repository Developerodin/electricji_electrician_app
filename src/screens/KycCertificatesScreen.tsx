import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { FC } from 'react';
import { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import type { RootStackParamList } from '../navigation/types';
import { KycStepChrome } from '../components/KycStepChrome';
import {
  AppCard,
  EmptyState,
  KycDeliveryOutlineButton,
  KycDeliveryPrimaryButton,
  SectionTitle,
  Tag,
} from '../components/ui';
import { colors, fonts, radii, scaleFont, spacing } from '../theme';

type Cert = { id: string; type: string; institute: string; year: string };

type Props = NativeStackScreenProps<RootStackParamList, 'KycCertificates'>;

const SAMPLE_CERTS: Cert[] = [
  { id: '1', type: 'ITI Electrician', institute: 'Govt ITI Mumbai', year: '2018' },
  { id: '2', type: 'Diploma Electrical', institute: 'MSBTE', year: '2020' },
];

/**
 * Spec #14 — KYC 7 Qualification certificates (skip allowed).
 */
export const KycCertificatesScreen: FC<Props> = ({ navigation }) => {
  const [list, setList] = useState<Cert[]>([]);

  const addNext = () => {
    const next = SAMPLE_CERTS[list.length % SAMPLE_CERTS.length];
    setList((prev) => [...prev, { ...next, id: String(prev.length + 1) }]);
  };

  const skip = () => {
    Alert.alert('Skipped', 'You can add certificates later from Profile.');
    navigation.navigate('KycSpecialization');
  };

  return (
    <KycStepChrome
      step={7}
      title="Certificates"
      subtitle="Optional — adds trust with customers"
      onBack={() => navigation.goBack()}
      onSkip={skip}
      footer={
        <KycDeliveryPrimaryButton
          label="Continue"
          onPress={() => navigation.navigate('KycSpecialization')}
        />
      }
    >
      <View style={{ gap: 12, width: '100%' }}>
        <SectionTitle title="Your certificates" caption={`${list.length} added`} />

        {list.length === 0 ? (
          <EmptyState
            icon="ribbon-outline"
            title="No certificates yet"
            subtitle="Add ITI, diploma, or training certificates to stand out."
          />
        ) : (
          <View style={styles.list}>
            {list.map((c) => (
              <AppCard key={c.id} style={styles.card}>
                <View style={styles.row}>
                  <View style={styles.iconWrap}>
                    <Ionicons name="ribbon" size={18} color={colors.primary} />
                  </View>
                  <View style={styles.textCol}>
                    <Text style={styles.cardTitle}>{c.type}</Text>
                    <Text style={styles.cardSub}>{c.institute}</Text>
                  </View>
                  <Tag label={c.year} tone="primary" />
                </View>
              </AppCard>
            ))}
          </View>
        )}
      </View>

      <KycDeliveryOutlineButton
        label="Add certificate"
        onPress={addNext}
        leftIcon={<Ionicons name="add" size={18} color={colors.text} />}
      />
    </KycStepChrome>
  );
};

const styles = StyleSheet.create({
  list: { gap: 10 },
  card: { padding: spacing.md, borderRadius: 12, borderWidth: 1, borderColor: '#d3d3d3' },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: radii.md,
    backgroundColor: '#fce8e9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textCol: { flex: 1, gap: 2 },
  cardTitle: {
    fontFamily: fonts.publicSemiBold,
    fontSize: scaleFont(15),
    color: colors.text,
  },
  cardSub: {
    fontFamily: fonts.publicRegular,
    fontSize: scaleFont(12.5),
    color: colors.muted,
  },
});
