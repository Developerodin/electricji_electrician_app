import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { ComponentProps, FC } from 'react';
import { useEffect, useMemo, useState } from 'react';
import {
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import type { HomeStackParamList } from '../navigation/types';
import { IncomingJobLeadModal } from '../components/IncomingJobLeadModal';
import { AppButton } from '../components/ui';
import { MOCK_LEADS, TECHNICIAN_PROFILE } from '../mocks';
import { colors, fonts, radii, scaleFont, shadows, spacing } from '../theme';

type IonName = ComponentProps<typeof Ionicons>['name'];

/**
 * Returns a localized greeting based on the hour of day.
 *
 * @param h - 24h hour value (0-23)
 */
function greetingForHour(h: number): string {
  if (h < 12) return 'Good Morning';
  if (h < 17) return 'Good Afternoon';
  return 'Good Evening';
}

type HomeNav = NativeStackNavigationProp<HomeStackParamList, 'HomeMain'>;

type QuickAction = {
  id: string;
  label: string;
  icon: IonName;
  onPress: () => void;
};

/**
 * Spec #19 — technician home dashboard (red hero, cards, online toggle).
 */
export const HomeScreen: FC = () => {
  const navigation = useNavigation<HomeNav>();
  const [online, setOnline] = useState(false);
  const [confirmOn, setConfirmOn] = useState(false);
  const [leadOpen, setLeadOpen] = useState(false);
  const greeting = useMemo(
    () => greetingForHour(new Date().getHours()),
    [],
  );
  const topInset =
    Platform.OS === 'ios'
      ? 56
      : (StatusBar.currentHeight ?? 24) + 8;

  useEffect(() => {
    if (!online) return;
    const t = setTimeout(() => setLeadOpen(true), 10000);
    return () => clearTimeout(t);
  }, [online]);

  const toggleOnline = () => {
    if (online) {
      setOnline(false);
      return;
    }
    setConfirmOn(true);
  };

  const confirmGoOnline = () => {
    setConfirmOn(false);
    setOnline(true);
  };

  const pendingLeads = MOCK_LEADS.filter((l) => l.status === 'active').length;

  const quickActions: QuickAction[] = [
    {
      id: 'wholesale',
      label: 'Wholesale',
      icon: 'cart-outline',
      onPress: () =>
        navigation
          .getParent()
          ?.navigate('WholesaleTab', { screen: 'MarketplaceHome' }),
    },
    {
      id: 'learn',
      label: 'Learn',
      icon: 'school-outline',
      onPress: () =>
        navigation.getParent()?.navigate('LearnTab', { screen: 'CourseCatalog' }),
    },
    {
      id: 'safety',
      label: 'Safety',
      icon: 'shield-checkmark-outline',
      onPress: () => navigation.navigate('SafetyToolHome'),
    },
    {
      id: 'refer',
      label: 'Refer',
      icon: 'gift-outline',
      onPress: () =>
        navigation.getParent()?.navigate('ProfileTab', { screen: 'ReferEarn' }),
    },
    {
      id: 'support',
      label: 'Support',
      icon: 'help-buoy-outline',
      onPress: () =>
        navigation.getParent()?.navigate('ProfileTab', { screen: 'SupportHome' }),
    },
  ];

  return (
    <View style={styles.root}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: 100 }]}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={[styles.heroRed, shadows.hero, { paddingTop: topInset }]}
        >
          <LinearGradient
            colors={['rgba(0,0,0,0.12)', 'transparent']}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={StyleSheet.absoluteFill}
            pointerEvents="none"
          />
          <View style={styles.heroRow}>
            <View>
              <Text style={styles.greeting}>
                {greeting}, {TECHNICIAN_PROFILE.name.split(' ')[0]}
              </Text>
              <Text style={styles.subGreeting}>Electric Ji Technician</Text>
            </View>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Notifications"
              style={({ pressed }) => [
                styles.notifBtn,
                pressed && styles.pressedOpacity,
              ]}
              onPress={() => navigation.navigate('NotificationsCenter')}
            >
              <Ionicons name="notifications" size={22} color={colors.white} />
              <View style={styles.notifDot} />
            </Pressable>
          </View>

          <View style={styles.heroPanel}>
            <View style={styles.snapshotCard}>
              <View style={styles.snapHeaderRow}>
                <Text style={styles.snapTitle}>Today&apos;s snapshot</Text>
                <View style={styles.surgeBadge}>
                  <Ionicons name="flash" size={12} color={colors.white} />
                  <Text style={styles.surgeTxt}>1.5x surge</Text>
                </View>
              </View>
              <View style={styles.snapRow}>
                <SnapStat label="Earnings" value="₹1,240" />
                <View style={styles.divider} />
                <SnapStat label="Jobs done" value="3" />
                <View style={styles.divider} />
                <SnapStat label="Active" value="1" />
              </View>
              <Pressable
                onPress={() => navigation.navigate('EarningsOverview')}
                style={({ pressed }) => [
                  styles.snapLinkRow,
                  pressed && styles.pressedOpacity,
                ]}
              >
                <Text style={styles.snapLink}>View earnings</Text>
                <Ionicons
                  name="arrow-forward"
                  size={14}
                  color={colors.white}
                />
              </Pressable>
            </View>

            <Pressable
              style={({ pressed }) => [
                styles.perfCard,
                pressed && styles.pressedScale,
              ]}
              onPress={() => navigation.navigate('PerformanceOverview')}
              accessibilityRole="button"
              accessibilityLabel="Open performance overview"
            >
              <View style={styles.perfHeader}>
                <Text style={styles.perfTitle}>Performance score</Text>
                <View style={styles.perfChip}>
                  <Ionicons
                    name="trending-up"
                    size={12}
                    color={colors.successBright}
                  />
                  <Text style={styles.perfChipTxt}>Up 4 pts</Text>
                </View>
              </View>
              <Text style={styles.perfBig}>
                {TECHNICIAN_PROFILE.perfScore}
                <Text style={styles.perfMax}>/100</Text>
              </Text>
              <Text style={styles.perfGrade}>
                Grade {TECHNICIAN_PROFILE.grade} · top 8% in your area
              </Text>
            </Pressable>

            <Pressable
              style={({ pressed }) => [
                styles.cardLite,
                pressed && styles.pressedScale,
              ]}
              onPress={() =>
                navigation
                  .getParent()
                  ?.navigate('JobsTab', { screen: 'JobInProgress' })
              }
            >
              <View style={styles.cardIcon}>
                <Ionicons name="hammer-outline" size={18} color={colors.primary} />
              </View>
              <View style={styles.cardCol}>
                <Text style={styles.cardTitle}>Active job</Text>
                <Text style={styles.cardBody}>
                  Fan repair · Andheri West
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={colors.muted} />
            </Pressable>

            <Pressable
              style={({ pressed }) => [
                styles.cardLite,
                pressed && styles.pressedScale,
              ]}
              onPress={() =>
                navigation
                  .getParent()
                  ?.navigate('JobsTab', { screen: 'JobLeadInbox' })
              }
            >
              <View style={[styles.cardIcon, styles.cardIconWarn]}>
                <Ionicons
                  name="notifications-outline"
                  size={18}
                  color={colors.warningInk}
                />
              </View>
              <View style={styles.cardCol}>
                <Text style={styles.cardTitle}>Incoming leads</Text>
                <Text style={styles.cardBody}>
                  {pendingLeads} new {pendingLeads === 1 ? 'lead' : 'leads'} waiting
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={colors.muted} />
            </Pressable>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.quickRow}
            >
              {quickActions.map((q) => (
                <Pressable
                  key={q.id}
                  style={({ pressed }) => [
                    styles.quickChip,
                    pressed && styles.pressedScale,
                  ]}
                  onPress={q.onPress}
                  accessibilityRole="button"
                  accessibilityLabel={q.label}
                >
                  <Ionicons name={q.icon} size={16} color={colors.primary} />
                  <Text style={styles.quickChipTxt}>{q.label}</Text>
                </Pressable>
              ))}
            </ScrollView>

            <View style={styles.warnCard}>
              <Ionicons
                name="alert-circle-outline"
                size={18}
                color={colors.warningInk}
              />
              <Text style={styles.warnTxt}>
                Police verification expires in 12 days
              </Text>
              <Pressable
                onPress={() =>
                  navigation.getParent()?.navigate('ProfileTab', {
                    screen: 'Documents',
                  })
                }
                hitSlop={8}
              >
                <Text style={styles.warnAction}>Renew</Text>
              </Pressable>
            </View>

            <View style={styles.onlineBar}>
              <View style={styles.onlineLeft}>
                <View style={styles.onlineTitleRow}>
                  <View
                    style={[styles.onlineDot, !online && styles.dotOff]}
                  />
                  <Text style={styles.onlineTitle}>
                    {online ? 'ONLINE' : 'OFFLINE'} status
                  </Text>
                </View>
                <Text style={styles.onlineHint}>
                  {online
                    ? "You're online — searching for jobs"
                    : 'Turn on to start receiving jobs'}
                </Text>
              </View>
              <Pressable
                accessibilityRole="switch"
                accessibilityState={{ checked: online }}
                accessibilityLabel="Online status"
                onPress={toggleOnline}
                style={[
                  styles.toggleTrack,
                  online ? styles.toggleTrackOn : styles.toggleTrackOff,
                ]}
              >
                <View style={styles.toggleKnob} />
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>

      <Modal transparent visible={confirmOn} animationType="fade">
        <View style={styles.confirmBackdrop}>
          <View style={[styles.confirmSheet, shadows.lg]}>
            <View style={styles.confirmIcon}>
              <Ionicons name="flash" size={22} color={colors.primary} />
            </View>
            <Text style={styles.confirmTitle}>Go online?</Text>
            <Text style={styles.confirmBody}>
              Start receiving job leads near you. You can pause anytime.
            </Text>
            <View style={styles.confirmRow}>
              <AppButton
                label="Cancel"
                variant="outline"
                onPress={() => setConfirmOn(false)}
                style={styles.flex}
              />
              <AppButton
                label="Yes, go online"
                onPress={confirmGoOnline}
                style={styles.flex}
              />
            </View>
          </View>
        </View>
      </Modal>

      <IncomingJobLeadModal
        visible={leadOpen}
        onClose={() => setLeadOpen(false)}
        onReject={() => setLeadOpen(false)}
        onAccept={() => {
          setLeadOpen(false);
          navigation.getParent()?.navigate('JobsTab', {
            screen: 'LeadAccepted',
            params: { leadId: 'L1' },
          });
        }}
      />
    </View>
  );
};

