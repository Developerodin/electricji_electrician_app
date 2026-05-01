import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { FC } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import type { WholesaleStackParamList } from '../navigation/types';
import {
  AppButton,
  AppCard,
  BottomCtaBar,
  ScreenHeader,
  ScreenScaffold,
  SectionTitle,
  Tag,
} from '../components/ui';
import { colors, fonts, radii, scaleFont, spacing } from '../theme';

type Props = NativeStackScreenProps<WholesaleStackParamList, 'OrderTracking'>;

const STEPS = [
  { id: 'placed', label: 'Order placed', when: '21 Apr · 10:14 AM', done: true },
  { id: 'packed', label: 'Packed', when: '21 Apr · 7:30 PM', done: true },
  { id: 'shipped', label: 'Shipped', when: 'Today · 9:00 AM', done: true, current: true },
  { id: 'ofd', label: 'Out for delivery', when: 'Expected Sat', done: false },
  { id: 'delivered', label: 'Delivered', when: 'Estimated Sat', done: false },
];

/**
 * Spec #47 — Order tracking timeline with vertical stepper.
 */
export const OrderTrackingScreen: FC<Props> = ({ navigation, route }) => (
  <ScreenScaffold>
    <ScreenHeader title="Track order" onBack={() => navigation.goBack()} />
    <ScrollView
      contentContainerStyle={styles.body}
      showsVerticalScrollIndicator={false}
    >
      <AppCard tone="tinted">
        <View style={styles.row}>
          <View style={styles.iconWrap}>
            <Ionicons name="cube-outline" size={20} color={colors.primary} />
          </View>
          <View style={styles.col}>
            <Text style={styles.id}>Order · {route.params.orderId}</Text>
            <Text style={styles.meta}>BlueDart · AWB123456</Text>
          </View>
          <Tag label="In transit" tone="warning" />
        </View>
      </AppCard>

      <SectionTitle title="Timeline" />
      <AppCard padded={false} style={styles.timelineCard}>
        {STEPS.map((s, i) => {
          const last = i === STEPS.length - 1;
          return (
            <View key={s.id} style={styles.stepRow}>
              <View style={styles.bulletCol}>
                <View
                  style={[
                    styles.bullet,
                    s.done && styles.bulletDone,
                    s.current && styles.bulletCurrent,
                  ]}
                >
                  {s.done ? (
                    <Ionicons name="checkmark" size={12} color={colors.white} />
                  ) : null}
                </View>
                {!last ? (
                  <View
                    style={[styles.bar, s.done && styles.barDone]}
                  />
                ) : null}
              </View>
              <View style={styles.stepText}>
                <Text
                  style={[
                    styles.stepLabel,
                    s.current && styles.stepLabelCurrent,
                  ]}
                >
                  {s.label}
                </Text>
                <Text style={styles.stepWhen}>{s.when}</Text>
              </View>
            </View>
          );
        })}
      </AppCard>
    </ScrollView>
    <BottomCtaBar>
      <AppButton
        label="Raise return"
        variant="outline"
        onPress={() => navigation.navigate('ReturnsRefund', {})}
        block
      />
    </BottomCtaBar>
  </ScreenScaffold>
);

const styles = StyleSheet.create({
  body: {
    padding: spacing.lg,
    gap: spacing.md,
    paddingBottom: spacing.xxxl,
  },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: radii.md,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  col: { flex: 1, gap: 2 },
  id: {
    fontFamily: fonts.publicBold,
    fontSize: scaleFont(15),
    color: colors.text,
  },
  meta: {
    fontFamily: fonts.publicRegular,
    fontSize: scaleFont(12.5),
    color: colors.muted,
  },
  timelineCard: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  stepRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  bulletCol: {
    width: 22,
    alignItems: 'center',
  },
  bullet: {
    width: 22,
    height: 22,
    borderRadius: radii.pill,
    backgroundColor: colors.borderLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bulletDone: {
    backgroundColor: colors.success,
  },
  bulletCurrent: {
    backgroundColor: colors.primary,
  },
  bar: {
    flex: 1,
    width: 2,
    backgroundColor: colors.borderLight,
    minHeight: 18,
  },
  barDone: {
    backgroundColor: colors.success,
  },
  stepText: {
    flex: 1,
    paddingVertical: 2,
    paddingBottom: spacing.md,
    gap: 2,
  },
  stepLabel: {
    fontFamily: fonts.publicSemiBold,
    fontSize: scaleFont(14),
    color: colors.text,
  },
  stepLabelCurrent: {
    color: colors.primary,
  },
  stepWhen: {
    fontFamily: fonts.publicRegular,
    fontSize: scaleFont(12),
    color: colors.muted,
  },
});
