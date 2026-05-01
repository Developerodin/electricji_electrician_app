import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { FC } from 'react';
import { useEffect, useMemo, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
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
  Tag,
} from '../components/ui';
import { colors, fonts, radii, scaleFont, spacing } from '../theme';

type Props = NativeStackScreenProps<JobsStackParamList, 'JobInProgress'>;

const MIN_PHOTOS = 2;

/**
 * Spec #27 — Job in progress: timer, before photos, parts, notes.
 */
export const JobInProgressScreen: FC<Props> = ({ navigation }) => {
  const [sec, setSec] = useState(872);
  const [photos, setPhotos] = useState(0);
  const [parts, setParts] = useState<string[]>(['MCB 32A — ₹220']);
  const [paused, setPaused] = useState(false);
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setSec((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, [paused]);

  const { mm, ss } = useMemo(() => {
    return {
      mm: String(Math.floor(sec / 60)).padStart(2, '0'),
      ss: String(sec % 60).padStart(2, '0'),
    };
  }, [sec]);

  const canComplete = photos >= MIN_PHOTOS;

  return (
    <ScreenScaffold>
      <ScreenHeader title="In progress" onBack={() => navigation.goBack()} />
      <ScrollView
        contentContainerStyle={styles.body}
        showsVerticalScrollIndicator={false}
      >
        <AppCard style={styles.timerCard}>
          <View style={styles.timerRow}>
            <View>
              <Text style={styles.timerLabel}>Live timer</Text>
              <Text
                style={styles.timer}
                accessibilityLabel={`Job timer ${mm} minutes ${ss} seconds`}
              >
                {mm}:{ss}
              </Text>
            </View>
            <Tag
              tone={paused ? 'warning' : 'success'}
              label={paused ? 'Paused' : 'Running'}
            />
          </View>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={paused ? 'Resume timer' : 'Pause timer'}
            onPress={() => setPaused((p) => !p)}
            style={({ pressed }) => [
              styles.pauseBtn,
              pressed && { opacity: 0.85 },
            ]}
          >
            <Ionicons
              name={paused ? 'play' : 'pause'}
              size={16}
              color={colors.primary}
            />
            <Text style={styles.pauseTxt}>
              {paused ? 'Resume' : 'Pause job'}
            </Text>
          </Pressable>
        </AppCard>

        <SectionTitle
          title="Before photos"
          caption={`${photos}/${MIN_PHOTOS} required`}
        />
        <View style={styles.photoRow}>
          {Array.from({ length: MIN_PHOTOS + 2 }).map((_, idx) => {
            const filled = idx < photos;
            return (
              <Pressable
                key={idx}
                accessibilityRole="button"
                accessibilityLabel="Add before photo"
                onPress={() => setPhotos((p) => Math.min(MIN_PHOTOS + 2, p + 1))}
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

        <SectionTitle
          title="Parts & materials"
          trailingLabel="+ Add"
          onTrailingPress={() =>
            setParts((p) => [...p, `Item ${p.length + 1} — ₹${100 + p.length * 50}`])
          }
        />
        <AppCard padded={false}>
          {parts.map((p, idx) => (
            <View
              key={p + idx}
              style={[
                styles.partRow,
                idx !== parts.length - 1 && styles.partDivider,
              ]}
            >
              <Ionicons
                name="cube-outline"
                size={16}
                color={colors.primary}
              />
              <Text style={styles.partText}>{p}</Text>
            </View>
          ))}
        </AppCard>

        <SectionTitle title="Job notes" />
        <FormField
          label=""
          placeholder="Add notes for invoice (visible to customer)…"
          value={notes}
          onChangeText={setNotes}
          multiline
        />
      </ScrollView>

      <BottomCtaBar floating>
        <View style={styles.ctaRow}>
          <AppButton
            label="Pause"
            variant="outline"
            onPress={() => setPaused(true)}
            style={styles.flex}
          />
          <AppButton
            label="Mark complete"
            disabled={!canComplete}
            onPress={() => navigation.navigate('MarkComplete')}
            style={styles.flex}
            rightIcon={
              <Ionicons name="arrow-forward" size={16} color={colors.white} />
            }
          />
        </View>
      </BottomCtaBar>

      <FloatingSosButton onPress={() => navigation.navigate('SosModal')} />
    </ScreenScaffold>
  );
};

const styles = StyleSheet.create({
  body: {
    padding: spacing.lg,
    paddingBottom: 160,
    gap: spacing.md,
  },
  timerCard: { gap: spacing.md },
  timerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  timerLabel: {
    fontFamily: fonts.publicMedium,
    fontSize: scaleFont(11.5),
    letterSpacing: 0.4,
    textTransform: 'uppercase',
    color: colors.muted,
  },
  timer: {
    fontFamily: fonts.publicBold,
    fontSize: scaleFont(34),
    color: colors.text,
    letterSpacing: 1,
  },
  pauseBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.sm,
    borderRadius: radii.md,
    backgroundColor: colors.primarySoft,
  },
  pauseTxt: {
    fontFamily: fonts.publicSemiBold,
    fontSize: scaleFont(13.5),
    color: colors.primary,
  },
  photoRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
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
  partRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 2,
  },
  partDivider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.borderLight,
  },
  partText: {
    fontFamily: fonts.publicSemiBold,
    fontSize: scaleFont(13.5),
    color: colors.text,
    flex: 1,
  },
  flex: { flex: 1 },
  ctaRow: { flexDirection: 'row', gap: spacing.sm },
});
