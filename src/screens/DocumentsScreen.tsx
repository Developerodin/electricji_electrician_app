import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { FC } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import type { ProfileStackParamList } from '../navigation/types';
import {
  AppButton,
  AppCard,
  ScreenHeader,
  ScreenScaffold,
  SectionTitle,
  Tag,
} from '../components/ui';
import { colors, fonts, radii, scaleFont, spacing } from '../theme';

type Props = NativeStackScreenProps<ProfileStackParamList, 'Documents'>;

type Doc = {
  name: string;
  meta: string;
  status: 'verified' | 'expiring' | 'pending' | 'rejected';
};

const DOCS: Doc[] = [
  { name: 'Aadhaar', meta: 'XXXX XXXX 8842', status: 'verified' },
  { name: 'PAN', meta: 'ABCDE1234F', status: 'verified' },
  {
    name: 'Police verification',
    meta: 'Expires in 12 days',
    status: 'expiring',
  },
  { name: 'Trade license', meta: 'Not uploaded', status: 'pending' },
];

const STATUS: Record<Doc['status'], { tag: 'success' | 'warning' | 'info' | 'danger'; label: string }> = {
  verified: { tag: 'success', label: 'Verified' },
  expiring: { tag: 'warning', label: 'Expiring soon' },
  pending: { tag: 'info', label: 'Not uploaded' },
  rejected: { tag: 'danger', label: 'Rejected' },
};

/**
 * Spec #63 — Documents list with statuses.
 */
export const DocumentsScreen: FC<Props> = ({ navigation }) => (
  <ScreenScaffold>
    <ScreenHeader title="Documents" onBack={() => navigation.goBack()} />
    <ScrollView
      contentContainerStyle={styles.list}
      showsVerticalScrollIndicator={false}
    >
      <SectionTitle
        title="Identity & verification"
        caption="Keep these up to date"
      />
      {DOCS.map((d) => {
        const meta = STATUS[d.status];
        return (
          <AppCard key={d.name}>
            <View style={styles.row}>
              <View style={styles.iconWrap}>
                <Ionicons
                  name="document-text"
                  size={20}
                  color={colors.primary}
                />
              </View>
              <View style={styles.col}>
                <Text style={styles.title}>{d.name}</Text>
                <Text style={styles.meta}>{d.meta}</Text>
                <Tag label={meta.label} tone={meta.tag} />
              </View>
            </View>
            <AppButton
              label={d.status === 'verified' ? 'Replace' : 'Re-upload'}
              variant="outline"
              size="sm"
              onPress={() => {}}
              style={styles.cta}
            />
          </AppCard>
        );
      })}
    </ScrollView>
  </ScreenScaffold>
);

const styles = StyleSheet.create({
  list: {
    padding: spacing.lg,
    gap: spacing.md,
    paddingBottom: spacing.xxxl,
  },
  row: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: radii.md,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  col: { flex: 1, gap: 4 },
  title: {
    fontFamily: fonts.publicBold,
    fontSize: scaleFont(15),
    color: colors.text,
  },
  meta: {
    fontFamily: fonts.publicRegular,
    fontSize: scaleFont(12.5),
    color: colors.muted,
  },
  cta: {
    marginTop: spacing.md,
    alignSelf: 'flex-start',
  },
});
