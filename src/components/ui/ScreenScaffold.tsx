import type { FC, ReactNode } from 'react';
import { StyleSheet, View, type ViewStyle } from 'react-native';
import { colors } from '../../theme';

export type ScreenScaffoldProps = {
  children: ReactNode;
  style?: ViewStyle;
  bg?: 'page' | 'white';
};

/**
 * Page root — flex:1 + page background.
 * Use as the outermost wrapper of every screen for consistent backgrounds.
 */
export const ScreenScaffold: FC<ScreenScaffoldProps> = ({
  children,
  style,
  bg = 'page',
}) => (
  <View
    style={[
      styles.root,
      bg === 'page' ? styles.bgPage : styles.bgWhite,
      style,
    ]}
  >
    {children}
  </View>
);

const styles = StyleSheet.create({
  root: { flex: 1 },
  bgPage: { backgroundColor: colors.pageBg },
  bgWhite: { backgroundColor: colors.white },
});
