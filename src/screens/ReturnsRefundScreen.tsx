import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { FC } from 'react';
import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import type { WholesaleStackParamList } from '../navigation/types';
import {
  AppButton,
  BottomCtaBar,
  Chip,
  FormField,
  ScreenHeader,
  ScreenScaffold,
  SectionTitle,
  UploadCard,
} from '../components/ui';
import { colors, spacing } from '../theme';

type Props = NativeStackScreenProps<WholesaleStackParamList, 'ReturnsRefund'>;

const REASONS = [
  'Damaged in transit',
  'Wrong item delivered',
  'Doesn’t match description',
  'No longer needed',
  'Quality issues',
];

/**
 * Spec #49 — Returns / refund form with reason chips + photo upload.
 */
export const ReturnsRefundScreen: FC<Props> = ({ navigation }) => {
  const [reason, setReason] = useState<string | null>(null);
  const [comment, setComment] = useState('');
  const [photo1, setPhoto1] = useState(false);
  const [photo2, setPhoto2] = useState(false);

  const submit = () => {
    Alert.alert(
      'Return submitted',
      'We’ll review and get back within 24 hours.',
    );
    navigation.goBack();
  };

  return (
    <ScreenScaffold>
      <ScreenHeader title="Return item" onBack={() => navigation.goBack()} />
      <ScrollView
        contentContainerStyle={styles.body}
        showsVerticalScrollIndicator={false}
      >
        <SectionTitle title="Reason" caption="Select one" />
        <View style={styles.row}>
          {REASONS.map((r) => (
            <Chip
              key={r}
              label={r}
              selected={reason === r}
              onPress={() => setReason(r)}
            />
          ))}
        </View>

        <FormField
          label="Tell us more"
          multiline
          value={comment}
          onChangeText={setComment}
          placeholder="Describe what went wrong"
        />

        <SectionTitle title="Photos" caption="Up to 2 (optional)" />
        <UploadCard
          title="Photo 1"
          subtitle="Tap to attach (dummy)"
          uploaded={photo1}
          onPress={() => setPhoto1(true)}
          icon="camera-outline"
        />
        <UploadCard
          title="Photo 2"
          subtitle="Tap to attach (dummy)"
          uploaded={photo2}
          onPress={() => setPhoto2(true)}
          icon="camera-outline"
        />
      </ScrollView>
      <BottomCtaBar>
        <AppButton
          label="Submit return"
          onPress={submit}
          disabled={!reason}
          block
          leftIcon={
            <Ionicons name="paper-plane-outline" size={16} color={colors.white} />
          }
        />
      </BottomCtaBar>
    </ScreenScaffold>
  );
};

const styles = StyleSheet.create({
  body: {
    padding: spacing.lg,
    gap: spacing.md,
    paddingBottom: spacing.xxxl,
  },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
});
