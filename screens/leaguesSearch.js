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
        const country = this.props.route.params.text;
        const url = `https://apiv2.apifootball.com/?action=get_leagues&country_id=` + country + `&APIkey=c7b0251bcea3a4e571d9bf1334bc52a0b9448991bf67e86709a889f8cd8e50e7`;

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
            this.state.error('ERROR')
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
            return item.league_name.includes(text);
        });
        this.setState({
            data: newData,
        });
    };

    renderHeader = () => {
        return (
            <SearchBar
                placeholder="Search for a League..."
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

            <View style={{ flex: 1,backgroundColor:'#353547' }}>
                <FlatList
                    data={this.state.data}
                    renderItem={({ item }) => (
                        <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('Teams', { text: item.league_id })}>
                            <ListItem
                            containerStyle={{backgroundColor:'#48485e'}} 
                                leftAvatar={{ source: { uri: item.league_logo } }}
                                title={<Text style={styles.list}>{item.league_name.toUpperCase()}</Text>}

                                chevron={{ color: 'black' }}

                            />
                        </TouchableWithoutFeedback>
                    )}
                    keyExtractor={item => item.league_id}
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