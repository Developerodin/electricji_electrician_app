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
  TextInput,
  View,
} from 'react-native';
import type { RootStackParamList } from '../navigation/types';
import { useLoginScreenChrome } from '../hooks/useLoginScreenChrome';

const DESIGN_W = 412;
const RED = '#d9232d';
const { width: SCREEN_W } = Dimensions.get('window');
const SCALE = SCREEN_W / DESIGN_W;

/** Same asset pipeline as delivery `LoginSignupScreen`. */
const MASCOT = require('../../assets/login/login-mascot.png');

type Props = NativeStackScreenProps<RootStackParamList, 'PhoneEntry'>;

/**
 * Delivery `LoginSignupScreen` chrome; +91 row, Terms checkbox, Send OTP → EnterOtp.
 */
export const PhoneEntryScreen: FC<Props> = ({ navigation }) => {
  const [mobile, setMobile] = useState('');
  const [accepted, setAccepted] = useState(false);
  const { topInset, keyboardOpen } = useLoginScreenChrome();

  const digits = mobile.replace(/\D/g, '').slice(0, 10);
  const valid = digits.length === 10 && accepted;
  const last2 = digits.slice(-2);

  const toggleTerms = () => setAccepted((v) => !v);

  return (
    <View style={styles.root}>
      <KeyboardAvoidingView
        style={styles.kav}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? topInset : 0}
      >
        <View style={[styles.inner, styles.contentAboveHero]}>
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

          <ScrollView
            style={styles.scroll}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.form}>
              <View style={styles.formBlock}>
                <Text style={styles.screenTitle}>Login or Signup</Text>
                <View style={styles.inputRow}>
                  <Image
                    accessibilityElementsHidden
                    importantForAccessibility="no"
                    source={require('../../assets/login/icon-phone.png')}
                    style={styles.inputIcon}
                    resizeMode="contain"
                  />
                  <Text style={styles.cc} accessibilityLabel="Country code India">
                    +91
                  </Text>
                  <TextInput
                    accessibilityLabel="10-digit mobile number"
                    value={digits}
                    onChangeText={(t) => setMobile(t.replace(/\D/g, '').slice(0, 10))}
                    placeholder="Enter your mobile number..."
                    placeholderTextColor="#77878f"
                    keyboardType="phone-pad"
                    maxLength={10}
                    style={styles.input}
                    underlineColorAndroid="transparent"
                  />
                </View>
              </View>

              <Pressable
                accessibilityRole="checkbox"
                accessibilityState={{ checked: accepted }}
                onPress={toggleTerms}
                hitSlop={10}
                android_ripple={{
                  color: 'rgba(217,35,45,0.12)',
                  borderless: false,
                }}
                style={({ pressed }) => [
                  styles.checkRow,
                  pressed && Platform.OS === 'ios' ? styles.checkRowPressed : null,
                ]}
              >
                <View style={[styles.box, accepted && styles.boxOn]} pointerEvents="none">
                  {accepted ? (
                    <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                  ) : null}
                </View>
                <Text style={styles.checkLabel}>
                  I agree to Terms & Privacy Policy
                </Text>
              </Pressable>

              <View style={styles.ctaArea}>
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Send OTP"
                  disabled={!valid}
                  style={({ pressed }) => [
                    styles.ctaPrimary,
                    !valid && styles.ctaDisabled,
                    pressed && valid && styles.ctaPressed,
                  ]}
                  onPress={() =>
                    navigation.navigate('EnterOtp', { phoneLast2: last2 })
                  }
                >
                  <Text style={styles.ctaPrimaryLabel}>Send OTP</Text>
                </Pressable>
              </View>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>

      {!keyboardOpen ? (
        <View style={[styles.heroWrap, styles.heroLayer]} pointerEvents="none">
          <Image
            accessibilityLabel="Delivery partner illustration"
            source={MASCOT}
            style={styles.hero}
            resizeMode="contain"
          />
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#FFFFFF' },
  kav: { flex: 1 },
  /** Sit above mascot so OTP / checkbox always receive taps (matches delivery layering intent). */
  contentAboveHero: Platform.select({
    ios: {
      flex: 1,
      position: 'relative',
      zIndex: 2,
    },
    android: {
      flex: 1,
      position: 'relative',
      zIndex: 2,
      elevation: 6,
    },
    default: { flex: 1, position: 'relative', zIndex: 2 },
  }),
  heroLayer: Platform.select({
    ios: {
      zIndex: 1,
    },
    android: {
      zIndex: 0,
      elevation: 0,
    },
    default: {
      zIndex: 1,
    },
  }),
  inner: {
    overflow: 'hidden',
  },
  scroll: { flex: 1 },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 32,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  backSlot: {
    width: 44,
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: { width: 24, height: 24 },
  headerCenter: { flex: 1, alignItems: 'center', paddingTop: 2 },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7.774 * SCALE,
  },
  logoMark: { width: 37.105 * SCALE, height: 26.223 * SCALE },
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
    marginTop: 48 * SCALE,
    gap: 24 * SCALE,
    maxWidth: 380,
    width: '100%',
    alignSelf: 'center',
  },
  formBlock: {
    gap: 16 * SCALE,
    width: '100%',
  },
  screenTitle: {
    fontFamily: 'PublicSans_700Bold',
    color: '#202020',
    fontSize: 24 * SCALE,
    lineHeight: 48,
    letterSpacing: 0.288,
    width: '100%',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingHorizontal: 16,
    minHeight: 48,
    borderWidth: 1,
    borderColor: '#d3d3d3',
    borderRadius: 4,
    width: '100%',
  },
  inputIcon: {
    width: 24,
    height: 24,
  },
  cc: {
    fontFamily: 'PublicSans_600SemiBold',
    fontSize: 14 * SCALE,
    color: '#202020',
    letterSpacing: 0.168,
  },
  input: {
    flex: 1,
    fontFamily: 'PublicSans_500Medium',
    color: '#202020',
    fontSize: 14 * SCALE,
    letterSpacing: 0.168,
    paddingVertical: Platform.OS === 'ios' ? 12 : 0,
    ...(Platform.OS === 'android'
      ? { includeFontPadding: false, textAlignVertical: 'center' }
      : {}),
  },
  checkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    minHeight: 48,
    paddingVertical: 4,
    alignSelf: 'stretch',
  },
  checkRowPressed: { opacity: 0.88 },
  box: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#77878f',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  boxOn: { backgroundColor: RED, borderColor: RED },
  checkLabel: {
    flex: 1,
    fontFamily: 'PublicSans_500Medium',
    fontSize: 14 * SCALE,
    color: '#202020',
    ...(Platform.OS === 'android' && { includeFontPadding: false }),
  },
  ctaArea: {
    gap: 16 * SCALE,
    width: '100%',
  },
  ctaPrimary: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: RED,
    borderRadius: 4,
    paddingVertical: 14,
    paddingHorizontal: 24,
    width: '100%',
    minHeight: 48,
  },
  ctaDisabled: { opacity: 0.45 },
  ctaPressed: { opacity: 0.92 },
  ctaPrimaryLabel: {
    fontFamily: 'PublicSans_700Bold',
    color: '#FFFFFF',
    fontSize: 16 * SCALE,
    lineHeight: 24,
    letterSpacing: 0.192,
  },
  heroWrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: -SCREEN_W * 0.42,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  hero: {
    width: SCREEN_W * 1.65,
    height: SCREEN_W * 1.65,
    maxHeight: Dimensions.get('window').height * 0.58,
  },
});
