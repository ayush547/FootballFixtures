import React from 'react';
import {View,StyleSheet,Text,Image,FlatList} from 'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements'

const dateElement=(props)=>{
   
     let  keyExtractor = (item, index) => index.toString()
      
      let renderItem = ({ item }) => {
          return(
            <ListItem    
          leftElement={
            <View style={{flexDirection:'row',alignItems:'center'}}>
<View style={{justifyContent:'space-evenly',width:90,marginRight:2
}}>
<Text style={{color:'black'}}>{item.match_date}</Text>
</View>
<View style={{}}>
  <Text style={{color:'coral',fontWeight:'bold',fontStyle:'italic'}}>{item.match_hometeam_name}</Text>
  <Text style={{color:'coral',fontWeight:'bold',fontStyle:'italic'}}>{item.match_awayteam_name}</Text>
</View>
            </View>            
          }
          bottomDivider
          rightElement={
            <View style={{flexDirection:'row',alignItems:'center'}}>
            <View style={{alignItems:'center',marginRight:30}}>
            <Text style={{fontWeight:'normal'}}>{item.match_time}</Text>
            </View>
            <View style={{}}>
            <Icon
                       name='ios-star-outline'
                       type='ionicon'
                       color='#f50'
                       onPress={()=>console.log('add to favourites')}
             />
            </View>
                        </View>
                        
                      } 

        />
            );
        }
        
      
        return (
          <FlatList
            keyExtractor={keyExtractor}
            data={props.matches}
            renderItem={renderItem}
          />
        );
      
        }
export default dateElement;