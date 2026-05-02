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
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import type { RootStackParamList } from '../navigation/types';

const DESIGN_W = 412;
const RED = '#d9232d';
const MUTED = '#77878f';
const TEXT = '#202020';
const { width: SCREEN_W } = Dimensions.get('window');
const SCALE = SCREEN_W / DESIGN_W;

const LANGS = [
  'English',
  'हिंदी',
  'मराठी',
  'ગુજરાતી',
  'தமிழ்',
  'తెలుగు',
] as const;

type Props = NativeStackScreenProps<RootStackParamList, 'LanguageSelection'>;

/**
 * Language list — same chrome & typography as delivery `LoginSignupScreen`
 * (logo bar, form block, primary CTA). No bottom mascot per product spec.
 */
export const LanguageSelectionScreen: FC<Props> = ({ navigation }) => {
  const [selected, setSelected] = useState<string | null>(null);
  const canContinue = !!selected;
  const topInset =
    Platform.OS === 'ios'
      ? 56
      : (StatusBar.currentHeight ?? 24) + 8;

  return (
    <View style={styles.root}>
      <KeyboardAvoidingView
        style={styles.kav}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? topInset : 0}
      >
        <View style={styles.inner}>
          <View
            style={[styles.topBar, { paddingTop: topInset + Math.max(8, 12 * SCALE) }]}
          >
            <View style={styles.backSlot} />
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
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.form}>
              <View style={styles.formBlock}>
                <Text style={styles.screenTitle} accessibilityRole="header">
                  Choose your language
                </Text>
                <View style={styles.langList}>
                  {LANGS.map((l) => {
                    const on = selected === l;
                    return (
                      <Pressable
                        key={l}
                        accessibilityRole="radio"
                        accessibilityState={{ selected: on }}
                        onPress={() => setSelected(l)}
                        style={({ pressed }) => [
                          styles.langRow,
                          on && styles.langRowSelected,
                          pressed && styles.langRowPressed,
                        ]}
                      >
                        <Text style={styles.langLabel}>{l}</Text>
                        <View
                          style={[styles.radioOuter, on && styles.radioOuterOn]}
                        >
                          {on ? <View style={styles.radioInner} /> : null}
                        </View>
                      </Pressable>
                    );
                  })}
                </View>
              </View>

              <View style={styles.ctaArea}>
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Continue"
                  disabled={!canContinue}
                  style={({ pressed }) => [
                    styles.ctaPrimary,
                    !canContinue && styles.ctaDisabled,
                    pressed && canContinue && styles.ctaPressed,
                  ]}
                  onPress={() => navigation.navigate('PhoneEntry')}
                >
                  <Text style={styles.ctaPrimaryLabel}>Continue</Text>
                </Pressable>
              </View>
            </View>
          </ScrollView>
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
  kav: { flex: 1 },
  inner: { flex: 1, overflow: 'hidden' },
  scroll: { flex: 1 },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 24,
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
    color: TEXT,
    fontSize: 24 * SCALE,
    lineHeight: 48,
    letterSpacing: 0.288,
    width: '100%',
  },
  langList: {
    gap: 12,
    width: '100%',
  },
  langRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    minHeight: 48,
    borderWidth: 1,
    borderColor: '#d3d3d3',
    borderRadius: 4,
    width: '100%',
    backgroundColor: '#FFFFFF',
  },
  langRowSelected: {
    borderColor: RED,
    borderWidth: 1.5,
  },
  langRowPressed: { opacity: 0.92 },
  langLabel: {
    flex: 1,
    fontFamily: 'PublicSans_500Medium',
    color: TEXT,
    fontSize: 14 * SCALE,
    letterSpacing: 0.168,
    ...(Platform.OS === 'android' && { includeFontPadding: false }),
  },
  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: MUTED,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOuterOn: {
    borderColor: RED,
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: RED,
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
});
