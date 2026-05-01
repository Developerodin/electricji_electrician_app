import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { FC } from 'react';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { ProfileStackParamList } from '../navigation/types';
import { ScreenHeader } from '../components/ui';
import { colors, fonts, radii, scaleFont, spacing } from '../theme';

type Props = NativeStackScreenProps<ProfileStackParamList, 'TicketChat'>;

type Message = {
  id: string;
  who: 'me' | 'support';
  text: string;
  time: string;
};

const SEED: Message[] = [
  {
    id: 'm1',
    who: 'me',
    text: 'My payout for job #J1 is still pending since 3 days.',
    time: '10:42',
  },
  {
    id: 'm2',
    who: 'support',
    text: 'Hi Akshay, we’re checking with finance — should be cleared by EOD.',
    time: '10:48',
  },
  {
    id: 'm3',
    who: 'support',
    text: 'You’ll get a confirmation push notification once UPI is sent.',
    time: '10:48',
  },
];

/**
 * Spec #75 — Ticket chat thread with bubbles, status header and composer.
 */
export const TicketChatScreen: FC<Props> = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const [msg, setMsg] = useState('');
  const [thread, setThread] = useState<Message[]>(SEED);

  const send = () => {
    const trimmed = msg.trim();
    if (!trimmed) return;
    setThread((prev) => [
      ...prev,
      {
        id: `m${prev.length + 1}`,
        who: 'me',
        text: trimmed,
        time: 'now',
      },
    ]);
    setMsg('');
  };

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScreenHeader
        title={route.params.ticketId}
        subtitle="Open · Support"
        onBack={() => navigation.goBack()}
      />

      <View style={styles.statusBanner}>
        <View style={styles.statusDot} />
        <Text style={styles.statusTxt}>Support is online · avg 5 min reply</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.thread}
        showsVerticalScrollIndicator={false}
      >
        {thread.map((m) => (
          <Bubble key={m.id} message={m} />
        ))}
      </ScrollView>

      <View
        style={[
          styles.footer,
          { paddingBottom: Math.max(insets.bottom, spacing.sm) },
        ]}
      >
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Attach file"
          style={styles.iconBtn}
          onPress={() => {}}
        >
          <Ionicons name="attach" size={20} color={colors.muted} />
        </Pressable>
        <TextInput
          value={msg}
          onChangeText={setMsg}
          placeholder="Message support"
          style={styles.input}
          placeholderTextColor={colors.mutedSoft}
          multiline
        />
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Send message"
          accessibilityState={{ disabled: !msg.trim() }}
          disabled={!msg.trim()}
          onPress={send}
          style={({ pressed }) => [
            styles.sendBtn,
            !msg.trim() && styles.sendBtnDisabled,
            pressed && { transform: [{ scale: 0.96 }] },
          ]}
        >
          <Ionicons name="send" size={16} color={colors.white} />
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

const Bubble: FC<{ message: Message }> = ({ message }) => {
  const mine = message.who === 'me';
  return (
    <View
      style={[
        styles.bubbleRow,
        mine ? styles.bubbleRight : styles.bubbleLeft,
      ]}
    >
      <View
        style={[styles.bubble, mine ? styles.bubbleMine : styles.bubbleTheirs]}
      >
        <Text
          style={[
            styles.bubbleTxt,
            mine ? styles.bubbleTxtMine : styles.bubbleTxtTheirs,
          ]}
        >
          {message.text}
        </Text>
        <Text
          style={[
            styles.bubbleTime,
            mine ? styles.bubbleTimeMine : styles.bubbleTimeTheirs,
          ]}
        >
          {message.time}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.pageBg },
  statusBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    backgroundColor: colors.successSoft,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.success,
  },
  statusTxt: {
    fontFamily: fonts.publicSemiBold,
    fontSize: scaleFont(12),
    color: colors.success,
  },
  thread: {
    padding: spacing.lg,
    gap: spacing.sm,
  },
  bubbleRow: { flexDirection: 'row' },
  bubbleLeft: { justifyContent: 'flex-start' },
  bubbleRight: { justifyContent: 'flex-end' },
  bubble: {
    maxWidth: '82%',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 2,
    borderRadius: radii.lg,
    gap: 4,
  },
  bubbleMine: {
    backgroundColor: colors.primary,
    borderBottomRightRadius: 4,
  },
  bubbleTheirs: {
    backgroundColor: colors.white,
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  bubbleTxt: {
    fontFamily: fonts.publicMedium,
    fontSize: scaleFont(13.5),
    lineHeight: 20,
  },
  bubbleTxtMine: { color: colors.white },
  bubbleTxtTheirs: { color: colors.text },
  bubbleTime: {
    fontFamily: fonts.publicRegular,
    fontSize: scaleFont(10.5),
  },
  bubbleTimeMine: { color: 'rgba(255,255,255,0.78)', alignSelf: 'flex-end' },
  bubbleTimeTheirs: { color: colors.muted, alignSelf: 'flex-end' },
  footer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.borderLight,
    backgroundColor: colors.white,
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: radii.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    flex: 1,
    minHeight: 40,
    maxHeight: 120,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: Platform.OS === 'ios' ? 10 : 8,
    fontFamily: fonts.publicMedium,
    fontSize: scaleFont(13.5),
    color: colors.text,
    backgroundColor: colors.white,
  },
  sendBtn: {
    width: 44,
    height: 44,
    borderRadius: radii.pill,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendBtnDisabled: { opacity: 0.5 },
});
