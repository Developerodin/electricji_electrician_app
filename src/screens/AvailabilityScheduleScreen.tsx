import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { FC } from 'react';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import type { ProfileStackParamList } from '../navigation/types';
import {
  AppButton,
  AppCard,
  AppToggle,
  BottomCtaBar,
  Chip,
  ScreenHeader,
  ScreenScaffold,
  SectionTitle,
} from '../components/ui';
import { colors, fonts, scaleFont, spacing } from '../theme';

type Props = NativeStackScreenProps<ProfileStackParamList, 'AvailabilitySchedule'>;

const DAYS = [
  { id: 'mon', label: 'Monday' },
  { id: 'tue', label: 'Tuesday' },
  { id: 'wed', label: 'Wednesday' },
  { id: 'thu', label: 'Thursday' },
  { id: 'fri', label: 'Friday' },
  { id: 'sat', label: 'Saturday' },
  { id: 'sun', label: 'Sunday' },
] as const;

const SHIFTS = [
  { id: 'morning', label: 'Morning · 6am – 12pm' },
  { id: 'afternoon', label: 'Afternoon · 12pm – 6pm' },
  { id: 'evening', label: 'Evening · 6pm – 10pm' },
] as const;

/**
 * Spec #66 — Availability schedule (weekly toggles + preferred shifts).
 */
export const AvailabilityScheduleScreen: FC<Props> = ({ navigation }) => {
  const [active, setActive] = useState<Record<string, boolean>>({
    mon: true,
    tue: true,
    wed: true,
    thu: true,
    fri: true,
    sat: true,
    sun: false,
  });
  const [shifts, setShifts] = useState<string[]>(['morning', 'afternoon']);

  const toggleShift = (id: string) =>
    setShifts((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  return (
    <ScreenScaffold>
      <ScreenHeader title="Availability" onBack={() => navigation.goBack()} />
      <ScrollView
        contentContainerStyle={styles.body}
        showsVerticalScrollIndicator={false}
      >
        <SectionTitle
          title="Working days"
          caption="Switch off days you don’t take jobs"
        />
        <AppCard padded={false}>
          {DAYS.map((d, i) => (
            <View
              key={d.id}
              style={[
                styles.dayRow,
                i < DAYS.length - 1 && styles.dayRowDivider,
              ]}
            >
              <Text style={styles.dayLabel}>{d.label}</Text>
              <AppToggle
                value={active[d.id] ?? false}
                onValueChange={(v) =>
                  setActive((prev) => ({ ...prev, [d.id]: v }))
                }
              />
            </View>
          ))}
        </AppCard>

        <SectionTitle
          title="Preferred shifts"
          caption="Pick all that apply"
        />
        <View style={styles.chips}>
          {SHIFTS.map((s) => (
            <Chip
              key={s.id}
              label={s.label}
              selected={shifts.includes(s.id)}
              onPress={() => toggleShift(s.id)}
            />
          ))}
        </View>
      </ScrollView>
      <BottomCtaBar>
        <AppButton label="Save schedule" onPress={() => navigation.goBack()} block />
      </BottomCtaBar>
    </ScreenScaffold>
  );
};

const styles = StyleSheet.create({
  body: {
    padding: spacing.lg,
    gap: spacing.md,
    paddingBottom: spacing.xxxl,
  },
  dayRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  dayRowDivider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.borderLight,
  },
  dayLabel: {
    fontFamily: fonts.publicSemiBold,
    fontSize: scaleFont(15),
    color: colors.text,
  },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
});
