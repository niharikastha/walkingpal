import React from 'react';
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const FirstNameScreen = () => {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Text style={styles.backArrow}>{'<'}</Text>
            </TouchableOpacity>

            <Text style={styles.heading}>
                What’s your first name? <Text style={styles.emoji}>🤠</Text>
            </Text>

            <Text style={styles.subtext}>You won’t be able to change this later.</Text>

            <TextInput
                style={styles.input}
                placeholder='Phil Dunphy'
                placeholderTextColor="#999"
            />

            <Text style={styles.hint}>
                Just keep your first name and delete the rest. This will be shown on your profile.
            </Text>

            <TouchableOpacity
                style={styles.proceedButton}
                onPress={() => navigation.navigate('DobScreen')}
            >
                <Text style={styles.proceedText}>Proceed</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 24,
    },
    backButton: {
        marginBottom: 30,
    },
    backArrow: {
        fontSize: 28,
        color: '#FF5A5F',
    },
    heading: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#222',
        marginBottom: 12,
    },
    emoji: {
        fontSize: 28,
    },
    subtext: {
        fontSize: 14,
        color: '#555',
        marginBottom: 30,
    },
    input: {
        fontSize: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#999',
        paddingVertical: 8,
        marginBottom: 8,
        color: '#333'
    },
    hint: {
        fontSize: 13,
        color: '#aaa',
        marginBottom: 60,
    },
    proceedButton: {
        backgroundColor: '#FF5A5F',
        borderRadius: 30,
        paddingVertical: 16,
        alignItems: 'center',
        position: 'absolute',
        bottom: 24,
        left: 24,
        right: 24,
    },
    proceedText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default FirstNameScreen;
