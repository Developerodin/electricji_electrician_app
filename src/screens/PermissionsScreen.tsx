import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { FC } from 'react';
import { useState } from 'react';
import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { RootStackParamList } from '../navigation/types';
import { useLoginScreenChrome } from '../hooks/useLoginScreenChrome';

const DESIGN_W = 412;
const RED = '#d9232d';
const TEXT = '#202020';
const MUTED = '#77878f';
const TOGGLE_ON = '#229979';
const { width: SCREEN_W } = Dimensions.get('window');
const SCALE = SCREEN_W / DESIGN_W;

type RowDef = {
  key: string;
  title: string;
  subtitle: string;
  icon: keyof typeof Ionicons.glyphMap;
};

const ROWS: RowDef[] = [
  {
    key: 'loc',
    title: 'Location (Always)',
    subtitle: 'To match you with nearby jobs',
    icon: 'location-outline',
  },
  {
    key: 'notif',
    title: 'Notifications',
    subtitle: 'To alert you about new leads',
    icon: 'notifications-outline',
  },
  {
    key: 'cam',
    title: 'Camera',
    subtitle: 'For photos and selfie verification',
    icon: 'camera-outline',
  },
  {
    key: 'storage',
    title: 'Storage',
    subtitle: 'To save your documents',
    icon: 'folder-outline',
  },
];

type Props = NativeStackScreenProps<RootStackParamList, 'Permissions'>;

/**
 * Delivery-aligned onboarding chrome (Rubik logo bar + LoginSignup typography).
 * Dummy toggles → green tick; Continue → OnboardingIntro.
 */
