import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { FC } from 'react';
import type { JobsStackParamList } from './types';
import { JobLeadInboxScreen } from '../screens/JobLeadInboxScreen';
import { LeadAcceptedScreen } from '../screens/LeadAcceptedScreen';
import { EnRouteScreen } from '../screens/EnRouteScreen';
import { ArrivalConfirmationScreen } from '../screens/ArrivalConfirmationScreen';
import { JobStartOtpScreen } from '../screens/JobStartOtpScreen';
import { JobInProgressScreen } from '../screens/JobInProgressScreen';
import { MarkCompleteScreen } from '../screens/MarkCompleteScreen';
import { FinalInvoiceScreen } from '../screens/FinalInvoiceScreen';
import { JobEndOtpScreen } from '../screens/JobEndOtpScreen';
import { UploadProofScreen } from '../screens/UploadProofScreen';
import { JobSummaryScreen } from '../screens/JobSummaryScreen';
import { SosModalScreen } from '../screens/SosModalScreen';

const Stack = createNativeStackNavigator<JobsStackParamList>();

/**
 * Jobs tab stack: lead inbox + active job linear flow + SOS modal.
 */
export const JobsStack: FC = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="JobLeadInbox" component={JobLeadInboxScreen} />
    <Stack.Screen name="LeadAccepted" component={LeadAcceptedScreen} />
    <Stack.Screen name="EnRoute" component={EnRouteScreen} />
    <Stack.Screen name="ArrivalConfirmation" component={ArrivalConfirmationScreen} />
    <Stack.Screen name="StartOtp" component={JobStartOtpScreen} />
    <Stack.Screen name="JobInProgress" component={JobInProgressScreen} />
    <Stack.Screen name="MarkComplete" component={MarkCompleteScreen} />
    <Stack.Screen name="FinalInvoice" component={FinalInvoiceScreen} />
    <Stack.Screen name="EndOtp" component={JobEndOtpScreen} />
    <Stack.Screen name="UploadProof" component={UploadProofScreen} />
    <Stack.Screen name="JobSummary" component={JobSummaryScreen} />
    <Stack.Screen
      name="SosModal"
      component={SosModalScreen}
      options={{ presentation: 'modal' }}
    />
  </Stack.Navigator>
);
