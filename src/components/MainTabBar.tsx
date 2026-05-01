import { Ionicons } from '@expo/vector-icons';
import type { ComponentProps, FC } from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type IonName = ComponentProps<typeof Ionicons>['name'];

const DESIGN_W = 412;
const RED = '#d9232d';
const MUTED = '#77878f';

/** Routes that correspond to bottom tabs (wired in App.tsx — do not duplicate this bar inside screens). */
export type MainTabRoute = 'home' | 'tasks' | 'earnings' | 'account';

/** Bottom padding so scroll content clears the absolutely positioned tab bar (excludes system nav — use hook below on Android). */
export const MAIN_TAB_CONTENT_BOTTOM_PADDING =
  (Platform.OS === 'ios' ? 24 : 14) + 9 + 32 + 4 + 18 + 8;

/** Tab bar height + Android bottom inset so content and `ScrollView` padding clear the bar above 3-button / gesture nav. */
export function useMainTabContentBottomPadding(): number {
  const { bottom } = useSafeAreaInsets();
  return (
    MAIN_TAB_CONTENT_BOTTOM_PADDING +
    (Platform.OS === 'android' ? bottom : 0)
  );
}

type TabDef = {
  id: MainTabRoute;
  label: string;
  iconActive: IonName;
  iconInactive: IonName;
  iconSize?: number;
};

const TABS: TabDef[] = [
  {
    id: 'home',
    label: 'Home',
    iconActive: 'home',
    iconInactive: 'home-outline',
  },
  {
    id: 'tasks',
    label: 'Tasks',
    iconActive: 'grid',
    iconInactive: 'grid-outline',
  },
  {
    id: 'earnings',
    label: 'Earnings',
    iconActive: 'cube',
    iconInactive: 'cube-outline',
  },
  {
    id: 'account',
    label: 'Account',
    iconActive: 'person',
    iconInactive: 'person-outline',
    iconSize: 26,
  },
];

/** Figma Home nav (#4089:2253) — Ionicons; single place for driver main tabs. */
export const MainTabBar: FC<{
  activeTab: MainTabRoute;
  onTabPress: (tab: MainTabRoute) => void;
}> = ({ activeTab, onTabPress }) => {
  const { bottom } = useSafeAreaInsets();
  const tabBarPadBottom =
    (Platform.OS === 'ios' ? 24 : 14) +
    (Platform.OS === 'android' ? bottom : 0);

  return (
    <View
      style={[styles.tabBar, { paddingBottom: tabBarPadBottom }]}
      pointerEvents="box-none"
    >
      {TABS.map((t) => {
        const active = activeTab === t.id;
        const size = t.iconSize ?? 24;
        const name = active ? t.iconActive : t.iconInactive;
        return (
          <Pressable
            key={t.id}
            style={styles.tabItem}
            onPress={() => onTabPress(t.id)}
            accessibilityRole="button"
            accessibilityState={{ selected: active }}
            accessibilityLabel={t.label}
          >
            <Ionicons name={name} size={size} color={active ? RED : MUTED} />
            <Text style={[styles.tabLabel, active && styles.tabLabelActive]}>
              {t.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f5',
    paddingTop: 9,
    paddingHorizontal: 16,
    gap: 8,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    maxWidth: DESIGN_W,
    alignSelf: 'center',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 12,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
    paddingVertical: 4,
  },
  tabLabel: {
    fontFamily: 'PublicSans_500Medium',
    fontSize: 12,
    color: MUTED,
    lineHeight: 18,
  },
  tabLabelActive: {
    color: RED,
    fontFamily: 'PublicSans_600SemiBold',
  },
});
