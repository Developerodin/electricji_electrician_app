import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { FC } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { HomeStackParamList } from '../navigation/types';
import {
  AppButton,
  AppCard,
  ScreenScaffold,
  SectionTitle,
  StatTile,
  Tag,
} from '../components/ui';
import { colors, fonts, radii, scaleFont, shadows, spacing } from '../theme';

type Props = NativeStackScreenProps<HomeStackParamList, 'WalletHome'>;

const RECENT = [
  {
    id: 't1',
    title: 'Credit · Job #J1',
    when: 'Today · 2:14 PM',
    amount: '+₹570',
    tone: 'success' as const,
    icon: 'arrow-down-outline' as const,
  },
  {
    id: 't2',
    title: 'Hold released',
    when: 'Yesterday',
    amount: '+₹450',
    tone: 'success' as const,
    icon: 'lock-open-outline' as const,
  },
  {
    id: 't3',
    title: 'Withdrawal to HDFC ••6789',
    when: '2 days ago',
    amount: '−₹2,000',
    tone: 'danger' as const,
    icon: 'arrow-up-outline' as const,
  },
];

/**
 * Spec #37 — Wallet home with hero balance card + actions + recent.
 */
export const WalletHomeScreen: FC<Props> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  return (
    <ScreenScaffold>
      <View
        style={[
          styles.hero,
          shadows.md,
          { paddingTop: insets.top + spacing.md },
        ]}
      >
        <View style={styles.heroTopRow}>
          <Ionicons
            name="chevron-back"
            size={24}
            color={colors.white}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.heroTopTitle}>Wallet</Text>
          <View style={{ width: 24 }} />
        </View>
        <Text style={styles.heroLabel}>Available balance</Text>
        <Text style={styles.heroAmount}>₹3,200</Text>
        <View style={styles.tagRow}>
          <Tag label="Held ₹450" tone="warning" />
          <Tag label="This month ₹12,400" tone="success" />
        </View>
      </View>

      <ScrollView
        style={styles.body}
        contentContainerStyle={styles.bodyContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.actionRow}>
          <AppButton
            label="Withdraw"
            onPress={() => Alert.alert('Withdraw', 'Enter amount (prototype)')}
            block
            leftIcon={<Ionicons name="arrow-down" size={16} color={colors.white} />}
          />
          <AppButton
            label="Bank / UPI"
            variant="outline"
            onPress={() => navigation.navigate('BankUpiManager')}
            block
            leftIcon={<Ionicons name="card-outline" size={16} color={colors.text} />}
          />
        </View>

        <View style={styles.statRow}>
          <StatTile
            label="Pending payouts"
            value="₹1,840"
            tone="warning"
            icon="hourglass-outline"
          />
          <StatTile
            label="Withdrawn (mo.)"
            value="₹6,000"
            tone="info"
            icon="cloud-upload-outline"
          />
        </View>

        <SectionTitle
          title="Recent activity"
          trailingLabel="History"
          onTrailingPress={() => navigation.navigate('WithdrawalHistory')}
        />
        <AppCard padded={false}>
          {RECENT.map((r, i) => (
            <View
              key={r.id}
              style={[
                styles.txnRow,
                i < RECENT.length - 1 && styles.txnRowDivider,
              ]}
            >
              <View
                style={[
                  styles.txnIcon,
                  { backgroundColor: r.tone === 'success' ? colors.successSoft : colors.errorSoft },
                ]}
              >
                <Ionicons
                  name={r.icon}
                  size={16}
                  color={r.tone === 'success' ? colors.success : colors.error}
                />
              </View>
              <View style={styles.txnCol}>
                <Text style={styles.txnTitle}>{r.title}</Text>
                <Text style={styles.txnMeta}>{r.when}</Text>
              </View>
              <Text
                style={[
                  styles.txnAmt,
                  { color: r.tone === 'success' ? colors.success : colors.error },
                ]}
              >
                {r.amount}
              </Text>
            </View>
          ))}
        </AppCard>
      </ScrollView>
    </ScreenScaffold>
  );
};

const styles = StyleSheet.create({
  hero: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg + 4,
    borderBottomLeftRadius: radii.hero,
    borderBottomRightRadius: radii.hero,
    gap: spacing.xs,
  },
  heroTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  heroTopTitle: {
    fontFamily: fonts.publicBold,
    fontSize: scaleFont(17),
    color: colors.white,
  },
  heroLabel: {
    fontFamily: fonts.publicMedium,
    fontSize: scaleFont(12.5),
    color: 'rgba(255,255,255,0.85)',
    letterSpacing: 0.4,
    textTransform: 'uppercase',
  },
  heroAmount: {
    fontFamily: fonts.publicBold,
    fontSize: scaleFont(40),
    color: colors.white,
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: spacing.sm,
  },
  body: { flex: 1 },
  bodyContent: {
    padding: spacing.lg,
    gap: spacing.md,
    paddingBottom: spacing.xxxl,
  },
  actionRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  statRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  txnRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  txnRowDivider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.borderLight,
  },
  txnIcon: {
    width: 36,
    height: 36,
    borderRadius: radii.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txnCol: { flex: 1, gap: 2 },
  txnTitle: {
    fontFamily: fonts.publicSemiBold,
    fontSize: scaleFont(14),
    color: colors.text,
  },
  txnMeta: {
    fontFamily: fonts.publicRegular,
    fontSize: scaleFont(12),
    color: colors.muted,
  },
  txnAmt: {
    fontFamily: fonts.publicBold,
    fontSize: scaleFont(14),
  },
});
