import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    Image,
    KeyboardAvoidingView,
    Platform,
    Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const PhoneNumberScreen = () => {
    const navigation = useNavigation();

    const [phoneNumber, setPhoneNumber] = useState('');
    const [phoneError, setPhoneError] = useState('');

    const handleProceed = () => {
        const regex = /^[892]\d{9}$/;

        if (!regex.test(phoneNumber)) {
            setPhoneError('Enter a valid 10-digit number starting with 8, 9, or 2.');
            return;
        }

        setPhoneError('');
        navigation.navigate('Otp', { phoneNumber }); 
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
                <TouchableOpacity style={styles.backButton}>
                    <Text style={styles.backArrow}>{'<'}</Text>
                </TouchableOpacity>

                <Text style={styles.heading}>What’s your mobile{'\n'}number? 📞</Text>

                <View style={styles.inputContainer}>
                    <Image source={require('../assets/india.png')} style={styles.flag} />
                    <Text style={styles.countryCode}>+91</Text>
                    <View style={styles.inputWrapper}>
                        <TextInput
                            style={styles.input}
                            placeholder="98536 XXXXX"
                            keyboardType="numeric"
                            maxLength={10}
                            value={phoneNumber}
                            onChangeText={(text) => {
                                setPhoneNumber(text);
                                if (phoneError) setPhoneError('');
                            }}
                        />
                        <View style={styles.underline} />
                    </View>
                </View>

                {phoneError !== '' && <Text style={styles.errorText}>{phoneError}</Text>}

                <Text style={styles.infoText}>
                    By continuing you may receive an SMS for verification. Messages and data rates may apply.
                </Text>

                <View style={styles.bottomContainer}>
                    <TouchableOpacity style={styles.proceedButton} onPress={handleProceed}>
                        <Text style={styles.proceedText}>Proceed</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
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
        marginBottom: 30,
        color: '#222',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginBottom: 10,
    },
    flag: {
        width: 26,
        height: 20,
        marginRight: 8,
        marginBottom: 6
    },
    countryCode: {
        fontSize: 22,
        marginRight: 10,
    },
    inputWrapper: {
        flex: 1,
    },
    input: {
        fontSize: 22,
        paddingBottom: 0,
    },
    underline: {
        height: 1,
        backgroundColor: '#999',
        marginTop: 2,
    },
    errorText: {
        color: '#FF5A5F',
        fontSize: 11,
        textAlign: 'right',
    },
    infoText: {
        fontSize: 12,
        color: '#888',
        marginTop: 20,
    },
    bottomContainer: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    proceedButton: {
        backgroundColor: '#FF5A5F',
        borderRadius: 30,
        paddingVertical: 16,
        alignItems: 'center',
    },
    proceedText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default PhoneNumberScreen;
