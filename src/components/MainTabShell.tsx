import type { FC, ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  MainTabBar,
  useMainTabContentBottomPadding,
  type MainTabRoute,
} from './MainTabBar';

/**
 * Wrapper for authenticated main tabs (Home, Tasks, Earnings, Account).
 * Renders screen content above the shared bottom tab bar — do not add another tab bar inside `children`.
 */
export const MainTabShell: FC<{
  activeTab: MainTabRoute;
  onTabPress: (tab: MainTabRoute) => void;
  children: ReactNode;
}> = ({ activeTab, onTabPress, children }) => {
  const contentBottom = useMainTabContentBottomPadding();

  return (
    <View style={styles.root}>
      <View style={[styles.body, { paddingBottom: contentBottom }]}>
        {children}
      </View>
      <MainTabBar activeTab={activeTab} onTabPress={onTabPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#f6f6f8',
  },
  body: {
    flex: 1,
  },
});
