
import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'


import flatlist from '../screens/flatlist';
import leaguesSearch from '../screens/leaguesSearch';
import teamSearch from '../screens/teamSearch';
import playerSearch from '../screens/playerSearch';
import playerDetails from '../screens/playerDetails';
import { BackHandler } from 'react-native';

const Stack = createStackNavigator()

function MainStackNavigator() {
    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator screenOptions={{
                headerShown: true
            }} initialRouteName='Country'>
                <Stack.Screen
                    name='Country'
                    component={flatlist}
                    options={{headerTintColor:"#fff",headerStyle:{backgroundColor:"#353547"}}}
                />
                <Stack.Screen
                    name='Leagues'
                    component={leaguesSearch}
                    options={{headerTintColor:"#fff",headerStyle:{backgroundColor:"#353547"}}}
                />
                <Stack.Screen
                    name='Teams'
                    component={teamSearch}
                    options={{headerTintColor:"#fff",headerStyle:{backgroundColor:"#353547"}}}
                />
                <Stack.Screen
                    name='Players'
                    component={playerSearch}
                    options={{headerTintColor:"#fff",headerStyle:{backgroundColor:"#353547"}}}
                />
                <Stack.Screen
                    name='playerDetails'
                    component={playerDetails}
                    options={{headerTintColor:"#fff",headerStyle:{backgroundColor:"#353547"}}}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default MainStackNavigator