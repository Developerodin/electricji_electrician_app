import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { FC } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { LearnStackParamList } from '../navigation/types';
import {
  AppCard,
  ProgressBar,
  ScreenScaffold,
  SectionTitle,
  Tag,
} from '../components/ui';
import { MOCK_COURSES } from '../mocks';
import { colors, fonts, radii, scaleFont, shadows, spacing } from '../theme';

type Props = NativeStackScreenProps<LearnStackParamList, 'CourseCatalog'>;

/**
 * Spec #50 — Course catalog with hero header and progress cards.
 */
export const CourseCatalogScreen: FC<Props> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const inProgress = MOCK_COURSES.filter((c) => c.progress);

  return (
    <ScreenScaffold>
      <View
        style={[
          styles.hero,
          shadows.md,
          { paddingTop: insets.top + spacing.md },
        ]}
      >
        <Text style={styles.heroTitle}>Learn & grow</Text>
        <Text style={styles.heroSub}>
          Free trade courses · earn badges
        </Text>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="My badges"
          onPress={() => navigation.navigate('MyBadges')}
          style={({ pressed }) => [
            styles.badgesBtn,
            pressed && styles.pressed,
          ]}
        >
          <Ionicons name="ribbon" size={16} color={colors.white} />
          <Text style={styles.badgesText}>My badges</Text>
          <Ionicons name="arrow-forward" size={16} color={colors.white} />
        </Pressable>
      </View>

      <ScrollView
        style={styles.body}
        contentContainerStyle={styles.bodyContent}
        showsVerticalScrollIndicator={false}
      >
        {inProgress.length > 0 ? (
          <>
            <SectionTitle title="Continue learning" />
            {inProgress.map((c) => (
              <AppCard
                key={c.id}
                onPress={() =>
                  navigation.navigate('CourseDetail', { courseId: c.id })
                }
              >
                <View style={styles.row}>
                  <View style={styles.iconWrap}>
                    <Ionicons name="play" size={18} color={colors.primary} />
                  </View>
                  <View style={styles.col}>
                    <Text style={styles.title}>{c.title}</Text>
                    <Text style={styles.meta}>
                      {c.level} · {c.duration}
                    </Text>
                  </View>
                  <Tag label={`${c.progress}%`} tone="primary" />
                </View>
                <View style={styles.progressWrap}>
                  <ProgressBar
                    step={c.progress ?? 0}
                    totalSteps={100}
                  />
                </View>
              </AppCard>
            ))}
          </>
        ) : null}

        <SectionTitle
          title="All courses"
          caption={`${MOCK_COURSES.length} available`}
        />
        {MOCK_COURSES.map((c) => (
          <AppCard
            key={`all-${c.id}`}
            onPress={() =>
              navigation.navigate('CourseDetail', { courseId: c.id })
            }
          >
            <View style={styles.row}>
              <View style={styles.iconWrap}>
                <Ionicons name="school" size={18} color={colors.primary} />
              </View>
              <View style={styles.col}>
                <Text style={styles.title}>{c.title}</Text>
                <Text style={styles.meta}>
                  {c.level} · {c.duration}
                </Text>
              </View>
              {c.badge ? <Tag label="Badge" tone="warning" /> : null}
            </View>
          </AppCard>
        ))}
      </ScrollView>
    </ScreenScaffold>
  );
};

const styles = StyleSheet.create({
  hero: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
    borderBottomLeftRadius: radii.hero,
    borderBottomRightRadius: radii.hero,
    gap: spacing.xs,
  },
  heroTitle: {
    fontFamily: fonts.publicBold,
    fontSize: scaleFont(22),
    color: colors.white,
  },
  heroSub: {
    fontFamily: fonts.publicMedium,
    fontSize: scaleFont(13),
    color: 'rgba(255,255,255,0.85)',
  },
  badgesBtn: {
    marginTop: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: 'rgba(255,255,255,0.18)',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radii.md,
  },
  pressed: { opacity: 0.85 },
  badgesText: {
    flex: 1,
    fontFamily: fonts.publicSemiBold,
    fontSize: scaleFont(13),
    color: colors.white,
  },
  body: { flex: 1 },
  bodyContent: {
    padding: spacing.lg,
    gap: spacing.md,
    paddingBottom: spacing.xxxl,
  },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: radii.md,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  col: { flex: 1, gap: 2 },
  title: {
    fontFamily: fonts.publicSemiBold,
    fontSize: scaleFont(14.5),
    color: colors.text,
  },
  meta: {
    fontFamily: fonts.publicRegular,
    fontSize: scaleFont(12.5),
    color: colors.muted,
  },
  progressWrap: {
    marginTop: spacing.sm,
  },
});
