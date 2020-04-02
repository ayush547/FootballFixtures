import React from 'react';
import {View,StyleSheet,Text,Image,FlatList} from 'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import Fixtures from '../screens/fixtures';
import {useNavigation} from '@react-navigation/native';

const leagueCard=({item})=>{
     
  const navigation=useNavigation();
  const fix=()=>{return <Fixtures/>};
  return(
        <ListItem
          title={item.league_name}
          titleStyle={{color:'white'}}
          containerStyle={{backgroundColor:'#393952',height:40,alignItems:"center"}}
          leftAvatar={{
              rounded:false,
              size:"small",
            source: item.country_logo && { uri: item.country_logo },
            title: item.league_name[0]
          }}
          bottomDivider
      
          rightElement={
<View style={{}}>
<Icon
            name='ios-arrow-forward'
            type='ionicon'
            color='white'
           
            onPress={()=>navigation.navigate('Fixtures',{league_id:item.league_id,league_logo:item.league_logo})}
 />
</View>}
        />);
        }
export default leagueCard;