import type { FC } from 'react';
import { useRef, useState } from 'react';
import {
  Pressable,
  StyleSheet,
  TextInput,
  View,
  type TextInput as RNTextInput,
} from 'react-native';
import { colors, fonts, scaleFont, spacing } from '../../theme';

export type OtpInputProps = {
  length: number;
  onComplete?: (otp: string) => void;
  cellWidth?: number;
  accessibilityLabelPrefix?: string;
};

/**
 * Multi-digit OTP boxes with auto-advance focus.
 */
export const OtpInput: FC<OtpInputProps> = ({
  length,
  onComplete,
  cellWidth = 44,
  accessibilityLabelPrefix = 'OTP digit',
}) => {
  const [digits, setDigits] = useState<string[]>(() =>
    Array.from({ length }, () => ''),
  );
  const refs = useRef<(RNTextInput | null)[]>([]);

  const setDigit = (index: number, value: string) => {
    const d = value.replace(/\D/g, '').slice(-1);
    const next = [...digits];
    next[index] = d;
    setDigits(next);
    if (d && index < length - 1) {
      refs.current[index + 1]?.focus();
    }
    const joined = next.join('');
    if (joined.length === length) {
      onComplete?.(joined);
    }
  };

  const onKeyPress = (index: number, key: string) => {
    if (key === 'Backspace' && !digits[index] && index > 0) {
      refs.current[index - 1]?.focus();
    }
  };

  return (
    <View style={styles.row}>
      {digits.map((digit, i) => (
        <Pressable
          key={i}
          onPress={() => refs.current[i]?.focus()}
          accessibilityRole="button"
          accessibilityLabel={`${accessibilityLabelPrefix} ${i + 1}`}
        >
          <TextInput
            ref={(r) => {
              refs.current[i] = r;
            }}
            value={digit}
            onChangeText={(t) => setDigit(i, t)}
            onKeyPress={({ nativeEvent }) => onKeyPress(i, nativeEvent.key)}
            keyboardType="number-pad"
            maxLength={1}
            style={[styles.cell, { width: cellWidth, minHeight: cellWidth * 0.95 }]}
            textAlign="center"
            accessibilityLabel={`${accessibilityLabelPrefix} ${i + 1}`}
            underlineColorAndroid="transparent"
          />
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    justifyContent: 'center',
  },
  cell: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    fontFamily: fonts.publicSemiBold,
    fontSize: scaleFont(20),
    color: colors.text,
    backgroundColor: colors.white,
  },
});
