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
  FormField,
  ScreenHeader,
  ScreenScaffold,
  SectionTitle,
} from '../components/ui';
import { colors, fonts, radii, scaleFont, spacing } from '../theme';

type Props = NativeStackScreenProps<JobsStackParamList, 'MarkComplete'>;

const MIN_PHOTOS = 2;
const MAX_PHOTOS = 4;

/**
 * Spec #28 — After photos + final notes + summary card before invoice.
 */
export const MarkCompleteScreen: FC<Props> = ({ navigation }) => {
  const [after, setAfter] = useState(0);
  const [notes, setNotes] = useState('');

  return (
    <ScreenScaffold>
      <ScreenHeader title="Mark complete" onBack={() => navigation.goBack()} />
      <ScrollView
        contentContainerStyle={styles.body}
        showsVerticalScrollIndicator={false}
      >
        <SectionTitle
          title="After photos"
          caption={`${after}/${MIN_PHOTOS} required`}
        />
        <View style={styles.photoRow}>
          {Array.from({ length: MAX_PHOTOS }).map((_, idx) => {
            const filled = idx < after;
            return (
              <Pressable
                key={idx}
                accessibilityRole="button"
                accessibilityLabel={`Add after photo ${idx + 1}`}
                onPress={() => setAfter((p) => Math.min(MAX_PHOTOS, p + 1))}
                style={({ pressed }) => [
                  styles.photoSlot,
                  filled && styles.photoFilled,
                  pressed && { transform: [{ scale: 0.97 }] },
                ]}
              >
                <Ionicons
                  name={filled ? 'image' : 'camera-outline'}
                  size={22}
                  color={filled ? colors.primary : colors.muted}
                />
              </Pressable>
            );
          })}
        </View>

        <SectionTitle title="Final notes" />
        <FormField
          label=""
          placeholder="Anything the customer should know? (optional)"
          value={notes}
          onChangeText={setNotes}
          multiline
        />

        <SectionTitle title="Summary" />
        <AppCard>
          <SummaryRow label="Service" value="Fan repair" />
          <SummaryRow label="Time on job" value="34 min" />
          <SummaryRow label="Parts total" value="₹120" />
          <View style={styles.divider} />
          <SummaryRow label="Estimated payout" value="₹570" highlight />
        </AppCard>
      </ScrollView>

      <BottomCtaBar floating>
        <AppButton
          label="Continue to invoice"
          disabled={after < MIN_PHOTOS}
          onPress={() => navigation.navigate('FinalInvoice')}
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

const SummaryRow: FC<{ label: string; value: string; highlight?: boolean }> = ({
  label,
  value,
  highlight,
}) => (
  <View style={styles.sumRow}>
    <Text style={styles.sumLbl}>{label}</Text>
    <Text style={[styles.sumVal, highlight && styles.sumValHigh]}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  body: {
    padding: spacing.lg,
    gap: spacing.md,
    paddingBottom: 140,
  },
  photoRow: { flexDirection: 'row', gap: spacing.sm },
  photoSlot: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: radii.md,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: colors.border,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoFilled: {
    borderStyle: 'solid',
    borderColor: colors.primary,
    backgroundColor: colors.primarySoft,
  },
  sumRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
  },
  sumLbl: {
    fontFamily: fonts.publicMedium,
    fontSize: scaleFont(13.5),
    color: colors.muted,
  },
  sumVal: {
    fontFamily: fonts.publicSemiBold,
    fontSize: scaleFont(14),
    color: colors.text,
  },
  sumValHigh: {
    fontFamily: fonts.publicBold,
    fontSize: scaleFont(17),
    color: colors.primary,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.borderLight,
    marginVertical: spacing.sm,
  },
});
