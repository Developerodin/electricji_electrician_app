import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { FC } from 'react';
import { useMemo, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import type { HomeStackParamList } from '../navigation/types';
import {
  AppButton,
  AppCard,
  BottomCtaBar,
  ProgressBar,
  RadioRow,
  ScreenHeader,
  ScreenScaffold,
  SectionTitle,
} from '../components/ui';
import { colors, fonts, radii, scaleFont, spacing } from '../theme';

type Props = NativeStackScreenProps<HomeStackParamList, 'InspectionChecklist'>;

type Verdict = 'Pass' | 'Fail' | 'Needs attention';

const QUESTIONS: Array<{
  prompt: string;
  hint: string;
  icon: keyof typeof Ionicons.glyphMap;
}> = [
  {
    prompt: 'Is earthing continuity within tolerance?',
    hint: 'Test from neutral bus to earth bus',
    icon: 'flash-outline',
  },
  {
    prompt: 'MCB ratings match circuit load?',
    hint: 'Check labels and sub-circuit calculations',
    icon: 'options-outline',
  },
  {
    prompt: 'Sockets and switches firmly mounted?',
    hint: 'Tighten back-box screws, check for loose plates',
    icon: 'hardware-chip-outline',
  },
];

const OPTIONS: Verdict[] = ['Pass', 'Needs attention', 'Fail'];

/**
 * Spec #56 — Inspection checklist with progress, question cards and verdict picker.
 */
export const InspectionChecklistScreen: FC<Props> = ({ navigation }) => {
  const [answers, setAnswers] = useState<Record<number, Verdict>>({});

  const completed = Object.keys(answers).length;
  const allDone = completed === QUESTIONS.length;

  const score = useMemo(() => {
    const passes = Object.values(answers).filter((v) => v === 'Pass').length;
    return Math.round((passes / QUESTIONS.length) * 100);
  }, [answers]);

  return (
    <ScreenScaffold>
      <ScreenHeader title="Checklist" onBack={() => navigation.goBack()} />
      <ScrollView
        contentContainerStyle={styles.body}
        showsVerticalScrollIndicator={false}
      >
        <AppCard tone="tinted">
          <View style={styles.scoreRow}>
            <View>
              <Text style={styles.scoreLbl}>Live score</Text>
              <Text style={styles.scoreVal}>{score}%</Text>
            </View>
            <View style={styles.scoreCircle}>
              <Text style={styles.scoreCircleTxt}>
                {completed}/{QUESTIONS.length}
              </Text>
            </View>
          </View>
          <ProgressBar
            step={completed}
            totalSteps={QUESTIONS.length}
            title="Checklist progress"
          />
        </AppCard>

        <SectionTitle title="Checkpoints" />
        {QUESTIONS.map((q, i) => (
          <AppCard key={q.prompt}>
            <View style={styles.qHeader}>
              <View style={styles.qIcon}>
                <Ionicons name={q.icon} size={16} color={colors.primary} />
              </View>
              <View style={styles.qCol}>
                <Text style={styles.qTxt}>{q.prompt}</Text>
                <Text style={styles.qHint}>{q.hint}</Text>
              </View>
            </View>
            <View style={styles.optList}>
              {OPTIONS.map((opt) => (
                <RadioRow
                  key={opt}
                  label={opt}
                  selected={answers[i] === opt}
                  onPress={() =>
                    setAnswers((p) => ({ ...p, [i]: opt }))
                  }
                />
              ))}
            </View>
          </AppCard>
        ))}
      </ScrollView>

      <BottomCtaBar floating>
        <AppButton
          label={allDone ? 'Generate report' : `Answer ${QUESTIONS.length - completed} more`}
          disabled={!allDone}
          onPress={() => navigation.navigate('ScoreRecommendations')}
          block
          rightIcon={
            <Ionicons name="arrow-forward" size={16} color={colors.white} />
          }
        />
      </BottomCtaBar>
    </ScreenScaffold>
  );
};

const styles = StyleSheet.create({
  body: { padding: spacing.lg, gap: spacing.md, paddingBottom: 140 },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  scoreLbl: {
    fontFamily: fonts.publicMedium,
    fontSize: scaleFont(11.5),
    color: colors.primary,
    letterSpacing: 0.4,
    textTransform: 'uppercase',
  },
  scoreVal: {
    fontFamily: fonts.publicBold,
    fontSize: scaleFont(28),
    color: colors.primary,
  },
  scoreCircle: {
    width: 56,
    height: 56,
    borderRadius: radii.pill,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreCircleTxt: {
    fontFamily: fonts.publicBold,
    fontSize: scaleFont(13),
    color: colors.white,
  },
  qHeader: {
    flexDirection: 'row',
    gap: spacing.md,
    alignItems: 'flex-start',
  },
  qIcon: {
    width: 36,
    height: 36,
    borderRadius: radii.md,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qCol: { flex: 1, gap: 2 },
  qTxt: {
    fontFamily: fonts.publicBold,
    fontSize: scaleFont(14),
    color: colors.text,
  },
  qHint: {
    fontFamily: fonts.publicRegular,
    fontSize: scaleFont(12),
    color: colors.muted,
  },
  optList: { marginTop: spacing.md, gap: spacing.xs },
});
