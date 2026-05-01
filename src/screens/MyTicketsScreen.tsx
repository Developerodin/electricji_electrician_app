import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { FC } from 'react';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import type { ProfileStackParamList } from '../navigation/types';
import {
  AppButton,
  AppCard,
  EmptyState,
  ScreenHeader,
  ScreenScaffold,
  SectionTitle,
  SegmentedTabs,
  Tag,
} from '../components/ui';
import { MOCK_TICKETS } from '../mocks';
import { colors, fonts, radii, scaleFont, spacing } from '../theme';

type Props = NativeStackScreenProps<ProfileStackParamList, 'MyTickets'>;

/**
 * Spec #74 — My tickets list with status tabs and ticket cards.
 */
export const MyTicketsScreen: FC<Props> = ({ navigation }) => {
  const [tab, setTab] = useState<'Open' | 'Resolved'>('Open');
  const rows = MOCK_TICKETS.filter((t) => t.status === tab);

  return (
    <ScreenScaffold>
      <ScreenHeader title="My tickets" onBack={() => navigation.goBack()} />
      <View style={styles.pad}>
        <SegmentedTabs
          options={[
            { id: 'Open', label: 'Open' },
            { id: 'Resolved', label: 'Resolved' },
          ]}
          value={tab}
          onChange={(id) => setTab(id)}
        />
      </View>
      <ScrollView
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      >
        <SectionTitle
          title={tab === 'Open' ? 'In progress' : 'History'}
          caption={`${rows.length} ${rows.length === 1 ? 'ticket' : 'tickets'}`}
        />
        {rows.length === 0 ? (
          <EmptyState
            icon="chatbubble-ellipses-outline"
            title={tab === 'Open' ? 'No open tickets' : 'No resolved tickets yet'}
            subtitle="Raise a ticket and we’ll get back within 4 hours."
            actionLabel="Raise ticket"
            onAction={() => navigation.navigate('RaiseTicket')}
          />
        ) : (
          rows.map((t) => (
            <AppCard
              key={t.id}
              onPress={() =>
                navigation.navigate('TicketChat', { ticketId: t.id })
              }
            >
              <View style={styles.row}>
                <View style={styles.iconWrap}>
                  <Ionicons
                    name="document-text-outline"
                    size={18}
                    color={colors.primary}
                  />
                </View>
                <View style={styles.col}>
                  <Text style={styles.id}>{t.id}</Text>
                  <Text style={styles.subject}>{t.subject}</Text>
                  <Text style={styles.meta}>Updated {t.updated}</Text>
                </View>
                <Tag
                  label={t.status}
                  tone={t.status === 'Open' ? 'warning' : 'success'}
                  size="sm"
                />
              </View>
            </AppCard>
          ))
        )}
      </ScrollView>
      <View style={styles.footer}>
        <AppButton
          label="Raise new ticket"
          onPress={() => navigation.navigate('RaiseTicket')}
          block
          leftIcon={<Ionicons name="add" size={18} color={colors.white} />}
        />
      </View>
    </ScreenScaffold>
  );
};

const styles = StyleSheet.create({
  pad: { paddingHorizontal: spacing.lg, paddingTop: spacing.md },
  list: {
    padding: spacing.lg,
    gap: spacing.sm,
    paddingBottom: spacing.xxxl,
  },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: radii.md,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  col: { flex: 1, gap: 2 },
  id: {
    fontFamily: fonts.publicBold,
    fontSize: scaleFont(11),
    color: colors.muted,
    letterSpacing: 0.4,
  },
  subject: {
    fontFamily: fonts.publicSemiBold,
    fontSize: scaleFont(14),
    color: colors.text,
  },
  meta: {
    fontFamily: fonts.publicRegular,
    fontSize: scaleFont(12),
    color: colors.muted,
  },
  footer: { padding: spacing.lg, paddingTop: 0 },
});