const SnapStat: FC<{ label: string; value: string }> = ({ label, value }) => (
  <View style={styles.snapStat}>
    <Text style={styles.snapMuted}>{label}</Text>
    <Text style={styles.snapVal}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.pageBg },
  scroll: { flex: 1 },
  scrollContent: { paddingBottom: spacing.lg },
  heroRed: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
    borderBottomLeftRadius: radii.hero,
    borderBottomRightRadius: radii.hero,
    overflow: 'hidden',
  },
  heroRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },
  greeting: {
    fontFamily: fonts.publicBold,
    fontSize: scaleFont(20),
    color: colors.white,
  },
  subGreeting: {
    marginTop: 4,
    fontFamily: fonts.publicMedium,
    fontSize: scaleFont(13),
    color: 'rgba(255,255,255,0.85)',
  },
  notifBtn: {
    width: 46,
    height: 46,
    borderRadius: radii.md,
    backgroundColor: colors.primaryMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notifDot: {
    position: 'absolute',
    top: 11,
    right: 11,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.successBright,
    borderWidth: 1.5,
    borderColor: colors.primary,
  },
  heroPanel: { gap: spacing.md },
  snapshotCard: {
    backgroundColor: 'rgba(0,0,0,0.18)',
    borderRadius: radii.lg,
    padding: spacing.lg,
    gap: spacing.sm,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
  },
  snapHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  snapTitle: {
    fontFamily: fonts.publicBold,
    fontSize: scaleFont(15),
    color: colors.white,
  },
  surgeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    borderRadius: radii.pill,
    backgroundColor: 'rgba(255,255,255,0.18)',
  },
  surgeTxt: {
    fontFamily: fonts.publicSemiBold,
    fontSize: scaleFont(10.5),
    color: colors.white,
    letterSpacing: 0.3,
  },
  snapRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.xs,
  },
  snapStat: { flex: 1 },
  divider: {
    width: 1,
    alignSelf: 'stretch',
    backgroundColor: 'rgba(255,255,255,0.18)',
  },
  snapMuted: {
    fontFamily: fonts.publicMedium,
    fontSize: scaleFont(11),
    color: 'rgba(255,255,255,0.78)',
    letterSpacing: 0.2,
  },
  snapVal: {
    fontFamily: fonts.publicBold,
    fontSize: scaleFont(18),
    color: colors.white,
    marginTop: 2,
  },
  snapLinkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: spacing.xs,
  },
  snapLink: {
    fontFamily: fonts.publicSemiBold,
    fontSize: scaleFont(12.5),
    color: colors.white,
  },
  perfCard: {
    backgroundColor: colors.white,
    borderRadius: radii.lg,
    padding: spacing.lg,
    gap: spacing.xs,
    ...shadows.sm,
  },
  perfHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  perfTitle: {
    fontFamily: fonts.publicSemiBold,
    fontSize: scaleFont(13),
    color: colors.muted,
    letterSpacing: 0.2,
  },
  perfChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    backgroundColor: colors.successSoft,
    borderRadius: radii.pill,
  },
  perfChipTxt: {
    fontFamily: fonts.publicSemiBold,
    fontSize: scaleFont(10.5),
    color: colors.success,
  },
  perfBig: {
    fontFamily: fonts.publicBold,
    fontSize: scaleFont(34),
    color: colors.text,
    marginTop: 2,
  },
  perfMax: {
    fontFamily: fonts.publicSemiBold,
    fontSize: scaleFont(16),
    color: colors.muted,
  },
  perfGrade: {
    fontFamily: fonts.publicMedium,
    fontSize: scaleFont(12.5),
    color: colors.muted,
  },
  cardLite: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.white,
    borderRadius: radii.lg,
    padding: spacing.lg,
    ...shadows.sm,
  },
  cardIcon: {
    width: 40,
    height: 40,
    borderRadius: radii.md,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardIconWarn: {
    backgroundColor: colors.warningSoft,
  },
  cardCol: { flex: 1, gap: 2 },
  cardTitle: {
    fontFamily: fonts.publicBold,
    fontSize: scaleFont(14),
    color: colors.text,
  },
  cardBody: {
    fontFamily: fonts.publicRegular,
    fontSize: scaleFont(12.5),
    color: colors.muted,
  },
  quickRow: {
    paddingVertical: spacing.xs,
    gap: spacing.sm,
  },
  quickChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.white,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 2,
    borderRadius: radii.pill,
    ...shadows.sm,
  },
  quickChipTxt: {
    fontFamily: fonts.publicSemiBold,
    fontSize: scaleFont(13),
    color: colors.text,
  },
  warnCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: '#fff7ed',
    borderRadius: radii.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: '#fed7aa',
  },
  warnTxt: {
    flex: 1,
    fontFamily: fonts.publicMedium,
    fontSize: scaleFont(12.5),
    color: colors.warningInk,
  },
  warnAction: {
    fontFamily: fonts.publicBold,
    fontSize: scaleFont(13),
    color: colors.primary,
  },
  onlineBar: {
    backgroundColor: 'rgba(0,0,0,0.22)',
    borderRadius: radii.lg,
    padding: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  onlineLeft: { flex: 1, gap: 4 },
  onlineTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  onlineDot: {
    width: 11,
    height: 11,
    borderRadius: 6,
    backgroundColor: colors.successBright,
  },
  dotOff: { backgroundColor: '#9ca3af' },
  onlineTitle: {
    fontFamily: fonts.publicBold,
    fontSize: scaleFont(15),
    color: colors.white,
    letterSpacing: 0.3,
  },
  onlineHint: {
    fontFamily: fonts.publicMedium,
    fontSize: scaleFont(12.5),
    color: 'rgba(255,255,255,0.82)',
  },
  toggleTrack: {
    width: 53,
    height: 28,
    borderRadius: radii.pill,
    padding: 2,
    justifyContent: 'center',
  },
  toggleTrackOn: {
    backgroundColor: colors.success,
    alignItems: 'flex-end',
  },
  toggleTrackOff: {
    backgroundColor: '#6b7280',
    alignItems: 'flex-start',
  },
  toggleKnob: {
    width: 25,
    height: 25,
    borderRadius: 13,
    backgroundColor: colors.white,
  },
  pressedOpacity: { opacity: 0.92 },
  pressedScale: { opacity: 0.96, transform: [{ scale: 0.98 }] },
  confirmBackdrop: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: 'center',
    padding: spacing.lg,
  },
  confirmSheet: {
    backgroundColor: colors.white,
    borderRadius: radii.lg,
    padding: spacing.lg,
    gap: spacing.sm,
    alignItems: 'flex-start',
  },
  confirmIcon: {
    width: 48,
    height: 48,
    borderRadius: radii.md,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmTitle: {
    fontFamily: fonts.publicBold,
    fontSize: scaleFont(18),
    color: colors.text,
  },
  confirmBody: {
    fontFamily: fonts.publicRegular,
    fontSize: scaleFont(13.5),
    color: colors.muted,
  },
  confirmRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    width: '100%',
    marginTop: spacing.sm,
  },
  flex: { flex: 1 },
});
