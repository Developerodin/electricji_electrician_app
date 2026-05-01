import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { ComponentProps, FC } from 'react';
import { useMemo, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import type { JobsStackParamList } from '../navigation/types';
import {
  AppCard,
  EmptyState,
  ScreenHeader,
  ScreenScaffold,
  SectionTitle,
  SegmentedTabs,
  Tag,
} from '../components/ui';
import { MOCK_LEADS } from '../mocks';
import { colors, fonts, radii, scaleFont, spacing } from '../theme';

type IonName = ComponentProps<typeof Ionicons>['name'];

type Tab = 'active' | 'missed' | 'rejected';
type Props = NativeStackScreenProps<JobsStackParamList, 'JobLeadInbox'>;

const TAB_TITLE: Record<Tab, string> = {
  active: 'New leads',
  missed: 'Missed in last 24h',
  rejected: 'Rejected',
};

const STATUS_TAG: Record<Tab, { tone: 'primary' | 'warning' | 'danger'; label: string }> = {
  active: { tone: 'primary', label: 'New' },
  missed: { tone: 'warning', label: 'Missed' },
  rejected: { tone: 'danger', label: 'Rejected' },
};

/**
 * Spec #23 — Job leads inbox with tabs, hero summary and animated list cards.
 */
export const JobLeadInboxScreen: FC<Props> = ({ navigation }) => {
  const [tab, setTab] = useState<Tab>('active');
  const rows = useMemo(
    () => MOCK_LEADS.filter((l) => l.status === tab),
    [tab],
  );
  const totalActive = MOCK_LEADS.filter((l) => l.status === 'active').length;

  return (
    <ScreenScaffold>
      <ScreenHeader
        title="Job leads"
        subtitle={`${totalActive} live • near your area`}
        onBack={() => navigation.goBack()}
      />
      <View style={styles.pad}>
        <SegmentedTabs
          options={[
            { id: 'active', label: 'Active' },
            { id: 'missed', label: 'Missed' },
            { id: 'rejected', label: 'Rejected' },
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
          title={TAB_TITLE[tab]}
          caption={`${rows.length} ${rows.length === 1 ? 'lead' : 'leads'}`}
        />

        {rows.length === 0 ? (
          <EmptyState
            icon="briefcase-outline"
            title="No leads here"
            subtitle="Pull down to refresh — new jobs come in fast."
          />
        ) : (
          rows.map((r) => (
            <AppCard
              key={r.id}
              onPress={
                tab === 'active'
                  ? () => navigation.navigate('LeadAccepted', { leadId: r.id })
                  : undefined
              }
            >
              <View style={styles.headerRow}>
                <View style={styles.iconWrap}>
                  <Ionicons
                    name="construct-outline"
                    size={20}
                    color={colors.primary}
                  />
                </View>
                <View style={styles.titleCol}>
                  <Text style={styles.svc} numberOfLines={1}>
                    {r.serviceType}
                  </Text>
                  <Text style={styles.area} numberOfLines={1}>
                    {r.area}
                  </Text>
                </View>
                <Text style={styles.pay}>{r.payout}</Text>
              </View>
              <View style={styles.metaRow}>
                <MetaPill icon="time-outline" label={r.timeLabel} />
                <MetaPill icon="hourglass-outline" label={`${r.durationMin}m`} />
                <MetaPill icon="star" label={`${r.customerRating}`} />
                {r.surge ? (
                  <Tag label={r.surge} tone="warning" size="sm" />
                ) : null}
                <View style={styles.spacer} />
                <Tag {...STATUS_TAG[tab]} size="sm" />
              </View>
            </AppCard>
          ))
        )}
      </ScrollView>
    </ScreenScaffold>
  );
};

const MetaPill: FC<{ icon: IonName; label: string }> = ({ icon, label }) => (
  <View style={styles.pill}>
    <Ionicons name={icon} size={12} color={colors.muted} />
    <Text style={styles.pillText}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  pad: { paddingHorizontal: spacing.lg, paddingTop: spacing.md },
  list: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.xxxl,
    gap: spacing.sm,
  },
  headerRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: radii.md,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleCol: { flex: 1, gap: 2 },
  svc: {
    fontFamily: fonts.publicBold,
    fontSize: scaleFont(15),
    color: colors.text,
  },
  area: {
    fontFamily: fonts.publicRegular,
    fontSize: scaleFont(12.5),
    color: colors.muted,
  },
  pay: {
    fontFamily: fonts.publicBold,
    fontSize: scaleFont(17),
    color: colors.primary,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: spacing.xs,
    marginTop: spacing.sm,
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: radii.pill,
    backgroundColor: colors.surfaceAlt,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  pillText: {
    fontFamily: fonts.publicMedium,
    fontSize: scaleFont(11.5),
    color: colors.textSoft,
  },
  spacer: { flex: 1 },
});
