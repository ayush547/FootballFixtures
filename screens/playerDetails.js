import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Avatar } from 'react-native-elements';
import Card from '../Components/Card';

class leaguesSearch extends Component {
    renderSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: '86%',
                    backgroundColor: '#CED0CE',
                    marginLeft: '14%',
                }}
            />
        );
    };


    render() {

        const arrayholder = this.props.route.params.player;

        return (

            <View style={styles.cardContainer}>
                <Card style={styles.card}>
                    <Avatar
                        rounded
                        size='xlarge'
                        source={{
                            uri:
                                this.props.route.params.badge,
                        }}
                    />
                    <Text style={styles.name}>{arrayholder.player_name.toUpperCase()}</Text>
                    <Text style={styles.gameType}>{arrayholder.player_type}</Text>
                    <Text style={styles.text}>AGE : {arrayholder.player_age}</Text>
                    <Text style={styles.text}>COUNTRY : {arrayholder.player_country}   </Text>
                    <Text style={styles.text}>  TEAM : {this.props.route.params.name}</Text>

                    <Text style={styles.text}>MATCHES PLAYED : {arrayholder.player_match_played}   </Text>
                    <Text style={styles.text}>GOALS : {arrayholder.player_goals}    </Text>


                </Card>
            </View>

        );
    }
}
const styles = StyleSheet.create({
    cardContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'#353547',
    },
    card: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '80%',
        backgroundColor:'#48485e',
    },
    name: {
        fontSize: 23,
        padding: 5,
        color:'#fff'

    },
    text: {

        borderColor: '#E53D6D',
        borderWidth: 1,
        borderRadius: 5,
        padding: 5,
        width: '90%',
        textAlign: 'center',
        justifyContent: 'space-between',
        alignItems: 'stretch',
        marginTop: 5,

        color: '#fff'

    },
    gameType: {
        padding: 5,

    }
})

export default leaguesSearch;