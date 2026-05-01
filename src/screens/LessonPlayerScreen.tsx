import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { FC } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import type { LearnStackParamList } from '../navigation/types';
import {
  AppButton,
  AppCard,
  BottomCtaBar,
  ProgressBar,
  ScreenHeader,
  ScreenScaffold,
  SectionTitle,
} from '../components/ui';
import { colors, fonts, radii, scaleFont, spacing } from '../theme';

type Props = NativeStackScreenProps<LearnStackParamList, 'LessonPlayer'>;

/**
 * Spec #52 — Lesson player with video surface, transcript and next CTA.
 */
export const LessonPlayerScreen: FC<Props> = ({ navigation, route }) => {
  const { lessonIndex, courseId } = route.params;
  const total = 5;
  const current = lessonIndex + 1;

  return (
    <ScreenScaffold>
      <ScreenHeader title="Lesson" onBack={() => navigation.goBack()} />
      <ScrollView
        contentContainerStyle={styles.body}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.video}>
          <View style={styles.playRing}>
            <Ionicons name="play" size={28} color={colors.white} />
          </View>
          <View style={styles.videoMeta}>
            <Text style={styles.videoTime}>04:32 / 12:18</Text>
          </View>
        </View>

        <View style={styles.progressWrap}>
          <ProgressBar
            step={current}
            totalSteps={total}
            title="Course progress"
          />
        </View>

        <SectionTitle
          title={`Lesson ${current} of ${total}`}
          caption="Smart switch wiring"
        />
        <AppCard>
          <Text style={styles.transcript}>
            In this lesson we cover safe isolation testing, neutral
            verification, and how to commission a Wi-Fi smart switch with the
            customer’s app. Refer to the PDF notes for circuit diagrams.
          </Text>
        </AppCard>

        <View style={styles.actions}>
          <AppButton
            label="Notes"
            variant="outline"
            leftIcon={
              <Ionicons
                name="document-text-outline"
                size={16}
                color={colors.text}
              />
            }
            onPress={() => {}}
            style={styles.flex}
          />
          <AppButton
            label="Save"
            variant="ghost"
            leftIcon={
              <Ionicons
                name="bookmark-outline"
                size={16}
                color={colors.primary}
              />
            }
            onPress={() => {}}
            style={styles.flex}
          />
        </View>
      </ScrollView>

      <BottomCtaBar floating>
        <View style={styles.ctaRow}>
          <AppButton
            label="Take quiz"
            variant="outline"
            onPress={() => navigation.navigate('Quiz', { courseId })}
            style={styles.flex}
          />
          <AppButton
            label="Next lesson"
            onPress={() =>
              navigation.navigate('LessonPlayer', {
                courseId,
                lessonIndex: lessonIndex + 1,
              })
            }
            style={styles.flex}
            rightIcon={
              <Ionicons name="arrow-forward" size={16} color={colors.white} />
            }
          />
        </View>
      </BottomCtaBar>
    </ScreenScaffold>
  );
};

const styles = StyleSheet.create({
  body: { padding: spacing.lg, gap: spacing.md, paddingBottom: 140 },
  video: {
    height: 200,
    borderRadius: radii.lg,
    backgroundColor: '#111',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  playRing: {
    width: 64,
    height: 64,
    borderRadius: radii.pill,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  videoMeta: {
    position: 'absolute',
    bottom: spacing.md,
    right: spacing.md,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: radii.pill,
    backgroundColor: 'rgba(255,255,255,0.18)',
  },
  videoTime: {
    fontFamily: fonts.publicSemiBold,
    fontSize: scaleFont(11.5),
    color: colors.white,
  },
  progressWrap: { paddingHorizontal: 2 },
  transcript: {
    fontFamily: fonts.publicRegular,
    fontSize: scaleFont(13.5),
    color: colors.textSoft,
    lineHeight: 20,
  },
  actions: { flexDirection: 'row', gap: spacing.sm },
  flex: { flex: 1 },
  ctaRow: { flexDirection: 'row', gap: spacing.sm },
});
