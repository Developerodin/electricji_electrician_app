import type { ComponentProps, FC, ReactNode } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  type TextInputProps,
} from 'react-native';
import { colors, fonts } from '../../theme';
import { kycDvScale as KYC_SCALE, kycDeliveryPlatform as Platform } from '../../theme/kycDelivery';

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
    {label ? (
      <Text style={styles.label}>{label}</Text>
    ) : null}
    <View
      style={[
        styles.inputRow,
        multiline && styles.inputRowMulti,
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
    gap: 8,
    width: '100%',
  },
  label: {
    fontFamily: 'PublicSans_600SemiBold',
    fontSize: 14 * KYC_SCALE,
    color: '#000000',
    ...(Platform.OS === 'android' && { includeFontPadding: false }),
  },
  inputRowMulti: {
    alignItems: 'flex-start',
    paddingVertical: 8,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: '#d3d3d3',
    borderRadius: 12,
    paddingHorizontal: 16,
    minHeight: 52,
    justifyContent: 'center',
  },
  inputRowReadonly: {
    backgroundColor: '#fafafa',
    borderColor: '#d3d3d3',
  },
  inputRowError: {
    borderColor: colors.error,
  },
  input: {
    flex: 1,
    paddingVertical: 8,
    fontFamily: 'PublicSans_500Medium',
    fontSize: 16 * KYC_SCALE,
    letterSpacing: 0.192,
    color: colors.text,
    ...(Platform.OS === 'android' && { includeFontPadding: false }),
  },
  inputReadonly: {
    color: colors.textSoft,
  },
  adornment: {
    marginHorizontal: 6,
  },
  helper: {
    fontFamily: fonts.publicRegular,
    fontSize: 12 * KYC_SCALE,
    color: colors.muted,
    marginTop: 2,
  },
  error: {
    fontFamily: fonts.publicSemiBold,
    fontSize: 12 * KYC_SCALE,
    color: colors.error,
    marginTop: 2,
  },
});
