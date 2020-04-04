
import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'


import flatlist from '../screens/flatlist';
import leaguesSearch from '../screens/leaguesSearch';
import teamSearch from '../screens/teamSearch';
import playerSearch from '../screens/playerSearch';
import playerDetails from '../screens/playerDetails';

const Stack = createStackNavigator()

function MainStackNavigator() {
    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator screenOptions={{
                headerShown: false
            }} initialRouteName='Country'>
                <Stack.Screen
                    name='Country'
                    component={flatlist}
                />
                <Stack.Screen
                    name='Leagues'
                    component={leaguesSearch}

                />
                <Stack.Screen
                    name='Teams'
                    component={teamSearch}

                />
                <Stack.Screen
                    name='Players'
                    component={playerSearch}

                />
                <Stack.Screen
                    name='playerDetails'
                    component={playerDetails}

                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default MainStackNavigator