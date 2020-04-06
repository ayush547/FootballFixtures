import React, { useState, useEffect } from 'react'
import {Text,View, ActivityIndicator, Dimensions,StyleSheet} from 'react-native'
import { Card, Avatar} from 'react-native-elements';
import * as Progress from 'react-native-progress';
import { ScrollView } from 'react-native-gesture-handler';

export default function MatchStats (props) {
    const [stats,setStats] = useState(props.stats.stats)
    const [team,setTeam] = useState(props.stats)
    const [loading,setLoading] = useState(true)
   

    if(props.stats.active==1) 
    return (
    <View style={{flex:1,height:"100%",width:"100%",marginBottom:50}}>

    <View
        style={{
          width: "100%",
          height: "100%",
          backgroundColor:"#353547",
          flex: 1,
        }}>


            
  <View style={styles.match}>  
      <View style={{flexDirection:'column',alignItems:'center'}}>
        <Avatar rounded size="medium" source={{uri: team.away_logo }}  renderPlaceholderContent={<ActivityIndicator /> }  />   
        <Text style={{color:'#fff',fontWeight:'700',fontSize:12,alignSelf:'center'}}>{team.away_name}</Text>
      </View>

      <Text style={styles.title}>STATISTICS</Text>

      <View style={{flexDirection:'column',alignItems:'center'}}>
        <Avatar rounded size="medium" source={{uri: team.home_logo }}  renderPlaceholderContent={<ActivityIndicator /> }  />
        <Text style={{color:'#fff',fontWeight:'700',fontSize:12,alignSelf:'center'}}>{team.home_name}</Text>
      </View>   
  </View> 
  
            
        <Card containerStyle={{backgroundColor:"#353547",elevation:10,shadowColor:'#353547',width:"100%",height:"100%",borderColor:'#353547',alignSelf:'center'}}>
            <ScrollView>
            {stats.map((g,i)=>{
                return(
                    <View key={i}>
                        <Text style={{color:"#fff",alignSelf:'center',marginBottom:2}}>{g.type}</Text>
                        <View style={{flex:1}}>
                            <Progress.Bar progress={parseInt((g.away).replace("%",""))/(parseInt((g.home).replace("%","")) + parseInt((g.away).replace("%","")) )} width={null} height={10}  color='#fff' unfilledColor='orange' borderRadius={5} borderColor="#353547" animationType='decay'/>
                            <View style={{flex:1,flexDirection:'row',justifyContent:'space-between'}}>
                            <Text style={{color:"#fff",paddingLeft:5}}>{g.away}</Text>
                            <Text style={{color:"#fff",paddingRight:5}}>{g.home}</Text>
                            </View>
                        </View>
                    </View>
                )
            })}

            </ScrollView>
            
        </Card>
        </View>
        </View>

    )
    else 
    return (
    <View style={{flex:1}}>
        <Card containerStyle={{backgroundColor:"#353547",elevation:10,justifyContent:'center',flexDirection:'row'}}>
        <Text style={{fontSize:15,fontWeight:'bold',color:"#fff",alignSelf:'center'}}>There are no statistics for this event</Text>
        </Card>
    </View>
        

    )


}
const styles = StyleSheet.create({
match: {
  justifyContent:'space-evenly',
  flexDirection:'row',
  borderColor:'#353547',
  shadowColor:"#353547",
  marginBottom:-30,
  marginTop:10,
},
title:{
    fontSize:20,
    fontWeight: 'bold',
    color:"#fff",
    alignSelf:'center',
  },
})