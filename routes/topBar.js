import React,{useState} from 'react';
import {View,Text} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator, HeaderTitle } from '@react-navigation/stack';
import { Icon } from 'react-native-elements';
import DateC from '../screens/dateClassifier';
import Days from '../screens/days';
import DatePicker from '../screens/DatePicker';
import Day from '../screens/live';
import Fixtures from '../screens/fixtures';
import Standings from '../screens/standings';

import Statistics from '../Components/Scores/Statistics'

const Today=createStackNavigator();
function TopScreen(){
  return(

     <Today.Navigator headerMode="screen"  > 
        <Today.Screen name='Football' component={TopTab} options={{headerRight:()=>{return <Icon name='ios-settings' type='ionicon' color='#353547' size={30}  /> } }} />
        <Today.Screen name='Fixtures' component={Fixtures} options={{headerRight:()=>{return <Icon name='ios-settings' type='ionicon' color='#353547' size={30} /> }}} />
        <Today.Screen name='Standings' component={Standings} options={{ headerRight:()=>{return <Icon name='ios-settings' type='ionicon' color='#353547' size={30} /> }}}/>
        <Today.Screen name='Statistics' component={Statistics} options={{ headerRight:()=>{return <Icon name='ios-settings' type='ionicon' color='#353547' size={30} /> }}}/>
      </Today.Navigator>
    
  );
}

const dayLive=()=>{return <Day param={DateC('Today',0).CheckDate} islive='1' />};
const day1=({navigation})=>{return <Days param={DateC('sub',2).CheckDate} islive='0' navig={navigation}/>};
 const day2=({navigation})=>{return <Days param={DateC('sub',1).CheckDate} islive='0' navig={navigation}/>};
 const day3=({navigation})=>{return <Days param={DateC('Today',0).CheckDate} islive='0'navig={navigation} />};
 const day4=({navigation})=>{return <Days param={DateC('add',1).CheckDate} islive='0'navig={navigation}/>};
 const day5=({navigation})=>{return <Days param={DateC('add',2).CheckDate} islive='0'navig={navigation}/>};
 const cal=({navigation})=>{return <Days param={DateC('Today',0).CheckDate} islive='0'navig={navigation}/>};

const TimeLineStack=createMaterialTopTabNavigator();
function TopTab(){
return(
<TimeLineStack.Navigator
tabBarOptions= {{
    labelStyle: { fontSize: 10,fontWeight:'bold'},
    tabStyle: {padding:6},
    showIcon:true,
    showLabel:true,
    indicatorStyle:{backgroundColor:'coral'},
    style: { backgroundColor: 'white'},
    activeTintColor:'coral',
    inactiveTintColor:'black'
  }} >
  <TimeLineStack.Screen name='Live' component={dayLive} options={({navigation})=>({tabBarIcon:({tintColor})=>{return <Icon
        name='access-alarm'
        type='MaterialIcons'
        color='#f50'
        />}})}/>
 <TimeLineStack.Screen name={DateC('sub',2).Cdate} component={day1} options={({navigation})=>({tabBarIcon:({tintColor})=>{return <View style={{marginTop:10}}><Text style={{fontSize:10,fontWeight:'bold',color:'#f50'}}>{DateC('sub',2).Cday}</Text></View>}})}/>
   <TimeLineStack.Screen name={DateC('sub',1).Cdate} component={day2} options={({navigation})=>({tabBarIcon:({tintColor})=>{return <View style={{marginTop:10}}><Text style={{fontSize:10,fontWeight:'bold',color:'#f50'}}>{DateC('sub',1).Cday}</Text></View>}})}/>
   <TimeLineStack.Screen name={DateC('Today',0).Cdate} component={day3} options={({navigation})=>({tabBarIcon:({tintColor})=>{return <View style={{marginTop:10}}><Text style={{fontSize:11,fontWeight:'bold',color:'#f50'}}>TOD..</Text></View>}})}/>
    <TimeLineStack.Screen name={DateC('add',1).Cdate} component={day4} options={({navigation})=>({tabBarIcon:({tintColor})=>{return <View style={{marginTop:10}}><Text style={{fontSize:10,fontWeight:'bold',color:'#f50'}}>{DateC('add',1).Cday}</Text></View>}})}/>
   <TimeLineStack.Screen name={DateC('add',2).Cdate} component={day5} options={({navigation})=>({tabBarIcon:({tintColor})=>{return <View style={{marginTop:10}}><Text style={{fontSize:10,fontWeight:'bold',  color:'#f50'}}>{DateC('add',2).Cday}</Text></View>}})}/> 
  <TimeLineStack.Screen name='Date' component={DatePicker} options={({navigation})=>({tabBarIcon:({tintColor})=>{return <Icon
        name='calendar'
        type='font-awesome'
        color='#f50'
        />}})}/>
</TimeLineStack.Navigator>
);
}
export default TopScreen;
