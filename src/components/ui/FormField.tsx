import type { ComponentProps, FC, ReactNode } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  type TextInputProps,
} from 'react-native';
import { colors, fonts, radii, scaleFont, spacing } from '../../theme';

export type FormFieldProps = TextInputProps & {
  label: string;
  error?: string;
  helper?: string;
  rightAdornment?: ReactNode;
  leftAdornment?: ReactNode;
  multilineHeight?: number;
};

/**
 * Labelled text input with consistent height, focus ring, optional adornment.
 */
export const FormField: FC<FormFieldProps> = ({
  label,
  error,
  helper,
  rightAdornment,
  leftAdornment,
  style,
  multiline,
  multilineHeight = 96,
  editable = true,
  ...rest
}) => (
  <View style={styles.wrap}>
    {label ? <Text style={styles.label}>{label}</Text> : null}
    <View
      style={[
        styles.inputRow,
        !editable && styles.inputRowReadonly,
        Boolean(error) && styles.inputRowError,
      ]}
    >
      {leftAdornment ? <View style={styles.adornment}>{leftAdornment}</View> : null}
      <TextInput
        editable={editable}
        placeholderTextColor={colors.mutedSoft}
        multiline={multiline}
        style={[
          styles.input,
          multiline && { minHeight: multilineHeight, textAlignVertical: 'top' },
          !editable && styles.inputReadonly,
          style as TextInputProps['style'],
        ]}
        {...(rest as ComponentProps<typeof TextInput>)}
      />
      {rightAdornment ? <View style={styles.adornment}>{rightAdornment}</View> : null}
    </View>
    {error ? (
      <Text style={styles.error}>{error}</Text>
    ) : helper ? (
      <Text style={styles.helper}>{helper}</Text>
    ) : null}
  </View>
);

const styles = StyleSheet.create({
  wrap: {
    gap: spacing.xs,
  },
  label: {
    fontFamily: fonts.publicSemiBold,
    fontSize: scaleFont(12.5),
    color: colors.muted,
    letterSpacing: 0.3,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderWidth: 1.25,
    borderColor: colors.border,
    borderRadius: radii.md,
    paddingHorizontal: spacing.md,
    minHeight: 50,
  },
  inputRowReadonly: {
    backgroundColor: colors.surfaceAlt,
    borderColor: colors.borderLight,
  },
  inputRowError: {
    borderColor: colors.error,
  },
  input: {
    flex: 1,
    paddingVertical: spacing.md - 2,
    fontFamily: fonts.publicMedium,
    fontSize: scaleFont(15),
    color: colors.text,
  },
  inputReadonly: {
    color: colors.textSoft,
  },
  adornment: {
    marginHorizontal: spacing.xs,
  },
  helper: {
    fontFamily: fonts.publicRegular,
    fontSize: scaleFont(11.5),
    color: colors.muted,
    marginTop: 2,
  },
  error: {
    fontFamily: fonts.publicSemiBold,
    fontSize: scaleFont(11.5),
    color: colors.error,
    marginTop: 2,
  },
});
