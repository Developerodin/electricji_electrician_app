import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { FC } from 'react';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { RootStackParamList } from '../navigation/types';
import {
  AppButton,
  AppCard,
  ScreenScaffold,
  SectionTitle,
  Tag,
} from '../components/ui';
import { colors, fonts, radii, scaleFont, shadows, spacing } from '../theme';

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
 * Spec #18 — KYC status hero with demo state cycling + doc list.
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

  return (
    <ScreenScaffold>
      <View
        style={[
          styles.hero,
          shadows.md,
          { paddingTop: insets.top + spacing.xl },
        ]}
      >
        <View style={styles.iconBubble}>
          <Ionicons name={meta.icon} size={44} color={meta.iconColor} />
        </View>
        <Tag label={meta.tag.label} tone={meta.tag.tone} />
        <Text style={styles.heroTitle}>{meta.title}</Text>
        <Text style={styles.heroBody}>{meta.body}</Text>
      </View>

      <ScrollView
        style={styles.body}
        contentContainerStyle={styles.bodyContent}
        showsVerticalScrollIndicator={false}
      >
        <SectionTitle
          title="Submitted documents"
          caption={`${DOCS.length} of ${DOCS.length} uploaded`}
        />
        <AppCard padded={false}>
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
        </AppCard>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Cycle demo status"
          onPress={cycle}
          style={styles.demo}
        >
          <Ionicons name="refresh" size={14} color={colors.primary} />
          <Text style={styles.demoText}>Demo · cycle status</Text>
        </Pressable>
      </ScrollView>

      <View style={styles.footer}>
        {status === 'approved' ? (
          <AppButton
            label="Continue to dashboard"
            onPress={() =>
              navigation.reset({ index: 0, routes: [{ name: 'MainTabs' }] })
            }
            block
          />
        ) : null}
        {status === 'rejected' ? (
          <AppButton
            label="Re-upload Aadhaar"
            variant="outline"
            onPress={() => navigation.navigate('KycAadhaar')}
            block
          />
        ) : null}
        {status === 'review' ? (
          <AppButton
            label="Notify me when done"
            variant="outline"
            onPress={() =>
              navigation.reset({ index: 0, routes: [{ name: 'MainTabs' }] })
            }
            block
          />
        ) : null}
      </View>
    </ScreenScaffold>
  );
};

const styles = StyleSheet.create({
  hero: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxl,
    borderBottomLeftRadius: radii.hero,
    borderBottomRightRadius: radii.hero,
    alignItems: 'center',
    gap: spacing.sm,
  },
  iconBubble: {
    width: 80,
    height: 80,
    borderRadius: radii.pill,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  heroTitle: {
    fontFamily: fonts.publicBold,
    fontSize: scaleFont(22),
    color: colors.white,
  },
  heroBody: {
    fontFamily: fonts.publicMedium,
    fontSize: scaleFont(13),
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    maxWidth: 320,
  },
  body: { flex: 1 },
  bodyContent: {
    padding: spacing.lg,
    gap: spacing.md,
  },
  docRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  docRowDivider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.borderLight,
  },
  docName: {
    fontFamily: fonts.publicSemiBold,
    fontSize: scaleFont(14),
    color: colors.text,
  },
  demo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    alignSelf: 'flex-start',
    paddingVertical: spacing.xs,
  },
  demoText: {
    fontFamily: fonts.publicSemiBold,
    fontSize: scaleFont(12),
    color: colors.primary,
  },
  footer: {
    padding: spacing.lg,
    backgroundColor: colors.white,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.borderLight,
  },
});
