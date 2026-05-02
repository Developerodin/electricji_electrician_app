import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { CommonActions } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { FC, ReactNode } from 'react';
import {
  Dimensions,
  Image,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { ProfileStackParamList } from '../navigation/types';
import { ScreenScaffold } from '../components/ui';
import { MOCK_COMPLETED_JOBS, TECHNICIAN_PROFILE } from '../mocks';
import { colors, fonts } from '../theme';

type Props = NativeStackScreenProps<ProfileStackParamList, 'ProfileMenu'>;

const DESIGN_W = 412;
const { width: SCREEN_W } = Dimensions.get('window');
const SCALE = SCREEN_W / DESIGN_W;
const H_PAD = 16;
const CONTENT_W = Math.min(380, SCREEN_W - H_PAD * 2);
const STAT_CARD_W = (CONTENT_W - 16 * 2) / 3;
const RED = colors.primary;
const TEXT = colors.text;
const MUTED = colors.muted;
const PAGE_BG = colors.pageBg;
const GREEN = colors.success;
const STAR = '#f5a623';
const CARD_BORDER = '#f0f0f0';
const ICON_BOX_BG = '#f9fafb';

/** Stat + settings rows — mirrored from delivery `AccountScreen` (#4089:1909). */
export const ProfileMenuScreen: FC<Props> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const tabScrollBottomPad = Math.max(insets.bottom + 72, 100);

  const topPad =
    Math.max(12, 24 * SCALE) +
    (Platform.OS === 'ios' ? 44 : StatusBar.currentHeight ?? 24);

  const logout = () => {
    const root = navigation.getParent()?.getParent();
    root?.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'LanguageSelection' }],
      }),
    );
  };

  const jobsComplete =
    MOCK_COMPLETED_JOBS.length < 100
      ? `${MOCK_COMPLETED_JOBS.length * 34}`
      : `${MOCK_COMPLETED_JOBS.length}`;

  return (
    <ScreenScaffold>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: tabScrollBottomPad + 24 },
        ]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={[styles.header, { paddingTop: topPad }]}>
          <View style={styles.headerRow}>
            {navigation.canGoBack() ? (
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Go back"
                hitSlop={12}
                onPress={() => navigation.goBack()}
                style={styles.headerSide}
              >
                <Image
                  accessibilityIgnoresInvertColors
                  source={require('../../assets/login/icon-back.png')}
                  style={styles.backIcon}
                  resizeMode="contain"
                />
              </Pressable>
            ) : (
              <View style={styles.headerSide} />
            )}
            <Text style={styles.headerTitle} numberOfLines={1}>
              Account
            </Text>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Help"
              hitSlop={12}
              onPress={() => navigation.navigate('SupportHome')}
              style={[styles.headerSide, styles.headerSideRight]}
            >
              <Image
                accessibilityIgnoresInvertColors
                source={require('../../assets/personal-info/icon-help.png')}
                style={styles.helpIcon}
                resizeMode="contain"
              />
            </Pressable>
          </View>
        </View>
        <View style={styles.headerRule} />

        <View style={styles.profileBlock}>
          <Image
            accessibilityLabel="Profile photo"
            source={require('../../assets/account/profile-avatar.png')}
            style={styles.avatar}
            resizeMode="cover"
          />
          <Text style={styles.displayName}>{TECHNICIAN_PROFILE.name}</Text>
          <View style={styles.partnerRow}>
            <Text style={styles.partnerMeta}>
              Partner ID: {TECHNICIAN_PROFILE.id}
            </Text>
            <Ionicons name="shield-checkmark" size={22} color={GREEN} />
          </View>
          <Text style={styles.partnerSince}>Technician · verified</Text>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="View public profile"
            onPress={() => navigation.navigate('PublicProfilePreview')}
            style={styles.publicLinkWrap}
          >
            <Text style={styles.publicLink}>View public profile</Text>
            <Ionicons name="chevron-forward" size={16} color={RED} />
          </Pressable>
        </View>

        <View style={[styles.mainColumn, { width: CONTENT_W }]}>
          <View style={styles.statsRow}>
            <StatCard
              icon={
                <MaterialCommunityIcons name="hammer-wrench" size={24} color={RED} />
              }
              value={jobsComplete}
              label="JOBS"
            />
            <StatCard
              icon={<MaterialCommunityIcons name="star" size={24} color={STAR} />}
              value={`${TECHNICIAN_PROFILE.rating}`}
              label="RATING"
            />
            <StatCard
              icon={<MaterialCommunityIcons name="cash" size={24} color={GREEN} />}
              value="₹45.2K"
              label="EARNINGS"
            />
          </View>

          <View style={styles.supportCard}>
            <Ionicons
              name="headset"
              size={156}
              color="rgba(255,255,255,0.22)"
              style={styles.supportWatermark}
            />
            <Text style={styles.supportTitle}>Need assistance?</Text>
            <Text style={styles.supportSubtitle}>
              24/7 priority support — jobs, payouts, and safety help.
            </Text>
            <Pressable
              style={styles.supportCta}
              accessibilityRole="button"
              accessibilityLabel="Get help now"
              onPress={() => navigation.navigate('SupportHome')}
            >
              <Text style={styles.supportCtaText}>Get Help Now</Text>
              <Ionicons name="chevron-forward" size={20} color={RED} />
            </Pressable>
          </View>

          <View style={styles.sectionGap}>
            <Text style={styles.sectionTitleAccount}>ACCOUNT SETTINGS</Text>
            <View style={styles.settingsCard}>
              <SettingsRow
                icon={<Ionicons name="person" size={24} color={TEXT} />}
                title="Personal Information"
                onPress={() => navigation.navigate('PersonalInformation')}
              />
            </View>
          </View>

          <View style={styles.sectionGap}>
            <Text style={styles.sectionTitleVehicle}>WORK PROFILE</Text>
            <View style={styles.settingsCard}>
              <SettingsRow
                icon={<MaterialCommunityIcons name="file-document-outline" size={24} color={TEXT} />}
                title="Documents"
                subtitle={
                  <Text style={styles.verifiedBadge}>Verified</Text>
                }
                onPress={() => navigation.navigate('Documents')}
              />
              <View style={styles.rowDivider} />
              <SettingsRow
                icon={<Ionicons name="map-outline" size={24} color={TEXT} />}
                title="Service area"
                onPress={() => navigation.navigate('ServiceAreaEdit')}
              />
              <View style={styles.rowDivider} />
              <SettingsRow
                icon={<Ionicons name="reader-outline" size={24} color={TEXT} />}
                title="Bio / About"
                onPress={() => navigation.navigate('BioAbout')}
              />
              <View style={styles.rowDivider} />
              <SettingsRow
                icon={<Ionicons name="construct-outline" size={24} color={TEXT} />}
                title="Specializations"
                onPress={() => navigation.navigate('SpecializationsEdit')}
              />
              <View style={styles.rowDivider} />
              <SettingsRow
                icon={<Ionicons name="time-outline" size={24} color={TEXT} />}
                title="Availability"
                onPress={() => navigation.navigate('AvailabilitySchedule')}
              />
            </View>
          </View>

          <View style={styles.sectionGap}>
            <Text style={styles.sectionTitlePrefs}>PREFERENCES</Text>
            <View style={styles.settingsCard}>
              <SettingsRow
                icon={<Ionicons name="notifications" size={24} color={TEXT} />}
                title="Notifications"
                onPress={() => navigation.navigate('Settings')}
              />
              <View style={styles.rowDivider} />
              <SettingsRow
                icon={<Ionicons name="language-outline" size={24} color={TEXT} />}
                title="Language"
                onPress={() => navigation.navigate('Languages')}
              />
              <View style={styles.rowDivider} />
              <SettingsRow
                icon={<Ionicons name="gift-outline" size={24} color={TEXT} />}
                title="Refer & Earn"
                onPress={() => navigation.navigate('ReferEarn')}
              />
              <View style={styles.rowDivider} />
              <SettingsRow
                icon={<Ionicons name="settings-outline" size={24} color={TEXT} />}
                title="Settings"
                onPress={() => navigation.navigate('Settings')}
              />
            </View>
          </View>

          <Pressable
            style={styles.logoutBtn}
            accessibilityRole="button"
            accessibilityLabel="Logout account"
            onPress={logout}
          >
            <MaterialCommunityIcons name="logout" size={24} color={RED} />
            <Text style={styles.logoutText}>Logout Account</Text>
          </Pressable>
          <Text style={styles.versionText}>V1.2.12 BUILD 88</Text>
        </View>
      </ScrollView>
    </ScreenScaffold>
  );
};

