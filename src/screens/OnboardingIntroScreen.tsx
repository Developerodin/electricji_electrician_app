import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { FC } from 'react';
import {
  Alert,
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
import type { RootStackParamList } from '../navigation/types';
import { useLoginScreenChrome } from '../hooks/useLoginScreenChrome';

const DESIGN_W = 412;
const RED = '#d9232d';
const { width: SCREEN_W } = Dimensions.get('window');
const SCALE = SCREEN_W / DESIGN_W;

const INTRO_BODY =
  "Takes about 10 minutes. You'll need Aadhaar, PAN, and qualification certificates ready.";

type Props = NativeStackScreenProps<RootStackParamList, 'OnboardingIntro'>;

/**
 * Delivery `PersonalInfoScreen` shell (Figma #4089:1436). Same flow: intro copy,
 * 0/10 progress, Start profile setup → KycPersonal.
 */
export const OnboardingIntroScreen: FC<Props> = ({ navigation }) => {
  const { topInset } = useLoginScreenChrome();

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? topInset : 0}
    >
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View
          style={[styles.topBar, { marginTop: topInset + Math.max(8, 12 * SCALE) }]}
        >
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
          <Text style={styles.headerTitle} numberOfLines={1}>
            Profile setup
          </Text>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Help"
            hitSlop={12}
            onPress={() =>
              Alert.alert(
                'Help',
                'For setup help, open Support from the Profile tab after you finish onboarding.',
              )
            }
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

        <View style={styles.progressBlock}>
          <View style={styles.progressLabels}>
            <Text style={styles.progressStep}>Step 0 of 10</Text>
            <Text style={styles.progressPercent}>0% complete</Text>
          </View>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: '0%' }]} />
          </View>
        </View>

        <View style={styles.avatarBlock}>
          <View style={styles.avatarFrame}>
            <Image
              accessibilityLabel="Profile setup illustration"
              source={require('../../assets/personal-info/upload-avatar.png')}
              style={styles.avatarImage}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.avatarTitle} accessibilityRole="header">
            Let&apos;s set up your profile
          </Text>
          <Text style={styles.avatarHint}>
            You&apos;re almost ready — review what you&apos;ll need below, then start.
          </Text>
        </View>

        <View style={styles.form}>
          <View style={styles.field}>
            <Text style={styles.label}>What you&apos;ll need</Text>
            <View style={styles.inputShell}>
              <Text style={styles.readOnly}>{INTRO_BODY}</Text>
            </View>
          </View>
        </View>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Start profile setup"
          style={({ pressed }) => [
            styles.nextCta,
            pressed && styles.nextCtaPressed,
          ]}
          onPress={() => navigation.navigate('KycPersonal')}
        >
          <Text style={styles.nextLabel}>Start profile setup</Text>
          <Image
            accessibilityElementsHidden
            importantForAccessibility="no"
            source={require('../../assets/personal-info/icon-arrow-next.png')}
            style={styles.nextArrow}
            resizeMode="contain"
          />
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 32,
    paddingHorizontal: 16,
    maxWidth: 380 + 32,
    width: '100%',
    alignSelf: 'center',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24 * SCALE,
  },
  headerSide: {
    width: 44,
    minHeight: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerSideRight: {
    alignItems: 'center',
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
    fontFamily: 'PublicSans_700Bold',
    color: '#000000',
    fontSize: 18 * SCALE,
    textAlign: 'center',
    ...(Platform.OS === 'android' && { includeFontPadding: false }),
  },
  progressBlock: {
    gap: 7,
    marginBottom: 32 * SCALE,
    width: '100%',
  },
  progressLabels: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    width: '100%',
  },
  progressStep: {
    fontFamily: 'PublicSans_500Medium',
    fontSize: 14 * SCALE,
    color: '#202020',
    ...(Platform.OS === 'android' && { includeFontPadding: false }),
  },
  progressPercent: {
    fontFamily: 'PublicSans_500Medium',
    fontSize: 14 * SCALE,
    color: '#77878f',
    ...(Platform.OS === 'android' && { includeFontPadding: false }),
  },
  progressTrack: {
    height: 10,
    borderRadius: 12,
    backgroundColor: '#eaeff2',
    overflow: 'hidden',
    width: '100%',
  },
  progressFill: {
    height: 10,
    borderRadius: 12,
    backgroundColor: RED,
  },
  avatarBlock: {
    alignItems: 'center',
    gap: 6,
    marginBottom: 24 * SCALE,
    width: '100%',
  },
  avatarFrame: {
    borderRadius: 999,
  },
  avatarImage: {
    width: 112 * SCALE,
    height: 112 * SCALE,
  },
  avatarTitle: {
    fontFamily: 'PublicSans_700Bold',
    fontSize: 18 * SCALE,
    color: '#202020',
    textAlign: 'center',
    width: '100%',
    ...(Platform.OS === 'android' && { includeFontPadding: false }),
  },
  avatarHint: {
    fontFamily: 'PublicSans_500Medium',
    fontSize: 14 * SCALE,
    color: '#77878f',
    textAlign: 'center',
    width: '100%',
    lineHeight: 20,
    ...(Platform.OS === 'android' && { includeFontPadding: false }),
  },
  form: {
    gap: 18 * SCALE,
    width: '100%',
    marginBottom: 24 * SCALE,
  },
  field: {
    gap: 8,
    width: '100%',
  },
  label: {
    fontFamily: 'PublicSans_500Medium',
    fontSize: 14 * SCALE,
    color: '#000000',
    letterSpacing: 0.168,
    ...(Platform.OS === 'android' && { includeFontPadding: false }),
  },
  inputShell: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#d3d3d3',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    minHeight: 52,
    justifyContent: 'center',
  },
  readOnly: {
    fontFamily: 'PublicSans_500Medium',
    fontSize: 14 * SCALE,
    color: '#202020',
    letterSpacing: 0.168,
    lineHeight: 22,
    ...(Platform.OS === 'android' && { includeFontPadding: false }),
  },
  nextCta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: RED,
    borderRadius: 4,
    paddingVertical: 14,
    paddingHorizontal: 24,
    minHeight: 48,
    width: '100%',
  },
  nextCtaPressed: {
    opacity: 0.92,
  },
  nextLabel: {
    fontFamily: 'PublicSans_700Bold',
    color: '#FFFFFF',
    fontSize: 16 * SCALE,
    letterSpacing: 0.192,
    lineHeight: 24,
    ...(Platform.OS === 'android' && { includeFontPadding: false }),
  },
  nextArrow: {
    width: 24,
    height: 24,
  },
});
