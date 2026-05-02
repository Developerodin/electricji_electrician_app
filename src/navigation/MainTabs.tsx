import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type { ComponentProps, FC } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { MainTabParamList } from './types';
import { HomeStack } from './HomeStack';
import { JobsStack } from './JobsStack';
import { WholesaleStack } from './WholesaleStack';
import { LearnStack } from './LearnStack';
import { ProfileStack } from './ProfileStack';
import { DESIGN_W, colors, fonts, shadows } from '../theme';

const Tab = createBottomTabNavigator<MainTabParamList>();

type IonName = ComponentProps<typeof Ionicons>['name'];

const ICONS: Record<
  keyof MainTabParamList,
  { active: IonName; inactive: IonName }
> = {
  HomeTab: { active: 'home', inactive: 'home-outline' },
  JobsTab: { active: 'grid', inactive: 'grid-outline' },
  WholesaleTab: { active: 'cube', inactive: 'cube-outline' },
  LearnTab: { active: 'school', inactive: 'school-outline' },
  ProfileTab: { active: 'person', inactive: 'person-outline' },
};

/**
 * Five primary tabs — visual parity with delivery `MainTabBar` (+ two extra tabs): same RED/MUTED,
 * border, upward shadow, Public Sans labels (medium inactive / semi-bold focused), Ionicons sizing.
 */
export const MainTabs: FC = () => {
  const { bottom } = useSafeAreaInsets();
  const padBottomBase = Platform.OS === 'ios' ? 24 : 14;
  const padBottom =
    padBottomBase + (Platform.OS === 'android' ? bottom : 0);
  /** Content row: paddingTop 9 + icon 24 + gap 4 + label 18 + icon row paddingVertical 8 (delivery MainTabBar). */
  const barContentApprox = 9 + 24 + 4 + 18 + 8;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.muted,
        tabBarItemStyle: styles.item,
        tabBarLabel: ({ color, focused, children }) => (
          <Text
            style={[
              styles.label,
              focused ? styles.labelActive : styles.labelInactive,
              { color },
            ]}
            numberOfLines={1}
          >
            {children}
          </Text>
        ),
        tabBarStyle: [
          styles.bar,
          shadows.tabBar,
          {
            paddingBottom: padBottom,
            paddingHorizontal: 16,
            height: barContentApprox + padBottom,
          },
        ],
        tabBarIcon: ({ color, focused, size }) => {
          const set = ICONS[route.name as keyof MainTabParamList];
          const iconSize =
            route.name === 'ProfileTab'
              ? 26
              : Math.min(size ?? 24, 24);
          return (
            <View style={styles.iconSlot}>
              <Ionicons
                name={focused ? set.active : set.inactive}
                size={iconSize}
                color={color}
              />
            </View>
          );
        },
      })}
    >
      <Tab.Screen name="HomeTab" component={HomeStack} options={{ title: 'Home' }} />
      <Tab.Screen name="JobsTab" component={JobsStack} options={{ title: 'Jobs' }} />
      <Tab.Screen
        name="WholesaleTab"
        component={WholesaleStack}
        options={{ title: 'Wholesale' }}
      />
      <Tab.Screen name="LearnTab" component={LearnStack} options={{ title: 'Learn' }} />
      <Tab.Screen name="ProfileTab" component={ProfileStack} options={{ title: 'Profile' }} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  bar: {
    backgroundColor: colors.white,
    borderTopColor: '#f0f0f5',
    borderTopWidth: 1,
    paddingTop: 9,
    maxWidth: DESIGN_W,
    width: '100%',
    alignSelf: 'center',
  },
  item: {
    paddingTop: 0,
    paddingVertical: 4,
  },
  iconSlot: {
    marginBottom: 0,
    alignItems: 'center',
  },
  label: {
    fontSize: 12,
    lineHeight: 18,
    marginTop: 4,
    textAlign: 'center',
  },
  labelInactive: {
    fontFamily: fonts.publicMedium,
  },
  labelActive: {
    fontFamily: fonts.publicSemiBold,
  },
});
