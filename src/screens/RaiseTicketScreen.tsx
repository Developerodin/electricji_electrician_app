import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { FC } from 'react';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import type { ProfileStackParamList } from '../navigation/types';
import {
  AppButton,
  BottomCtaBar,
  Chip,
  FormField,
  ScreenHeader,
  ScreenScaffold,
  SectionTitle,
} from '../components/ui';
import { colors, spacing } from '../theme';

type Props = NativeStackScreenProps<ProfileStackParamList, 'RaiseTicket'>;

const TOPICS = ['Payout', 'KYC', 'Job issue', 'App crash', 'Refund', 'Other'];

/**
 * Spec #73 — Raise ticket form with topic chips and rich form.
 */
export const RaiseTicketScreen: FC<Props> = ({ navigation }) => {
  const [topic, setTopic] = useState<string>('Payout');
  const [subject, setSubject] = useState('');
  const [desc, setDesc] = useState('');

  const valid = subject.trim().length >= 4 && desc.trim().length >= 10;

  return (
    <ScreenScaffold>
      <ScreenHeader title="New ticket" onBack={() => navigation.goBack()} />
      <ScrollView
        contentContainerStyle={styles.body}
        showsVerticalScrollIndicator={false}
      >
        <SectionTitle title="Topic" caption="Helps us route faster" />
        <View style={styles.chipRow}>
          {TOPICS.map((t) => (
            <Chip
              key={t}
              label={t}
              selected={topic === t}
              onPress={() => setTopic(t)}
            />
          ))}
        </View>

        <SectionTitle title="Details" />
        <FormField
          label="Subject"
          placeholder="Short summary"
          value={subject}
          onChangeText={setSubject}
        />
        <FormField
          label="Description"
          placeholder="Tell us what happened, when, and any error message"
          value={desc}
          onChangeText={setDesc}
          multiline
          multilineHeight={140}
        />
        <FormField
          label="Attachment"
          placeholder="Tap to attach screenshot (optional)"
          value=""
          editable={false}
          onChangeText={() => {}}
          rightAdornment={
            <Ionicons
              name="image-outline"
              size={18}
              color={colors.muted}
            />
          }
        />
      </ScrollView>

      <BottomCtaBar floating>
        <AppButton
          label="Submit ticket"
          disabled={!valid}
          onPress={() => {
            Alert.alert('Ticket created', 'ID TK-9001');
            navigation.navigate('MyTickets');
          }}
          block
          rightIcon={
            <Ionicons name="send" size={16} color={colors.white} />
          }
        />
      </BottomCtaBar>
    </ScreenScaffold>
  );
};

const styles = StyleSheet.create({
  body: { padding: spacing.lg, gap: spacing.md, paddingBottom: 140 },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
});
