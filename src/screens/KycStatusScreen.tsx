import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { FC } from 'react';
import { useState } from 'react';
import {
  Image,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { RootStackParamList } from '../navigation/types';
import {
  KycDeliveryOutlineButton,
  KycDeliveryPrimaryButton,
  SectionTitle,
  Tag,
} from '../components/ui';
import { colors } from '../theme';
import {
  DV_MUTED,
  DV_RED,
  DV_TEXT,
  kycDvScale as SCALE,
} from '../theme/kycDelivery';

type StatusKind = 'review' | 'approved' | 'rejected';

type Props = NativeStackScreenProps<RootStackParamList, 'KycStatus'>;

const DOCS = [
  { name: 'Aadhaar', ok: true },
  { name: 'PAN', ok: true },
  { name: 'Address proof', ok: true },
  { name: 'Selfie', ok: true },
] as const;

const STATUS_META: Record<
  StatusKind,
  {
    title: string;
    body: string;
    tag: { label: string; tone: 'warning' | 'success' | 'danger' };
    icon: 'time-outline' | 'checkmark-circle' | 'close-circle';
    iconColor: string;
  }
> = {
  review: {
    title: 'Under review',
    body: "We're verifying your details. Usually takes 24–48 hours.",
    tag: { label: 'Under review', tone: 'warning' },
    icon: 'time-outline',
    iconColor: colors.warning,
  },
  approved: {
    title: 'You’re in!',
    body: "Welcome aboard. You're ready to take jobs.",
    tag: { label: 'Approved', tone: 'success' },
    icon: 'checkmark-circle',
    iconColor: colors.success,
  },
  rejected: {
    title: 'Action needed',
    body: 'Aadhaar image was unclear — please re-upload from Documents.',
    tag: { label: 'Rejected', tone: 'danger' },
    icon: 'close-circle',
    iconColor: colors.error,
  },
};

/**
 * Spec #18 — KYC status — layout aligned with delivery `KycVerificationScreen` / `VehicleDetailsScreen`.
 */
export const KycStatusScreen: FC<Props> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [status, setStatus] = useState<StatusKind>('review');
  const meta = STATUS_META[status];

  const cycle = () => {
    setStatus((s) =>
      s === 'review' ? 'approved' : s === 'approved' ? 'rejected' : 'review',
    );
  };

  /** Same as `OnboardingIntroScreen` header top spacing for consistent onboarding chrome. */
  const topPad = insets.top + Math.max(8, 12 * SCALE);
  const footerPad = 16 + insets.bottom;

  return (
    <View style={styles.root}>
      <View style={styles.headerWrap}>
        <View style={[styles.headerRow, { paddingTop: topPad }]}>
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
            Application status
          </Text>
          <View style={styles.headerSide} accessibilityElementsHidden />
        </View>
        <View style={styles.headerDivider} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.statusCard}>
          <View style={styles.iconBubble}>
            <Ionicons name={meta.icon} size={40} color={meta.iconColor} />
          </View>
          <Tag label={meta.tag.label} tone={meta.tag.tone} />
          <Text style={styles.statusTitle}>{meta.title}</Text>
          <Text style={styles.statusBody}>{meta.body}</Text>
        </View>

        <View style={styles.docSection}>
          <SectionTitle
            title="Submitted documents"
            caption={`${DOCS.length} of ${DOCS.length} uploaded`}
          />
          <View style={styles.docShell}>
            {DOCS.map((d, i) => (
              <View
                key={d.name}
                style={[
                  styles.docRow,
                  i < DOCS.length - 1 && styles.docRowDivider,
                ]}
              >
                <Text style={styles.docName}>{d.name}</Text>
                <Ionicons
                  name={d.ok ? 'checkmark-circle' : 'time-outline'}
                  size={20}
                  color={d.ok ? colors.success : colors.muted}
                />
              </View>
            ))}
          </View>
        </View>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Cycle demo status"
          onPress={cycle}
          style={styles.demo}
        >
          <Ionicons name="refresh" size={14} color={DV_RED} />
          <Text style={styles.demoText}>Demo · cycle status</Text>
        </Pressable>

        <View style={{ height: 96 + insets.bottom }} />
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: footerPad }]}>
        {status === 'approved' ? (
          <KycDeliveryPrimaryButton
            label="Continue to dashboard"
            onPress={() =>
              navigation.reset({ index: 0, routes: [{ name: 'MainTabs' }] })
            }
          />
        ) : null}
        {status === 'rejected' ? (
          <KycDeliveryOutlineButton
            label="Re-upload Aadhaar"
            onPress={() => navigation.navigate('KycAadhaar')}
          />
        ) : null}
        {status === 'review' ? (
          <KycDeliveryOutlineButton
            label="Notify me when done"
            onPress={() =>
              navigation.reset({ index: 0, routes: [{ name: 'MainTabs' }] })
            }
          />
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#f6f6f8',
  },
  headerWrap: {
    backgroundColor: '#FFFFFF',
    width: '100%',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    maxWidth: 412,
    width: '100%',
    alignSelf: 'center',
  },
  headerDivider: {
    marginTop: 10,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#e4e6ea',
    width: '100%',
  },
  headerSide: {
    width: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
    minHeight: 28,
  },
  backIcon: { width: 24, height: 24 },
  headerTitle: {
    flex: 1,
    fontFamily: 'PublicSans_700Bold',
    fontSize: 18 * SCALE,
    color: '#000000',
    textAlign: 'center',
    ...(Platform.OS === 'android' && { includeFontPadding: false }),
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 24,
    maxWidth: 380 + 32,
    width: '100%',
    alignSelf: 'center',
  },
  statusCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e4e6ea',
    paddingVertical: 24,
    paddingHorizontal: 20,
    alignItems: 'center',
    gap: 10,
    width: '100%',
    maxWidth: 380,
    alignSelf: 'center',
    marginBottom: 24,
  },
  iconBubble: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#f9fafb',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  statusTitle: {
    fontFamily: 'PublicSans_700Bold',
    fontSize: 18 * SCALE,
    color: DV_TEXT,
    textAlign: 'center',
    ...(Platform.OS === 'android' && { includeFontPadding: false }),
  },
  statusBody: {
    fontFamily: 'PublicSans_500Medium',
    fontSize: 14 * SCALE,
    lineHeight: Math.round(14 * SCALE * 1.45),
    color: DV_MUTED,
    textAlign: 'center',
    maxWidth: 320,
    ...(Platform.OS === 'android' && { includeFontPadding: false }),
  },
  docSection: {
    width: '100%',
    maxWidth: 380,
    alignSelf: 'center',
    gap: 12,
    marginBottom: 16,
  },
  docShell: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e4e6ea',
    overflow: 'hidden',
  },
  docRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  docRowDivider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e4e6ea',
  },
  docName: {
    fontFamily: 'PublicSans_600SemiBold',
    fontSize: 16 * SCALE,
    color: '#000000',
    ...(Platform.OS === 'android' && { includeFontPadding: false }),
  },
  demo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    alignSelf: 'flex-start',
    paddingVertical: 8,
    maxWidth: 380,
    width: '100%',
  },
  demoText: {
    fontFamily: 'PublicSans_600SemiBold',
    fontSize: 13 * SCALE,
    color: DV_RED,
    ...(Platform.OS === 'android' && { includeFontPadding: false }),
  },
  footer: {
    paddingHorizontal: 16,
    paddingTop: 12,
    backgroundColor: '#FFFFFF',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#f0f0f0',
  },
});
