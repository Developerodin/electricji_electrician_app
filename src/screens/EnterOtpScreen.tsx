import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { FC } from 'react';
import { useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
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

const { width: SCREEN_W } = Dimensions.get('window');
const BASE_W = 412;
const SCALE = SCREEN_W / BASE_W;
const CELL_W = 52 * SCALE;
const CELL_H = 56 * SCALE;
const CELL_GAP = 10 * SCALE;
const OTP_LEN = 6;

type Props = NativeStackScreenProps<RootStackParamList, 'EnterOtp'>;

/**
 * Spec #5 — 6-digit OTP, masked phone line, 30s resend timer, Verify CTA.
 */
export const EnterOtpScreen: FC<Props> = ({ navigation, route }) => {
  const last2 = route.params?.phoneLast2 ?? '21';
  const [digits, setDigits] = useState<string[]>(() =>
    Array.from({ length: OTP_LEN }, () => ''),
  );
  const inputs = useRef<(TextInput | null)[]>([]);
  const [seconds, setSeconds] = useState(30);
  const [toast, setToast] = useState<string | null>(null);
  const { topInset, keyboardOpen } = useLoginScreenChrome();

  useEffect(() => {
    if (seconds <= 0) return;
    const t = setInterval(() => setSeconds((s) => s - 1), 1000);
    return () => clearInterval(t);
  }, [seconds]);

  const setDigit = (index: number, value: string) => {
    const d = value.replace(/\D/g, '').slice(-1);
    const next = [...digits];
    next[index] = d;
    setDigits(next);
    if (d && index < OTP_LEN - 1) inputs.current[index + 1]?.focus();
  };

  const onKeyPress = (index: number, key: string) => {
    if (key === 'Backspace' && !digits[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const otp = digits.join('');
  const canResend = seconds <= 0;

  const verify = () => {
    navigation.navigate('Permissions');
  };

  const resend = () => {
    if (!canResend) return;
    setSeconds(30);
    setToast('OTP sent again');
    setTimeout(() => setToast(null), 2000);
  };

  return (
    <View style={styles.root}>
      <KeyboardAvoidingView
        style={styles.kav}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? topInset : 0}
      >
        <View style={styles.shell}>
          <View style={[styles.topBar, { paddingTop: topInset + Math.max(8, 12 * SCALE) }]}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Go back"
              hitSlop={12}
              onPress={() => navigation.goBack()}
              style={({ pressed }) => [styles.backSlot, pressed && styles.pressed]}
            >
              <Image
                source={require('../../assets/otp-icon-back.png')}
                style={styles.backIcon}
                resizeMode="contain"
              />
            </Pressable>
            <View style={styles.headerCenter}>
              <View style={styles.logoRow}>
                <Image
                  accessibilityLabel="Electric Ji logo"
                  source={require('../../assets/otp-logo-header.png')}
                  style={styles.headerLogo}
                  resizeMode="contain"
                />
                <Text style={styles.brandTitle}>Electric Ji</Text>
              </View>
              <Text style={styles.tagline}>
                <Text style={styles.taglineDark}>Technician partner</Text>
                <Text style={styles.taglineAccent}> EAJI</Text>
              </Text>
            </View>
            <View style={styles.backSlot} />
          </View>

          <View style={styles.form}>
            <Text style={styles.screenTitle}>OTP Verification</Text>
            <Text style={styles.sentTo}>
              OTP sent to +91 98XXXXXX{last2}
            </Text>

            <View style={styles.otpRow}>
              {digits.map((digit, i) => (
                <ImageBackground
                  key={i}
                  source={require('../../assets/otp-cell-inner.png')}
                  style={[styles.cellBg, { width: CELL_W, height: CELL_H }]}
                >
                  <TextInput
                    ref={(r) => {
                      inputs.current[i] = r;
                    }}
                    value={digit}
                    onChangeText={(v) => setDigit(i, v)}
                    onKeyPress={({ nativeEvent }) =>
                      onKeyPress(i, nativeEvent.key)
                    }
                    keyboardType="number-pad"
                    maxLength={1}
                    selectTextOnFocus
                    style={styles.cellInput}
                    cursorColor="#202020"
                    allowFontScaling={false}
                  />
                </ImageBackground>
              ))}
            </View>

            <View style={styles.resendRow}>
              <Text style={styles.timer}>
                {seconds > 0 ? `Resend in ${seconds}s` : 'You can resend now'}
              </Text>
              <Pressable onPress={resend} disabled={!canResend}>
                <Text style={[styles.resend, !canResend && styles.resendDisabled]}>
                  Resend OTP
                </Text>
              </Pressable>
            </View>

            {toast ? (
              <Text style={styles.toast} accessibilityLiveRegion="polite">
                {toast}
              </Text>
            ) : null}

            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Verify OTP"
              onPress={verify}
              style={({ pressed }) => [
                styles.submitBtn,
                pressed && styles.submitPressed,
              ]}
            >
              <Text style={styles.submitLabel}>Verify</Text>
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
  shell: { flex: 1, overflow: 'hidden' },
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
  pressed: { opacity: 0.6 },
  headerCenter: { flex: 1, alignItems: 'center' },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7.774 * SCALE,
  },
  headerLogo: { width: 37.105 * SCALE, height: 26.223 * SCALE },
  brandTitle: {
    fontFamily: 'Rubik_400Regular',
    color: '#000000',
    fontSize: 21.917 * SCALE,
    letterSpacing: -0.0503,
    ...(Platform.OS === 'android' && { includeFontPadding: false }),
  },
  tagline: {
    marginTop: 2 * SCALE,
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  taglineDark: {
    fontFamily: 'Rubik_400Regular',
    color: '#000000',
    fontSize: Math.max(7, 8 * SCALE),
    textTransform: 'uppercase',
    ...(Platform.OS === 'android' && { includeFontPadding: false }),
  },
  taglineAccent: {
    fontFamily: 'Rubik_400Regular',
    color: '#D9232D',
    fontSize: Math.max(7, 8 * SCALE),
    textTransform: 'uppercase',
    ...(Platform.OS === 'android' && { includeFontPadding: false }),
  },
  form: {
    paddingHorizontal: 16,
    paddingTop: 32 * SCALE,
    width: '100%',
    maxWidth: 380 + 32,
    alignSelf: 'center',
  },
  screenTitle: {
    fontFamily: 'PublicSans_700Bold',
    color: '#202020',
    fontSize: 24 * SCALE,
    letterSpacing: 0.288,
    marginBottom: 8 * SCALE,
    ...(Platform.OS === 'android' && { includeFontPadding: false }),
  },
  sentTo: {
    fontFamily: 'PublicSans_500Medium',
    fontSize: 14 * SCALE,
    color: '#77878f',
    marginBottom: 16 * SCALE,
  },
  otpRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: CELL_GAP,
    flexWrap: 'wrap',
    marginBottom: 16 * SCALE,
  },
  cellBg: { justifyContent: 'center', alignItems: 'center' },
  cellInput: {
    width: '78%',
    fontFamily: 'PublicSans_700Bold',
    fontSize: 22 * SCALE,
    color: '#202020',
    textAlign: 'center',
    paddingVertical: 0,
    margin: 0,
    ...(Platform.OS === 'android' ? { textAlignVertical: 'center' as const } : {}),
    ...(Platform.OS === 'android' && { includeFontPadding: false }),
  },
  resendRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12 * SCALE,
  },
  timer: {
    fontFamily: 'PublicSans_500Medium',
    fontSize: 13 * SCALE,
    color: '#77878f',
  },
  resend: {
    fontFamily: 'PublicSans_700Bold',
    fontSize: 14 * SCALE,
    color: '#D9232D',
  },
  resendDisabled: { opacity: 0.4 },
  toast: {
    fontFamily: 'PublicSans_600SemiBold',
    fontSize: 13 * SCALE,
    color: '#229979',
    marginBottom: 8 * SCALE,
  },
  submitBtn: {
    backgroundColor: '#D9232D',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48 * SCALE,
    width: '100%',
    marginTop: 8 * SCALE,
  },
  submitPressed: { opacity: 0.92 },
  submitLabel: {
    fontFamily: 'PublicSans_700Bold',
    color: '#FFFFFF',
    fontSize: 16 * SCALE,
    letterSpacing: 0.192,
    ...(Platform.OS === 'android' && { includeFontPadding: false }),
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
