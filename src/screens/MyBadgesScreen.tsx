import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { FC } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import type { LearnStackParamList } from '../navigation/types';
import {
  ScreenHeader,
  ScreenScaffold,
  SectionTitle,
  Tag,
} from '../components/ui';
import { MOCK_COURSES } from '../mocks';
import { colors, fonts, radii, scaleFont, shadows, spacing } from '../theme';

type Props = NativeStackScreenProps<LearnStackParamList, 'MyBadges'>;

const LOCKED = [
  { title: 'Master electrician', requirement: 'Pass advanced course' },
  { title: 'Top rated 4.9+', requirement: 'Hold rating ≥ 4.9 for 30 days' },
];

/**
 * Spec #54 — My badges grid (earned + locked).
 */
export const MyBadgesScreen: FC<Props> = ({ navigation }) => {
  const earned = MOCK_COURSES.filter((c) => c.badge);

  return (
    <ScreenScaffold>
      <ScreenHeader title="Badges" onBack={() => navigation.goBack()} />
      <ScrollView
        contentContainerStyle={styles.body}
        showsVerticalScrollIndicator={false}
      >
        <SectionTitle
          title="Earned"
          caption={`${earned.length} of ${earned.length + LOCKED.length}`}
        />
        <View style={styles.grid}>
          {earned.map((c) => (
            <View key={c.id} style={[styles.tile, shadows.sm]}>
              <View style={styles.medal}>
                <Ionicons name="ribbon" size={22} color={colors.primary} />
              </View>
              <Text style={styles.title}>{c.badge}</Text>
              <Tag label="Earned" tone="success" />
            </View>
          ))}
        </View>

        <SectionTitle title="Locked" caption="Earn these next" />
        <View style={styles.grid}>
          {LOCKED.map((b) => (
            <View
              key={b.title}
              style={[styles.tile, styles.tileLocked]}
            >
              <View style={[styles.medal, styles.medalLocked]}>
                <Ionicons name="lock-closed" size={20} color={colors.muted} />
              </View>
              <Text style={[styles.title, styles.titleLocked]}>{b.title}</Text>
              <Text style={styles.req}>{b.requirement}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </ScreenScaffold>
  );
};

const styles = StyleSheet.create({
  body: {
    padding: spacing.lg,
    gap: spacing.md,
    paddingBottom: spacing.xxxl,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  tile: {
    width: '47.5%',
    aspectRatio: 1,
    borderRadius: radii.lg,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.md,
    gap: spacing.xs,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  tileLocked: {
    backgroundColor: colors.surfaceAlt,
  },
  medal: {
    width: 48,
    height: 48,
    borderRadius: radii.pill,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xs,
  },
  medalLocked: {
    backgroundColor: colors.borderLight,
  },
  title: {
    fontFamily: fonts.publicSemiBold,
    fontSize: scaleFont(13),
    color: colors.text,
    textAlign: 'center',
  },
  titleLocked: {
    color: colors.muted,
  },
  req: {
    fontFamily: fonts.publicRegular,
    fontSize: scaleFont(11),
    color: colors.muted,
    textAlign: 'center',
  },
});
