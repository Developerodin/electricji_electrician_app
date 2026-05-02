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
  Tag,
} from '../components/ui';
import {
  colors,
  DESIGN_W,
  fonts,
  radii,
  scaleFont,
  shadows,
  spacing,
} from '../theme';

type Props = NativeStackScreenProps<WholesaleStackParamList, 'OrderConfirmation'>;

/**
 * Spec #46 — Order placed confirmation.
 */
export const OrderConfirmationScreen: FC<Props> = ({ navigation, route }) => (
  <ScreenScaffold>
    <ScreenHeader
      title="Order placed"
      onBack={() => navigation.popToTop()}
    />
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scroll}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.inner}>
        <View style={[styles.tickRing, shadows.lg]}>
          <Ionicons name="checkmark" size={48} color={colors.white} />
        </View>
        <Text style={styles.sub}>
          We’ll keep you posted as it ships.
        </Text>
        <AppCard tone="tinted" style={styles.detailCard}>
          <View style={styles.row}>
            <Text style={styles.label}>Order ID</Text>
            <Tag label={route.params.orderId} tone="primary" />
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Estimated delivery</Text>
            <Text style={styles.value}>Sat, 4 May</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Payment</Text>
            <Text style={styles.value}>Wallet · ₹2,596</Text>
          </View>
        </AppCard>
      </View>
    </ScrollView>
    <BottomCtaBar>
      <AppButton
        label="Continue shopping"
        variant="outline"
        onPress={() => navigation.navigate('MarketplaceHome')}
        block
      />
      <AppButton
        label="Track order"
        onPress={() =>
          navigation.navigate('OrderTracking', { orderId: route.params.orderId })
        }
        block
      />
    </BottomCtaBar>
  </ScreenScaffold>
);

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    paddingBottom: spacing.xxxl,
  },
  inner: {
    alignItems: 'center',
    gap: spacing.sm,
    alignSelf: 'center',
    width: '100%',
    maxWidth: DESIGN_W,
    paddingBottom: spacing.lg,
  },
  tickRing: {
    width: 96,
    height: 96,
    borderRadius: radii.pill,
    backgroundColor: colors.success,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  sub: {
    fontFamily: fonts.publicRegular,
    fontSize: scaleFont(14),
    color: colors.muted,
    textAlign: 'center',
  },
  detailCard: {
    width: '100%',
    marginTop: spacing.lg,
    gap: spacing.sm,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.xs,
  },
  label: {
    fontFamily: fonts.publicMedium,
    fontSize: scaleFont(13),
    color: colors.muted,
  },
  value: {
    fontFamily: fonts.publicSemiBold,
    fontSize: scaleFont(13.5),
    color: colors.text,
  },
});
