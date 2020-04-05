import React from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, SafeAreaView } from 'react-native';
import {Button,Icon,Header,HeaderIcon, Overlay,Card, SocialIcon} from 'react-native-elements'
import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'


import Statistics from './Components/Scores/Statistics.js';
import MainScreen from './routes/topBar';
import Exploring from './screens/explore';



function Scores() {
    return(
        
          <MainScreen/>
        
    )
}
function Favourites() {
    return(
        <View style={{alignItems:'center'}}>
          <Text>Favourites</Text>
        </View>
    )
}
function Explore(){
  return(
    <Exploring/>
  )
}


const BottomTabs =  createMaterialBottomTabNavigator({
  Scores:{
    screen: Scores,
    navigationOptions:{
      tabBarLabel:'Scores',
      tabBarIcon:({tintColor})=>(
        <Icon name="ios-football" type='ionicon' size={30} color={tintColor} />
      )
    }},
  Favourites:{
    screen: Favourites,
    navigationOptions:{
      tabBarLabel:'Favourites',
      tabBarIcon:({tintColor})=>(
        <Icon name="ios-heart-empty" type='ionicon' size={30} color={tintColor}/>
      )
    }},
  Explore:{
    screen: Explore,
    navigationOptions:{
      tabBarLabel:'Explore',
      tabBarIcon:({tintColor})=>(
        <Icon name="ios-search" type='ionicon' size={30} color={tintColor}/>
      )
    }},
},{
  initialRouteName:'Scores',
  activeTintColor:'orange',
  tintColor:'orange',
  
})

export default function App() {
  return (
   <View style={{ flex: 1 }}>
    <NavigationContainer>
<BottomTabs/>
    </NavigationContainer>
    </View>

);
  }