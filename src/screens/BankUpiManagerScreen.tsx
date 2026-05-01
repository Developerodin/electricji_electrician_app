import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { FC } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import type { HomeStackParamList } from '../navigation/types';
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

type Props = NativeStackScreenProps<HomeStackParamList, 'BankUpiManager'>;

/**
 * Spec #38 — Bank/UPI manager (primary + alternates).
 */
export const BankUpiManagerScreen: FC<Props> = ({ navigation }) => (
  <ScreenScaffold>
    <ScreenHeader title="Bank & UPI" onBack={() => navigation.goBack()} />
    <ScrollView
      contentContainerStyle={styles.body}
      showsVerticalScrollIndicator={false}
    >
      <SectionTitle title="Primary payout" caption="Used for withdrawals" />
      <AppCard>
        <View style={styles.row}>
          <View style={styles.iconWrap}>
            <Ionicons name="business" size={22} color={colors.primary} />
          </View>
          <View style={styles.col}>
            <Text style={styles.title}>HDFC Bank · ••••1234</Text>
            <Text style={styles.meta}>Holder: Arjun Mehta</Text>
            <Tag label="Primary" tone="success" />
          </View>
        </View>
      </AppCard>

      <SectionTitle title="UPI" />
      <AppCard>
        <View style={styles.row}>
          <View style={styles.iconWrap}>
            <Ionicons name="qr-code-outline" size={22} color={colors.primary} />
          </View>
          <View style={styles.col}>
            <Text style={styles.title}>tech@paytm</Text>
            <Text style={styles.meta}>Verified</Text>
          </View>
          <Tag label="Backup" tone="info" />
        </View>
      </AppCard>
    </ScrollView>
    <BottomCtaBar>
      <AppButton
        label="Add another"
        variant="outline"
        onPress={() => {}}
        block
        leftIcon={<Ionicons name="add" size={18} color={colors.text} />}
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: radii.md,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  col: { flex: 1, gap: 4 },
  title: {
    fontFamily: fonts.publicBold,
    fontSize: scaleFont(15),
    color: colors.text,
  },
  meta: {
    fontFamily: fonts.publicRegular,
    fontSize: scaleFont(12.5),
    color: colors.muted,
  },
});