export const PermissionsScreen: FC<Props> = ({ navigation }) => {
  const [allowed, setAllowed] = useState<Record<string, boolean>>({});
  const { topInset } = useLoginScreenChrome();
  const insets = useSafeAreaInsets();

  const toggle = (key: string, v: boolean) => {
    setAllowed((prev) => ({ ...prev, [key]: v }));
  };

  const bottomPad = Math.max(insets.bottom, 16) + 16;

  return (
    <View style={styles.root}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? topInset : 0}
      >
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={[
            styles.scrollInner,
            { paddingBottom: bottomPad },
          ]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={[styles.topBar, { paddingTop: topInset + Math.max(8, 12 * SCALE) }]}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Go back"
              hitSlop={12}
              onPress={() => navigation.goBack()}
              style={styles.backSlot}
            >
              <Image
                accessibilityIgnoresInvertColors
                source={require('../../assets/login/icon-back.png')}
                style={styles.backIcon}
                resizeMode="contain"
              />
            </Pressable>
            <View style={styles.headerCenter}>
              <View style={styles.logoRow}>
                <Image
                  accessibilityLabel="Electric Ji mark"
                  source={require('../../assets/login/logo-mark.png')}
                  style={styles.logoMark}
                  resizeMode="contain"
                />
                <Text style={styles.logoTitle}>Electric Ji</Text>
              </View>
              <Text style={styles.tagline}>
                <Text style={styles.taglineDark}>Making your life </Text>
                <Text style={styles.taglineRed}>EAJI</Text>
              </Text>
            </View>
            <View style={styles.backSlot} />
          </View>

          <View style={styles.form}>
            <Text style={styles.screenTitle} accessibilityRole="header">
              We need a few permissions
            </Text>

            <View style={styles.cardList}>
              {ROWS.map((r) => {
                const isOn = !!allowed[r.key];
                return (
                  <View key={r.key} style={styles.rowCard}>
                    <Ionicons name={r.icon} size={24} color={MUTED} />
                    <View style={styles.copy}>
                      <Text style={styles.title}>{r.title}</Text>
                      <Text style={styles.sub}>{r.subtitle}</Text>
                    </View>
                    {isOn ? (
                      <Ionicons
                        name="checkmark-circle"
                        size={28}
                        color={TOGGLE_ON}
                      />
                    ) : (
                      <Pressable
                        accessibilityRole="switch"
                        accessibilityState={{ checked: false }}
                        accessibilityLabel={`Allow ${r.title}`}
                        onPress={() => toggle(r.key, true)}
                        style={[
                          styles.toggleTrack,
                          styles.toggleTrackOff,
                        ]}
                      >
                        <View style={styles.toggleKnob} />
                      </Pressable>
                    )}
                  </View>
                );
              })}
            </View>
          </View>
        </ScrollView>

        <View
          style={[
            styles.footer,
            {
              paddingBottom: Math.max(insets.bottom, 16),
            },
          ]}
        >
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Continue"
            onPress={() => navigation.navigate('OnboardingIntro')}
            style={({ pressed }) => [
              styles.ctaPrimary,
              pressed && styles.ctaPressed,
            ]}
          >
            <Text style={styles.ctaPrimaryLabel}>Continue</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  flex: { flex: 1 },
  scroll: { flex: 1 },
  scrollInner: {
    flexGrow: 1,
    maxWidth: 380,
    width: '100%',
    alignSelf: 'center',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  backSlot: {
    width: 44,
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: { width: 24, height: 24 },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 2,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7.774 * SCALE,
  },
  logoMark: {
    width: 37.105 * SCALE,
    height: 26.223 * SCALE,
  },
  logoTitle: {
    fontFamily: 'Rubik_400Regular',
    color: '#000000',
    fontSize: 21.917 * SCALE,
    letterSpacing: -0.0503,
    ...(Platform.OS === 'android' && { includeFontPadding: false }),
  },
  tagline: {
    marginTop: 2,
    textAlign: 'center',
  },
  taglineDark: {
    fontFamily: 'Rubik_400Regular',
    color: '#000000',
    fontSize: Math.max(7, 8 * SCALE),
    letterSpacing: 0.5,
  },
  taglineRed: {
    fontFamily: 'Rubik_400Regular',
    color: RED,
    fontSize: Math.max(7, 8 * SCALE),
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  form: {
    paddingHorizontal: 16,
    gap: 20 * SCALE,
    width: '100%',
  },
  screenTitle: {
    fontFamily: 'PublicSans_700Bold',
    color: TEXT,
    fontSize: 24 * SCALE,
    lineHeight: 48,
    letterSpacing: 0.288,
    ...(Platform.OS === 'android' && { includeFontPadding: false }),
  },
  cardList: {
    gap: 12,
    width: '100%',
    paddingBottom: 8,
  },
  /** Bordered panels like delivery login input rows */
  rowCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    minHeight: 72,
    borderWidth: 1,
    borderColor: '#d3d3d3',
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
  },
  copy: { flex: 1, gap: 4 },
  title: {
    fontFamily: 'PublicSans_600SemiBold',
    fontSize: 16 * SCALE,
    color: TEXT,
    letterSpacing: 0.2,
    ...(Platform.OS === 'android' && { includeFontPadding: false }),
  },
  sub: {
    fontFamily: 'PublicSans_500Medium',
    fontSize: 13 * SCALE,
    color: MUTED,
    lineHeight: 18,
    ...(Platform.OS === 'android' && { includeFontPadding: false }),
  },
  toggleTrack: {
    width: 53,
    height: 28,
    borderRadius: 119,
    padding: 2,
    justifyContent: 'center',
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
  footer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#e8e8e8',
    backgroundColor: '#FFFFFF',
  },
  ctaPrimary: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: RED,
    borderRadius: 4,
    paddingVertical: 14,
    paddingHorizontal: 24,
    width: '100%',
    maxWidth: 380,
    alignSelf: 'center',
    minHeight: 48,
  },
  ctaPressed: { opacity: 0.92 },
  ctaPrimaryLabel: {
    fontFamily: 'PublicSans_700Bold',
    color: '#FFFFFF',
    fontSize: 16 * SCALE,
    lineHeight: 24,
    letterSpacing: 0.192,
  },
});
