import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { FC } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import type { JobsStackParamList } from '../navigation/types';
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

type Props = NativeStackScreenProps<JobsStackParamList, 'LeadAccepted'>;

/**
 * Spec #22 — Lead accepted: customer card, map, ETA and contact CTAs.
 */
export const LeadAcceptedScreen: FC<Props> = ({ navigation }) => (
  <ScreenScaffold>
    <ScreenHeader title="Job accepted" onBack={() => navigation.goBack()} />
    <ScrollView
      contentContainerStyle={styles.body}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.successWrap}>
        <View style={styles.successCircle}>
          <Ionicons name="checkmark" size={28} color={colors.white} />
        </View>
        <Text style={styles.successTitle}>You’re on this job!</Text>
        <Text style={styles.successHint}>
          Customer has been notified. Head out when ready.
        </Text>
      </View>

      <SectionTitle title="Customer" />
      <AppCard>
        <View style={styles.row}>
          <View style={styles.avatar}>
            <Text style={styles.avatarTxt}>R</Text>
          </View>
          <View style={styles.col}>
            <Text style={styles.name}>Ravi Sharma</Text>
            <Text style={styles.subtle}>★ 4.6 · 12 jobs done</Text>
          </View>
          <Tag label="VIP" tone="warning" size="sm" />
        </View>
        <View style={styles.divider} />
        <View style={styles.addrRow}>
          <Ionicons
            name="location-outline"
            size={18}
            color={colors.primary}
          />
          <Text style={styles.addr}>
            Flat 502, Sunshine Apartments, Andheri West, Mumbai 400053
          </Text>
        </View>
      </AppCard>

      <SectionTitle title="Route" trailingLabel="Open in Maps" />
      <View style={styles.map}>
        <Image
          source={require('../../assets/order-task/map-preview.png')}
          style={styles.mapImg}
          resizeMode="cover"
        />
        <View style={styles.etaPill}>
          <Ionicons name="time-outline" size={14} color={colors.white} />
          <Text style={styles.etaTxt}>ETA · 12 min</Text>
        </View>
      </View>

      <View style={styles.contactRow}>
        <AppButton
          label="Call"
          variant="outline"
          onPress={() => {}}
          leftIcon={<Ionicons name="call" size={16} color={colors.text} />}
          style={styles.flex}
        />
        <AppButton
          label="Chat"
          variant="outline"
          onPress={() => {}}
          leftIcon={
            <Ionicons name="chatbubble" size={16} color={colors.text} />
          }
          style={styles.flex}
        />
      </View>
    </ScrollView>

    <BottomCtaBar floating>
      <AppButton
        label="Start navigation"
        onPress={() => navigation.navigate('EnRoute')}
        block
        rightIcon={
          <Ionicons name="navigate" size={16} color={colors.white} />
        }
      />
    </BottomCtaBar>
  </ScreenScaffold>
);

const styles = StyleSheet.create({
  body: {
    padding: spacing.lg,
    gap: spacing.md,
    paddingBottom: 140,
  },
  successWrap: {
    alignItems: 'center',
    backgroundColor: colors.successSoft,
    borderRadius: radii.lg,
    padding: spacing.lg,
    gap: spacing.xs,
  },
  successCircle: {
    width: 56,
    height: 56,
    borderRadius: radii.pill,
    backgroundColor: colors.success,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  successTitle: {
    fontFamily: fonts.publicBold,
    fontSize: scaleFont(17),
    color: colors.success,
  },
  successHint: {
    fontFamily: fonts.publicMedium,
    fontSize: scaleFont(13),
    color: colors.textSoft,
    textAlign: 'center',
  },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: radii.pill,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarTxt: {
    fontFamily: fonts.publicBold,
    fontSize: scaleFont(20),
    color: colors.primary,
  },
  col: { flex: 1, gap: 2 },
  name: {
    fontFamily: fonts.publicBold,
    fontSize: scaleFont(16),
    color: colors.text,
  },
  subtle: {
    fontFamily: fonts.publicMedium,
    fontSize: scaleFont(12.5),
    color: colors.muted,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.borderLight,
    marginVertical: spacing.md,
  },
  addrRow: { flexDirection: 'row', gap: spacing.sm, alignItems: 'flex-start' },
  addr: {
    flex: 1,
    fontFamily: fonts.publicRegular,
    fontSize: scaleFont(13.5),
    color: colors.textSoft,
    lineHeight: 20,
  },
  map: {
    height: 180,
    borderRadius: radii.lg,
    overflow: 'hidden',
    backgroundColor: colors.surfaceAlt,
  },
  mapImg: { width: '100%', height: '100%' },
  etaPill: {
    position: 'absolute',
    bottom: spacing.md,
    left: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radii.pill,
    backgroundColor: 'rgba(32,32,32,0.85)',
  },
  etaTxt: {
    fontFamily: fonts.publicSemiBold,
    fontSize: scaleFont(12.5),
    color: colors.white,
  },
  contactRow: { flexDirection: 'row', gap: spacing.sm },
  flex: { flex: 1 },
});
