import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { FC } from 'react';
import { useRef, useState } from 'react';
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

const CELL_WIDE = 84 * SCALE;
const CELL_NARROW = 82 * SCALE;
const CELL_H = 83 * SCALE;
const CELL_GAP = 16 * SCALE;
const OTP_LEN = 4;

/** Exact delivery OTP art path (`electicji_delivery_app`). */
const MASCOT = require('../../assets/login/login-mascot.png');

type Props = NativeStackScreenProps<RootStackParamList, 'EnterOtp'>;

/**
 * Matches delivery `EnterOtpScreen`: 4 OTP cells + Submit → Permissions.
 */
export const EnterOtpScreen: FC<Props> = ({ navigation }) => {
  const [digits, setDigits] = useState(() =>
    Array.from({ length: OTP_LEN }, () => ''),
  );
  const inputs = useRef<(TextInput | null)[]>([]);
  const { topInset, keyboardOpen } = useLoginScreenChrome();

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

  const submit = () => {
    navigation.navigate('Permissions');
  };

  return (
    <View style={styles.root}>
      <KeyboardAvoidingView
        style={styles.kav}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? topInset : 0}
      >
        <View style={styles.contentAboveHero}>
          <View
            style={[styles.topBar, { paddingTop: topInset + Math.max(8, 12 * SCALE) }]}
          >
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
                <Text style={styles.taglineDark}>Making your life</Text>
                <Text style={styles.taglineAccent}> EAJI</Text>
              </Text>
            </View>
            <View style={styles.backSlot} />
          </View>

          <View style={styles.form}>
            <Text style={styles.screenTitle}>Enter OTP</Text>

            <View style={styles.otpRow}>
              {([CELL_WIDE, CELL_NARROW, CELL_NARROW, CELL_WIDE] as const).map(
                (w, i) => (
                  <ImageBackground
                    key={i}
                    source={
                      w === CELL_WIDE
                        ? require('../../assets/otp-cell-outer.png')
                        : require('../../assets/otp-cell-inner.png')
                    }
                    style={[styles.cellBg, { width: w, height: CELL_H }]}
                    resizeMode="stretch"
                    imageStyle={styles.cellBgFill}
                  >
                    <TextInput
                      ref={(r) => {
                        inputs.current[i] = r;
                      }}
                      value={digits[i]}
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
                ),
              )}
            </View>

            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Submit OTP"
              onPress={submit}
              style={({ pressed }) => [
                styles.submitBtn,
                pressed && styles.submitPressed,
              ]}
            >
              <Text style={styles.submitLabel}>Submit</Text>
            </Pressable>
          </View>
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
  root: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  kav: {
    flex: 1,
  },
  contentAboveHero: Platform.select({
    ios: {
      flex: 1,
      overflow: 'hidden',
      zIndex: 2,
      position: 'relative',
    },
    android: {
      flex: 1,
      overflow: 'hidden',
      zIndex: 2,
      position: 'relative',
      elevation: 6,
    },
    default: {
      flex: 1,
      overflow: 'hidden',
      zIndex: 2,
    },
  }),
  heroLayer: Platform.select({
    ios: { zIndex: 1 },
    android: { zIndex: 0, elevation: 0 },
    default: { zIndex: 1 },
  }),
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
  headerLogo: {
    width: 37.105 * SCALE,
    height: 26.223 * SCALE,
  },
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
    paddingTop: 48 * SCALE,
    width: '100%',
    maxWidth: 380 + 32,
    alignSelf: 'center',
  },
  screenTitle: {
    fontFamily: 'PublicSans_700Bold',
    color: '#202020',
    fontSize: 24 * SCALE,
    lineHeight: 48 * SCALE,
    letterSpacing: 0.288,
    marginBottom: 16 * SCALE,
    ...(Platform.OS === 'android' && { includeFontPadding: false }),
  },
  otpRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: CELL_GAP,
    marginBottom: 24 * SCALE,
  },
  cellBg: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderRadius: 2,
  },
  cellBgFill: {
    width: '100%',
    height: '100%',
  },
  cellInput: {
    width: '78%',
    fontFamily: 'PublicSans_700Bold',
    fontSize: 28 * SCALE,
    color: '#202020',
    textAlign: 'center',
    paddingVertical: 0,
    margin: 0,
    ...(Platform.OS === 'android'
      ? { textAlignVertical: 'center' as const }
      : {}),
    ...(Platform.OS === 'android' && { includeFontPadding: false }),
  },
  submitBtn: {
    backgroundColor: '#D9232D',
    borderRadius: 4,
    paddingVertical: 0,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48 * SCALE,
    width: '100%',
  },
  submitPressed: { opacity: 0.92 },
  submitLabel: {
    fontFamily: 'PublicSans_700Bold',
    color: '#FFFFFF',
    fontSize: 16 * SCALE,
    lineHeight: 22 * SCALE,
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
