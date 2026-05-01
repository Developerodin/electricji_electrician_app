import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { FC } from 'react';
import { useEffect } from 'react';
import type { RootStackParamList } from './types';
import { MainTabs } from './MainTabs';
import { SplashScreen } from '../screens/SplashScreen';
import { LanguageSelectionScreen } from '../screens/LanguageSelectionScreen';
import { WelcomeCarouselScreen } from '../screens/WelcomeCarouselScreen';
import { PhoneEntryScreen } from '../screens/PhoneEntryScreen';
import { EnterOtpScreen } from '../screens/EnterOtpScreen';
import { PermissionsScreen } from '../screens/PermissionsScreen';
import { OnboardingIntroScreen } from '../screens/OnboardingIntroScreen';
import { PersonalInfoScreen } from '../screens/PersonalInfoScreen';
import { KycSelfieScreen } from '../screens/KycSelfieScreen';
import { KycAadhaarScreen } from '../screens/KycAadhaarScreen';
import { KycPanScreen } from '../screens/KycPanScreen';
import { KycAddressProofScreen } from '../screens/KycAddressProofScreen';
import { KycLivenessScreen } from '../screens/KycLivenessScreen';
import { KycCertificatesScreen } from '../screens/KycCertificatesScreen';
import { KycSpecializationScreen } from '../screens/KycSpecializationScreen';
import { KycServiceAreaScreen } from '../screens/KycServiceAreaScreen';
import { KycBankUpiScreen } from '../screens/KycBankUpiScreen';
import { KycStatusScreen } from '../screens/KycStatusScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const SPLASH_MS = 2200;

/**
 * Splash → Language → … → KYC → Main tabs.
 */
function SplashRoute({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'Splash'>) {
  useEffect(() => {
    const t = setTimeout(() => {
      navigation.replace('LanguageSelection');
    }, SPLASH_MS);
    return () => clearTimeout(t);
  }, [navigation]);
  return <SplashScreen />;
}

/**
 * Full root stack for the electrician prototype.
 */
export const RootNavigator: FC = () => (
  <Stack.Navigator
    initialRouteName="Splash"
    screenOptions={{ headerShown: false, animation: 'fade' }}
  >
    <Stack.Screen name="Splash" component={SplashRoute} />
    <Stack.Screen name="LanguageSelection" component={LanguageSelectionScreen} />
    <Stack.Screen name="WelcomeCarousel" component={WelcomeCarouselScreen} />
    <Stack.Screen name="PhoneEntry" component={PhoneEntryScreen} />
    <Stack.Screen name="EnterOtp" component={EnterOtpScreen} />
    <Stack.Screen name="Permissions" component={PermissionsScreen} />
    <Stack.Screen name="OnboardingIntro" component={OnboardingIntroScreen} />
    <Stack.Screen name="KycPersonal" component={PersonalInfoScreen} />
    <Stack.Screen name="KycSelfie" component={KycSelfieScreen} />
    <Stack.Screen name="KycAadhaar" component={KycAadhaarScreen} />
    <Stack.Screen name="KycPan" component={KycPanScreen} />
    <Stack.Screen name="KycAddressProof" component={KycAddressProofScreen} />
    <Stack.Screen name="KycLiveness" component={KycLivenessScreen} />
    <Stack.Screen name="KycCertificates" component={KycCertificatesScreen} />
    <Stack.Screen name="KycSpecialization" component={KycSpecializationScreen} />
    <Stack.Screen name="KycServiceArea" component={KycServiceAreaScreen} />
    <Stack.Screen name="KycBankUpi" component={KycBankUpiScreen} />
    <Stack.Screen name="KycStatus" component={KycStatusScreen} />
    <Stack.Screen name="MainTabs" component={MainTabs} />
  </Stack.Navigator>
);
