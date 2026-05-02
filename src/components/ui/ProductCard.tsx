import { Ionicons } from '@expo/vector-icons';
import type { FC } from 'react';
import { useRef } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, fonts, radii, scaleFont, shadows, spacing } from '../../theme';

export type ProductCardProps = {
  name: string;
  brand?: string;
  b2bPrice: string;
  mrp?: string;
  savePct?: number;
  rating?: number;
  layout?: 'grid' | 'horizontal' | 'list';
  onPress: () => void;
};

/**
 * Wholesale product tile — used in marketplace deals + category grid + search results.
 */
export const ProductCard: FC<ProductCardProps> = ({
  name,
  brand,
  b2bPrice,
  mrp,
  savePct,
  rating,
  layout = 'grid',
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

  const isHorizontal = layout === 'horizontal';
  const isList = layout === 'list';

  return (
    <Animated.View
      style={[
        { transform: [{ scale }] },
        isHorizontal && styles.horizontal,
        isList && styles.listShell,
        layout === 'grid' && styles.gridShell,
      ]}
    >
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={name}
        onPressIn={() => animate(0.97)}
        onPressOut={() => animate(1)}
        onPress={onPress}
        style={({ pressed }) => [
          styles.card,
          shadows.sm,
          isList && styles.cardList,
          pressed && styles.pressed,
        ]}
      >
        <View
          style={[
            styles.imagePlaceholder,
            isList && styles.imagePlaceholderList,
          ]}
        >
          <Ionicons name="cube-outline" size={28} color={colors.primary} />
        </View>
        <View style={styles.info}>
          {brand ? <Text style={styles.brand}>{brand}</Text> : null}
          <Text style={styles.name} numberOfLines={2}>
            {name}
          </Text>
          <View style={styles.priceRow}>
            <Text style={styles.b2b}>{b2bPrice}</Text>
            {mrp ? <Text style={styles.mrp}>{mrp}</Text> : null}
          </View>
          <View style={styles.metaRow}>
            {savePct ? (
              <View style={styles.saveBadge}>
                <Text style={styles.saveText}>Save {savePct}%</Text>
              </View>
            ) : null}
            {rating ? (
              <View style={styles.ratingRow}>
                <Ionicons name="star" size={11} color={colors.warning} />
                <Text style={styles.ratingText}>{rating}</Text>
              </View>
            ) : null}
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  gridShell: {
    width: '47.5%',
  },
  horizontal: {
    width: 170,
    marginRight: spacing.sm,
  },
  listShell: {
    width: '100%',
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: radii.lg,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'rgba(216,217,221,0.16)',
  },
  cardList: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.sm,
  },
  imagePlaceholder: {
    height: 110,
    backgroundColor: colors.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagePlaceholderList: {
    width: 80,
    height: 80,
    borderRadius: radii.md,
  },
  info: {
    flex: 1,
    padding: spacing.md - 2,
    gap: 4,
  },
  brand: {
    fontFamily: fonts.publicMedium,
    fontSize: scaleFont(11),
    color: colors.muted,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  name: {
    fontFamily: fonts.publicSemiBold,
    fontSize: scaleFont(13),
    color: colors.text,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  b2b: {
    fontFamily: fonts.publicBold,
    fontSize: scaleFont(16),
    color: colors.primary,
  },
  mrp: {
    fontFamily: fonts.publicRegular,
    fontSize: scaleFont(11.5),
    color: colors.mutedSoft,
    textDecorationLine: 'line-through',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  saveBadge: {
    backgroundColor: colors.successSoft,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: radii.xs,
  },
  saveText: {
    fontFamily: fonts.publicSemiBold,
    fontSize: scaleFont(10.5),
    color: colors.success,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  ratingText: {
    fontFamily: fonts.publicSemiBold,
    fontSize: scaleFont(11.5),
    color: colors.text,
  },
  pressed: {
    opacity: 0.96,
  },
});