const StatCard: FC<{
  icon: ReactNode;
  value: string;
  label: string;
}> = ({ icon, value, label }) => (
  <View style={[styles.statCard, { width: STAT_CARD_W }]}>
    {icon}
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

const SettingsRow: FC<{
  icon: ReactNode;
  title: string;
  subtitle?: ReactNode;
  onPress?: () => void;
}> = ({ icon, title, subtitle, onPress }) => (
  <Pressable
    style={styles.settingsRow}
    accessibilityRole="button"
    accessibilityLabel={title}
    onPress={() => onPress?.()}
    disabled={!onPress}
  >
    <View style={styles.iconBox}>{icon}</View>
    <View style={styles.settingsRowText}>
      <Text style={styles.settingsTitle}>{title}</Text>
      {subtitle}
    </View>
    <Ionicons name="chevron-forward" size={22} color={MUTED} />
  </Pressable>
);

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 8,
  },
  header: {
    backgroundColor: colors.white,
    paddingHorizontal: 10,
    paddingBottom: 18,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerSide: {
    width: 28,
    height: 28,
    justifyContent: 'center',
  },
  headerSideRight: {
    alignItems: 'flex-end',
  },
  backIcon: {
    width: 24,
    height: 24,
  },
  helpIcon: {
    width: 28,
    height: 28,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontFamily: fonts.publicBold,
    fontSize: 18,
    color: TEXT,
  },
  headerRule: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#e8e8ed',
    width: '100%',
  },
  profileBlock: {
    alignItems: 'center',
    paddingTop: 28,
    paddingHorizontal: H_PAD,
    marginBottom: 8,
  },
  avatar: {
    width: 102,
    height: 102,
    borderRadius: 51,
    marginBottom: 16,
  },
  displayName: {
    fontFamily: fonts.publicBold,
    fontSize: 24,
    color: TEXT,
    textAlign: 'center',
    marginBottom: 7,
  },
  partnerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    marginBottom: 4,
  },
  partnerMeta: {
    fontFamily: fonts.publicMedium,
    fontSize: 14,
    color: MUTED,
  },
  partnerSince: {
    fontFamily: fonts.publicMedium,
    fontSize: 14,
    color: MUTED,
    textAlign: 'center',
  },
  publicLinkWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 12,
    paddingVertical: 4,
  },
  publicLink: {
    fontFamily: fonts.publicSemiBold,
    fontSize: 14,
    color: RED,
  },
  mainColumn: {
    paddingHorizontal: 0,
    marginTop: 16,
    alignSelf: 'center',
    gap: 24,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  statCard: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: CARD_BORDER,
    borderRadius: 16,
    height: 106,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 12,
  },
  statValue: {
    fontFamily: fonts.publicBold,
    fontSize: 20,
    color: TEXT,
  },
  statLabel: {
    fontFamily: fonts.publicMedium,
    fontSize: 12,
    color: MUTED,
  },
  supportCard: {
    backgroundColor: RED,
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 22,
    overflow: 'hidden',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 11 },
    shadowOpacity: 0.09,
    shadowRadius: 11,
    elevation: 10,
  },
  supportWatermark: {
    position: 'absolute',
    right: -8,
    top: 8,
  },
  supportTitle: {
    fontFamily: fonts.publicBold,
    fontSize: 20,
    color: colors.white,
    marginBottom: 8,
    maxWidth: '70%',
  },
  supportSubtitle: {
    fontFamily: fonts.publicRegular,
    fontSize: 16,
    color: colors.white,
    lineHeight: 22,
    marginBottom: 20,
    maxWidth: 280,
  },
  supportCta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    backgroundColor: colors.white,
    borderRadius: 32,
    paddingVertical: 12,
    paddingHorizontal: 16,
    gap: 4,
  },
  supportCtaText: {
    fontFamily: fonts.publicBold,
    fontSize: 16,
    color: RED,
  },
  sectionGap: {
    gap: 16,
    width: '100%',
  },
  sectionTitleAccount: {
    fontFamily: fonts.publicSemiBold,
    fontSize: 16,
    color: MUTED,
    letterSpacing: 1.28,
    textTransform: 'uppercase',
  },
  sectionTitleVehicle: {
    fontFamily: fonts.publicSemiBold,
    fontSize: 14,
    color: MUTED,
    letterSpacing: 1.12,
    textTransform: 'uppercase',
  },
  sectionTitlePrefs: {
    fontFamily: fonts.publicSemiBold,
    fontSize: 14,
    color: MUTED,
    letterSpacing: 1.12,
    textTransform: 'uppercase',
  },
  settingsCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    width: '100%',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 11 },
    shadowOpacity: 0.09,
    shadowRadius: 5.4,
    elevation: 8,
  },
  settingsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  iconBox: {
    width: 50,
    height: 50,
    borderRadius: 8,
    backgroundColor: ICON_BOX_BG,
    borderWidth: 1,
    borderColor: CARD_BORDER,
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingsRowText: {
    flex: 1,
    gap: 4,
  },
  settingsTitle: {
    fontFamily: fonts.publicSemiBold,
    fontSize: 16,
    color: TEXT,
  },
  verifiedBadge: {
    fontFamily: fonts.publicSemiBold,
    fontSize: 12,
    color: GREEN,
    textTransform: 'uppercase',
  },
  rowDivider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#e8e8ed',
    marginVertical: 16,
    width: '100%',
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: '100%',
    maxWidth: 280,
    borderWidth: 2,
    borderColor: 'rgba(217,35,45,0.25)',
    backgroundColor: colors.white,
    borderRadius: 74,
    paddingVertical: 12,
    paddingHorizontal: 38,
    gap: 8,
  },
  logoutText: {
    fontFamily: fonts.publicBold,
    fontSize: 16,
    color: RED,
    letterSpacing: 0.192,
  },
  versionText: {
    fontFamily: fonts.publicSemiBold,
    fontSize: 12,
    color: MUTED,
    textAlign: 'center',
    letterSpacing: 0.48,
    marginTop: 8,
    marginBottom: 8,
  },
});
