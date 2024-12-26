import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import quotes from '../data/quotes.json';
import { colors } from '../styles/theme';

export default function HomeScreen({ navigation }) {
    const [selectedAuthors, setSelectedAuthors] = useState([]);
    const [randomQuote, setRandomQuote] = useState('');

    useEffect(() => {
        const loadSelectedAuthors = async () => {
            const storedAuthors = await AsyncStorage.getItem('selectedAuthors');
            if (storedAuthors) setSelectedAuthors(JSON.parse(storedAuthors));
        };
        loadSelectedAuthors();
    }, []);

    useEffect(() => {
        if (selectedAuthors.length > 0) generateRandomQuote();
    }, [selectedAuthors]);

    const generateRandomQuote = () => {
        if (selectedAuthors.length === 0) {
            setRandomQuote('No authors selected. Please choose from the list.');
            return;
        }

        const author = selectedAuthors[Math.floor(Math.random() * selectedAuthors.length)];
        const authorQuotes = quotes.find((q) => q.author === author).quotes;
        const quote = authorQuotes[Math.floor(Math.random() * authorQuotes.length)];
        setRandomQuote(quote);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.quote}>{randomQuote}</Text>
            <View style={styles.buttonContainer}>
                <Button
                    title="Select Authors"
                    onPress={() => navigation.navigate('Author Selection')}
                    color={colors.accent}
                />
                <Button
                    title="Generate New Quote"
                    onPress={generateRandomQuote}
                    color={colors.secondary}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: colors.background,
    },
    quote: {
        fontSize: 20,
        textAlign: 'center',
        color: colors.text,
        marginBottom: 30,
        fontStyle: 'italic',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginTop: 20,
    },
});