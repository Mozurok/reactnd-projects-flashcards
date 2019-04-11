import { AsyncStorage } from 'react-native'
const DECK_STORAGE_KEY = 'Udacityflashcards:deck'
import {formatDeckResults} from "./helpers";

export function getDecks () {
    // return AsyncStorage.clear(DECK_STORAGE_KEY)
    return AsyncStorage.getItem(DECK_STORAGE_KEY)
        .then((res) => formatDeckResults(res))
}

export function getDeck (key) {
    return AsyncStorage.getItem(DECK_STORAGE_KEY)
        .then((res) => formatDeckResults(res))
        .then((entries) => {
            if(entries[key]){
                return entries[key]
            }else{
                return null
            }
        })
}

export function saveDeckTitle ( entry, key ) {
    return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
        [key]: entry
    }))
}

export function addCardToDeck ( entry, key ) {
    AsyncStorage.getItem(DECK_STORAGE_KEY)
        .then((res) => formatDeckResults(res))
        .then((entries) => {
            if(entries[key]){
                entries[key].questions.push(entry);
                return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
                    [key]: entries[key]
                }))
            }else{
                const data = {
                    title: this.state.name,
                    keyNavigator: key,
                    questions: [entry],
                    key: key
                }
                return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
                    [key]: data
                }))
            }
        })
}



export function removeDeck (key) {
    return AsyncStorage.getItem(DECK_STORAGE_KEY)
        .then((results) => {
            const data = JSON.parse(results)
            data[key] = undefined
            delete data[key]
            AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(data))
        })
}