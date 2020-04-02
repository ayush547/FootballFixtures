import React from 'react';
import {View,StyleSheet,Text,Image,FlatList} from 'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import MatchCard from './matchCard';
import LeagueCard from './leagueCard';
const dateElement=(props)=>{
   
     let currentLeague='';
     let  keyExtractor = (item, index) => index.toString()
      
      let renderItem = ({ item }) => {
        if(currentLeague!=''&&currentLeague==item.league_name){
          return(
            <MatchCard item={item}/>
            );
        }
        else{
          currentLeague=item.league_name;
          return(
            <View>
              <LeagueCard item={item}/>
              <MatchCard  item={item}/>
            </View>
          );
        }
        }
      
      
        return (
          <FlatList
            keyExtractor={keyExtractor}
            data={props.Matches}
            renderItem={renderItem}
          />
        );
      
        }
export default dateElement;