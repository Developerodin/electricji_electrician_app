import { Ionicons } from '@expo/vector-icons';
import type { ComponentProps, FC } from 'react';
import { useRef } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, fonts, radii, scaleFont, shadows, spacing } from '../../theme';

type IonName = ComponentProps<typeof Ionicons>['name'];

export type UploadCardProps = {
  title: string;
  subtitle?: string;
  uploaded?: boolean;
  icon?: IonName;
  onPress: () => void;
};

/**
 * KYC upload tile — dashed card switches to filled success card on completion.
 */
export const UploadCard: FC<UploadCardProps> = ({
  title,
  subtitle,
  uploaded = false,
  icon = 'cloud-upload-outline',
  onPress,
}) => {
  const scale = useRef(new Animated.Value(1)).current;
  const animate = (v: number) =>
    Animated.spring(scale, {
      toValue: v,
      friction: 7,
      tension: 220,
      useNativeDriver: true,
    }).start();

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={title}
        onPressIn={() => animate(0.99)}
        onPressOut={() => animate(1)}
        onPress={onPress}
        style={({ pressed }) => [
          styles.card,
          uploaded ? styles.cardOk : styles.cardEmpty,
          uploaded && shadows.sm,
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
            color={uploaded ? colors.success : colors.primary}
          />
        </View>
        <View style={styles.textCol}>
          <Text style={[styles.title, uploaded && styles.titleOk]}>{title}</Text>
          {subtitle ? (
            <Text style={styles.sub}>
              {uploaded ? 'Uploaded' : subtitle}
            </Text>
          ) : null}
        </View>
        <Ionicons
          name={uploaded ? 'refresh-outline' : 'chevron-forward'}
          size={18}
          color={colors.mutedSoft}
        />
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: radii.lg,
    backgroundColor: colors.white,
  },
  cardEmpty: {
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: colors.border,
  },
  cardOk: {
    borderWidth: 1.25,
    borderColor: colors.success,
    backgroundColor: colors.successSoft,
  },
  iconWrap: {
    width: 38,
    height: 38,
    borderRadius: radii.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapEmpty: {
    backgroundColor: colors.primarySoft,
  },
  iconWrapOk: {
    backgroundColor: colors.white,
  },
  textCol: { flex: 1, gap: 2 },
  title: {
    fontFamily: fonts.publicSemiBold,
    fontSize: scaleFont(15),
    color: colors.text,
  },
  titleOk: {
    color: colors.success,
  },
  sub: {
    fontFamily: fonts.publicRegular,
    fontSize: scaleFont(12.5),
    color: colors.muted,
  },
  pressed: {
    opacity: 0.96,
  },
});
