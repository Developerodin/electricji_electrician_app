import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { FC } from 'react';
import { useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  type ListRenderItem,
  type NativeSyntheticEvent,
  type NativeScrollEvent,
} from 'react-native';
import type { RootStackParamList } from '../navigation/types';
import { AppButton } from '../components/ui/Button';
import { colors, fonts, scaleFont, spacing } from '../theme';

const SLIDES = [
  {
    key: '1',
    title: 'Get jobs near you',
    subtitle: 'Receive leads matched to your skills and location.',
  },
  {
    key: '2',
    title: 'Earn daily, withdraw fast',
    subtitle: 'Track payouts and withdraw to bank or UPI.',
  },
  {
    key: '3',
    title: 'Buy tools at wholesale prices',
    subtitle: 'Reorder supplies without leaving the app.',
  },
];

type Props = NativeStackScreenProps<RootStackParamList, 'WelcomeCarousel'>;

/**
 * Spec #3 — 3-slide welcome carousel with Skip / Next.
 */
export const WelcomeCarouselScreen: FC<Props> = ({ navigation }) => {
  const [index, setIndex] = useState(0);
  const listRef = useRef<FlatList>(null);

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const w = Dimensions.get('window').width;
    const i = Math.round(e.nativeEvent.contentOffset.x / w);
    setIndex(i);
  };

  const goNext = () => {
    if (index < SLIDES.length - 1) {
      listRef.current?.scrollToIndex({ index: index + 1, animated: true });
    } else {
      navigation.navigate('PhoneEntry');
    }
  };

  const renderItem: ListRenderItem<(typeof SLIDES)[0]> = ({ item }) => (
    <View style={styles.slide}>
      <Image
        accessibilityIgnoresInvertColors
        source={require('../../assets/login-mascot.png')}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.sub}>{item.subtitle}</Text>
    </View>
  );

  return (
    <View style={styles.root}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Skip welcome"
        onPress={() => navigation.navigate('PhoneEntry')}
        style={styles.skip}
      >
        <Text style={styles.skipText}>Skip</Text>
      </Pressable>
      <FlatList
        ref={listRef}
        data={SLIDES}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(it) => it.key}
        renderItem={renderItem}
        onMomentumScrollEnd={onScroll}
        getItemLayout={(_, i) => ({
          length: Dimensions.get('window').width,
          offset: Dimensions.get('window').width * i,
          index: i,
        })}
      />
      <View style={styles.dots}>
        {SLIDES.map((_, i) => (
          <View
            key={i}
            style={[styles.dot, i === index && styles.dotActive]}
          />
        ))}
      </View>
      <View style={styles.footer}>
        <AppButton
          label={index === SLIDES.length - 1 ? 'Get started' : 'Next'}
          onPress={goNext}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.white },
  skip: {
    position: 'absolute',
    top: 52,
    right: spacing.lg,
    zIndex: 2,
  },
  skipText: {
    fontFamily: fonts.publicSemiBold,
    fontSize: scaleFont(16),
    color: colors.primary,
  },
  slide: {
    width: Dimensions.get('window').width,
    paddingHorizontal: spacing.lg,
    paddingTop: 100,
    alignItems: 'center',
    gap: spacing.md,
  },
  image: { width: 220, height: 220 },
  title: {
    fontFamily: fonts.publicBold,
    fontSize: scaleFont(22),
    color: colors.text,
    textAlign: 'center',
  },
  sub: {
    fontFamily: fonts.publicRegular,
    fontSize: scaleFont(15),
    color: colors.muted,
    textAlign: 'center',
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginBottom: spacing.lg,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.border,
  },
  dotActive: {
    backgroundColor: colors.primary,
    width: 22,
  },
  footer: { padding: spacing.lg },
});
