import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { FC } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { ProfileStackParamList } from '../navigation/types';
import {
  AppCard,
  ScreenScaffold,
  SectionTitle,
  StatTile,
  Tag,
} from '../components/ui';
import { MOCK_REVIEWS, TECHNICIAN_PROFILE } from '../mocks';
import { colors, fonts, radii, scaleFont, shadows, spacing } from '../theme';

type Props = NativeStackScreenProps<ProfileStackParamList, 'PublicProfilePreview'>;

/**
 * Spec #69 — Public profile preview (customer-facing).
 */
export const PublicProfilePreviewScreen: FC<Props> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  return (
    <ScreenScaffold>
      <View
        style={[
          styles.hero,
          shadows.md,
          { paddingTop: insets.top + spacing.lg },
        ]}
      >
        <View style={styles.heroBackBtn}>
          <Ionicons
            name="chevron-back"
            size={22}
            color={colors.white}
            onPress={() => navigation.goBack()}
          />
        </View>
        <Image
          accessibilityIgnoresInvertColors
          source={require('../../assets/account/profile-avatar.png')}
          style={styles.avatar}
        />
        <Text style={styles.name}>{TECHNICIAN_PROFILE.name}</Text>
        <View style={styles.tagRow}>
          <Tag label={`★ ${TECHNICIAN_PROFILE.rating}`} tone="warning" />
          <Tag label="320 jobs" tone="primary" />
          <Tag label="Verified" tone="success" />
        </View>
        <Text style={styles.heroSub}>Electrician · Mumbai</Text>
      </View>

      <ScrollView
        style={styles.body}
        contentContainerStyle={styles.bodyContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.statRow}>
          <StatTile
            label="On-time"
            value="98%"
            tone="success"
            icon="time-outline"
          />
          <StatTile
            label="Response"
            value="<5m"
            tone="info"
            icon="flash-outline"
          />
          <StatTile
            label="Repeat"
            value="42%"
            tone="warning"
            icon="repeat-outline"
          />
        </View>

        <SectionTitle title="Skills" />
        <View style={styles.skillRow}>
          {['Wiring', 'Switchboard', 'Inverter', 'Fan repair', 'Geyser'].map((s) => (
            <Tag key={s} label={s} tone="primary" />
          ))}
        </View>

        <SectionTitle title="What customers say" caption={`${MOCK_REVIEWS.length} reviews`} />
        {MOCK_REVIEWS.slice(0, 3).map((r) => (
          <AppCard key={r.id}>
            <View style={styles.reviewHeader}>
              <View style={styles.reviewerBadge}>
                <Text style={styles.reviewerInitial}>
                  {r.customer.charAt(0).toUpperCase()}
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.reviewer}>{r.customer}</Text>
                <Text style={styles.reviewMeta}>★ {r.rating}</Text>
              </View>
            </View>
            <Text style={styles.reviewBody}>
              {r.comment || 'Great experience, would book again!'}
            </Text>
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
    paddingBottom: spacing.lg + 4,
    borderBottomLeftRadius: radii.hero,
    borderBottomRightRadius: radii.hero,
    alignItems: 'center',
    gap: spacing.sm,
  },
  heroBackBtn: {
    position: 'absolute',
    top: spacing.lg + 30,
    left: spacing.lg,
    width: 40,
    height: 40,
    borderRadius: radii.md,
    backgroundColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 92,
    height: 92,
    borderRadius: radii.pill,
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.4)',
    backgroundColor: colors.white,
  },
  name: {
    fontFamily: fonts.publicBold,
    fontSize: scaleFont(22),
    color: colors.white,
  },
  heroSub: {
    fontFamily: fonts.publicMedium,
    fontSize: scaleFont(13),
    color: 'rgba(255,255,255,0.85)',
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    justifyContent: 'center',
  },
  body: { flex: 1 },
  bodyContent: {
    padding: spacing.lg,
    gap: spacing.md,
    paddingBottom: spacing.xxxl,
  },
  statRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  skillRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  reviewerBadge: {
    width: 36,
    height: 36,
    borderRadius: radii.pill,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  reviewerInitial: {
    fontFamily: fonts.publicBold,
    fontSize: scaleFont(14),
    color: colors.primary,
  },
  reviewer: {
    fontFamily: fonts.publicSemiBold,
    fontSize: scaleFont(14),
    color: colors.text,
  },
  reviewMeta: {
    fontFamily: fonts.publicMedium,
    fontSize: scaleFont(12.5),
    color: colors.warning,
  },
  reviewBody: {
    fontFamily: fonts.publicRegular,
    fontSize: scaleFont(13),
    color: colors.textSoft,
    lineHeight: 19,
  },
});
