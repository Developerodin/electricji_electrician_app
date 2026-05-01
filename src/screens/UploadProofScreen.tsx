import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { FC } from 'react';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import type { JobsStackParamList } from '../navigation/types';
import { FloatingSosButton } from '../components/FloatingSosButton';
import {
  AppButton,
  AppCard,
  BottomCtaBar,
  ScreenHeader,
  ScreenScaffold,
  SectionTitle,
  Tag,
} from '../components/ui';
import { colors, fonts, radii, scaleFont, spacing } from '../theme';

type Props = NativeStackScreenProps<JobsStackParamList, 'UploadProof'>;

/**
 * Spec #31 — Upload proof / signature with locked status banner.
 */
export const UploadProofScreen: FC<Props> = ({ navigation }) => {
  const [signed, setSigned] = useState(false);

  return (
    <ScreenScaffold>
      <ScreenHeader title="Proof of work" onBack={() => navigation.goBack()} />
      <ScrollView
        contentContainerStyle={styles.body}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.lockBanner}>
          <Ionicons name="lock-closed" size={16} color={colors.primary} />
          <Text style={styles.lockTxt}>
            Job is locked. Submit proof to release payout.
          </Text>
          <Tag label="Locked" tone="warning" size="sm" />
        </View>

        <SectionTitle
          title="Photo evidence"
          caption="Before / after — auto-attached"
        />
        <View style={styles.photoRow}>
          {['BEFORE', 'BEFORE', 'AFTER', 'AFTER'].map((label, idx) => (
            <View key={idx} style={styles.photoTile}>
              <Ionicons
                name="image"
                size={22}
                color={
                  label === 'BEFORE' ? colors.muted : colors.primary
                }
              />
              <Text style={styles.photoLbl}>{label}</Text>
            </View>
          ))}
        </View>

        <SectionTitle title="Customer signature" />
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Capture customer signature"
          onPress={() => setSigned((s) => !s)}
          style={({ pressed }) => [
            styles.sigBox,
            signed && styles.sigBoxSigned,
            pressed && { transform: [{ scale: 0.99 }] },
          ]}
        >
          {signed ? (
            <>
              <Ionicons
                name="checkmark-circle"
                size={32}
                color={colors.success}
              />
              <Text style={styles.sigSigned}>Signed by Ravi Sharma</Text>
              <Text style={styles.sigClearLbl}>Tap to clear</Text>
            </>
          ) : (
            <>
              <Ionicons
                name="create-outline"
                size={28}
                color={colors.muted}
              />
              <Text style={styles.sigHint}>Tap to capture signature</Text>
            </>
          )}
        </Pressable>

        <AppCard tone="soft">
          <View style={styles.tipRow}>
            <Ionicons
              name="information-circle-outline"
              size={18}
              color={colors.primary}
            />
            <Text style={styles.tipTxt}>
              Once submitted, photos and signature become part of the customer
              receipt.
            </Text>
          </View>
        </AppCard>
      </ScrollView>

      <BottomCtaBar floating>
        <AppButton
          label="Submit proof"
          disabled={!signed}
          onPress={() => navigation.navigate('JobSummary')}
          block
          rightIcon={
            <Ionicons name="arrow-forward" size={16} color={colors.white} />
          }
        />
      </BottomCtaBar>
      <FloatingSosButton onPress={() => navigation.navigate('SosModal')} />
    </ScreenScaffold>
  );
};

const styles = StyleSheet.create({
  body: { padding: spacing.lg, gap: spacing.md, paddingBottom: 140 },
  lockBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.primarySoft,
    borderRadius: radii.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 2,
    borderWidth: 1,
    borderColor: colors.primaryRing,
  },
  lockTxt: {
    flex: 1,
    fontFamily: fonts.publicSemiBold,
    fontSize: scaleFont(12.5),
    color: colors.primary,
  },
  photoRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  photoTile: {
    width: '48%',
    aspectRatio: 1.4,
    borderRadius: radii.md,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.borderLight,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  photoLbl: {
    fontFamily: fonts.publicBold,
    fontSize: scaleFont(11),
    color: colors.muted,
    letterSpacing: 0.6,
  },
  sigBox: {
    height: 160,
    borderRadius: radii.lg,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: colors.border,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  sigBoxSigned: {
    borderStyle: 'solid',
    borderColor: colors.success,
    backgroundColor: colors.successSoft,
  },
  sigHint: {
    fontFamily: fonts.publicMedium,
    fontSize: scaleFont(13.5),
    color: colors.muted,
  },
  sigSigned: {
    fontFamily: fonts.publicBold,
    fontSize: scaleFont(14),
    color: colors.success,
  },
  sigClearLbl: {
    fontFamily: fonts.publicMedium,
    fontSize: scaleFont(11.5),
    color: colors.muted,
  },
  tipRow: { flexDirection: 'row', alignItems: 'flex-start', gap: spacing.sm },
  tipTxt: {
    flex: 1,
    fontFamily: fonts.publicMedium,
    fontSize: scaleFont(12.5),
    color: colors.textSoft,
    lineHeight: 18,
  },
});
