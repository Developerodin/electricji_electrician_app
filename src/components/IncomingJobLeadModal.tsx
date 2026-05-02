import { Ionicons } from '@expo/vector-icons';
import type { FC } from 'react';
import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Easing,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  Vibration,
  View,
} from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { MOCK_LEADS } from '../mocks';
import { colors, fonts, spacing } from '../theme';

export type IncomingJobLeadModalProps = {
  visible: boolean;
  onClose: () => void;
  onAccept: () => void;
  onReject: () => void;
};

const COUNTDOWN = 30;
const SCREEN_W = Dimensions.get('window').width;
const CARD_W = Math.min(380, SCREEN_W - 32);

const RING_SIZE = 84;
const RING_STROKE = 6;
const RING_R = (RING_SIZE - RING_STROKE) / 2;
const RING_C = 2 * Math.PI * RING_R;

/**
 * Incoming job — visual parity with delivery `OrderAlertModal` (dark overlay, LIVE badge + ring
 * timer, lifted offer card, Reject pill / Accept CTA row). Behaviour unchanged from spec #21.
 */
export const IncomingJobLeadModal: FC<IncomingJobLeadModalProps> = ({
  visible,
  onClose,
  onAccept,
  onReject,
}) => {
  const lead = MOCK_LEADS[0];
  const [left, setLeft] = useState(COUNTDOWN);
  const slide = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!visible) {
      slide.setValue(0);
      setLeft(COUNTDOWN);
      return;
    }
    Animated.timing(slide, {
      toValue: 1,
      duration: 280,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
    Vibration.vibrate([0, 380, 120, 380]);
    const t = setInterval(() => setLeft((s) => (s <= 0 ? 0 : s - 1)), 1000);
    return () => clearInterval(t);
  }, [slide, visible]);

  useEffect(() => {
    if (visible && left === 0) {
      onClose();
    }
  }, [left, onClose, visible]);

  const translateY = slide.interpolate({
    inputRange: [0, 1],
    outputRange: [48, 0],
  });

  const ringOpacity = slide;

  /** Remaining arc: full at start, depleted when timer hits 0 */
  const strokeDashoffset =
    left <= 0 ? RING_C : RING_C * (1 - left / COUNTDOWN);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      presentationStyle="overFullScreen"
      statusBarTranslucent
      onRequestClose={onReject}
    >
      <View style={styles.overlay}>
        <Animated.View
          style={[
            styles.topChrome,
            {
              opacity: ringOpacity,
            },
          ]}
        >
          <View style={styles.topRow}>
            <View style={styles.liveBadge}>
              <View style={styles.liveDot} />
              <Text style={styles.liveText}>LIVE LEAD</Text>
            </View>
            <View style={styles.ringWrap}>
              <Svg width={RING_SIZE} height={RING_SIZE}>
                <Circle
                  cx={RING_SIZE / 2}
                  cy={RING_SIZE / 2}
                  r={RING_R}
                  stroke={colors.textSoft}
                  strokeWidth={RING_STROKE}
                  fill="transparent"
                />
                <Circle
                  cx={RING_SIZE / 2}
                  cy={RING_SIZE / 2}
                  r={RING_R}
                  stroke={colors.white}
                  strokeWidth={RING_STROKE}
                  fill="transparent"
                  strokeLinecap="round"
                  strokeDasharray={`${RING_C} ${RING_C}`}
                  strokeDashoffset={strokeDashoffset}
                  transform={`rotate(-90 ${RING_SIZE / 2} ${RING_SIZE / 2})`}
                />
              </Svg>
              <View style={styles.ringCenter}>
                <Text style={styles.ringText}>{left}</Text>
                <Text style={styles.ringHint}>sec</Text>
              </View>
            </View>
          </View>
          <Text style={styles.singleHint}>Respond before time runs out</Text>
        </Animated.View>

        <Animated.View
          style={[
            styles.cardOuter,
            {
              opacity: slide,
              transform: [{ translateY }],
            },
          ]}
          accessibilityViewIsModal
        >
          <View style={styles.card}>
            <View style={styles.header}>
              <View style={styles.typeBadge}>
                <Ionicons name="construct" size={14} color={colors.primary} />
                <Text style={styles.typeBadgeText} numberOfLines={1}>
                  {lead.serviceType}
                </Text>
              </View>
              <Text style={styles.orderIdPill}>{lead.id}</Text>
            </View>

            <View style={styles.section}>
              <View style={styles.row}>
                <View
                  style={[
                    styles.iconDot,
                    { backgroundColor: colors.success },
                  ]}
                />
                <View style={styles.addr}>
                  <Text style={styles.addrLabel}>SERVICE</Text>
                  <Text style={styles.addrName}>{lead.serviceType}</Text>
                  <Text style={styles.addrLine}>{lead.area}</Text>
                </View>
              </View>
              <View style={styles.railWrap}>
                <View style={styles.rail} />
              </View>
              <View style={styles.row}>
                <View
                  style={[
                    styles.iconDot,
                    { backgroundColor: colors.primary },
                  ]}
                />
                <View style={styles.addr}>
                  <Text style={styles.addrLabel}>PAYOUT</Text>
                  <Text style={styles.addrName}>{lead.payout}</Text>
                  <Text style={styles.addrLine}>
                    {lead.surge ?? 'Includes platform fee'}
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.statsRow}>
              <View style={styles.stat}>
                <Ionicons name="time-outline" size={18} color={colors.muted} />
                <Text style={styles.statText}>{lead.timeLabel}</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.stat}>
                <Ionicons name="hourglass-outline" size={18} color={colors.muted} />
                <Text style={styles.statText}>{lead.durationMin} min</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.stat}>
                <Ionicons name="star" size={18} color={colors.muted} />
                <Text style={styles.statText}>{lead.customerRating}</Text>
              </View>
            </View>

            <View style={styles.earnBar}>
              <Text style={styles.earnLabel}>ESTIMATED EARNINGS</Text>
              <Text style={styles.earnAmount}>{lead.payout}</Text>
            </View>

            <View style={styles.cardActionsHairline} />
            <View style={styles.cardActions}>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Reject offer"
                onPress={onReject}
                style={({ pressed }) => [
                  styles.cardRejectBtn,
                  pressed && styles.pressed,
                ]}
              >
                <Text style={styles.cardRejectLabel}>Reject</Text>
              </Pressable>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Accept offer"
                onPress={onAccept}
                style={({ pressed }) => [
                  styles.cardAcceptBtn,
                  pressed && styles.pressed,
                ]}
              >
                <Ionicons name="checkmark-circle" size={22} color={colors.white} />
                <Text style={styles.cardAcceptLabel}>Accept</Text>
              </Pressable>
            </View>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.72)',
    paddingTop: Platform.OS === 'ios' ? 54 : 36,
    paddingBottom: Platform.OS === 'ios' ? 34 : 24,
  },
  topChrome: {
    paddingHorizontal: 20,
    paddingBottom: 12,
    gap: 8,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(255,255,255,0.12)',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.successBright,
  },
  liveText: {
    fontFamily: fonts.publicBold,
    fontSize: 12,
    color: colors.white,
    letterSpacing: 1.2,
  },
  ringWrap: {
    width: RING_SIZE,
    height: RING_SIZE,
    position: 'relative',
  },
  ringCenter: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ringText: {
    fontFamily: fonts.publicBold,
    fontSize: 22,
    color: colors.white,
    lineHeight: 24,
  },
  ringHint: {
    fontFamily: fonts.publicMedium,
    fontSize: 10,
    color: 'rgba(255,255,255,0.75)',
    letterSpacing: 0.8,
  },
  singleHint: {
    fontFamily: fonts.publicMedium,
    fontSize: 13,
    color: 'rgba(255,255,255,0.75)',
    textAlign: 'center',
  },
  cardOuter: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  card: {
    width: CARD_W,
    alignSelf: 'center',
    backgroundColor: colors.white,
    borderRadius: 28,
    padding: 20,
    gap: 16,
    ...Platform.select({
      ios: {
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 20 },
        shadowOpacity: 0.25,
        shadowRadius: 30,
      },
      android: { elevation: 24 },
    }),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderIdPill: {
    fontFamily: fonts.publicBold,
    fontSize: 11,
    color: colors.muted,
    letterSpacing: 0.6,
    backgroundColor: '#f4f4f5',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    overflow: 'hidden',
  },
  typeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.primarySoft,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    maxWidth: '62%',
  },
  typeBadgeText: {
    fontFamily: fonts.publicBold,
    fontSize: 12,
    color: colors.primary,
    letterSpacing: 0.6,
    flexShrink: 1,
  },
  section: {
    gap: 4,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
  },
  iconDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    marginTop: 6,
  },
  addr: {
    flex: 1,
    gap: 2,
  },
  addrLabel: {
    fontFamily: fonts.publicBold,
    fontSize: 10,
    color: colors.muted,
    letterSpacing: 1,
  },
  addrName: {
    fontFamily: fonts.publicBold,
    fontSize: 15,
    color: colors.text,
  },
  addrLine: {
    fontFamily: fonts.publicMedium,
    fontSize: 12,
    color: colors.muted,
    lineHeight: 17,
  },
  railWrap: {
    paddingLeft: 7,
    paddingVertical: 4,
  },
  rail: {
    width: 2,
    height: 14,
    backgroundColor: '#d1d5db',
    borderRadius: 1,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    backgroundColor: '#fafbfc',
    borderRadius: 14,
    paddingHorizontal: 14,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statDivider: {
    width: 1,
    height: 14,
    backgroundColor: '#d8dbe0',
  },
  statText: {
    fontFamily: fonts.publicSemiBold,
    fontSize: 13,
    color: colors.text,
  },
  earnBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.successSoft,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(34,153,121,0.18)',
  },
  earnLabel: {
    fontFamily: fonts.publicSemiBold,
    fontSize: 11,
    color: colors.muted,
    letterSpacing: 0.8,
  },
  earnAmount: {
    fontFamily: fonts.publicBold,
    fontSize: 22,
    color: colors.success,
  },
  cardActionsHairline: {
    height: 1,
    backgroundColor: colors.borderLight,
    marginTop: 4,
  },
  cardActions: {
    flexDirection: 'row',
    gap: 12,
    paddingTop: 16,
  },
  cardRejectBtn: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: '#cecece',
    borderRadius: 74,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  cardRejectLabel: {
    fontFamily: fonts.publicBold,
    fontSize: 15,
    color: colors.text,
  },
  cardAcceptBtn: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: colors.primary,
    borderRadius: 74,
    paddingVertical: 14,
  },
  cardAcceptLabel: {
    fontFamily: fonts.publicBold,
    fontSize: 15,
    color: colors.white,
  },
  pressed: {
    opacity: 0.9,
  },
});
