import type { FC } from 'react';
import { createRef, useEffect, useMemo, useRef } from 'react';
import {
  Keyboard,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { colors, fonts } from '../../theme';

const BORDER = '#e5e7eb';

export type OtpInputProps = {
  length: number;
  value: string;
  onChange: (next: string) => void;
  onComplete?: (code: string) => void;
  autoFocus?: boolean;
  error?: string;
  label?: string;
  helper?: string;
  disabled?: boolean;
};

/**
 * Multi-box OTP — layout and focus behaviour aligned with delivery `OTPInput`
 * (border fill state, error tint, label/helper).
 */
export const OtpInput: FC<OtpInputProps> = ({
  length,
  value,
  onChange,
  onComplete,
  autoFocus = true,
  error,
  label,
  helper,
  disabled = false,
}) => {
  const refs = useMemo(
    () => Array.from({ length }, () => createRef<TextInput>()),
    [length],
  );
  const completeFired = useRef(false);

  useEffect(() => {
    if (autoFocus && !disabled) {
      const t = setTimeout(() => refs[0]?.current?.focus(), 150);
      return () => clearTimeout(t);
    }
  }, [autoFocus, disabled, refs]);

  useEffect(() => {
    if (value.length === length && !completeFired.current) {
      completeFired.current = true;
      Keyboard.dismiss();
      onComplete?.(value);
    }
    if (value.length < length) completeFired.current = false;
  }, [value, length, onComplete]);

  const setAt = (index: number, char: string) => {
    const cleaned = char.replace(/[^0-9]/g, '').slice(0, 1);
    const chars = value.padEnd(length, ' ').split('');
    chars[index] = cleaned || ' ';
    const next = chars.join('').trimEnd();
    onChange(next);
    if (cleaned && index < length - 1) {
      refs[index + 1]?.current?.focus();
    }
  };

  const handleKey = (index: number, key: string) => {
    if (key === 'Backspace') {
      if (!value[index] && index > 0) {
        refs[index - 1]?.current?.focus();
      }
      const chars = value.padEnd(length, ' ').split('');
      chars[index] = ' ';
      onChange(chars.join('').trimEnd());
    }
  };

  return (
    <View style={styles.wrap}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <View style={styles.row}>
        {Array.from({ length }).map((_, i) => {
          const ch = value[i] ?? '';
          const filled = ch.trim().length > 0;
          return (
            <TextInput
              key={i}
              ref={refs[i]}
              editable={!disabled}
              keyboardType="number-pad"
              maxLength={1}
              selectTextOnFocus
              value={ch}
              onChangeText={(t) => setAt(i, t)}
              onKeyPress={({ nativeEvent }) => handleKey(i, nativeEvent.key)}
              style={[
                styles.cell,
                length <= 4 && styles.cellWide,
                filled && styles.cellFilled,
                !!error && styles.cellError,
                disabled && styles.cellDisabled,
              ]}
              textAlign="center"
              accessibilityLabel={`OTP digit ${i + 1}`}
            />
          );
        })}
      </View>
      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : helper ? (
        <Text style={styles.helper}>{helper}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    gap: 10,
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
  },
  label: {
    fontFamily: fonts.publicSemiBold,
    fontSize: 14,
    color: colors.text,
    letterSpacing: 0.2,
  },
  row: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'space-between',
  },
  cell: {
    flex: 1,
    maxWidth: 54,
    minHeight: 52,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: BORDER,
    backgroundColor: colors.white,
    fontFamily: fonts.publicBold,
    fontSize: 22,
    color: colors.text,
    padding: 0,
    ...(Platform.OS === 'android' && {
      includeFontPadding: false,
      textAlignVertical: 'center',
    }),
  },
  cellWide: {
    maxWidth: 72,
    minHeight: 56,
    fontSize: 24,
  },
  cellFilled: {
    borderColor: colors.primary,
  },
  cellError: {
    borderColor: colors.primary,
    backgroundColor: colors.errorSoft,
  },
  cellDisabled: {
    backgroundColor: '#f3f4f6',
    color: colors.muted,
  },
  helper: {
    fontFamily: fonts.publicMedium,
    fontSize: 13,
    color: colors.muted,
    lineHeight: 18,
  },
  errorText: {
    fontFamily: fonts.publicSemiBold,
    fontSize: 13,
    color: colors.primary,
  },
});
