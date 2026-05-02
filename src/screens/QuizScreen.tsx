import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { FC } from 'react';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import type { LearnStackParamList } from '../navigation/types';
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

type Props = NativeStackScreenProps<LearnStackParamList, 'Quiz'>;

const QUESTION = {
  prompt: 'Before opening a distribution box, what is the first step?',
  opts: [
    'Cover the panel with a cloth',
    'Isolate supply at the main switch',
    'Tighten all incoming wires',
    'Tape the live conductor',
  ],
  correctIndex: 1,
};

/**
 * Spec #53 — Quiz screen with single question + pass/fail summary view.
 */
export const QuizScreen: FC<Props> = ({ navigation }) => {
  const [pick, setPick] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <ScreenScaffold>
        <ScreenHeader
          title="Quiz result"
          onBack={() => navigation.goBack()}
        />
        <View style={styles.resultBody}>
          <View style={styles.resultBadge}>
            <Ionicons name="trophy" size={42} color={colors.white} />
          </View>
          <Text style={styles.scoreBig}>80%</Text>
          <Tag label="Passed" tone="success" />
          <Text style={styles.resultHint}>
            You earned the “Wiring Pro Lvl 1” badge.
          </Text>
        </View>
        <BottomCtaBar floating>
          <View style={styles.ctaRow}>
            <AppButton
              label="Review answers"
              variant="outline"
              onPress={() => setSubmitted(false)}
              style={styles.flex}
            />
            <AppButton
              label="My badges"
              onPress={() => navigation.navigate('MyBadges')}
              style={styles.flex}
              rightIcon={
                <Ionicons name="ribbon" size={16} color={colors.white} />
              }
            />
          </View>
        </BottomCtaBar>
      </ScreenScaffold>
    );
  }

  return (
    <ScreenScaffold>
      <ScreenHeader title="Quiz" onBack={() => navigation.goBack()} />
      <ScrollView
        contentContainerStyle={styles.body}
        showsVerticalScrollIndicator={false}
      >
        <SectionTitle title="Question 1 of 5" caption="2 attempts left" />
        <AppCard>
          <Text style={styles.q}>{QUESTION.prompt}</Text>
        </AppCard>

        {QUESTION.opts.map((o, idx) => {
          const selected = pick === idx;
          return (
            <Pressable
              key={o}
              accessibilityRole="radio"
              accessibilityState={{ selected }}
              onPress={() => setPick(idx)}
              style={({ pressed }) => [
                styles.opt,
                selected && styles.optOn,
                pressed && { transform: [{ scale: 0.98 }] },
              ]}
            >
              <View
                style={[
                  styles.optDot,
                  selected && styles.optDotOn,
                ]}
              >
                {selected ? (
                  <View style={styles.optDotInner} />
                ) : null}
              </View>
              <Text
                style={[
                  styles.optTxt,
                  selected && styles.optTxtOn,
                ]}
              >
                {o}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      <BottomCtaBar floating>
        <AppButton
          label="Submit answer"
          disabled={pick === null}
          onPress={() => setSubmitted(true)}
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
  body: { padding: spacing.lg, gap: spacing.sm, paddingBottom: 140 },
  q: {
    fontFamily: fonts.publicBold,
    fontSize: scaleFont(16),
    color: colors.text,
    lineHeight: 22,
  },
  opt: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md + 2,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.white,
  },
  optOn: {
    borderColor: colors.primary,
    backgroundColor: colors.primarySoft,
  },
  optDot: {
    width: 22,
    height: 22,
    borderRadius: radii.pill,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optDotOn: {
    borderColor: colors.primary,
  },
  optDotInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
  },
  optTxt: {
    flex: 1,
    fontFamily: fonts.publicSemiBold,
    fontSize: scaleFont(14),
    color: colors.text,
  },
  optTxtOn: { color: colors.primary },
  resultBody: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
    gap: spacing.sm,
  },
  resultBadge: {
    width: 96,
    height: 96,
    borderRadius: radii.pill,
    backgroundColor: colors.success,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  scoreBig: {
    fontFamily: fonts.publicBold,
    fontSize: scaleFont(40),
    color: colors.text,
  },
  resultHint: {
    fontFamily: fonts.publicMedium,
    fontSize: scaleFont(13.5),
    color: colors.muted,
    textAlign: 'center',
    marginTop: spacing.sm,
  },
  ctaRow: { flexDirection: 'row', gap: spacing.sm },
  flex: { flex: 1 },
});
