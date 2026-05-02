import { Dimensions, Platform } from 'react-native';

/** Design width baseline (matches delivery KYC / Vehicle screens). */
export const KYC_DV_W = 412;

const { width: SCREEN_W } = Dimensions.get('window');

export const kycDvScale = SCREEN_W / KYC_DV_W;

export const DV_RED = '#d9232d';
export const DV_TEXT = '#202020';
export const DV_MUTED = '#77878f';

export const kycDeliveryPlatform = Platform;
