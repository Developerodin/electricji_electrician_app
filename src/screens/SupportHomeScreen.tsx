import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { FC } from 'react';
import {
  Linking,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import type { ProfileStackParamList } from '../navigation/types';
import {
  AppButton,
  AppCard,
  Chip,
  FormField,
  ListRow,
  ScreenHeader,
  ScreenScaffold,
  SectionTitle,
} from '../components/ui';
import { colors, spacing } from '../theme';

type Props = NativeStackScreenProps<ProfileStackParamList, 'SupportHome'>;

/**
 * Spec #71 — Support home: search, quick chips, contact options, FAQs link.
 */
export const SupportHomeScreen: FC<Props> = ({ navigation }) => (
  <ScreenScaffold>
    <ScreenHeader title="Help & Support" onBack={() => navigation.goBack()} />
    <ScrollView
      contentContainerStyle={styles.body}
      showsVerticalScrollIndicator={false}
    >
      <FormField
        label="Search help"
        placeholder="Type your question…"
        value=""
        onChangeText={() => {}}
        leftAdornment={
          <Ionicons name="search" size={18} color={colors.muted} />
        }
      />

      <SectionTitle title="Common topics" />
      <View style={styles.chipRow}>
        {['Payout', 'KYC', 'Job issue', 'App crash', 'Refund', 'Wholesale'].map((t) => (
          <Chip key={t} label={t} onPress={() => navigation.navigate('FaqList')} />
        ))}
      </View>

      <SectionTitle title="Get in touch" />
      <AppCard padded={false}>
        <ListRow
          title="Raise a ticket"
          subtitle="Reply within 4 hours"
          icon="document-text-outline"
          onPress={() => navigation.navigate('RaiseTicket')}
          position="first"
        />
        <ListRow
          title="My tickets"
          subtitle="View status of past tickets"
          icon="chatbubble-ellipses-outline"
          onPress={() => navigation.navigate('MyTickets')}
        />
        <ListRow
          title="Browse FAQs"
          subtitle="Quick answers to top questions"
          icon="help-buoy-outline"
          onPress={() => navigation.navigate('FaqList')}
          position="last"
        />
      </AppCard>

      <AppButton
        label="Call support"
        variant="outline"
        leftIcon={<Ionicons name="call" size={18} color={colors.text} />}
        onPress={() =>
          Linking.openURL('tel:18001234567').catch((e: unknown) =>
            console.warn('[tel]', e),
          )
        }
        block
      />
    </ScrollView>
  </ScreenScaffold>
);

const styles = StyleSheet.create({
  body: {
    padding: spacing.lg,
    gap: spacing.md,
    paddingBottom: spacing.xxxl,
  },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
});
