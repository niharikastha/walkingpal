import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    TextInput,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

const OtpScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { phoneNumber } = route.params || {};
    const formattedNumber = `+91 ${phoneNumber.slice(0, 5)} ${phoneNumber.slice(5)}`;

    const [timer, setTimer] = useState(30);
    const [otp, setOtp] = useState(['', '', '', '']);
    const inputsRef = useRef([]);

    useEffect(() => {
        if (timer === 0) return;
        const interval = setInterval(() => setTimer((t) => t - 1), 1000);
        return () => clearInterval(interval);
    }, [timer]);

    const handleOtpChange = (text, index) => {
        if (text.length > 1) return;

        const newOtp = [...otp];
        newOtp[index] = text;
        setOtp(newOtp);

        // Move to next input
        if (text && index < 3) {
            inputsRef.current[index + 1].focus();
        }

        // Move to previous input on backspace
        if (!text && index > 0) {
            inputsRef.current[index - 1].focus();
        }
    };

    const handleResend = () => {
        setTimer(30);
        // resend OTP logic here
    };

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Text style={styles.backArrow}>{'<'}</Text>
            </TouchableOpacity>

            <Text style={styles.heading}>Enter the 4-digit{'\n'}code sent to</Text>

            <View style={styles.phoneRow}>
                <Text style={styles.phone}>{formattedNumber}</Text>
                <TouchableOpacity>
                    <Text style={styles.editText}> Edit</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.otpBoxes}>
                {otp.map((digit, index) => (
                    <View key={index} style={styles.otpBox}>
                        <TextInput
                            ref={(ref) => (inputsRef.current[index] = ref)}
                            style={styles.otpInput}
                            keyboardType="numeric"
                            maxLength={1}
                            value={digit}
                            onChangeText={(text) => handleOtpChange(text, index)}
                        />
                        <View style={styles.underline} />
                    </View>
                ))}
            </View>

            {timer > 0 ? (
                <Text style={styles.resendText}>
                    Resend code in <Text style={styles.timerText}>00:{timer < 10 ? `0${timer}` : timer}</Text>
                </Text>
            ) : (
                <TouchableOpacity onPress={handleResend}>
                    <Text style={[styles.resendText, styles.resendButtonText]}>Resend OTP</Text>
                </TouchableOpacity>
            )}

            <TouchableOpacity
                style={styles.proceedButton}
                onPress={() => navigation.navigate('FirstName')} 
            >
                <Text style={styles.proceedText}>Proceed</Text>
            </TouchableOpacity>

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
        color: '#222',
        marginBottom: 12,
    },
    phoneRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 60,
    },
    phone: {
        fontSize: 15,
        color: '#888',
    },
    editText: {
        color: '#FF5A5F',
        fontWeight: 'bold',
        fontSize: 14,
    },
    otpBoxes: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
        paddingRight: 100,
    },
    otpBox: {
        alignItems: 'center',
        width: 50,
    },
    otpInput: {
        fontSize: 24,
        textAlign: 'center',
        height: 40,
        width: 40,
        padding: 0,
    },
    underline: {
        height: 2,
        backgroundColor: '#999',
        width: '100%',
        marginTop: 4,
    },
    resendText: {
        fontSize: 14,
        color: '#888',
        marginBottom: 40,
        textAlign: 'left',
        paddingLeft: 2,
    },
    timerText: {
        color: '#FF5A5F',
        fontWeight: 'bold',
    },
    resendButtonText: {
        color: '#FF5A5F',
        fontWeight: 'bold',
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

export default OtpScreen;
