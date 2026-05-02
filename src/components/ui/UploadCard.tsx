import { Ionicons } from '@expo/vector-icons';
import type { ComponentProps, FC } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../../theme';
import { kycDvScale as SCALE, kycDeliveryPlatform as Platform } from '../../theme/kycDelivery';

type IonName = ComponentProps<typeof Ionicons>['name'];

export type UploadCardProps = {
  title: string;
  subtitle?: string;
  uploaded?: boolean;
  icon?: IonName;
  onPress: () => void;
};

const RED = '#d9232d';

/** KYC upload row — dashed empty state matches delivery KYC verification dropzones. */
export const UploadCard: FC<UploadCardProps> = ({
  title,
  subtitle,
  uploaded = false,
  icon = 'cloud-upload-outline',
  onPress,
}) => (
  <Pressable
    accessibilityRole="button"
    accessibilityLabel={title}
    onPress={onPress}
    style={({ pressed }) => [
      styles.card,
      uploaded ? styles.cardOk : styles.cardEmpty,
      pressed && styles.pressed,
    ]}
  >
    <View
      style={[
        styles.iconWrap,
        uploaded ? styles.iconWrapOk : styles.iconWrapEmpty,
      ]}
    >
      <Ionicons
        name={uploaded ? 'checkmark-done' : icon}
        size={20}
        color={uploaded ? colors.success : RED}
      />
    </View>
    <View style={styles.textCol}>
      <Text style={[styles.title, uploaded && styles.titleOk]}>{title}</Text>
      {subtitle ? (
        <Text style={uploaded ? styles.subOk : styles.sub}>
          {uploaded ? 'Uploaded' : subtitle}
        </Text>
      ) : null}
    </View>
    <Ionicons
      name={uploaded ? 'refresh-outline' : 'chevron-forward'}
      size={18}
      color={colors.muted}
    />
  </Pressable>
);

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 9,
    width: '100%',
    borderWidth: 1.5,
  },
  cardEmpty: {
    borderStyle: 'dashed',
    borderColor: '#e4e6ea',
    backgroundColor: '#f9fafb',
  },
  cardOk: {
    borderStyle: 'solid',
    borderColor: colors.success,
    backgroundColor: colors.successSoft,
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapEmpty: {
    backgroundColor: '#fce8e9',
  },
  iconWrapOk: {
    backgroundColor: colors.white,
  },
  textCol: { flex: 1, gap: 4 },
  title: {
    fontFamily: 'PublicSans_600SemiBold',
    fontSize: 16 * SCALE,
    color: '#000000',
    ...(Platform.OS === 'android' && { includeFontPadding: false }),
  },
  titleOk: {
    color: colors.success,
  },
  sub: {
    fontFamily: 'PublicSans_500Medium',
    fontSize: 14 * SCALE,
    lineHeight: Math.round(14 * SCALE * 1.45),
    color: '#77878f',
    ...(Platform.OS === 'android' && { includeFontPadding: false }),
  },
  subOk: {
    fontFamily: 'PublicSans_500Medium',
    fontSize: 14 * SCALE,
    color: colors.success,
    ...(Platform.OS === 'android' && { includeFontPadding: false }),
  },
  pressed: {
    opacity: 0.94,
  },
});
