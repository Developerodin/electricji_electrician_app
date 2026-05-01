import { Ionicons } from '@expo/vector-icons';
import type { ComponentProps, FC } from 'react';
import { useMemo, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { HomeStackParamList } from '../navigation/types';
import {
  AppCard,
  EmptyState,
  ScreenHeader,
  ScreenScaffold,
} from '../components/ui';
import { MOCK_NOTIFICATIONS } from '../mocks';
import { colors, fonts, radii, scaleFont, spacing } from '../theme';

type IonName = ComponentProps<typeof Ionicons>['name'];

type Cat = 'All' | 'Jobs' | 'Payouts' | 'Training' | 'Admin';
type Props = NativeStackScreenProps<HomeStackParamList, 'NotificationsCenter'>;

const CAT_ICONS: Record<Cat, IonName> = {
  All: 'mail-outline',
  Jobs: 'briefcase-outline',
  Payouts: 'cash-outline',
  Training: 'school-outline',
  Admin: 'shield-outline',
};

/**
 * Spec #70 — Notifications center with chip filters and grouped cards.
 */
export const NotificationsCenterScreen: FC<Props> = ({ navigation }) => {
  const [cat, setCat] = useState<Cat>('All');
  const rows = useMemo(
    () => MOCK_NOTIFICATIONS.filter((n) => cat === 'All' || n.category === cat),
    [cat],
  );

  return (
    <ScreenScaffold>
      <ScreenHeader title="Notifications" onBack={() => navigation.goBack()} />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.tabs}
        contentContainerStyle={styles.tabsContent}
      >
        {(['All', 'Jobs', 'Payouts', 'Training', 'Admin'] as Cat[]).map((c) => {
          const active = cat === c;
          return (
            <Pressable
              key={c}
              accessibilityRole="button"
              accessibilityState={{ selected: active }}
              onPress={() => setCat(c)}
              style={({ pressed }) => [
                styles.tab,
                active && styles.tabOn,
                pressed && styles.pressed,
              ]}
            >
              <Ionicons
                name={CAT_ICONS[c]}
                size={14}
                color={active ? colors.white : colors.primary}
              />
              <Text style={[styles.tabTxt, active && styles.tabTxtOn]}>{c}</Text>
            </Pressable>
          );
        })}
      </ScrollView>

      <ScrollView
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      >
        {rows.length === 0 ? (
          <EmptyState
            icon="notifications-outline"
            title="You’re all caught up"
            subtitle="New activity will show here."
          />
        ) : (
          rows.map((n) => (
            <AppCard key={n.id} style={n.unread ? styles.unreadCard : undefined}>
              <View style={styles.row}>
                <View
                  style={[
                    styles.iconWrap,
                    n.unread && styles.iconWrapUnread,
                  ]}
                >
                  <Ionicons
                    name={CAT_ICONS[n.category as Cat] ?? 'notifications-outline'}
                    size={18}
                    color={n.unread ? colors.white : colors.primary}
                  />
                </View>
                <View style={styles.col}>
                  <View style={styles.titleRow}>
                    <Text style={styles.title} numberOfLines={1}>
                      {n.title}
                    </Text>
                    {n.unread ? <View style={styles.unreadDot} /> : null}
                  </View>
                  <Text style={styles.snippet} numberOfLines={2}>
                    {n.snippet}
                  </Text>
                  <Text style={styles.time}>{n.time}</Text>
                </View>
              </View>
            </AppCard>
          ))
        )}
      </ScrollView>
    </ScreenScaffold>
  );
};

const styles = StyleSheet.create({
  tabs: {
    maxHeight: 56,
  },
  tabsContent: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    gap: spacing.sm,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm - 2,
    borderRadius: radii.pill,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
  },
  tabOn: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  tabTxt: {
    fontFamily: fonts.publicSemiBold,
    fontSize: scaleFont(12.5),
    color: colors.textSoft,
  },
  tabTxtOn: { color: colors.white },
  pressed: { opacity: 0.92 },
  list: {
    padding: spacing.lg,
    gap: spacing.sm,
    paddingBottom: spacing.xxxl,
  },
  unreadCard: {
    borderColor: colors.primaryRing,
  },
  row: { flexDirection: 'row', gap: spacing.md },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: radii.md,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapUnread: {
    backgroundColor: colors.primary,
  },
  col: { flex: 1, gap: 2 },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  title: {
    flex: 1,
    fontFamily: fonts.publicSemiBold,
    fontSize: scaleFont(14),
    color: colors.text,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
  },
  snippet: {
    fontFamily: fonts.publicRegular,
    fontSize: scaleFont(12.5),
    color: colors.muted,
  },
  time: {
    fontFamily: fonts.publicMedium,
    fontSize: scaleFont(11.5),
    color: colors.mutedSoft,
    marginTop: 2,
  },
});
