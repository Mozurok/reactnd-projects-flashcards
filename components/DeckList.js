import React from 'react'
import { View, FlatList, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import {getDecks} from "../utils/api";
import { withNavigation } from "react-navigation";

function DeckListItem({title, questions}){
    const cardCount = questions.length;
    return(
        <View style={styles.itemBorder}>
            <Text style={styles.item}>{title}</Text>
            <Text style={styles.itemCards}>cards {cardCount}</Text>
        </View>
    )
}

class DeckList extends React.Component {
    state = {
        initial: [],
        text: [],
        loading: true,
    }
    componentDidMount(){
        const { navigation } = this.props;
        this.focusListener = navigation.addListener("didFocus", () => {
            getDecks()
                .then((entries) => {
                    const deckObj = entries;
                    const deckArray = Object.keys(deckObj).map(i => deckObj[i])
                    this.setState({initial: deckArray, loading: false})
                })
        });
    }
    componentWillUnmount() {
        // Remove the event listener
        this.focusListener.remove();
    }
    renderInter = ({item}) => {
        return (
            <TouchableOpacity
                onPress={() => this.props.navigation.navigate(
                    'DeckDetail',
                    { entryId: item.keyNavigator, title: item.title, count: item.questions.length }
                )}
            ><DeckListItem {...item} />
            </TouchableOpacity>
        )
    }
    render() {
        if(this.state.loading){
            return <ActivityIndicator style={{marginTop: 30}}/>

        }
        if(this.state.initial.length === 0 ){
            return (
                <View style={styles.viewEmpty}>
                    <Text style={styles.itemEmpty}>No deck yet <FontAwesome name='frown-o' size={30} /></Text>
                </View>
            )
        }
        return (
            <View style={styles.container}>
                <FlatList
                data={this.state.initial}
                renderItem={this.renderInter}
                style={styles.itemPadding}
                />
            </View>
        )
    }
}

export default withNavigation(DeckList);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    itemBorder: {
        borderRadius: 15,
        borderWidth: 0.5,
        borderColor: '#545353',
        padding: 5,
        marginBottom: 10,
    },
    viewEmpty: {
        borderRadius: 15,
        borderWidth: 0.5,
        borderColor: '#545353',
        padding: 5,
    },
    itemPadding: {
        margin: 10,
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
        textAlign: 'center'
    },
    itemEmpty: {
        padding: 10,
        fontSize: 18,
        height: 50,
        textAlign: 'center'
    },
    itemCards: {
        fontSize: 14,
        textAlign: 'center',
        color: '#b1b1b1'
    }
})