import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { FC } from 'react';
import type { HomeStackParamList } from './types';
import { HomeScreen } from '../screens/HomeScreen';
import { EarningsScreen } from '../screens/EarningsScreen';
import { JobEarningDetailScreen } from '../screens/JobEarningDetailScreen';
import { PayoutsScreen } from '../screens/PayoutsScreen';
import { TaxDocumentsScreen } from '../screens/TaxDocumentsScreen';
import { WalletHomeScreen } from '../screens/WalletHomeScreen';
import { BankUpiManagerScreen } from '../screens/BankUpiManagerScreen';
import { WithdrawalHistoryScreen } from '../screens/WithdrawalHistoryScreen';
import { PerformanceOverviewScreen } from '../screens/PerformanceOverviewScreen';
import { NotificationsCenterScreen } from '../screens/NotificationsCenterScreen';
import { SafetyToolHomeScreen } from '../screens/SafetyToolHomeScreen';
import { InspectionChecklistScreen } from '../screens/InspectionChecklistScreen';
import { ScoreRecommendationsScreen } from '../screens/ScoreRecommendationsScreen';
import { ReportPreviewSendScreen } from '../screens/ReportPreviewSendScreen';
import { InspectionHistoryScreen } from '../screens/InspectionHistoryScreen';

const Stack = createNativeStackNavigator<HomeStackParamList>();

/**
 * Home tab stack: dashboard plus earnings, wallet, safety entry, notifications.
 */
export const HomeStack: FC = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="HomeMain" component={HomeScreen} />
    <Stack.Screen name="EarningsOverview" component={EarningsScreen} />
    <Stack.Screen name="JobEarningDetail" component={JobEarningDetailScreen} />
    <Stack.Screen name="Payouts" component={PayoutsScreen} />
    <Stack.Screen name="TaxDocuments" component={TaxDocumentsScreen} />
    <Stack.Screen name="WalletHome" component={WalletHomeScreen} />
    <Stack.Screen name="BankUpiManager" component={BankUpiManagerScreen} />
    <Stack.Screen name="WithdrawalHistory" component={WithdrawalHistoryScreen} />
    <Stack.Screen name="PerformanceOverview" component={PerformanceOverviewScreen} />
    <Stack.Screen name="NotificationsCenter" component={NotificationsCenterScreen} />
    <Stack.Screen name="SafetyToolHome" component={SafetyToolHomeScreen} />
    <Stack.Screen name="InspectionChecklist" component={InspectionChecklistScreen} />
    <Stack.Screen name="ScoreRecommendations" component={ScoreRecommendationsScreen} />
    <Stack.Screen name="ReportPreviewSend" component={ReportPreviewSendScreen} />
    <Stack.Screen name="InspectionHistory" component={InspectionHistoryScreen} />
  </Stack.Navigator>
);
