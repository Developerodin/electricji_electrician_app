import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { FC } from 'react';
import { useMemo } from 'react';
import {
  Platform,
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
import {
  colors,
  DESIGN_W,
  fonts,
  radii,
  scaleFont,
  shadows,
  spacing,
} from '../theme';

type Props = NativeStackScreenProps<LearnStackParamList, 'CourseCatalog'>;

/** Hero — same conventions as `MarketplaceHomeScreen` / home red band. */
const heroText = Platform.select({
  ios: {},
  android: { includeFontPadding: false },
  default: {},
});

const TILE_BORDER = 'rgba(216,217,221,0.16)';

/**
 * Spec #50 — Course catalog with hero header and progress cards.
 */
export const CourseCatalogScreen: FC<Props> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const topPad = insets.top + spacing.lg;

  const inProgress = useMemo(
    () => MOCK_COURSES.filter((c) => Boolean(c.progress)),
    [],
  );

  const continueSubtitle =
    inProgress.length > 0
      ? `${inProgress.length} course${inProgress.length === 1 ? '' : 's'} to finish`
      : undefined;

  return (
    <ScreenScaffold>
      <View style={styles.heroShell}>
        <View style={[styles.hero, shadows.hero, { paddingTop: topPad }]}>
          <LinearGradient
            colors={['rgba(0,0,0,0.12)', 'transparent']}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={StyleSheet.absoluteFill}
            pointerEvents="none"
          />

          <View style={styles.heroTitles}>
            <Text style={[styles.heroEyebrow, heroText]}>Electric Ji Learn</Text>
            <Text style={[styles.heroTitle, heroText]}>Learn & grow</Text>
            <Text style={[styles.heroSub, heroText]}>
              Free trade courses — badges you can share on visits and tenders.
            </Text>
          </View>

          <Pressable
            accessibilityRole="button"
            accessibilityHint="Opens your badge collection"
            onPress={() => navigation.navigate('MyBadges')}
            style={({ pressed }) => [
              styles.badgesBtn,
              pressed && styles.pressedOpacity,
            ]}
          >
            <View style={styles.badgesLead}>
              <Ionicons name="ribbon-outline" size={18} color={colors.white} />
            </View>
            <Text style={[styles.badgesBtnLabel, heroText]}>My badges</Text>
            <Ionicons name="arrow-forward" size={18} color={colors.white} />
          </Pressable>
        </View>
      </View>

      <ScrollView
        style={styles.body}
        contentContainerStyle={styles.bodyContent}
        showsVerticalScrollIndicator={false}
      >
        {inProgress.length > 0 ? (
          <>
            <SectionTitle
              title="Continue learning"
              caption={continueSubtitle}
            />
            {inProgress.map((c) => (
              <AppCard
                key={c.id}
                tone="tinted"
                style={styles.courseCard}
                onPress={() =>
                  navigation.navigate('CourseDetail', { courseId: c.id })
                }
              >
                <View style={styles.row}>
                  <View style={styles.iconWrap}>
                    <Ionicons name="play" size={20} color={colors.primary} />
                  </View>
                  <View style={styles.col}>
                    <Text style={[styles.cardTitle, heroText]} numberOfLines={2}>
                      {c.title}
                    </Text>
                    <Text style={[styles.meta, heroText]} numberOfLines={1}>
                      {c.level} · {c.duration}
                    </Text>
                  </View>
                  <Tag label={`${c.progress}%`} tone="primary" />
                </View>
                <View style={styles.progressWrap}>
                  <ProgressBar step={c.progress ?? 0} totalSteps={100} />
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
            style={styles.courseCard}
            onPress={() =>
              navigation.navigate('CourseDetail', { courseId: c.id })
            }
          >
            <View style={styles.row}>
              <View style={styles.iconWrap}>
                <Ionicons name="school-outline" size={20} color={colors.primary} />
              </View>
              <View style={styles.col}>
                <Text style={[styles.cardTitle, heroText]} numberOfLines={2}>
                  {c.title}
                </Text>
                <Text style={[styles.meta, heroText]} numberOfLines={1}>
                  {c.level} · {c.duration}
                </Text>
              </View>
              {c.badge ? (
                <Tag label={c.badge} tone="warning" />
              ) : null}
            </View>
          </AppCard>
        ))}
      </ScrollView>
    </ScreenScaffold>
  );
};

const styles = StyleSheet.create({
  heroShell: {
    width: '100%',
    maxWidth: DESIGN_W,
    alignSelf: 'center',
  },
  hero: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
    borderBottomLeftRadius: radii.hero,
    borderBottomRightRadius: radii.hero,
    overflow: 'hidden',
    gap: spacing.lg,
  },
  heroTitles: {
    flex: 1,
    minWidth: 0,
    gap: spacing.xs,
  },
  heroEyebrow: {
    fontFamily: fonts.publicSemiBold,
    fontSize: scaleFont(11),
    color: 'rgba(255,255,255,0.78)',
    textTransform: 'uppercase',
    letterSpacing: 1.05,
    marginBottom: 2,
  },
  heroTitle: {
    fontFamily: fonts.publicBold,
    fontSize: scaleFont(22),
    lineHeight: scaleFont(28),
    color: colors.white,
  },
  heroSub: {
    fontFamily: fonts.publicMedium,
    fontSize: scaleFont(14),
    lineHeight: scaleFont(20),
    color: '#e2e2e2',
    marginTop: spacing.sm,
  },
  badgesBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: 'rgba(255,255,255,0.16)',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg - 2,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.22)',
  },
  badgesLead: {
    width: 38,
    height: 38,
    borderRadius: radii.md,
    backgroundColor: 'rgba(0,0,0,0.14)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgesBtnLabel: {
    flex: 1,
    fontFamily: fonts.publicSemiBold,
    fontSize: scaleFont(14),
    lineHeight: scaleFont(19),
    color: colors.white,
  },
  pressedOpacity: {
    opacity: 0.9,
  },
  body: { flex: 1 },
  bodyContent: {
    padding: spacing.lg,
    gap: 12,
    paddingBottom: spacing.xxxl,
    width: '100%',
    maxWidth: DESIGN_W,
    alignSelf: 'center',
  },
  courseCard: {
    borderWidth: 2,
    borderColor: TILE_BORDER,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: radii.md,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  col: { flex: 1, minWidth: 0, gap: spacing.xs },
  cardTitle: {
    fontFamily: fonts.publicBold,
    fontSize: scaleFont(16),
    lineHeight: scaleFont(21),
    color: colors.text,
  },
  meta: {
    fontFamily: fonts.publicMedium,
    fontSize: scaleFont(12.5),
    lineHeight: scaleFont(17),
    color: colors.muted,
  },
  progressWrap: {
    marginTop: spacing.md,
  },
});
