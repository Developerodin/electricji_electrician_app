import { Ionicons } from '@expo/vector-icons';
import { CommonActions } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { ComponentProps, FC } from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { ProfileStackParamList } from '../navigation/types';
import {
  AppCard,
  ListRow,
  ScreenScaffold,
  SectionTitle,
  Tag,
} from '../components/ui';
import { TECHNICIAN_PROFILE } from '../mocks';
import { colors, fonts, radii, scaleFont, shadows, spacing } from '../theme';

type IonName = ComponentProps<typeof Ionicons>['name'];

type Props = NativeStackScreenProps<ProfileStackParamList, 'ProfileMenu'>;

type MenuTarget = keyof ProfileStackParamList | 'WalletHomeNav';

type Group = {
  caption: string;
  items: { title: string; subtitle?: string; icon: IonName; target: MenuTarget; danger?: boolean }[];
};

const GROUPS: Group[] = [
  {
    caption: 'Profile',
    items: [
      { title: 'Personal information', icon: 'person-outline', target: 'PersonalInformation' },
      { title: 'Documents', subtitle: 'Aadhaar, PAN, address proof', icon: 'document-text-outline', target: 'Documents' },
      { title: 'Bio / About', icon: 'reader-outline', target: 'BioAbout' },
    ],
  },
  {
    caption: 'Work preferences',
    items: [
      { title: 'Service area', icon: 'map-outline', target: 'ServiceAreaEdit' },
      { title: 'Specializations', icon: 'construct-outline', target: 'SpecializationsEdit' },
      { title: 'Availability', icon: 'time-outline', target: 'AvailabilitySchedule' },
      { title: 'Languages', icon: 'language-outline', target: 'Languages' },
    ],
  },
  {
    caption: 'Money & growth',
    items: [
      { title: 'Bank & UPI', icon: 'card-outline', target: 'WalletHomeNav' },
      { title: 'Refer & Earn', subtitle: 'Get ₹100 per friend', icon: 'gift-outline', target: 'ReferEarn' },
    ],
  },
  {
    caption: 'App',
    items: [
      { title: 'Help & Support', icon: 'help-circle-outline', target: 'SupportHome' },
      { title: 'Settings', icon: 'settings-outline', target: 'Settings' },
    ],
  },
];

/**
 * Spec #61 — Profile menu hub with hero card + grouped settings.
 */
export const ProfileMenuScreen: FC<Props> = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  const openItem = (target: MenuTarget) => {
    if (target === 'WalletHomeNav') {
      navigation.getParent()?.navigate('HomeTab', { screen: 'WalletHome' });
      return;
    }
    switch (target) {
      case 'PersonalInformation':
        navigation.navigate('PersonalInformation');
        break;
      case 'Documents':
        navigation.navigate('Documents');
        break;
      case 'ServiceAreaEdit':
        navigation.navigate('ServiceAreaEdit');
        break;
      case 'SpecializationsEdit':
        navigation.navigate('SpecializationsEdit');
        break;
      case 'AvailabilitySchedule':
        navigation.navigate('AvailabilitySchedule');
        break;
      case 'Languages':
        navigation.navigate('Languages');
        break;
      case 'BioAbout':
        navigation.navigate('BioAbout');
        break;
      case 'ReferEarn':
        navigation.navigate('ReferEarn');
        break;
      case 'SupportHome':
        navigation.navigate('SupportHome');
        break;
      case 'Settings':
        navigation.navigate('Settings');
        break;
      default:
        break;
    }
  };

  const logout = () => {
    const root = navigation.getParent()?.getParent();
    root?.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'LanguageSelection' }],
      }),
    );
  };

  return (
    <ScreenScaffold>
      <View
        style={[
          styles.hero,
          shadows.md,
          { paddingTop: insets.top + spacing.lg },
        ]}
      >
        <View style={styles.heroRow}>
          <Image
            accessibilityIgnoresInvertColors
            source={require('../../assets/account/profile-avatar.png')}
            style={styles.avatar}
          />
          <View style={styles.heroText}>
            <Text style={styles.name}>{TECHNICIAN_PROFILE.name}</Text>
            <Text style={styles.id}>ID · {TECHNICIAN_PROFILE.id}</Text>
            <View style={styles.tagRow}>
              <Tag
                label={`★ ${TECHNICIAN_PROFILE.rating}`}
                tone="warning"
              />
              <Tag
                label={`Score ${TECHNICIAN_PROFILE.perfScore}`}
                tone="success"
              />
              <Tag label={`Grade ${TECHNICIAN_PROFILE.grade}`} tone="info" />
            </View>
          </View>
        </View>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="View public profile"
          onPress={() => navigation.navigate('PublicProfilePreview')}
          style={({ pressed }) => [
            styles.previewBtn,
            pressed && styles.previewPressed,
          ]}
        >
          <Ionicons name="eye-outline" size={16} color={colors.white} />
          <Text style={styles.previewTxt}>View public profile</Text>
          <Ionicons name="arrow-forward" size={16} color={colors.white} />
        </Pressable>
      </View>

      <ScrollView
        style={styles.body}
        contentContainerStyle={styles.bodyContent}
        showsVerticalScrollIndicator={false}
      >
        {GROUPS.map((group) => (
          <View key={group.caption} style={styles.group}>
            <SectionTitle title={group.caption} />
            <AppCard padded={false}>
              {group.items.map((item, i) => (
                <ListRow
                  key={item.title}
                  title={item.title}
                  subtitle={item.subtitle}
                  icon={item.icon}
                  onPress={() => openItem(item.target)}
                  position={
                    i === 0
                      ? group.items.length === 1
                        ? 'standalone'
                        : 'first'
                      : i === group.items.length - 1
                        ? 'last'
                        : 'middle'
                  }
                />
              ))}
            </AppCard>
          </View>
        ))}

        <AppCard padded={false} style={styles.logoutCard}>
          <ListRow
            title="Logout"
            icon="log-out-outline"
            danger
            onPress={logout}
            showChevron={false}
            position="standalone"
          />
        </AppCard>
      </ScrollView>
    </ScreenScaffold>
  );
};

const styles = StyleSheet.create({
  hero: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
    borderBottomLeftRadius: radii.hero,
    borderBottomRightRadius: radii.hero,
    gap: spacing.md,
  },
  heroRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  avatar: {
    width: 68,
    height: 68,
    borderRadius: radii.pill,
    backgroundColor: colors.white,
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.4)',
  },
  heroText: {
    flex: 1,
    gap: 4,
  },
  name: {
    fontFamily: fonts.publicBold,
    fontSize: scaleFont(20),
    color: colors.white,
  },
  id: {
    fontFamily: fonts.publicMedium,
    fontSize: scaleFont(12),
    color: 'rgba(255,255,255,0.85)',
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 4,
  },
  previewBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255,255,255,0.18)',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md - 2,
    borderRadius: radii.md,
    gap: spacing.sm,
  },
  previewPressed: { opacity: 0.85 },
  previewTxt: {
    flex: 1,
    fontFamily: fonts.publicSemiBold,
    fontSize: scaleFont(13),
    color: colors.white,
  },
  body: { flex: 1 },
  bodyContent: {
    padding: spacing.lg,
    gap: spacing.lg,
  },
  group: { gap: spacing.sm },
  logoutCard: { marginTop: spacing.md },
});
