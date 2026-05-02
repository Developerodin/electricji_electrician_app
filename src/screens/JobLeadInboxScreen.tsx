import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { FC } from 'react';import { useMemo, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import {
  Dimensions,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import type { JobsStackParamList } from '../navigation/types';
import { EmptyState, ScreenScaffold } from '../components/ui';
import type { JobLead } from '../mocks/types';
import { MOCK_LEADS } from '../mocks';
import { colors, contentMaxWidth, DESIGN_W, fonts } from '../theme';

type Tab = 'active' | 'missed' | 'rejected';

type Props = NativeStackScreenProps<JobsStackParamList, 'JobLeadInbox'>;

const { width: SCREEN_W } = Dimensions.get('window');
const SCALE = SCREEN_W / DESIGN_W;
const CARD_MAX = contentMaxWidth;
const BORDER_CARD = 'rgba(216,217,221,0.16)';

const SEGMENTS = [
  { id: 'active' as const, label: 'Active' },
  { id: 'missed' as const, label: 'Missed' },
  { id: 'rejected' as const, label: 'Rejected' },
];

/**
 * Job leads — layout parity with delivery `TasksScreen` (Tasks #4089:1844):
 * white chrome row, current-lead ribbon card, segmented filter, bordered history tiles.
 */
export const JobLeadInboxScreen: FC<Props> = ({ navigation }) => {
  const [tab, setTab] = useState<Tab>('active');
  const rows = useMemo(
    () => MOCK_LEADS.filter((l) => l.status === tab),
    [tab],
  );
  const currentLead = useMemo(
    () => MOCK_LEADS.find((l) => l.status === 'active'),
    [],
  );

  const topInset =
    Platform.OS === 'ios'
      ? 56
      : (StatusBar.currentHeight ?? 24) + 8;

  const openLead = (leadId: string) => {
    navigation.navigate('LeadAccepted', { leadId });
  };

  const openHelp = () => {
    navigation.getParent()?.navigate('ProfileTab', {
      screen: 'SupportHome',
    });
  };

  return (
    <ScreenScaffold>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.header, { paddingTop: topInset }]}>
          <View style={styles.headerRow}>
            <Text style={styles.headerTitle}>Job leads</Text>
            {navigation.canGoBack() ? (
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Back"
                hitSlop={12}
                onPress={() => navigation.goBack()}
                style={({ pressed }) => [
                  styles.headerSide,
                  styles.headerBack,
                  pressed && styles.pressed,
                ]}
              >
                <Ionicons name="chevron-back" size={26} color="#000000" />
              </Pressable>
            ) : (
              <View style={[styles.headerSide, styles.headerBack]} />
            )}
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Help"
              hitSlop={12}
              onPress={openHelp}
              style={({ pressed }) => [
                styles.headerSide,
                styles.headerHelp,
                pressed && styles.pressed,
              ]}
            >
              <Ionicons name="help-circle-outline" size={28} color="#000000" />
            </Pressable>
          </View>
        </View>
        <View style={styles.headerRule} />

        {currentLead ? (
          <>
            <View style={styles.currentWrap}>
              <View style={styles.currentCard}>
                <View style={styles.currentRedBar} />
                <View style={styles.currentTop}>
                  <View style={styles.currentLeft}>
                    <View style={styles.currentLabelRow}>
                      <View style={styles.currentDot} />
                      <Text style={styles.currentLabel}>CURRENT JOB</Text>
                    </View>
                    <View style={styles.currentCopy}>
                      <Text style={styles.currentPlace}>
                        {currentLead.serviceType}
                      </Text>
                      <View style={styles.currentAddrRow}>
                        <Ionicons
                          name="arrow-forward"
                          size={16}
                          color={colors.muted}
                        />
                        <Text style={styles.currentAddr}>{currentLead.area}</Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.timerPill}>
                    <Text style={styles.timerText}>
                      <Text style={styles.timerMono}>{currentLead.durationMin} </Text>
                      <Text style={styles.timerMuted}>min left</Text>
                    </Text>
                  </View>
                </View>
                <View style={styles.currentDivider} />
                <View style={styles.currentBottom}>
                  <Text style={styles.currentPrice}>{currentLead.payout}</Text>
                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel="Continue to lead detail"
                    onPress={() => openLead(currentLead.id)}
                    style={({ pressed }) => [
                      styles.continueBtn,
                      pressed && styles.pressed,
                    ]}
                  >
                    <Text style={styles.continueLabel}>Continue</Text>
                    <Ionicons
                      name="chevron-forward"
                      size={22}
                      color={colors.white}
                    />
                  </Pressable>
                </View>
              </View>
            </View>
            <View style={styles.sectionRule} />
          </>
        ) : null}

        <View style={styles.segmentSection}>
          <View style={styles.segmentTrack}>
            {SEGMENTS.map((seg) => {
              const active = tab === seg.id;
              return (
                <Pressable
                  key={seg.id}
                  accessibilityRole="button"
                  accessibilityState={{ selected: active }}
                  onPress={() => setTab(seg.id)}
                  style={[
                    styles.segmentCell,
                    active && styles.segmentCellActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.segmentLabel,
                      active && styles.segmentLabelActive,
                    ]}
                  >
                    {seg.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          <View style={styles.list}>
            {rows.length === 0 ? (
              <EmptyState
                icon="briefcase-outline"
                title="No leads here"
                subtitle="Pull down to refresh — new jobs appear when you are online."
              />
            ) : (
              rows.map((row) => (
                <LeadHistoryCard
                  key={row.id}
                  lead={row}
                  tab={tab}
                  onPress={
                    tab === 'active' ? () => openLead(row.id) : undefined
                  }
                />
              ))
            )}
          </View>
        </View>
      </ScrollView>
    </ScreenScaffold>
  );
};

const LeadHistoryCard: FC<{
  lead: JobLead;
  tab: Tab;
  onPress?: () => void;
}> = ({ lead, tab, onPress }) => {
  let statusIcon: React.ReactNode;
  let statusText: string;
  if (tab === 'missed') {
    statusIcon = (
      <Ionicons name="time-outline" size={24} color={colors.warning} />
    );
    statusText = 'Missed';
  } else if (tab === 'rejected') {
    statusIcon = (
      <Ionicons name="close-circle" size={24} color={colors.primary} />
    );
    statusText = 'Rejected';
  } else {
    statusIcon = (
      <Ionicons name="flash" size={24} color={colors.success} />
    );
    statusText = 'Live';
  }

  const CardBody = (
    <View style={styles.historyCard}>
      <View style={styles.historyTop}>
        <View style={styles.historyStatus}>
          {statusIcon}
          <Text style={styles.historyStatusText}>{statusText}</Text>
        </View>
        <Text style={styles.historyAmount}>{lead.payout}</Text>
      </View>
      <View style={styles.historyBottom}>
        <Text style={styles.historyPlace} numberOfLines={2}>
          {lead.serviceType}
        </Text>
        <Text style={styles.historyWhen}>{lead.timeLabel}</Text>
      </View>
    </View>
  );

  if (onPress) {
    return (
      <Pressable
        accessibilityRole="button"
        onPress={onPress}
        style={({ pressed }) => [pressed && styles.pressed]}
      >
        {CardBody}
      </Pressable>
    );
  }

  return CardBody;
};

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  scrollContent: {
    paddingBottom: 24,
  },
  header: {
    backgroundColor: colors.white,
    paddingHorizontal: 10,
    paddingBottom: 18,
  },
  headerRow: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 36,
  },
  headerTitle: {
    fontFamily: fonts.publicBold,
    fontSize: 18,
    color: '#000000',
    textAlign: 'center',
  },
  headerSide: {
    position: 'absolute',
    justifyContent: 'center',
    minHeight: 36,
    paddingVertical: 4,
  },
  headerBack: {
    left: 0,
    paddingRight: 8,
  },
  headerHelp: {
    right: 0,
    paddingLeft: 8,
  },
  headerRule: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.borderLight,
    width: '100%',
    maxWidth: DESIGN_W,
    alignSelf: 'center',
  },
  currentWrap: {
    paddingHorizontal: 16,
    marginTop: 16,
    width: '100%',
    maxWidth: DESIGN_W,
    alignSelf: 'center',
  },
  currentCard: {
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: BORDER_CARD,
    borderRadius: 16,
    paddingLeft: 24,
    paddingRight: 16,
    paddingVertical: 16,
    gap: 16,
    maxWidth: CARD_MAX,
    alignSelf: 'center',
    width: '100%',
    overflow: 'hidden',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 7.4,
    elevation: 2,
  },
  currentRedBar: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: 7,
    bottom: 0,
    backgroundColor: colors.primary,
    borderTopLeftRadius: 14,
    borderBottomLeftRadius: 14,
  },
  currentTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 12,
  },
  currentLeft: {
    flex: 1,
    gap: 12,
  },
  currentLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  currentDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: colors.primary,
  },
  currentLabel: {
    fontFamily: fonts.publicMedium,
    fontSize: 14 * SCALE,
    color: colors.muted,
    letterSpacing: 1.12,
    textTransform: 'uppercase',
  },
  currentCopy: {
    gap: 8,
  },
  currentPlace: {
    fontFamily: fonts.publicSemiBold,
    fontSize: 20 * SCALE,
    color: colors.text,
  },
  currentAddrRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  currentAddr: {
    fontFamily: fonts.publicMedium,
    fontSize: 16 * SCALE,
    color: colors.muted,
  },
  timerPill: {
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: 'rgba(211,211,211,0.28)',
    borderRadius: 39,
    paddingHorizontal: 8,
    paddingVertical: 6,
    alignSelf: 'flex-start',
  },
  timerText: {
    fontFamily: fonts.publicSemiBold,
    fontSize: 16 * SCALE,
    color: '#000000',
  },
  timerMono: {
    fontFamily: fonts.publicMedium,
    fontSize: 16 * SCALE,
    color: '#000000',
  },
  timerMuted: {
    fontFamily: fonts.publicMedium,
    fontSize: 16 * SCALE,
    color: colors.muted,
  },
  currentDivider: {
    height: 1,
    backgroundColor: colors.borderLight,
    width: '100%',
  },
  currentBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  currentPrice: {
    fontFamily: fonts.publicBold,
    fontSize: 24 * SCALE,
    color: colors.text,
  },
  continueBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    backgroundColor: colors.primary,
    borderRadius: 32,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  continueLabel: {
    fontFamily: fonts.publicSemiBold,
    fontSize: 16 * SCALE,
    color: colors.white,
  },
  sectionRule: {
    marginTop: 24,
    marginHorizontal: 16,
    height: 1,
    backgroundColor: colors.borderLight,
    maxWidth: CARD_MAX,
    alignSelf: 'center',
    width: '100%',
  },
  segmentSection: {
    marginTop: 24,
    paddingHorizontal: 16,
    width: '100%',
    maxWidth: DESIGN_W,
    alignSelf: 'center',
    gap: 24,
  },
  segmentTrack: {
    flexDirection: 'row',
    backgroundColor: colors.segmentTrack,
    borderRadius: 12,
    padding: 4,
    maxWidth: CARD_MAX,
    width: '100%',
    alignSelf: 'center',
  },
  segmentCell: {
    flex: 1,
    minHeight: 42,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  segmentCellActive: {
    backgroundColor: colors.white,
  },
  segmentLabel: {
    fontFamily: fonts.publicSemiBold,
    fontSize: 16 * SCALE,
    color: colors.muted,
  },
  segmentLabelActive: {
    color: colors.primary,
  },
  list: {
    gap: 12,
    width: '100%',
    maxWidth: CARD_MAX,
    alignSelf: 'center',
    paddingBottom: 32,
  },
  historyCard: {
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: BORDER_CARD,
    borderRadius: 16,
    paddingLeft: 24,
    paddingRight: 16,
    paddingVertical: 16,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 7.4,
    elevation: 1,
    gap: 2,
  },
  historyTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  historyStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  historyStatusText: {
    fontFamily: fonts.publicBold,
    fontSize: 16 * SCALE,
    color: colors.text,
  },
  historyAmount: {
    fontFamily: fonts.publicBold,
    fontSize: 24 * SCALE,
    color: colors.text,
  },
  historyBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 8,
  },
  historyPlace: {
    flex: 1,
    minWidth: 120,
    fontFamily: fonts.publicRegular,
    fontSize: 16 * SCALE,
    color: colors.text,
  },
  historyWhen: {
    fontFamily: fonts.publicMedium,
    fontSize: 12,
    color: colors.muted,
    textAlign: 'right',
    width: 116,
    maxWidth: '45%',
  },
  pressed: {
    opacity: 0.85,
  },
});
