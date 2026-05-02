import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import type { ComponentProps, FC } from 'react';
import { useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { NotificationItem } from '../mocks/types';
import type { HomeStackParamList } from '../navigation/types';
import { EmptyState, ScreenHeader, ScreenScaffold } from '../components/ui';
import { MOCK_NOTIFICATIONS } from '../mocks';
import { colors, DESIGN_W, fonts, scaleFont } from '../theme';

type IonName = ComponentProps<typeof MaterialCommunityIcons>['name'];

type Props = NativeStackScreenProps<HomeStackParamList, 'NotificationsCenter'>;

function iconFor(
  cat: NotificationItem['category'],
): { name: IonName; color: string; bg: string } {
  if (cat === 'Jobs')
    return { name: 'hammer-wrench', color: colors.primary, bg: '#fee2e2' };
  if (cat === 'Payouts')
    return { name: 'cash-multiple', color: colors.success, bg: colors.successSoft };
  if (cat === 'Training')
    return {
      name: 'school-outline',
      color: colors.info,
      bg: colors.infoSoft,
    };
  return {
    name: 'shield-alert-outline',
    color: colors.info,
    bg: colors.infoSoft,
  };
}

/** Notifications — list + chrome aligned with delivery `NotificationsScreen`. */
export const NotificationsCenterScreen: FC<Props> = ({ navigation }) => {
  const [items, setItems] = useState(MOCK_NOTIFICATIONS);

  const markAllRead = () =>
    setItems((rows) => rows.map((n) => ({ ...n, unread: false })));

  const unread = items.filter((i) => i.unread).length;

  const onRowPress = (it: NotificationItem) => {
    setItems((rows) =>
      rows.map((n) => (n.id === it.id ? { ...n, unread: false } : n)),
    );
    if (
      it.category === 'Jobs' &&
      (it.title.toLowerCase().includes('lead') ||
        it.title.toLowerCase().includes('job'))
    ) {
      navigation.getParent()?.navigate('JobsTab', {
        screen: 'JobLeadInbox',
      });
    }
  };

  return (
    <ScreenScaffold>
      <ScreenHeader title="Notifications" onBack={() => navigation.goBack()} />

      <View style={styles.topBar}>
        <Text style={styles.count}>{unread} unread</Text>
        <Pressable onPress={markAllRead} hitSlop={8}>
          <Text style={styles.mark}>Mark all read</Text>
        </Pressable>
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {items.length === 0 ? (
          <EmptyState
            icon="notifications-outline"
            title="You're all caught up"
            subtitle="New activity will show here."
          />
        ) : (
          items.map((it) => {
            const ic = iconFor(it.category);
            return (
              <Pressable
                key={it.id}
                accessibilityRole="button"
                onPress={() => onRowPress(it)}
                style={({ pressed }) => [
                  styles.row,
                  it.unread && styles.rowUnread,
                  pressed && styles.pressed,
                ]}
              >
                <View style={[styles.icon, { backgroundColor: ic.bg }]}>
                  <MaterialCommunityIcons name={ic.name} size={22} color={ic.color} />
                </View>
                <View style={styles.body}>
                  <View style={styles.titleRow}>
                    <Text style={styles.title} numberOfLines={1}>
                      {it.title}
                    </Text>
                    {it.unread ? <View style={styles.unreadDot} /> : null}
                  </View>
                  <Text style={styles.snippet} numberOfLines={2}>
                    {it.snippet}
                  </Text>
                  <Text style={styles.when}>{it.time}</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#c8ccd4" />
              </Pressable>
            );
          })
        )}
      </ScrollView>
    </ScreenScaffold>
  );
};

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: colors.white,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.borderLight,
  },
  count: {
    fontFamily: fonts.publicSemiBold,
    fontSize: 13,
    color: colors.muted,
  },
  mark: {
    fontFamily: fonts.publicBold,
    fontSize: 13,
    color: colors.primary,
  },
  scroll: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 40,
    gap: 10,
    width: '100%',
    maxWidth: DESIGN_W,
    alignSelf: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#eceef2',
  },
  rowUnread: {
    borderColor: 'rgba(217,35,45,0.35)',
  },
  icon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    flex: 1,
    gap: 2,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    flex: 1,
    fontFamily: fonts.publicBold,
    fontSize: 14,
    color: colors.text,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
  },
  snippet: {
    fontFamily: fonts.publicMedium,
    fontSize: 13,
    color: colors.muted,
    lineHeight: 18,
  },
  when: {
    marginTop: 4,
    fontFamily: fonts.publicMedium,
    fontSize: 11,
    color: '#9aa3ad',
    letterSpacing: 0.3,
  },
  pressed: {
    opacity: 0.9,
  },
});
