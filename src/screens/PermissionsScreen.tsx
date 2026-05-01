import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { FC } from 'react';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import type { RootStackParamList } from '../navigation/types';
import { AppButton } from '../components/ui/Button';
import { AppToggle } from '../components/ui/Toggle';
import { colors, fonts, scaleFont, spacing } from '../theme';

type Row = {
  key: string;
  title: string;
  subtitle: string;
  icon: keyof typeof Ionicons.glyphMap;
};

const ROWS: Row[] = [
  {
    key: 'loc',
    title: 'Location (Always)',
    subtitle: 'To match you with nearby jobs',
    icon: 'location-outline',
  },
  {
    key: 'notif',
    title: 'Notifications',
    subtitle: 'To alert you about new leads',
    icon: 'notifications-outline',
  },
  {
    key: 'cam',
    title: 'Camera',
    subtitle: 'For photos and selfie verification',
    icon: 'camera-outline',
  },
  {
    key: 'storage',
    title: 'Storage',
    subtitle: 'To save your documents',
    icon: 'folder-outline',
  },
];

type Props = NativeStackScreenProps<RootStackParamList, 'Permissions'>;

/**
 * Spec #6 — permission rows with dummy Allow → green tick via toggle.
 */
export const PermissionsScreen: FC<Props> = ({ navigation }) => {
  const [allowed, setAllowed] = useState<Record<string, boolean>>({});

  const toggle = (key: string, v: boolean) => {
    setAllowed((prev) => ({ ...prev, [key]: v }));
  };

  return (
    <View style={styles.root}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.h1} accessibilityRole="header">
          We need a few permissions
        </Text>
        {ROWS.map((r) => (
          <View key={r.key} style={styles.row}>
            <Ionicons name={r.icon} size={28} color={colors.primary} />
            <View style={styles.copy}>
              <Text style={styles.title}>{r.title}</Text>
              <Text style={styles.sub}>{r.subtitle}</Text>
            </View>
            {allowed[r.key] ? (
              <Ionicons name="checkmark-circle" size={28} color={colors.success} />
            ) : (
              <AppToggle
                value={!!allowed[r.key]}
                onValueChange={(v) => toggle(r.key, v)}
                accessibilityLabel={`Allow ${r.title}`}
              />
            )}
          </View>
        ))}
      </ScrollView>
      <View style={styles.footer}>
        <AppButton
          label="Continue"
          onPress={() => navigation.navigate('OnboardingIntro')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.white },
  scroll: { padding: spacing.lg, gap: spacing.lg },
  h1: {
    fontFamily: fonts.publicBold,
    fontSize: scaleFont(22),
    color: colors.text,
    marginBottom: spacing.sm,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.borderLight,
  },
  copy: { flex: 1, gap: 4 },
  title: {
    fontFamily: fonts.publicSemiBold,
    fontSize: scaleFont(16),
    color: colors.text,
  },
  sub: {
    fontFamily: fonts.publicRegular,
    fontSize: scaleFont(13),
    color: colors.muted,
  },
  footer: {
    padding: spacing.lg,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.borderLight,
  },
});
