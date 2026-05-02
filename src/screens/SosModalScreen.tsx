import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { FC } from 'react';
import { useEffect, useRef } from 'react';
import { Ionicons } from '@expo/vector-icons';
import {
  Animated,
  Easing,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { JobsStackParamList } from '../navigation/types';
import {
  AppButton,
  AppCard,
  ListRow,
} from '../components/ui';
import { colors, fonts, radii, scaleFont, shadows, spacing } from '../theme';

type Props = NativeStackScreenProps<JobsStackParamList, 'SosModal'>;

/**
 * Spec #76 — SOS emergency sheet with pulsing alert and quick actions.
 */
export const SosModalScreen: FC<Props> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const pulse = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.timing(pulse, {
        toValue: 1,
        duration: 1100,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
    );
    loop.start();
    return () => loop.stop();
  }, [pulse]);

  const haloScale = pulse.interpolate({
    inputRange: [0, 1],
    outputRange: [0.8, 1.6],
  });
  const haloOpacity = pulse.interpolate({
    inputRange: [0, 1],
    outputRange: [0.5, 0],
  });

  return (
    <View style={[styles.root, { paddingTop: insets.top + spacing.lg }]}>
      <View style={styles.heroWrap}>
        <Animated.View
          style={[
            styles.halo,
            { transform: [{ scale: haloScale }], opacity: haloOpacity },
          ]}
        />
        <View style={[styles.alertCircle, shadows.lg]}>
          <Ionicons name="alert" size={36} color={colors.white} />
        </View>
      </View>

      <Text style={styles.h1} accessibilityRole="header">
        Emergency triggered
      </Text>
      <Text style={styles.sub}>
        We’re calling support and sharing your live location with the response
        team. Stay calm.
      </Text>

      <ScrollView
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      >
        <AppCard padded={false}>
          <ListRow
            title="Call Electric Ji support"
            subtitle="Priority emergency line"
            icon="call"
            onPress={() => {}}
            position="first"
          />
          <ListRow
            title="Call police"
            subtitle="100 — direct dial"
            icon="shield"
            onPress={() => {}}
            danger
          />
          <ListRow
            title="Share live location"
            subtitle="Sent to your trusted contact"
            icon="location"
            onPress={() => {}}
            position="last"
          />
        </AppCard>
      </ScrollView>

      <View
        style={[
          styles.footer,
          {
            paddingBottom: Math.max(insets.bottom, spacing.md) + spacing.sm,
          },
        ]}
      >
        <View style={styles.statusBanner}>
          <View style={styles.statusDot} />
          <Text style={styles.statusTxt}>Help is on the way · Live</Text>
        </View>
        <AppButton
          label="I’m safe — close"
          variant="outline"
          onPress={() => navigation.goBack()}
          block
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.pageBg, paddingHorizontal: spacing.lg },
  heroWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  halo: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: radii.pill,
    backgroundColor: colors.error,
  },
  alertCircle: {
    width: 96,
    height: 96,
    borderRadius: radii.pill,
    backgroundColor: colors.error,
    alignItems: 'center',
    justifyContent: 'center',
  },
  h1: {
    fontFamily: fonts.publicBold,
    fontSize: scaleFont(24),
    color: colors.error,
    textAlign: 'center',
    marginTop: spacing.md,
  },
  sub: {
    fontFamily: fonts.publicMedium,
    fontSize: scaleFont(13.5),
    color: colors.muted,
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.lg,
  },
  list: { gap: spacing.sm, paddingBottom: spacing.lg },
  footer: { gap: spacing.md },
  statusBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radii.pill,
    backgroundColor: colors.successSoft,
    alignSelf: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.success,
  },
  statusTxt: {
    fontFamily: fonts.publicSemiBold,
    fontSize: scaleFont(12.5),
    color: colors.success,
  },
});
