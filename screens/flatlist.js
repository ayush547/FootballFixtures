
import React, { Component } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { ListItem, SearchBar } from 'react-native-elements';


class FlatListDemo extends Component {

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
        const url = `https://apiv2.apifootball.com/?action=get_countries&APIkey=c7b0251bcea3a4e571d9bf1334bc52a0b9448991bf67e86709a889f8cd8e50e7`;
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
    };

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

    searchFilterFunction = text => {
        this.setState({
            value: text,
        });

        const newData = this.arrayholder.filter(item => {
            return item.country_name.includes(text);
        });
        this.setState({
            data: newData,
        });
    };

    renderHeader = () => {
        return (
            <SearchBar
                placeholder="Search for a Country..."
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

        return (

            <View style={{ flex: 1 }}>
                <FlatList
                    stickyHeaderIndices={[0]}
                    data={this.state.data}
                    renderItem={({ item }) => (
                        <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('Leagues', { text: item.country_id })}>

                            <ListItem
                            containerStyle={{backgroundColor:'#48485e'}}
                                leftAvatar={{
                                    rounded: false, source: {
                                        uri: 'https://cdn.countryflags.com/thumbs/' +
                                            item.country_name.toLowerCase().replace(/\s/g, '-') + '/flag-800.png'
                                    }
                                }}
                                title={<Text style={styles.list}>{item.country_name.toUpperCase()}</Text>}
                                chevron={{ color: 'black' }}

                            />
                        </TouchableWithoutFeedback>
                    )}
                    keyExtractor={item => item.country_id}
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
        color: '#E88223'


    },
});

export default FlatListDemo;