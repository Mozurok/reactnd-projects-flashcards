import React, { Component } from 'react'
import { View, TouchableOpacity, StyleSheet, Text, ActivityIndicator, Animated } from 'react-native'
import { white, gray, green, red, black } from '../utils/colors'
import {getDeck} from "../utils/api";


class DeckQuiz extends Component {
    static navigationOptions = ({ navigation }) => {
        const { title, count } = navigation.state.params
        return {
            title: `Quiz - ${title}`
        }
    }
    state = {
        title: this.props.navigation.state.params.title,
        count: this.props.navigation.state.params.count,
        questions: [],
        countNext: 0,
        loading: true,
        showAnswer: false,
        fadeAnswerValue: new Animated.Value(1),
        fadeQuestionValue: new Animated.Value(1),
        answerPoint: 0,
        finalResult: false,
    }
    componentDidMount(){
        getDeck(this.props.navigation.state.params.entryId)
            .then((entrie) => {
                if(entrie){
                    this.setState({ count: entrie.questions.length, questions: entrie.questions, loading: false })
                }else{
                    this.setState({ count: 0, question: [], loading: false })
                }
            })
    }
    correct = () => {
        const { fadeAnswerValue, countNext, questions } = this.state
        if ((questions.length - 1) === countNext) {
            this.setState((state) => {
                return {
                    answerPoint: state.answerPoint + 1,
                    finalResult: true,
                };
            });
        } else {
            Animated.sequence([
                Animated.timing(fadeAnswerValue, { duration: 500, toValue: 0}),
                Animated.timing(fadeAnswerValue, { duration: 1000, toValue: 1}),
            ]).start()
            this.setState((state) => {
                return {
                    answerPoint: state.answerPoint + 1,
                    countNext: state.countNext + 1,
                    showAnswer: false,
                };
            });
        }
    }
    incorrect = () => {
        const { fadeAnswerValue, countNext, questions } = this.state
        if ((questions.length - 1) === countNext) {
            this.setState({
                finalResult: true,
            });
        } else {
            Animated.sequence([
                Animated.timing(fadeAnswerValue, { duration: 500, toValue: 0}),
                Animated.timing(fadeAnswerValue, { duration: 1000, toValue: 1}),
            ]).start()
            this.setState((state) => {
                return {countNext: state.countNext + 1, showAnswer: false};
            });
        }
    }
    showAnswer = () => {
        const { fadeQuestionValue } = this.state
        Animated.sequence([
            Animated.timing(fadeQuestionValue, {duration: 500, toValue: 0}),
            Animated.timing(fadeQuestionValue, {duration: 1000, toValue: 1}),
        ]).start()
        this.setState({
            showAnswer: true,
        })
    }
    restartQuiz = () => {
        this.setState({
            countNext: 0,
            showAnswer: false,
            answerPoint: 0,
            finalResult: false,
        })
        const { fadeAnswerValue } = this.state
        Animated.sequence([
            Animated.timing(fadeAnswerValue, { duration: 500, toValue: 0}),
            Animated.timing(fadeAnswerValue, { duration: 1000, toValue: 1}),
        ]).start()
    }
    render() {
        if(this.state.loading){
            return <ActivityIndicator style={{marginTop: 30}}/>
        }
        if(this.state.finalResult){
            return (
                <View style={styles.containerResult}>
                    <View style={styles.itemBorder}>
                        <Text style={styles.item}>You got {Math.round((this.state.answerPoint * 100) / this.state.count)}% of the questions</Text>
                    </View>
                    <View>
                        <TouchableOpacity style={styles.buttonRestart} onPress={this.restartQuiz}>
                            <Text style={{textAlign: 'center', fontSize: 20, color: white}}>Restart Quiz</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonBackToDeck} onPress={() => {this.props.navigation.goBack()}}>
                            <Text style={{textAlign: 'center', fontSize: 20}}>Back to Deck</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        }
        return (
            <View style={this.state.showAnswer? styles.containerAnswer : styles.container}>
                <View>
                    <Text style={styles.itemCount}>{this.state.countNext+1}/{this.state.count}</Text>
                </View>
                <View style={styles.itemBorder}>
                    <Animated.Text style={[styles.item, {opacity: this.state.fadeAnswerValue}]}>{this.state.questions[this.state.countNext].question}</Animated.Text>
                    {!this.state.showAnswer ? (
                        <TouchableOpacity onPress={this.showAnswer}>
                            <Text style={{textAlign: 'center', fontSize: 20, color: gray}}>Show Answer</Text>
                        </TouchableOpacity>
                    ): (
                        <Animated.Text style={[styles.itemAnswer, {opacity: this.state.fadeQuestionValue}]}>{this.state.questions[this.state.countNext].answer}</Animated.Text>
                    )}
                </View>
                {this.state.showAnswer && (
                    <View>
                        <TouchableOpacity style={styles.buttonCorrect} onPress={this.correct}>
                            <Text style={{textAlign: 'center', fontSize: 20, color: white}}>Correct</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonWrong} onPress={this.incorrect}>
                            <Text style={{color: white, textAlign: 'center', fontSize: 20}}>Incorrect</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: white,
        padding: 15,
    },
    containerAnswer: {
        flex: 1,
        backgroundColor: white,
        padding: 15,
        justifyContent: 'space-between',
    },
    containerResult: {
        flex: 1,
        backgroundColor: white,
        padding: 15,
        justifyContent: 'center',
    },
    itemBorder: {
        padding: 5,
        marginBottom: 10,
    },
    item: {
        padding: 10,
        fontSize: 36,
        textAlign: 'center'
    },
    itemAnswer: {
        padding: 10,
        fontSize: 24,
        textAlign: 'center',
        color: gray,
    },
    itemCount: {
        padding: 5,
        fontSize: 24,
        textAlign: 'left'
    },
    itemCards: {
        fontSize: 36,
        textAlign: 'center',
        color: '#b1b1b1'
    },
    buttonCorrect: {
        margin: 10,
        padding: 20,
        borderColor: green,
        backgroundColor: green,
        borderWidth: 3,
        borderRadius: 10,
    },
    buttonWrong: {
        margin: 10,
        padding: 20,
        borderColor: red,
        backgroundColor: red,
        borderWidth: 3,
        borderRadius: 10,
    },
    buttonBackToDeck: {
        margin: 10,
        padding: 20,
        borderColor: black,
        borderWidth: 3,
        borderRadius: 10,
    },
    buttonRestart: {
        margin: 10,
        padding: 20,
        borderColor: black,
        backgroundColor: black,
        borderWidth: 3,
        borderRadius: 10,
    }
})


export default DeckQuiz