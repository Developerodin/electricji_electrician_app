import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { FC } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
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
import { MOCK_COURSES } from '../mocks';
import { colors, fonts, radii, scaleFont, spacing } from '../theme';

type Props = NativeStackScreenProps<LearnStackParamList, 'CourseDetail'>;

const SYLLABUS = [
  'Safe isolation & testing',
  'Reading wiring diagrams',
  'Smart switch pairing',
  'Common fault diagnosis',
  'Final quiz & certification',
];

const PERKS: Array<{ icon: keyof typeof Ionicons.glyphMap; label: string }> = [
  { icon: 'time-outline', label: 'Self-paced' },
  { icon: 'cloud-download-outline', label: 'PDF notes' },
  { icon: 'ribbon-outline', label: 'Certificate' },
];

/**
 * Spec #51 — Course detail with hero, syllabus and enroll CTA.
 */
export const CourseDetailScreen: FC<Props> = ({ navigation, route }) => {
  const c =
    MOCK_COURSES.find((x) => x.id === route.params.courseId) ?? MOCK_COURSES[0];
  const cta = c.enrolled ? 'Continue learning' : 'Enroll now';

  return (
    <ScreenScaffold>
      <ScreenHeader title={c.title} onBack={() => navigation.goBack()} />
      <ScrollView
        contentContainerStyle={styles.body}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.hero}>
          <Ionicons name="play-circle" size={48} color={colors.white} />
          <Text style={styles.heroTitle}>{c.title}</Text>
          <View style={styles.heroMeta}>
            <View style={styles.heroChip}>
              <Ionicons
                name="trending-up"
                size={12}
                color={colors.white}
              />
              <Text style={styles.heroChipTxt}>{c.level}</Text>
            </View>
            <View style={styles.heroChip}>
              <Ionicons
                name="time-outline"
                size={12}
                color={colors.white}
              />
              <Text style={styles.heroChipTxt}>{c.duration}</Text>
            </View>
          </View>
          {c.enrolled ? (
            <Tag label={`${c.progress ?? 0}% complete`} tone="primary" size="sm" />
          ) : null}
        </View>

        <View style={styles.perkRow}>
          {PERKS.map((p) => (
            <View key={p.label} style={styles.perk}>
              <Ionicons name={p.icon} size={18} color={colors.primary} />
              <Text style={styles.perkLbl}>{p.label}</Text>
            </View>
          ))}
        </View>

        <SectionTitle title="About this course" />
        <AppCard>
          <Text style={styles.about}>
            Hands-on modules walking you through real scenarios. Includes
            downloadable notes and a final assessment to earn your badge.
          </Text>
        </AppCard>

        <SectionTitle title="Syllabus" caption={`${SYLLABUS.length} modules`} />
        <AppCard padded={false}>
          {SYLLABUS.map((s, idx) => (
            <View
              key={s}
              style={[
                styles.syllabusRow,
                idx !== SYLLABUS.length - 1 && styles.syllabusDivider,
              ]}
            >
              <View style={styles.syllabusNum}>
                <Text style={styles.syllabusNumTxt}>{idx + 1}</Text>
              </View>
              <Text style={styles.syllabusTxt}>{s}</Text>
              <Ionicons
                name={c.enrolled && idx === 0 ? 'play' : 'lock-closed'}
                size={16}
                color={colors.muted}
              />
            </View>
          ))}
        </AppCard>
      </ScrollView>

      <BottomCtaBar floating>
        <AppButton
          label={cta}
          onPress={() =>
            navigation.navigate('LessonPlayer', {
              courseId: c.id,
              lessonIndex: 0,
            })
          }
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
  hero: {
    height: 200,
    borderRadius: radii.lg,
    backgroundColor: colors.primary,
    padding: spacing.lg,
    justifyContent: 'flex-end',
    gap: spacing.xs,
  },
  heroTitle: {
    fontFamily: fonts.publicBold,
    fontSize: scaleFont(20),
    color: colors.white,
  },
  heroMeta: { flexDirection: 'row', gap: spacing.xs, flexWrap: 'wrap' },
  heroChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(255,255,255,0.18)',
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    borderRadius: radii.pill,
  },
  heroChipTxt: {
    fontFamily: fonts.publicSemiBold,
    fontSize: scaleFont(11),
    color: colors.white,
  },
  perkRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  perk: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: radii.md,
    paddingVertical: spacing.md,
    alignItems: 'center',
    gap: 4,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  perkLbl: {
    fontFamily: fonts.publicSemiBold,
    fontSize: scaleFont(12),
    color: colors.text,
  },
  about: {
    fontFamily: fonts.publicRegular,
    fontSize: scaleFont(13.5),
    color: colors.textSoft,
    lineHeight: 20,
  },
  syllabusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  syllabusDivider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.borderLight,
  },
  syllabusNum: {
    width: 28,
    height: 28,
    borderRadius: radii.pill,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  syllabusNumTxt: {
    fontFamily: fonts.publicBold,
    fontSize: scaleFont(12),
    color: colors.primary,
  },
  syllabusTxt: {
    flex: 1,
    fontFamily: fonts.publicSemiBold,
    fontSize: scaleFont(13.5),
    color: colors.text,
  },
});
