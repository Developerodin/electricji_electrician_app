import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { ComponentProps, FC } from 'react';
import { useEffect, useMemo, useState } from 'react';
import {
  Dimensions,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Svg, { Line } from 'react-native-svg';
import type { HomeStackParamList } from '../navigation/types';
import { IncomingJobLeadModal } from '../components/IncomingJobLeadModal';
import { AppButton } from '../components/ui';
import { MOCK_LEADS, TECHNICIAN_PROFILE } from '../mocks';
import { colors, contentMaxWidth, DESIGN_W, fonts } from '../theme';

const { width: SCREEN_W } = Dimensions.get('window');

type IonName = ComponentProps<typeof Ionicons>['name'];

const SCALE = SCREEN_W / DESIGN_W;
const CONTENT_MAX = contentMaxWidth;

function greetingForHour(h: number): string {
  if (h < 12) return 'Good Morning';
  if (h < 17) return 'Good Afternoon';
  return 'Good Evening';
}

function TimelineRail({ height }: { height: number }) {
  return (
    <View style={styles.railWrap}>
      <Svg width={4} height={height} style={styles.railSvg}>
        <Line
          x1={2}
          y1={0}
          x2={2}
          y2={height}
          stroke="#c5c5c5"
          strokeWidth={2}
          strokeDasharray="6 6"
        />
      </Svg>
    </View>
  );
}

type HomeNav = NativeStackNavigationProp<HomeStackParamList, 'HomeMain'>;

type QuickAction = {
  id: string;
  label: string;
  icon: IonName;
  onPress: () => void;
};

/**
 * Technician home — delivery `HomeScreen` visual shell; original navigation and
 * online / lead behaviour preserved.
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

  const firstName = TECHNICIAN_PROFILE.name.split(' ')[0];
  const pendingLeads = MOCK_LEADS.filter((l) => l.status === 'active').length;

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
        <View style={[styles.heroRed, { paddingTop: topInset }]}>
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
                {greeting}, {firstName}
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
              <Ionicons name="notifications" size={24} color="#FFFFFF" />
              <View style={styles.notifDot} />
            </Pressable>
          </View>

          <View style={styles.heroPanel}>
            <View style={styles.statRow}>
              <Pressable
                style={styles.statCardPress}
                onPress={() => navigation.navigate('EarningsOverview')}
                accessibilityRole="button"
                accessibilityLabel="Today earnings, open earnings"
              >
                <View style={styles.statCard}>
                  <Text style={styles.statLabel}>Today&apos;s Earnings</Text>
                  <Text style={styles.statValue}>₹1,240</Text>
                </View>
              </Pressable>
              <Pressable
                style={styles.statCardPress}
                onPress={() =>
                  navigation.getParent()?.navigate('JobsTab', {
                    screen: 'JobLeadInbox',
                  })
                }
                accessibilityRole="button"
                accessibilityLabel="Incoming leads"
              >
                <View style={styles.statCard}>
                  <Text style={styles.statLabel}>Incoming leads</Text>
                  <Text style={styles.statValue}>
                    {pendingLeads} {pendingLeads === 1 ? 'lead' : 'leads'}
                  </Text>
                </View>
              </Pressable>
            </View>

            <View style={styles.onlineBar}>
              <View style={styles.onlineLeft}>
                <View style={styles.onlineTitleRow}>
                  <View
                    style={[
                      styles.onlineDot,
                      !online && styles.onlineDotOff,
                    ]}
                  />
                  <Text style={styles.onlineTitle}>
                    <Text style={styles.onlineTitleUpper}>
                      {online ? 'ONLINE ' : 'OFFLINE '}
                    </Text>
                    <Text style={styles.onlineTitleRest}>Status</Text>
                  </Text>
                </View>
                <Text style={styles.onlineHint}>
                  {online
                    ? 'You are ready to receive leads'
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

        <View style={styles.tasksSection}>
          <View style={styles.tasksHeader}>
            <Text style={styles.tasksTitle}>Current Tasks</Text>
            <Pressable
              hitSlop={8}
              onPress={() => navigation.navigate('EarningsOverview')}
              accessibilityRole="link"
              accessibilityLabel="View history"
            >
              <Text style={styles.viewHistory}>View History</Text>
            </Pressable>
          </View>

          <Pressable
            style={styles.perfStripe}
            onPress={() => navigation.navigate('PerformanceOverview')}
            accessibilityRole="button"
            accessibilityLabel="Open performance overview"
          >
            <View style={styles.perfStripeMid}>
              <Text style={styles.perfStripeLabel}>Performance score</Text>
              <Text style={styles.perfStripeSub}>
                {TECHNICIAN_PROFILE.perfScore}/100 · Grade{' '}
                {TECHNICIAN_PROFILE.grade}
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.muted} />
          </Pressable>

          <View style={styles.taskCard}>
            <Text style={styles.orderId}>Job#FJ-8921</Text>
            <View style={styles.taskBody}>
              <View style={styles.timelineBlock}>
                <View style={styles.timelineIcons}>
                  <Ionicons name="location-sharp" size={22} color={colors.success} />
                  <TimelineRail height={36} />
                  <Ionicons name="location-sharp" size={22} color={colors.primary} />
                </View>
                <View style={styles.timelineCopy}>
                  <View>
                    <Text style={styles.phaseLabel}>ON SITE</Text>
                    <Text style={styles.phaseAddr}>
                      Fan repair,{'\n'}Andheri West
                    </Text>
                  </View>
                  <View>
                    <Text style={styles.phaseLabel}>MATERIAL RUN</Text>
                    <Text style={styles.phaseAddr}>
                      Parts pickup · Goregaon
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.timePillWrap}>
                <View style={styles.timePill}>
                  <Text style={styles.timePillText}>10:45</Text>
                </View>
              </View>
            </View>
            <Text style={styles.price}>₹850</Text>

            <View style={styles.metricsBlock}>
              <View style={styles.hairline} />
              <View style={styles.metricsRow}>
                <View style={styles.metricItem}>
                  <Ionicons name="location-outline" size={22} color={colors.muted} />
                  <Text style={styles.metricText}>8.2 km</Text>
                </View>
                <View style={styles.metricItem}>
                  <Ionicons name="time-outline" size={22} color={colors.muted} />
                  <Text style={styles.metricText}>22 mins</Text>
                </View>
              </View>
              <View style={styles.hairline} />
            </View>

            <View style={styles.taskActions}>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="View active job"
                style={({ pressed }) => [
                  styles.btnOutline,
                  pressed && styles.pressedOpacity,
                ]}
                onPress={() =>
                  navigation
                    .getParent()
                    ?.navigate('JobsTab', { screen: 'JobInProgress' })
                }
              >
                <Text style={styles.btnOutlineLabel}>View Task</Text>
              </Pressable>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Start navigation"
                style={({ pressed }) => [
                  styles.btnPrimary,
                  pressed && styles.pressedOpacity,
                ]}
                onPress={() =>
                  navigation.getParent()?.navigate('JobsTab', {
                    screen: 'EnRoute',
                  })
                }
              >
                <Text style={styles.btnPrimaryLabel}>Start Navigation</Text>
                <Ionicons name="navigate" size={22} color="#FFFFFF" />
              </Pressable>
            </View>
          </View>

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
                  pressed && styles.quickChipPressed,
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
            <Ionicons name="alert-circle-outline" size={18} color="#b45309" />
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
              accessibilityRole="link"
              accessibilityLabel="Renew documents"
            >
              <Text style={styles.warnAction}>Renew</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>

      <Modal
        transparent
        visible={confirmOn}
        animationType="fade"
        presentationStyle="overFullScreen"
        statusBarTranslucent
        onRequestClose={() => setConfirmOn(false)}
      >
        <View style={confirmStyles.confirmBackdrop}>
          <View style={confirmStyles.confirmSheet}>
            <View style={confirmStyles.confirmIcon}>
              <Ionicons name="flash" size={22} color={colors.primary} />
            </View>
            <Text style={confirmStyles.confirmTitle}>Go online?</Text>
            <Text style={confirmStyles.confirmBody}>
              Start receiving job leads near you. You can pause anytime.
            </Text>
            <View style={confirmStyles.confirmRow}>
              <AppButton
                label="Cancel"
                variant="outline"
                onPress={() => setConfirmOn(false)}
                style={confirmStyles.flex}
              />
              <AppButton
                label="Yes, go online"
                onPress={confirmGoOnline}
                style={confirmStyles.flex}
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

const confirmStyles = StyleSheet.create({
  confirmBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.72)',
    justifyContent: 'center',
    padding: 20,
  },
  confirmSheet: {
    maxWidth: Math.min(380, SCREEN_W - 32),
    width: '100%',
    alignSelf: 'center',
    backgroundColor: colors.white,
    borderRadius: 28,
    padding: 22,
    gap: 10,
    alignItems: 'flex-start',
    ...Platform.select({
      ios: {
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 20 },
        shadowOpacity: 0.2,
        shadowRadius: 24,
      },
      android: { elevation: 20 },
    }),
  },
  confirmIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmTitle: {
    fontFamily: fonts.publicBold,
    fontSize: 18,
    color: colors.text,
  },
  confirmBody: {
    fontFamily: fonts.publicRegular,
    fontSize: 13.5,
    color: colors.muted,
    lineHeight: 20,
  },
  confirmRow: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
    marginTop: 12,
    paddingTop: 4,
  },
  flex: { flex: 1 },
});

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.pageBg,
  },
  scroll: { flex: 1 },
  scrollContent: {
    paddingBottom: 24,
  },
  heroRed: {
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    overflow: 'hidden',
    width: '100%',
    maxWidth: DESIGN_W,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.14,
    shadowRadius: 13,
    elevation: 8,
  },
  heroRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  greeting: {
    fontFamily: 'PublicSans_700Bold',
    fontSize: 20 * SCALE,
    color: '#FFFFFF',
  },
  subGreeting: {
    marginTop: 5,
    fontFamily: 'PublicSans_500Medium',
    fontSize: 14 * SCALE,
    color: '#e2e2e2',
  },
  notifBtn: {
    width: 50,
    height: 50,
    borderRadius: 15,
    backgroundColor: colors.primaryMuted,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  notifDot: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4ade80',
    borderWidth: 1.5,
    borderColor: colors.primaryMuted,
  },
  heroPanel: {
    gap: 16,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  statCardPress: {
    flex: 1,
    minWidth: 0,
    maxWidth: (CONTENT_MAX - 16) / 2,
  },
  statCard: {
    flex: 1,
    minWidth: 0,
    borderRadius: 16,
    padding: 16,
    gap: 8,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        backgroundColor: 'rgba(0,0,0,0.2)',
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.05,
        shadowRadius: 10.4,
      },
      android: {
        backgroundColor: colors.primaryMuted,
        elevation: 0,
      },
      default: {
        backgroundColor: 'rgba(0,0,0,0.2)',
      },
    }),
  },
  statLabel: {
    fontFamily: 'PublicSans_600SemiBold',
    fontSize: 16 * SCALE,
    color: '#FFFFFF',
    ...(Platform.OS === 'android' && { includeFontPadding: false }),
  },
  statValue: {
    fontFamily: 'PublicSans_600SemiBold',
    fontSize: 24 * SCALE,
    color: '#FFFFFF',
    ...(Platform.OS === 'android' && { includeFontPadding: false }),
  },
  onlineBar: {
    backgroundColor: colors.primaryDark,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 15,
    elevation: 4,
  },
  onlineLeft: {
    flex: 1,
    gap: 4,
  },
  onlineTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  onlineDot: {
    width: 11,
    height: 11,
    borderRadius: 6,
    backgroundColor: '#4ade80',
  },
  onlineDotOff: {
    backgroundColor: '#9ca3af',
  },
  onlineTitle: {
    flexShrink: 1,
  },
  onlineTitleUpper: {
    textTransform: 'uppercase',
    fontFamily: 'PublicSans_700Bold',
    fontSize: 20 * SCALE,
    color: '#FFFFFF',
  },
  onlineTitleRest: {
    fontFamily: 'PublicSans_700Bold',
    fontSize: 20 * SCALE,
    color: '#FFFFFF',
    textTransform: 'none',
  },
  onlineHint: {
    fontFamily: 'PublicSans_500Medium',
    fontSize: 14 * SCALE,
    color: '#d3d3d3',
  },
  toggleTrack: {
    width: 53,
    height: 28,
    borderRadius: 119,
    padding: 2,
    justifyContent: 'center',
  },
  toggleTrackOn: {
    backgroundColor: colors.success,
    borderWidth: 0.5,
    borderColor: 'rgba(34,153,121,0.15)',
    alignItems: 'flex-end',
  },
  toggleTrackOff: {
    backgroundColor: '#6b7280',
    borderWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.1)',
    alignItems: 'flex-start',
  },
  toggleKnob: {
    width: 25,
    height: 25,
    borderRadius: 13,
    backgroundColor: '#FFFFFF',
  },
  tasksSection: {
    marginTop: 16,
    paddingHorizontal: 16,
    width: '100%',
    maxWidth: DESIGN_W,
    alignSelf: 'center',
    gap: 16,
  },
  tasksHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tasksTitle: {
    fontFamily: 'PublicSans_700Bold',
    fontSize: 20 * SCALE,
    color: colors.text,
  },
  viewHistory: {
    fontFamily: 'PublicSans_700Bold',
    fontSize: 16 * SCALE,
    color: colors.primary,
  },
  perfStripe: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 16,
    gap: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  perfStripeMid: {
    flex: 1,
    gap: 2,
  },
  perfStripeLabel: {
    fontFamily: 'PublicSans_600SemiBold',
    fontSize: 13 * SCALE,
    color: colors.muted,
    letterSpacing: 0.2,
  },
  perfStripeSub: {
    fontFamily: 'PublicSans_700Bold',
    fontSize: 15 * SCALE,
    color: colors.text,
  },
  taskCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#d8d9dd',
    borderStyle: 'dashed',
    borderRadius: 32,
    paddingHorizontal: 16,
    paddingVertical: 20,
    gap: 24,
    width: '100%',
    maxWidth: CONTENT_MAX,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07,
    shadowRadius: 9,
    elevation: 3,
  },
  orderId: {
    fontFamily: 'PublicSans_700Bold',
    fontSize: 16 * SCALE,
    color: colors.muted,
    letterSpacing: 0.64,
  },
  taskBody: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  timelineBlock: {
    flexDirection: 'row',
    gap: 12,
    flex: 1,
  },
  timelineIcons: {
    alignItems: 'center',
    paddingTop: 2,
  },
  railWrap: {
    height: 44,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  railSvg: {
    marginVertical: -2,
  },
  timelineCopy: {
    flex: 1,
    gap: 30,
    maxWidth: 200,
  },
  phaseLabel: {
    fontFamily: 'PublicSans_700Bold',
    fontSize: 16 * SCALE,
    color: colors.muted,
    letterSpacing: 0.64,
    marginBottom: 4,
  },
  phaseAddr: {
    fontFamily: 'PublicSans_600SemiBold',
    fontSize: 16 * SCALE,
    color: colors.text,
    lineHeight: 22,
  },
  timePillWrap: {
    justifyContent: 'flex-start',
    paddingLeft: 8,
  },
  timePill: {
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: 'rgba(211,211,211,0.28)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 39,
  },
  timePillText: {
    fontFamily: 'PublicSans_600SemiBold',
    fontSize: 16 * SCALE,
    color: '#000000',
    letterSpacing: 1.28,
  },
  price: {
    fontFamily: 'PublicSans_700Bold',
    fontSize: 24 * SCALE,
    color: colors.text,
  },
  metricsBlock: {
    gap: 12,
  },
  hairline: {
    height: 1,
    backgroundColor: '#e5e5ea',
    width: '100%',
  },
  metricsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 32,
    flexWrap: 'wrap',
  },
  metricItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  metricText: {
    fontFamily: 'PublicSans_600SemiBold',
    fontSize: 16 * SCALE,
    color: colors.muted,
  },
  taskActions: {
    flexDirection: 'row',
    gap: 16,
    flexWrap: 'wrap',
    alignItems: 'stretch',
  },
  btnOutline: {
    borderWidth: 1,
    borderColor: '#cecece',
    borderRadius: 83,
    paddingHorizontal: 24,
    minHeight: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnOutlineLabel: {
    fontFamily: 'PublicSans_700Bold',
    fontSize: 16 * SCALE,
    color: colors.text,
    letterSpacing: 0.192,
  },
  btnPrimary: {
    flex: 1,
    minWidth: 160,
    backgroundColor: colors.primary,
    borderRadius: 74,
    paddingHorizontal: 28,
    minHeight: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  btnPrimaryLabel: {
    fontFamily: 'PublicSans_700Bold',
    fontSize: 16 * SCALE,
    color: '#FFFFFF',
    letterSpacing: 0.192,
  },
  quickRow: {
    gap: 12,
    paddingVertical: 4,
    paddingRight: 4,
  },
  quickChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#e5e5ea',
    marginRight: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  quickChipPressed: { opacity: 0.92 },
  quickChipTxt: {
    fontFamily: 'PublicSans_600SemiBold',
    fontSize: 13 * SCALE,
    color: colors.text,
  },
  warnCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#fff7ed',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#fed7aa',
  },
  warnTxt: {
    flex: 1,
    fontFamily: 'PublicSans_500Medium',
    fontSize: 12.5 * SCALE,
    color: '#b45309',
  },
  warnAction: {
    fontFamily: 'PublicSans_700Bold',
    fontSize: 13 * SCALE,
    color: colors.primary,
  },
  pressedOpacity: {
    opacity: 0.92,
  },
});
