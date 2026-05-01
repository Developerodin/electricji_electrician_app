import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { FC } from 'react';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import type { ProfileStackParamList } from '../navigation/types';
import {
  AppButton,
  BottomCtaBar,
  FormField,
  ScreenHeader,
  ScreenScaffold,
  SectionTitle,
} from '../components/ui';
import { colors, fonts, scaleFont, spacing } from '../theme';

type Props = NativeStackScreenProps<ProfileStackParamList, 'BioAbout'>;

const MAX = 200;

/**
 * Spec #68 — Bio / about (200 chars).
 */
export const BioAboutScreen: FC<Props> = ({ navigation }) => {
  const [bio, setBio] = useState(
    'Licensed electrician · 5+ yrs Mumbai. Specialise in fan repair and inverter installs.',
  );

  return (
    <ScreenScaffold>
      <ScreenHeader title="Your bio" onBack={() => navigation.goBack()} />
      <ScrollView
        contentContainerStyle={styles.body}
        showsVerticalScrollIndicator={false}
      >
        <SectionTitle
          title="Tell customers about you"
          caption="A great bio earns more jobs"
        />
        <FormField
          label={`Bio (${bio.length}/${MAX})`}
          value={bio}
          onChangeText={(t) => setBio(t.slice(0, MAX))}
          multiline
          multilineHeight={140}
          accessibilityLabel="Bio text"
        />
        <Text style={styles.tip}>
          Tip: mention years of experience, key skills, and any certifications.
        </Text>
      </ScrollView>
      <BottomCtaBar>
        <AppButton label="Save bio" onPress={() => navigation.goBack()} block />
      </BottomCtaBar>
    </ScreenScaffold>
  );
};

const styles = StyleSheet.create({
  body: {
    padding: spacing.lg,
    gap: spacing.md,
  },
  tip: {
    fontFamily: fonts.publicRegular,
    fontSize: scaleFont(12.5),
    color: colors.muted,
  },
});
