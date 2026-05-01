import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { FC } from 'react';
import { useState } from 'react';
import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
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

type Props = NativeStackScreenProps<RootStackParamList, 'PhoneEntry'>;

/**
 * Spec #4 — phone +91 locked, 10-digit input, T&C checkbox, Send OTP.
 */
export const PhoneEntryScreen: FC<Props> = ({ navigation }) => {
  const [mobile, setMobile] = useState('');
  const [accepted, setAccepted] = useState(false);
  const { topInset, keyboardOpen } = useLoginScreenChrome();

  const digits = mobile.replace(/\D/g, '').slice(0, 10);
  const valid = digits.length === 10 && accepted;
  const last2 = digits.slice(-2);

  return (
    <View style={styles.root}>
      <KeyboardAvoidingView
        style={styles.kav}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? topInset : 0}
      >
        <View style={styles.inner}>
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
                <Text style={styles.taglineDark}>Technician partner — </Text>
                <Text style={styles.taglineRed}>EAJI</Text>
              </Text>
            </View>
            <View style={styles.backSlot} />
          </View>

          <View style={styles.form}>
            <Text style={styles.screenTitle}>Enter your mobile number</Text>
            <View style={styles.inputRow}>
              <Text style={styles.cc}>+91</Text>
              <TextInput
                accessibilityLabel="10-digit mobile number"
                value={digits}
                onChangeText={(t) => setMobile(t.replace(/\D/g, '').slice(0, 10))}
                placeholder="9876543210"
                placeholderTextColor="#77878f"
                keyboardType="phone-pad"
                maxLength={10}
                style={styles.input}
                underlineColorAndroid="transparent"
              />
            </View>

            <Pressable
              accessibilityRole="checkbox"
              accessibilityState={{ checked: accepted }}
              onPress={() => setAccepted((v) => !v)}
              style={styles.checkRow}
            >
              <View style={[styles.box, accepted && styles.boxOn]} />
              <Text style={styles.checkLabel}>
                I agree to Terms & Privacy Policy
              </Text>
            </Pressable>

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
      </KeyboardAvoidingView>

      {!keyboardOpen && (
        <View style={styles.heroWrap} pointerEvents="none">
          <Image
            accessibilityLabel="Technician illustration"
            source={require('../../assets/login/login-mascot.png')}
            style={styles.hero}
            resizeMode="contain"
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#FFFFFF' },
  kav: { flex: 1 },
  inner: { flex: 1, overflow: 'hidden' },
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
  tagline: { marginTop: 2, textAlign: 'center' },
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
    gap: 20 * SCALE,
    maxWidth: 380,
    width: '100%',
    alignSelf: 'center',
  },
  screenTitle: {
    fontFamily: 'PublicSans_700Bold',
    color: '#202020',
    fontSize: 24 * SCALE,
    letterSpacing: 0.288,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    minHeight: 48,
    borderWidth: 1,
    borderColor: '#d3d3d3',
    borderRadius: 4,
    width: '100%',
  },
  cc: {
    fontFamily: 'PublicSans_600SemiBold',
    fontSize: 14 * SCALE,
    color: '#202020',
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
  checkRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  box: {
    width: 22,
    height: 22,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#77878f',
  },
  boxOn: { backgroundColor: RED, borderColor: RED },
  checkLabel: {
    flex: 1,
    fontFamily: 'PublicSans_500Medium',
    fontSize: 14 * SCALE,
    color: '#202020',
  },
  ctaPrimary: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: RED,
    borderRadius: 4,
    paddingVertical: 14,
    width: '100%',
    minHeight: 48,
  },
  ctaDisabled: { opacity: 0.45 },
  ctaPressed: { opacity: 0.92 },
  ctaPrimaryLabel: {
    fontFamily: 'PublicSans_700Bold',
    color: '#FFFFFF',
    fontSize: 16 * SCALE,
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
