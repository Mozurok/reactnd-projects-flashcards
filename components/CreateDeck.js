import React from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import {buttonBorderGray, buttonGray, white, gray} from "../utils/colors"
import {saveDeckTitle} from "../utils/api";

export default class CreateDeck extends React.Component {
    state = {
        name: '',
    }
    sendName = () => {
        if(this.state.name !== ''){
            const nameId = this.state.name.replace(/[^A-Z0-9]+/ig, "");
            const data = {
                title: this.state.name,
                keyNavigator: nameId,
                questions: [],
                key: nameId
            }
            saveDeckTitle(data, nameId)
            this.props.navigation.navigate(
                'DeckDetail',
                { entryId: nameId, title: this.state.name, count: 0 }
            )
            this.setState({
                name: '',
            })
        }
    }
    render() {
        return (
            <View style={styles.container}>
               <Text style={styles.text}>What is the title of your new deck?</Text>
                <TextInput
                    style={styles.inputText}
                    onChangeText={(name) => this.setState({name})}
                    value={this.state.name}
                    placeholder={'Choose your deck name'}
                />
                <TouchableOpacity
                    style={styles.buttonSend}
                    onPress={this.sendName}
                ><Text style={styles.buttonSendText}>Send</Text>
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

    },
    text: {
        fontSize: 18,
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