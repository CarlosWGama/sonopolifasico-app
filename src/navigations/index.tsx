import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/home';
import NewCycleScreen from '../screens/new-cycle';

const Stack = createStackNavigator();

export default function MainNavigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name="home" component={HomeScreen} />
                <Stack.Screen name="new_cycle" component={NewCycleScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}