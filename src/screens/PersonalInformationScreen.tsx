import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { FC } from 'react';
import { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import type { ProfileStackParamList } from '../navigation/types';
import {
  AppButton,
  BottomCtaBar,
  FormField,
  ScreenHeader,
  ScreenScaffold,
  SectionTitle,
} from '../components/ui';
import { TECHNICIAN_PROFILE } from '../mocks';
import { colors, spacing } from '../theme';

type Props = NativeStackScreenProps<ProfileStackParamList, 'PersonalInformation'>;

/**
 * Spec #62 — Personal information read/edit.
 */
export const PersonalInformationScreen: FC<Props> = ({ navigation }) => {
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState(TECHNICIAN_PROFILE.name);
  const [email, setEmail] = useState('arjun@example.com');
  const [emergency, setEmergency] = useState('+91 99XXXXXX12');

  return (
    <ScreenScaffold>
      <ScreenHeader
        title="Personal info"
        onBack={() => navigation.goBack()}
      />
      <ScrollView
        contentContainerStyle={styles.body}
        showsVerticalScrollIndicator={false}
      >
        <SectionTitle title="Identity" caption="Tap edit to update" />
        <FormField
          label="Full name"
          value={name}
          onChangeText={setName}
          editable={edit}
          autoCapitalize="words"
        />
        <FormField
          label="Phone"
          value="+91 9876543210"
          onChangeText={() => {}}
          editable={false}
          rightAdornment={
            <Ionicons name="lock-closed" size={16} color={colors.muted} />
          }
        />
        <FormField
          label="Email"
          value={email}
          onChangeText={setEmail}
          editable={edit}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <SectionTitle title="Emergency contact" />
        <FormField
          label="Emergency phone"
          value={emergency}
          onChangeText={setEmergency}
          editable={edit}
          keyboardType="phone-pad"
        />
      </ScrollView>
      <BottomCtaBar>
        <AppButton
          label={edit ? 'Save changes' : 'Edit details'}
          variant={edit ? 'primary' : 'outline'}
          onPress={() => setEdit((v) => !v)}
          block
          leftIcon={
            <Ionicons
              name={edit ? 'checkmark' : 'create-outline'}
              size={18}
              color={edit ? colors.white : colors.text}
            />
          }
        />
      </BottomCtaBar>
    </ScreenScaffold>
  );
};

const styles = StyleSheet.create({
  body: {
    padding: spacing.lg,
    gap: spacing.md,
    paddingBottom: spacing.xxxl,
  },
});
