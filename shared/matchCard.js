import React from 'react';
import {View,StyleSheet,Text,Image} from 'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import {useNavigation} from '@react-navigation/native';

const matchCard=({item})=>{
  const navigation=useNavigation();  
  return(
        <ListItem    
         onPress={()=>navigation.navigate('Statistics',{match_id:item.match_id})}
         containerStyle={{backgroundColor:'#5e5e69'}}
        leftElement={
            <View style={{flexDirection:'row',alignItems:'center'}}>
<View style={{justifyContent:'space-evenly',width:70,marginRight:2}}>
{item.match_status!=''?(<Text style={{fontStyle:'italic' ,color:'#d4d3d7'}}>{item.match_status}</Text>):(<Text style={{fontStyle:'italic',color:'#d4d3d7'}}>{item.match_time}</Text>)}
</View>
<View style={{}}>
  <Text style={{color:'#fff'}}>{item.match_hometeam_name}</Text>
  <Text style={{color:'#fff'}}>{item.match_awayteam_name}</Text>
</View>
            </View>            
          }
          bottomDivider
          rightElement={
            <View style={{flexDirection:'row',alignItems:'center'}}>
<View style={{justifyContent:'space-evenly',marginRight:20}}>
<Text style={{fontWeight:'bold',color:'#d4d3d7'}}>{item.match_hometeam_score}</Text>
<Text style={{fontWeight:'bold',color:'#d4d3d7'}}>{item.match_awayteam_score}</Text>
</View>
<View style={{}}>
<Icon
            name='ios-star-outline'
            type='ionicon'
            color='#FF0266'
            //onPress={()=>console.log(item.league_id)}
 />
</View>
            </View>
            
          }
        />
    );
}

export default matchCard;