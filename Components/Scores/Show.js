import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, StatusBar, ActivityIndicator, ScrollView } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Avatar,Card, Overlay,Button,Header,Icon} from 'react-native-elements'
import HeaderImageScrollView, { TriggeringView } from 'react-native-image-header-scroll-view';
import tvShowContent from './Content';

const MIN_HEIGHT = Header.HEIGHT;
const MAX_HEIGHT = 100;

const styles = StyleSheet.create({
  image: {
    height: 100,
    width: Dimensions.get('window').width,
    alignSelf: 'stretch',
    resizeMode: 'cover',
  },
  title: {
    fontSize: 20,
  },
  name: {
    fontWeight: 'bold',
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    backgroundColor: 'white',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  sectionContent: {
    fontSize: 16,
    textAlign: 'justify',
  },
  keywords: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
  },
  keywordContainer: {
    backgroundColor: '#999999',
    borderRadius: 10,
    margin: 10,
    padding: 10,
  },
  keyword: {
    fontSize: 16,
    color: 'white',
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageTitle: {
    color: 'blue',
    backgroundColor: 'transparent',
    fontSize: 24,
  },
  navTitleView: {
    height: MIN_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 16,
    opacity: 0,
  },
  navTitle: {
    color: 'white',
    fontSize: 18,
    backgroundColor: 'transparent',
  },
  sectionLarge: {
    height: 600,
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

class TvShow extends Component {
  constructor() {
    super();
    this.state = { showNavTitle: false };
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <HeaderImageScrollView
          maxHeight={MAX_HEIGHT}
          minHeight={MIN_HEIGHT}
          maxOverlayOpacity={0.6}
          minOverlayOpacity={0}
          fadeOutForeground
          renderFixedForeground={() => (
            <Animatable.View
              style={styles.navTitleView}
              ref={navTitleView => {
                this.navTitleView = navTitleView;
              }}
            >
              <Text style={styles.navTitle}>
                Hey
              </Text>
            </Animatable.View>
          )}>
          <TriggeringView
            style={styles.section}
            onHide={() => this.navTitleView.fadeInUp(200)}
            onDisplay={() => this.navTitleView.fadeOut(100)}
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

          </TriggeringView>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Overview</Text>
            <Text style={styles.sectionContent}>{tvShowContent.overview}</Text>
          </View>
          <View style={[styles.section, styles.sectionLarge]}>
            <Text style={styles.sectionTitle}>Keywords</Text>
            <View style={styles.keywords}>
              {tvShowContent.keywords.map(keyword => (
                <View style={styles.keywordContainer} key={keyword}>
                  <Text style={styles.keyword}>{keyword}</Text>
                </View>
              ))}
            </View>
          </View>

        </HeaderImageScrollView>
      </View>
    );
  }
}

export default TvShow;