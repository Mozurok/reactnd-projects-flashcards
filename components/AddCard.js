import React from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import {buttonBorderGray, buttonGray, white, gray} from "../utils/colors"
import {addCardToDeck} from "../utils/api";

export default class AddCard extends React.Component {
    static navigationOptions = ({ navigation }) => {
        const { title } = navigation.state.params

        return {
            title: `Add Card - ${title}`
        }
    }
    state = {
        question: '',
        answer: '',
    }
    addCardToDeck = () => {
        if(this.state.question !== '' && this.state.answer !== ''){
            const data = {
                question: this.state.question,
                answer: this.state.answer
            }
            addCardToDeck(data, this.props.navigation.state.params.entryId)
            this.props.navigation.goBack()
            this.setState({
                question: '',
                answer: '',
            })
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Choose your question!</Text>
                <TextInput
                    style={styles.inputText}
                    onChangeText={(question) => this.setState({question})}
                    value={this.state.question}
                    placeholder={'Type here your questions'}
                />
                <Text style={styles.text}>Write the answer</Text>
                <TextInput
                    style={styles.inputText}
                    onChangeText={(answer) => this.setState({answer})}
                    value={this.state.answer}
                    placeholder={'Type here your answer'}
                />
                <TouchableOpacity
                    style={styles.buttonSend}
                    onPress={this.addCardToDeck}
                ><Text style={styles.buttonSendText}>Add Card</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    inputText: {
        height: 40,
        borderRadius: 10,
        borderColor: gray,
        borderWidth: 1,
        paddingLeft: 10,
        margin: 10,

    },
    text: {
        fontSize: 18,
        margin: 10,
    },
    buttonSend: {
        backgroundColor: buttonGray,
        borderColor: buttonBorderGray,
        borderRadius: 10,
        borderWidth: 3,
        height: 40,
        marginTop: 20,
        justifyContent: 'center',
    },
    buttonSendText: {
        textAlign: 'center',
        color: white,
        fontSize: 18,
    }
})