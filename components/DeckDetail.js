import React, { Component } from 'react'
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native'
import { white, black } from '../utils/colors'
import {getDeck} from "../utils/api";


class DeckDetail extends Component {
    static navigationOptions = ({ navigation }) => {
        const { title } = navigation.state.params
        return {
            title: title
        }
    }
    state = {
        title: this.props.navigation.state.params.title,
        count: this.props.navigation.state.params.count
    }
    componentDidMount(){
        const { navigation } = this.props;
        this.focusListener = navigation.addListener("didFocus", () => {
            getDeck(this.props.navigation.state.params.entryId)
                .then((entrie) => {
                    if(entrie){
                        this.setState({count: entrie.questions.length})
                    }else{
                        this.setState({count: 0})
                    }
                })
        });
    }
    componentWillUnmount() {
        // Remove the event listener
        this.focusListener.remove();
    }
    addCard = () => {
        this.props.navigation.navigate('DeckAddCard', {
            entryId: this.props.navigation.state.params.entryId,
            title: this.props.navigation.state.params.title
        })
    }
    startQuiz = () => {
        this.props.navigation.navigate('DeckQuiz', {
            entryId: this.props.navigation.state.params.entryId,
            title: this.props.navigation.state.params.title,
            count: this.state.count,
        })
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.itemBorder}>
                    <Text style={styles.item}>{this.state.title}</Text>
                    <Text style={styles.itemCards}>cards {this.state.count}</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.buttonAdd} onPress={this.addCard}>
                        <Text style={{textAlign: 'center', fontSize: 24}}>ADD CARD</Text>
                    </TouchableOpacity>
                    {this.state.count !== 0 && (
                        <TouchableOpacity style={styles.buttonStart} onPress={this.startQuiz}>
                            <Text style={{color: white, textAlign: 'center', fontSize: 24}}>Start Quiz</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: white,
        justifyContent: 'space-between',
        padding: 15,
    },
    buttonContainer: {
        justifyContent: 'center',
    },
    itemBorder: {
        padding: 5,
        marginBottom: 10,
    },
    item: {
        padding: 10,
        fontSize: 42,
        textAlign: 'center'
    },
    itemCards: {
        fontSize: 36,
        textAlign: 'center',
        color: '#b1b1b1'
    },
    buttonAdd: {
        margin: 10,
        padding: 20,
        borderColor: black,
        borderWidth: 3,
        borderRadius: 10,
    },
    buttonStart: {
        margin: 10,
        padding: 20,
        borderColor: black,
        backgroundColor: black,
        borderWidth: 3,
        borderRadius: 10,
    }
})


export default DeckDetail