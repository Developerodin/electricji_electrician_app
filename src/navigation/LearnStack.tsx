import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { FC } from 'react';
import type { LearnStackParamList } from './types';
import { CourseCatalogScreen } from '../screens/CourseCatalogScreen';
import { CourseDetailScreen } from '../screens/CourseDetailScreen';
import { LessonPlayerScreen } from '../screens/LessonPlayerScreen';
import { QuizScreen } from '../screens/QuizScreen';
import { MyBadgesScreen } from '../screens/MyBadgesScreen';

const Stack = createNativeStackNavigator<LearnStackParamList>();

/**
 * Learn & certify stack (Section I).
 */
export const LearnStack: FC = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="CourseCatalog" component={CourseCatalogScreen} />
    <Stack.Screen name="CourseDetail" component={CourseDetailScreen} />
    <Stack.Screen name="LessonPlayer" component={LessonPlayerScreen} />
    <Stack.Screen name="Quiz" component={QuizScreen} />
    <Stack.Screen name="MyBadges" component={MyBadgesScreen} />
  </Stack.Navigator>
);
