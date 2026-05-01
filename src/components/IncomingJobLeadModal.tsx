import { Ionicons } from '@expo/vector-icons';
import type { FC } from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  Modal,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { MOCK_LEADS } from '../mocks';
import { colors, fonts, radii, scaleFont, shadows, spacing } from '../theme';
import { AppButton } from './ui/Button';

export type IncomingJobLeadModalProps = {
  visible: boolean;
  onClose: () => void;
  onAccept: () => void;
  onReject: () => void;
};

const COUNTDOWN = 30;

/**
 * Spec #21 — incoming job lead modal with countdown progress and entrance animation.
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
      duration: 220,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
    const t = setInterval(() => setLeft((s) => (s <= 0 ? 0 : s - 1)), 1000);
    return () => clearInterval(t);
  }, [slide, visible]);

  useEffect(() => {
    if (visible && left === 0) {
      onClose();
    }
  }, [left, onClose, visible]);

  const progress = useMemo(() => left / COUNTDOWN, [left]);

  const translateY = slide.interpolate({
    inputRange: [0, 1],
    outputRange: [40, 0],
  });

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.backdrop}>
        <Animated.View
          style={[
            styles.sheet,
            shadows.lg,
            { opacity: slide, transform: [{ translateY }] },
          ]}
          accessibilityViewIsModal
        >
          <View style={styles.headRow}>
            <View style={styles.headTitleCol}>
              <View style={styles.tagRow}>
                <View style={styles.liveDot} />
                <Text style={styles.tagTxt}>NEW LEAD</Text>
              </View>
              <Text style={styles.title}>Job available near you</Text>
            </View>
            <View style={styles.timerWrap}>
              <Text style={styles.timerTxt}>{left}</Text>
              <Text style={styles.timerUnit}>s</Text>
            </View>
          </View>

          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { flex: progress }]} />
            <View style={[styles.progressRest, { flex: 1 - progress }]} />
          </View>

          <View style={styles.bodyRow}>
            <View style={styles.iconWrap}>
              <Ionicons
                name="construct-outline"
                size={26}
                color={colors.primary}
              />
            </View>
            <View style={styles.bodyCol}>
              <Text style={styles.service}>{lead.serviceType}</Text>
              <Text style={styles.meta}>{lead.area}</Text>
            </View>
            <View style={styles.payoutCol}>
              <Text style={styles.payout}>{lead.payout}</Text>
              {lead.surge ? (
                <Text style={styles.surge}>{lead.surge}</Text>
              ) : null}
            </View>
          </View>

          <View style={styles.metaRow}>
            <View style={styles.metaPill}>
              <Ionicons
                name="hourglass-outline"
                size={12}
                color={colors.muted}
              />
              <Text style={styles.metaPillTxt}>{lead.durationMin}m</Text>
            </View>
            <View style={styles.metaPill}>
              <Ionicons name="star" size={12} color={colors.muted} />
              <Text style={styles.metaPillTxt}>{lead.customerRating}</Text>
            </View>
            <View style={styles.metaPill}>
              <Ionicons name="time-outline" size={12} color={colors.muted} />
              <Text style={styles.metaPillTxt}>{lead.timeLabel}</Text>
            </View>
          </View>

          <View style={styles.actions}>
            <AppButton
              label="Reject"
              variant="outline"
              onPress={onReject}
              style={styles.flex}
            />
            <AppButton
              label="Accept"
              onPress={onAccept}
              style={styles.flex}
              rightIcon={
                <Ionicons name="arrow-forward" size={16} color={colors.white} />
              }
            />
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: 'flex-end',
    padding: spacing.lg,
  },
  sheet: {
    backgroundColor: colors.white,
    borderRadius: radii.lg,
    padding: spacing.lg,
    gap: spacing.sm + 2,
    marginBottom: spacing.lg,
  },
  headRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  headTitleCol: { flex: 1, gap: spacing.xs },
  tagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    backgroundColor: colors.primarySoft,
    borderRadius: radii.pill,
  },
  liveDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: colors.primary,
  },
  tagTxt: {
    fontFamily: fonts.publicBold,
    fontSize: scaleFont(10.5),
    color: colors.primary,
    letterSpacing: 0.6,
  },
  title: {
    fontFamily: fonts.publicBold,
    fontSize: scaleFont(18),
    color: colors.text,
  },
  timerWrap: {
    width: 56,
    height: 56,
    borderRadius: radii.pill,
    borderWidth: 3,
    borderColor: colors.primary,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  timerTxt: {
    fontFamily: fonts.publicBold,
    fontSize: scaleFont(18),
    color: colors.primary,
  },
  timerUnit: {
    fontFamily: fonts.publicSemiBold,
    fontSize: scaleFont(11),
    color: colors.primary,
    marginTop: 6,
    marginLeft: 1,
  },
  progressTrack: {
    flexDirection: 'row',
    height: 5,
    borderRadius: radii.pill,
    overflow: 'hidden',
    backgroundColor: colors.borderLight,
  },
  progressFill: {
    backgroundColor: colors.primary,
  },
  progressRest: {},
  bodyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingTop: spacing.sm,
  },
  iconWrap: {
    width: 48,
    height: 48,
    borderRadius: radii.md,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bodyCol: { flex: 1, gap: 2 },
  service: {
    fontFamily: fonts.publicBold,
    fontSize: scaleFont(16),
    color: colors.text,
  },
  meta: {
    fontFamily: fonts.publicRegular,
    fontSize: scaleFont(13),
    color: colors.muted,
  },
  payoutCol: { alignItems: 'flex-end' },
  payout: {
    fontFamily: fonts.publicBold,
    fontSize: scaleFont(20),
    color: colors.primary,
  },
  surge: {
    fontFamily: fonts.publicSemiBold,
    fontSize: scaleFont(11.5),
    color: colors.success,
    marginTop: 2,
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
  metaPillTxt: {
    fontFamily: fonts.publicMedium,
    fontSize: scaleFont(11.5),
    color: colors.textSoft,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.xs,
  },
  flex: { flex: 1 },
});
