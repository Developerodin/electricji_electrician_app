import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { FC } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import type { HomeStackParamList } from '../navigation/types';
import {
  AppButton,
  AppCard,
  BottomCtaBar,
  ListRow,
  ScreenHeader,
  ScreenScaffold,
  SectionTitle,
} from '../components/ui';
import { colors, fonts, radii, scaleFont, spacing } from '../theme';

type Props = NativeStackScreenProps<HomeStackParamList, 'ReportPreviewSend'>;

/**
 * Spec #58 — Inspection report preview with send-via channels.
 */
export const ReportPreviewSendScreen: FC<Props> = ({ navigation }) => {
  const send = (channel: string) => () =>
    Alert.alert('Sent', `Report shared via ${channel}`);

  return (
    <ScreenScaffold>
      <ScreenHeader title="Report" onBack={() => navigation.goBack()} />
      <ScrollView
        contentContainerStyle={styles.body}
        showsVerticalScrollIndicator={false}
      >
        <SectionTitle title="Preview" />
        <View style={styles.preview}>
          <View style={styles.previewBadge}>
            <Ionicons name="document-text" size={32} color={colors.white} />
          </View>
          <Text style={styles.previewTitle}>Inspection_Sharma_2024.pdf</Text>
          <Text style={styles.previewMeta}>3 pages · 412 KB</Text>
        </View>

        <SectionTitle title="Send via" />
        <AppCard padded={false}>
          <ListRow
            title="WhatsApp"
            subtitle="Customer’s saved number"
            icon="logo-whatsapp"
            onPress={send('WhatsApp')}
            position="first"
          />
          <ListRow
            title="Email"
            subtitle="ravi.sharma@example.com"
            icon="mail-outline"
            onPress={send('Email')}
          />
          <ListRow
            title="SMS"
            subtitle="+91 98xxxxxx21"
            icon="chatbox-outline"
            onPress={send('SMS')}
          />
          <ListRow
            title="Download PDF"
            subtitle="Save to your device"
            icon="cloud-download-outline"
            onPress={send('Download')}
            position="last"
          />
        </AppCard>
      </ScrollView>

      <BottomCtaBar floating>
        <AppButton
          label="Done"
          variant="outline"
          onPress={() => navigation.navigate('SafetyToolHome')}
          block
        />
      </BottomCtaBar>
    </ScreenScaffold>
  );
};

const styles = StyleSheet.create({
  body: { padding: spacing.lg, gap: spacing.md, paddingBottom: 140 },
  preview: {
    height: 220,
    borderRadius: radii.lg,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.borderLight,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  previewBadge: {
    width: 64,
    height: 64,
    borderRadius: radii.md,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  previewTitle: {
    fontFamily: fonts.publicBold,
    fontSize: scaleFont(15),
    color: colors.text,
  },
  previewMeta: {
    fontFamily: fonts.publicMedium,
    fontSize: scaleFont(12.5),
    color: colors.muted,
  },
});
