import type { FC, ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import {
  DV_RED,
  kycDvScale as SCALE,
  kycDeliveryPlatform as Platform,
} from '../../theme/kycDelivery';

export type SectionTitleProps = {
  title: string;
  caption?: string;
  trailingLabel?: string;
  onTrailingPress?: () => void;
  children?: ReactNode;
};

/** Section headings — typography matches delivery `VehicleDetailsScreen` headings. */
export const SectionTitle: FC<SectionTitleProps> = ({
  title,
  caption,
  trailingLabel,
  onTrailingPress,
  children,
}) => (
  <View style={styles.wrap}>
    <View style={styles.row}>
      <View style={styles.textCol}>
        <Text style={styles.title}>{title}</Text>
        {caption ? <Text style={styles.caption}>{caption}</Text> : null}
      </View>
      {trailingLabel && onTrailingPress ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={trailingLabel}
          onPress={onTrailingPress}
          hitSlop={8}
        >
          <Text style={styles.trailing}>{trailingLabel}</Text>
        </Pressable>
      ) : (
        children
      )}
    </View>
  </View>
);

const styles = StyleSheet.create({
  wrap: {
    paddingTop: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textCol: {
    flex: 1,
    gap: 4,
  },
  title: {
    fontFamily: 'PublicSans_700Bold',
    fontSize: 18 * SCALE,
    color: '#202020',
    ...(Platform.OS === 'android' && { includeFontPadding: false }),
  },
  caption: {
    fontFamily: 'PublicSans_500Medium',
    fontSize: 14 * SCALE,
    color: '#77878f',
    ...(Platform.OS === 'android' && { includeFontPadding: false }),
  },
  trailing: {
    fontFamily: 'PublicSans_600SemiBold',
    fontSize: 14 * SCALE,
    color: DV_RED,
    ...(Platform.OS === 'android' && { includeFontPadding: false }),
  },
});
