import React from 'react';
import {View,StyleSheet,Text,Image,FlatList} from 'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements'

const dateElement=(props)=>{
   
     let  keyExtractor = (item, index) => index.toString()
      
      let renderItem = ({ item }) => {
          return(
            <ListItem 
            containerStyle={{backgroundColor:'#48485e'}}   
          leftElement={
            <View style={{flexDirection:'row',alignItems:'center'}}>
<View style={{justifyContent:'space-evenly',width:90,marginRight:2
}}>
<Text style={{color:'#d4d3d7'}}>{item.match_date}</Text>
</View>
<View style={{}}>
  <Text style={{color:'white',fontWeight:'bold',fontStyle:'italic'}}>{item.match_hometeam_name}</Text>
  <Text style={{color:'white',fontWeight:'bold',fontStyle:'italic'}}>{item.match_awayteam_name}</Text>
</View>
            </View>            
          }
          bottomDivider
          rightElement={
            <View style={{flexDirection:'row',alignItems:'center'}}>
            <View style={{alignItems:'center',marginRight:30}}>
            <Text style={{fontWeight:'normal',color:'#fff'}}>{item.match_time}</Text>
            </View>
            <View style={{}}>
            <Icon
                       name='ios-star-outline'
                       type='ionicon'
                       color='#FF0266'
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