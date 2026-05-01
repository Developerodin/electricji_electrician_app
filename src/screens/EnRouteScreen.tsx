import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { FC } from 'react';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { JobsStackParamList } from '../navigation/types';
import { FloatingSosButton } from '../components/FloatingSosButton';
import { AppButton } from '../components/ui';
import { colors, fonts, radii, scaleFont, shadows, spacing } from '../theme';

type Props = NativeStackScreenProps<JobsStackParamList, 'EnRoute'>;

/**
 * Spec #24 — En route map preview with floating customer card and CTA.
 */
export const EnRouteScreen: FC<Props> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [loading, setLoading] = useState(false);

  const arrive = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.navigate('ArrivalConfirmation');
    }, 1400);
  };

  return (
    <View style={styles.root}>
      <Image
        source={require('../../assets/order-task/map-preview.png')}
        style={styles.map}
        resizeMode="cover"
      />
      <View style={styles.mapOverlay} pointerEvents="none" />

      <View style={[styles.topBar, { paddingTop: insets.top + spacing.sm }]}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Back"
          onPress={() => navigation.goBack()}
          style={styles.iconBtn}
        >
          <Ionicons name="chevron-back" size={20} color={colors.text} />
        </Pressable>
        <View style={styles.etaBadge}>
          <Ionicons name="time" size={14} color={colors.white} />
          <Text style={styles.etaTxt}>ETA 12 min · 6.5 km</Text>
        </View>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Recenter"
          onPress={() => {}}
          style={styles.iconBtn}
        >
          <Ionicons name="locate" size={18} color={colors.text} />
        </Pressable>
      </View>

      <View
        style={[
          styles.card,
          shadows.lg,
          { paddingBottom: Math.max(insets.bottom, spacing.md) + spacing.sm },
        ]}
      >
        <View style={styles.handle} />
        <View style={styles.cardRow}>
          <View style={styles.avatar}>
            <Text style={styles.avatarTxt}>R</Text>
          </View>
          <View style={styles.cardCol}>
            <Text style={styles.title}>Ravi Sharma</Text>
            <Text style={styles.sub}>Fan repair · Andheri West</Text>
          </View>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Call customer"
            onPress={() => {}}
            style={styles.callBtn}
          >
            <Ionicons name="call" size={18} color={colors.primary} />
          </Pressable>
        </View>
        <View style={styles.metaRow}>
          <Meta icon="navigate-outline" label="6.5 km" />
          <Meta icon="time-outline" label="ETA 12 min" />
          <Meta icon="speedometer-outline" label="32 km/h" />
        </View>
        <AppButton
          label={loading ? 'Checking geo…' : 'I have arrived'}
          onPress={arrive}
          disabled={loading}
          loading={loading}
          block
          rightIcon={
            !loading ? (
              <Ionicons name="location" size={16} color={colors.white} />
            ) : undefined
          }
        />
      </View>
      <FloatingSosButton onPress={() => navigation.navigate('SosModal')} />
    </View>
  );
};

const Meta: FC<{ icon: keyof typeof Ionicons.glyphMap; label: string }> = ({
  icon,
  label,
}) => (
  <View style={styles.metaPill}>
    <Ionicons name={icon} size={12} color={colors.muted} />
    <Text style={styles.metaTxt}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#1f2937' },
  map: { ...StyleSheet.absoluteFillObject, width: '100%', height: '100%' },
  mapOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.06)',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    gap: spacing.sm,
  },
  iconBtn: {
    width: 42,
    height: 42,
    borderRadius: radii.md,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.sm,
  },
  etaBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(32,32,32,0.85)',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radii.pill,
  },
  etaTxt: {
    fontFamily: fonts.publicSemiBold,
    fontSize: scaleFont(12.5),
    color: colors.white,
  },
  card: {
    position: 'absolute',
    left: spacing.md,
    right: spacing.md,
    bottom: spacing.md,
    backgroundColor: colors.white,
    borderRadius: radii.lg,
    padding: spacing.lg,
    gap: spacing.md,
  },
  handle: {
    alignSelf: 'center',
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.borderLight,
  },
  cardRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: radii.pill,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarTxt: {
    fontFamily: fonts.publicBold,
    fontSize: scaleFont(18),
    color: colors.primary,
  },
  cardCol: { flex: 1, gap: 2 },
  title: {
    fontFamily: fonts.publicBold,
    fontSize: scaleFont(15),
    color: colors.text,
  },
  sub: {
    fontFamily: fonts.publicRegular,
    fontSize: scaleFont(12.5),
    color: colors.muted,
  },
  callBtn: {
    width: 44,
    height: 44,
    borderRadius: radii.pill,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  metaRow: {
    flexDirection: 'row',
    gap: spacing.xs,
    flexWrap: 'wrap',
  },
  metaPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: radii.pill,
    backgroundColor: colors.surfaceAlt,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  metaTxt: {
    fontFamily: fonts.publicMedium,
    fontSize: scaleFont(11.5),
    color: colors.textSoft,
  },
});
