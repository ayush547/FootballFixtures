import React, { Component } from 'react';
import {
  Animated,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
  RefreshControl,
  ActivityIndicator,SafeAreaView,ScrollView,TouchableNativeFeedback
} from 'react-native';

import { Avatar,Card, Overlay,Button,Header,Icon} from 'react-native-elements';

import { useState } from 'react';
import { useEffect } from 'react'

import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Lineup from './Lineup.js';

const Tab = createMaterialTopTabNavigator();


const HEADER_MAX_HEIGHT = 250;
const HEADER_MIN_HEIGHT = Platform.OS === 'ios' ? 30 : 0;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;


function Info() {
    return(
        <View style={{alignItems:'center'}}>
            <Text>Info</Text>
        </View>
    )
}
function Stats() {
    return(
        <View style={{alignItems:'center'}}>
            <Text>Stats</Text>
        </View>
    )
}
function Lineups(props) {
    const[overlay,setOverlay] = useState(true)

    const MyLineup = () =>{
        return <Lineup lineup={props.lineup} />
    }

    return(
        <View>
        <ScrollView>
            <Text>Naren</Text>
            <Text>Naren</Text>
            <Text>Naren</Text>
            <Text>Naren</Text>
            <Text>Naren</Text>
            <Text>Naren</Text>
            <Text>Naren</Text>
            <Text>Naren</Text>
            <Text>Nare2n</Text>
            <Text>Naren3</Text>
            <Text>Narenr</Text>
            <Text>Nar6en</Text>
            <Text>Nare7n</Text>
            <Text>Naren8</Text>
            <Text>Na9ren</Text>
            <Text>Nar0en</Text>
            <Text>Nare7n</Text>
            <Text>Nar6en</Text>
            <Text>Nar4en</Text>
            <Text>Na3ren</Text>
            <Text>Na43ren</Text>
            <Text>Nar3en</Text>
            <Text>Nar2en</Text>
        </ScrollView>
        </View>
    )
}
function Head() {
    return(
        <View style={{alignItems:'center'}}>
            <Text>Head 2 Head</Text>
        </View>
    )
}
function Tabs({lineup,overlay}) {
    const LineupComp = ()=>{
       return <Lineups lineup = {lineup} overlay={overlay}/>
    }

    return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName={Info} backBehavior='history'
      tabBarOptions={{
          activeTintColor:'orange',
          inactiveTintColor:'#fff',
          showIcon: true,
          labelStyle: { fontSize: 12 },
          style: { backgroundColor: '#353547'},
          pressColor:'orange',
          indicatorStyle: {
              backgroundColor: 'orange',
          },
        }}>
        <Tab.Screen name="Info" component={Info}  />
        <Tab.Screen name="Line-ups" component={LineupComp} />
        <Tab.Screen name="Stats" component={Stats} />
        <Tab.Screen name="H2H" component={Head} />

      </Tab.Navigator>
    </NavigationContainer>

    );
  }



export default class Scroll extends Component {
  constructor(props) {
    super(props);

    this.state = {
      scrollY: new Animated.Value(
        // iOS has negative initial scroll value because content inset...
        Platform.OS === 'ios' ? -HEADER_MAX_HEIGHT : 0,
      ),
      refreshing: false,
      isNavBarHidden: false
    };
  }

  handleScroll = () => this.setState({ isNavBarHidden: true });


  _renderScrollViewContent() {
    const data = Array.from({ length: 30 });
    return (
        <View style={styles.scrollViewContent}>
        <Tabs lineup={{data:"naren"} } />  
        </View>
    );
  }

