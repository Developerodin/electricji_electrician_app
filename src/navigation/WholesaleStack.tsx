import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { FC } from 'react';
import type { WholesaleStackParamList } from './types';
import { MarketplaceHomeScreen } from '../screens/MarketplaceHomeScreen';
import { CategoryListingScreen } from '../screens/CategoryListingScreen';
import { SearchFilterScreen } from '../screens/SearchFilterScreen';
import { ProductDetailScreen } from '../screens/ProductDetailScreen';
import { CartScreen } from '../screens/CartScreen';
import { CheckoutScreen } from '../screens/CheckoutScreen';
import { OrderConfirmationScreen } from '../screens/OrderConfirmationScreen';
import { OrderTrackingScreen } from '../screens/OrderTrackingScreen';
import { OrderHistoryScreen } from '../screens/OrderHistoryScreen';
import { ReturnsRefundScreen } from '../screens/ReturnsRefundScreen';

const Stack = createNativeStackNavigator<WholesaleStackParamList>();

/**
 * Wholesale marketplace stack (Section H).
 */
export const WholesaleStack: FC = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="MarketplaceHome" component={MarketplaceHomeScreen} />
    <Stack.Screen name="CategoryListing" component={CategoryListingScreen} />
    <Stack.Screen name="SearchFilter" component={SearchFilterScreen} />
    <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
    <Stack.Screen name="Cart" component={CartScreen} />
    <Stack.Screen name="Checkout" component={CheckoutScreen} />
    <Stack.Screen name="OrderConfirmation" component={OrderConfirmationScreen} />
    <Stack.Screen name="OrderTracking" component={OrderTrackingScreen} />
    <Stack.Screen name="OrderHistory" component={OrderHistoryScreen} />
    <Stack.Screen name="ReturnsRefund" component={ReturnsRefundScreen} />
  </Stack.Navigator>
);
