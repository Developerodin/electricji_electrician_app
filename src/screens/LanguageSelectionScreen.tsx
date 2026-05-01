import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { FC } from 'react';
import { useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import type { RootStackParamList } from '../navigation/types';
import { AppButton } from '../components/ui/Button';
import { RadioRow } from '../components/ui/RadioRow';
import { colors, fonts, scaleFont, spacing } from '../theme';

const LANGS = [
  'English',
  'हिंदी',
  'मराठी',
  'ગુજરાતી',
  'தமிழ்',
  'తెలుగు',
] as const;

type Props = NativeStackScreenProps<RootStackParamList, 'LanguageSelection'>;

/**
 * Spec #2 — language radio list + Continue (disabled until selected).
 */
export const LanguageSelectionScreen: FC<Props> = ({ navigation }) => {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <View style={styles.root}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.heading} accessibilityRole="header">
          Choose your language
        </Text>
        {LANGS.map((l) => (
          <RadioRow
            key={l}
            label={l}
            selected={selected === l}
            onPress={() => setSelected(l)}
          />
        ))}
      </ScrollView>
      <View style={styles.footer}>
        <AppButton
          label="Continue"
          disabled={!selected}
          onPress={() => navigation.navigate('WelcomeCarousel')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scroll: {
    padding: spacing.lg,
    paddingTop: spacing.xxxl,
  },
  heading: {
    fontFamily: fonts.publicBold,
    fontSize: scaleFont(22),
    color: colors.text,
    marginBottom: spacing.lg,
  },
  footer: {
    padding: spacing.lg,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.borderLight,
  },
});