  render() {
    const navbarStyle = this.state.isNavBarHidden ? { height: 0 } : {};

    // Because of content inset the scroll value will be negative on iOS so bring
    // it back to 0.
    const scrollY = Animated.add(
      this.state.scrollY,
      Platform.OS === 'ios' ? HEADER_MAX_HEIGHT : 0,
    );
    const headerTranslate = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, -HEADER_SCROLL_DISTANCE],
      extrapolate: 'clamp',
    });

    const imageOpacity = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 1, 0],
      extrapolate: 'clamp',
    });
    const imageTranslate = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, 100],
      extrapolate: 'clamp',
    });

    const titleScale = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 1, 0.8],
      extrapolate: 'clamp',
    });
    const titleTranslate = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [0, 0, -8],
      extrapolate: 'clamp',
    });

    return (
    <>
         <Header
            barStyle='dark-content'
            backgroundColor=""
            placement='left'
          leftComponent={ <Icon name='menu' color='#fff' /> }
          centerComponent={{ text: 'Football', style: { color: '#fff',fontSize:18,fontFamily:'notoserif',fontWeight:'700' } }}
          rightComponent={{ icon: 'settings', color: '#fff' }}
          style={navbarStyle}
        /> 

      <View style={styles.fill}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="#353547"
          style={{position:0}}
        />
     
        <Animated.ScrollView
          style={styles.fill}
          scrollEventThrottle={1}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
            { useNativeDriver: true },
          )}
          // iOS offset for RefreshControl
          contentInset={{
            top: HEADER_MAX_HEIGHT,
          }}
          contentOffset={{
            y: -HEADER_MAX_HEIGHT,
          }}
        >
          {this._renderScrollViewContent()}
        </Animated.ScrollView>
        <Animated.View
          pointerEvents="none"
          style={[
            styles.header,
            { transform: [{ translateY: headerTranslate }] },
          ]}
        >
          <Animated.View
            style={[
              styles.backgroundImage,
              {
                opacity: imageOpacity,
              },
            ]}
          >
              <View style={{marginBottom: 5,flexDirection:'column'}}>
            <Card containerStyle={styles.container}>
                <Avatar rounded size="small"   containerStyle={{alignSelf:'center'}}   renderPlaceholderContent={ <ActivityIndicator /> }/>
                <Text style={styles.league_title}>hell</Text>
                <Text style={styles.muted_title}>(FT)</Text>

                <View style={styles.match}>
                    
                    <View style={{flexDirection:'column',alignItems:'center'}}>

                        <Avatar rounded size="medium"  title="hello" renderPlaceholderContent={<ActivityIndicator /> }  />
                        <Text style={{color:'#fff',fontWeight:'700',fontSize:12,alignSelf:'center'}}>hello</Text>
                     
                    </View>

                    <View style={{flexDirection:'column',alignItems:'center'}}>
                        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                            <Text style={styles.score}>hey</Text>

                            <Text style={{padding: 10,color:'#d4d3d7',fontWeight:'700',fontSize:18,alignSelf:'center'}}>:</Text>

                            <Text style={styles.score}>heyy</Text>
                        </View>
                        <Text style={{color:'#d4d3d7',fontWeight:'800',fontSize:10,alignSelf:'center'}}>ohno</Text>
                    </View>

                    <View style={{flexDirection:'column',alignItems:'center'}}>
                    <Avatar rounded size="medium"  title="naren" renderPlaceholderContent={<ActivityIndicator /> }  />
                    <Text style={{color:'#fff',fontWeight:'700',fontSize:12,alignSelf:'center'}}>naren</Text>
                
                    </View>
                </View>
            </Card>
        </View>

          </Animated.View>
        </Animated.View>
      </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#03A9F4',
    overflow: 'hidden',
    height: HEADER_MAX_HEIGHT,
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: null,
    height: HEADER_MAX_HEIGHT,
    resizeMode: 'cover',
  },
  bar: {
    backgroundColor: 'transparent',
    marginTop: Platform.OS === 'ios' ? 28 : 38,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  title: {
    color: 'white',
    fontSize: 18,
  },
  scrollViewContent: {
    // iOS uses content inset, which acts like padding.
    paddingTop: Platform.OS !== 'ios' ? HEADER_MAX_HEIGHT : 0,
  },
  row: {
    height: 40,
    margin: 16,
    backgroundColor: '#D3D3D3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    backgroundColor:'#353547',
    margin: 8,
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderColor:'#353547',
},
league_title: {
    alignSelf:'center',
    color:'#fff',
    fontSize:15,

},
muted_title: {
    alignSelf:'center',
    color:'#d4d3d7',
    fontSize:12,
},
match: {
justifyContent:'space-between',
flexDirection:'row',
paddingTop:5
},
score: {
    color:'#fff',
    fontWeight:'800',
    fontSize:25,
    alignSelf:'center'

},
});