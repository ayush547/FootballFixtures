import React from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, SafeAreaView } from 'react-native';
import {Button,Icon,Header,HeaderIcon, Overlay,Card, SocialIcon} from 'react-native-elements'
import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import {createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'

import Statistics from './Components/Scores/Statistics.js';
import Scroll from './Components/Scores/Scroll.js'
import TvShow from './Components/Scores/Show.js';



function Scores() {
    return(
        <View>
          <Statistics />
        </View>
    )
}
function Favourites() {
    return(
        <View style={{alignItems:'center'}}>
          <Text>Favourites</Text>
        </View>
    )
}
function Explore() {
    return(
      <View style={{alignItems:'center'}}>
      <Text>Explore</Text>
    </View>
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
 <Header
      barStyle='dark-content'
      backgroundColor="#353547"
      placement='left'
    leftComponent={ <Icon name='menu' color='#fff' /> }
    centerComponent={{ text: 'Football', style: { color: '#fff',fontSize:18,fontFamily:'notoserif',fontWeight:'700' } }}
    rightComponent={{ icon: 'settings', color: '#fff' }}
    style={{marginVertical:40}}
  />

  <BottomTabs />  
  
  {/* <Scroll />
  <TvShow /> */}

</View>

  )
}