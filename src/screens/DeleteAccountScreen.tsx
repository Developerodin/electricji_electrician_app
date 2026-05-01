import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { FC } from 'react';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import type { ProfileStackParamList } from '../navigation/types';
import {
  AppButton,
  AppCard,
  BottomCtaBar,
  FormField,
  ScreenHeader,
  ScreenScaffold,
} from '../components/ui';
import { colors, fonts, radii, scaleFont, spacing } from '../theme';

type Props = NativeStackScreenProps<ProfileStackParamList, 'DeleteAccount'>;

const RISKS = [
  'Earnings history is permanently deleted',
  'You will lose your rating and badges',
  'Refunds in progress will be cancelled',
  'You can re-register but stats won’t carry over',
];

/**
 * Spec #79 — Delete account confirmation with risk callouts.
 */
export const DeleteAccountScreen: FC<Props> = ({ navigation }) => {
  const [confirm, setConfirm] = useState('');
  const ok = confirm.trim().toUpperCase() === 'DELETE';

  const wipe = () => {
    const root = navigation.getParent()?.getParent();
    root?.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'PhoneEntry' }],
      }),
    );
  };

  return (
    <ScreenScaffold>
      <ScreenHeader title="Delete account" onBack={() => navigation.goBack()} />
      <ScrollView
        contentContainerStyle={styles.body}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.warningCircle}>
          <Ionicons name="warning" size={36} color={colors.error} />
        </View>
        <Text style={styles.title}>This is permanent</Text>
        <Text style={styles.subtitle}>
          You’re about to remove your technician profile and all associated data.
        </Text>

        <AppCard style={styles.riskCard}>
          {RISKS.map((r, i) => (
            <View
              key={r}
              style={[
                styles.riskRow,
                i < RISKS.length - 1 && styles.riskRowDivider,
              ]}
            >
              <Ionicons
                name="close-circle"
                size={16}
                color={colors.error}
              />
              <Text style={styles.riskText}>{r}</Text>
            </View>
          ))}
        </AppCard>

        <FormField
          label="Type DELETE to confirm"
          value={confirm}
          onChangeText={setConfirm}
          placeholder="DELETE"
          autoCapitalize="characters"
        />
      </ScrollView>
      <BottomCtaBar>
        <AppButton
          label="Cancel"
          variant="outline"
          onPress={() => navigation.goBack()}
          block
        />
        <AppButton
          label="Permanently delete"
          variant="danger"
          disabled={!ok}
          onPress={wipe}
          block
        />
      </BottomCtaBar>
    </ScreenScaffold>
  );
};

const styles = StyleSheet.create({
  body: {
    padding: spacing.lg,
    gap: spacing.md,
    alignItems: 'stretch',
    paddingBottom: spacing.xxxl,
  },
  warningCircle: {
    alignSelf: 'center',
    width: 72,
    height: 72,
    borderRadius: radii.pill,
    backgroundColor: colors.errorSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.md,
  },
  title: {
    fontFamily: fonts.publicBold,
    fontSize: scaleFont(20),
    color: colors.text,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: fonts.publicRegular,
    fontSize: scaleFont(13.5),
    color: colors.muted,
    textAlign: 'center',
    maxWidth: 320,
    alignSelf: 'center',
  },
  riskCard: {
    paddingVertical: 0,
    padding: 0,
  },
  riskRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  riskRowDivider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.borderLight,
  },
  riskText: {
    flex: 1,
    fontFamily: fonts.publicMedium,
    fontSize: scaleFont(13),
    color: colors.text,
  },
});
