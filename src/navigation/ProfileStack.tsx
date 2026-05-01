import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { FC } from 'react';
import type { ProfileStackParamList } from './types';
import { ProfileMenuScreen } from '../screens/ProfileMenuScreen';
import { PersonalInformationScreen } from '../screens/PersonalInformationScreen';
import { DocumentsScreen } from '../screens/DocumentsScreen';
import { ServiceAreaEditScreen } from '../screens/ServiceAreaEditScreen';
import { SpecializationsEditScreen } from '../screens/SpecializationsEditScreen';
import { AvailabilityScheduleScreen } from '../screens/AvailabilityScheduleScreen';
import { LanguagesScreen } from '../screens/LanguagesScreen';
import { BioAboutScreen } from '../screens/BioAboutScreen';
import { PublicProfilePreviewScreen } from '../screens/PublicProfilePreviewScreen';
import { ReferEarnScreen } from '../screens/ReferEarnScreen';
import { SupportHomeScreen } from '../screens/SupportHomeScreen';
import { FaqListScreen } from '../screens/FaqListScreen';
import { RaiseTicketScreen } from '../screens/RaiseTicketScreen';
import { MyTicketsScreen } from '../screens/MyTicketsScreen';
import { TicketChatScreen } from '../screens/TicketChatScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import { DeleteAccountScreen } from '../screens/DeleteAccountScreen';

const Stack = createNativeStackNavigator<ProfileStackParamList>();

/**
 * Profile tab: menu + settings + support + reuse KYC screens for edits.
 */
export const ProfileStack: FC = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="ProfileMenu" component={ProfileMenuScreen} />
    <Stack.Screen name="PersonalInformation" component={PersonalInformationScreen} />
    <Stack.Screen name="Documents" component={DocumentsScreen} />
    <Stack.Screen name="ServiceAreaEdit" component={ServiceAreaEditScreen} />
    <Stack.Screen name="SpecializationsEdit" component={SpecializationsEditScreen} />
    <Stack.Screen name="AvailabilitySchedule" component={AvailabilityScheduleScreen} />
    <Stack.Screen name="Languages" component={LanguagesScreen} />
    <Stack.Screen name="BioAbout" component={BioAboutScreen} />
    <Stack.Screen name="PublicProfilePreview" component={PublicProfilePreviewScreen} />
    <Stack.Screen name="ReferEarn" component={ReferEarnScreen} />
    <Stack.Screen name="SupportHome" component={SupportHomeScreen} />
    <Stack.Screen name="FaqList" component={FaqListScreen} />
    <Stack.Screen name="RaiseTicket" component={RaiseTicketScreen} />
    <Stack.Screen name="MyTickets" component={MyTicketsScreen} />
    <Stack.Screen name="TicketChat" component={TicketChatScreen} />
    <Stack.Screen name="Settings" component={SettingsScreen} />
    <Stack.Screen name="DeleteAccount" component={DeleteAccountScreen} />
  </Stack.Navigator>
);
