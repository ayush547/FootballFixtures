import React, { Component } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { ListItem, SearchBar } from 'react-native-elements';

class leaguesSearch extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            data: [],
            error: null,
        };

        this.arrayholder = [];
    }

    componentDidMount() {
        this.makeRemoteRequest();
    }

    makeRemoteRequest = () => {
        const league = this.props.route.params.text;
        console.log(league);
        const url = `https://apiv2.apifootball.com/?action=get_teams&league_id=` + league + `&APIkey=c7b0251bcea3a4e571d9bf1334bc52a0b9448991bf67e86709a889f8cd8e50e7`;

        this.setState({ loading: true });

        fetch(url)
            .then(res => res.json())
            .then(res => {
                this.setState({
                    data: res,
                    error: res.error || null,
                    loading: false,
                });
                this.arrayholder = res;
            })
            .catch(error => {
                this.setState({ error, loading: false });
            });
        if (this.arrayholder === []) {
            this.setState({ error: "NO TEAMS FOUND" })

        }
    };

    renderSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: '100%',
                    backgroundColor: ' #E53D6D',
                    marginLeft: '14%',
                }}
            />
        );
    };

    searchFilterFunction = text => {
        this.setState({
            value: text,
        });

        const newData = this.arrayholder.filter(item => {
            return item.team_name.includes(text);
        });
        this.setState({
            data: newData,
        });
    };

    renderHeader = () => {
        return (
            <SearchBar
                placeholder="Search for a Team..."
                lightTheme
                round
                onChangeText={text => this.searchFilterFunction(text)}
                autoCorrect={false}
                value={this.state.value}
            />
        );
    };

    render() {
        if (this.state.loading) {
            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator />
                </View>
            );
        }
        if (this.state.error) {
            return (
                <View style={styles.error}><Text style={styles.list} >NO TEAMS FOUND</Text></View>
            )
        }

        return (

            <View style={{ flex: 1,backgroundColor:'#48485e' }}>
                <FlatList
                    data={this.state.data}
                    renderItem={({ item }) => (
                        <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('Players', { players: item.players, name: item.team_name, badge: item.team_badge })}>
                            <ListItem
                            containerStyle={{backgroundColor:'#353547'}} 
                                leftAvatar={{ source: { uri: item.team_badge } }}
                                title={<Text style={styles.list}>{item.team_name.toUpperCase()}</Text>}
                                chevron={{ color: 'black' }}

                            />
                        </TouchableWithoutFeedback>
                    )}
                    keyExtractor={item => item.team_key}
                    ItemSeparatorComponent={this.renderSeparator}
                    ListHeaderComponent={this.renderHeader}
                />
            </View>

        );
    }
}
const styles = StyleSheet.create({
    list: {
        fontSize: 17,
        color: '#fff'


    },
    error: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 20,
       
        backgroundColor:'#353547' 

    }
});

export default leaguesSearch;