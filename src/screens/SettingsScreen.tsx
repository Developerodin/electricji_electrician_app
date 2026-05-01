import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { FC } from 'react';
import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import type { ProfileStackParamList } from '../navigation/types';
import {
  AppCard,
  AppToggle,
  ListRow,
  ScreenHeader,
  ScreenScaffold,
  SectionTitle,
} from '../components/ui';
import { spacing } from '../theme';

type Props = NativeStackScreenProps<ProfileStackParamList, 'Settings'>;

/**
 * Spec #78 — Settings hub (preferences, legal, danger zone).
 */
export const SettingsScreen: FC<Props> = ({ navigation }) => {
  const [jobsNotif, setJobsNotif] = useState(true);
  const [promoNotif, setPromoNotif] = useState(true);
  const [sound, setSound] = useState(true);

  return (
    <ScreenScaffold>
      <ScreenHeader title="Settings" onBack={() => navigation.goBack()} />
      <ScrollView
        contentContainerStyle={styles.body}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.group}>
          <SectionTitle title="Preferences" />
          <AppCard padded={false}>
            <ListRow
              title="Language"
              subtitle="English (India)"
              icon="language-outline"
              onPress={() =>
                navigation.getParent()?.getParent()?.navigate('LanguageSelection')
              }
              position="first"
            />
            <ListRow
              title="Job notifications"
              subtitle="New leads in your area"
              icon="notifications-outline"
              right={<AppToggle value={jobsNotif} onValueChange={setJobsNotif} />}
              showChevron={false}
            />
            <ListRow
              title="Promotions & updates"
              icon="megaphone-outline"
              right={<AppToggle value={promoNotif} onValueChange={setPromoNotif} />}
              showChevron={false}
            />
            <ListRow
              title="In-app sounds"
              icon="volume-high-outline"
              right={<AppToggle value={sound} onValueChange={setSound} />}
              showChevron={false}
              position="last"
            />
          </AppCard>
        </View>

        <View style={styles.group}>
          <SectionTitle title="Legal" />
          <AppCard padded={false}>
            <ListRow
              title="Privacy policy"
              icon="lock-closed-outline"
              onPress={() => Alert.alert('Privacy', 'Static prototype copy.')}
              position="first"
            />
            <ListRow
              title="Terms of service"
              icon="document-text-outline"
              onPress={() => Alert.alert('Terms', 'Static prototype copy.')}
            />
            <ListRow
              title="About"
              subtitle="v1.0.0 · Build 100"
              icon="information-circle-outline"
              showChevron={false}
            />
            <ListRow
              title="Check for updates"
              icon="cloud-download-outline"
              onPress={() => Alert.alert('Updates', 'You’re up to date.')}
              position="last"
            />
          </AppCard>
        </View>

        <View style={styles.group}>
          <SectionTitle title="Account" />
          <AppCard padded={false}>
            <ListRow
              title="Delete account"
              subtitle="Permanently remove your data"
              icon="trash-outline"
              danger
              onPress={() => navigation.navigate('DeleteAccount')}
              position="standalone"
            />
          </AppCard>
        </View>
      </ScrollView>
    </ScreenScaffold>
  );
};

const styles = StyleSheet.create({
  body: {
    padding: spacing.lg,
    gap: spacing.lg,
    paddingBottom: spacing.xxxl,
  },
  group: { gap: spacing.sm },
});
