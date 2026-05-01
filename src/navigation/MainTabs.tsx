import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type { ComponentProps, FC } from 'react';
import { Platform, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { MainTabParamList } from './types';
import { HomeStack } from './HomeStack';
import { JobsStack } from './JobsStack';
import { WholesaleStack } from './WholesaleStack';
import { LearnStack } from './LearnStack';
import { ProfileStack } from './ProfileStack';
import { colors, fonts, shadows } from '../theme';

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
 * Five primary tabs — matches delivery-app MainTabBar (white card, soft top shadow,
 * red active label/icon in Public Sans).
 */
export const MainTabs: FC = () => {
  const { bottom } = useSafeAreaInsets();
  const padBottom = (Platform.OS === 'ios' ? 18 : 10) + bottom;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.muted,
        tabBarLabelStyle: styles.label,
        tabBarItemStyle: styles.item,
        tabBarStyle: [
          styles.bar,
          shadows.md,
          { paddingBottom: padBottom, height: 60 + padBottom },
        ],
        tabBarIcon: ({ color, focused, size }) => {
          const set = ICONS[route.name as keyof MainTabParamList];
          return (
            <Ionicons
              name={focused ? set.active : set.inactive}
              size={size ?? 23}
              color={color}
            />
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
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingTop: 8,
  },
  item: {
    paddingTop: 4,
  },
  label: {
    fontFamily: fonts.publicSemiBold,
    fontSize: 11,
    marginTop: 2,
  },
});
