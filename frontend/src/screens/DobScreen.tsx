import React, { useRef, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const DobScreen = () => {
  const navigation = useNavigation();
  const [dob, setDob] = useState(new Array(8).fill(''));
  const inputsRef = useRef([]);

  const handleDobChange = (text, index) => {
    const newDob = [...dob];
  
    if (text === '') {
      newDob[index] = '';
      setDob(newDob);
  
      // Move to previous input on backspace
      if (index > 0) {
        inputsRef.current[index - 1]?.focus();
      }
  
      return;
    }
  
    if (text.length > 1) return;
  
    newDob[index] = text;
    setDob(newDob);
  
    // Move to next box
    if (index < 7) {
      inputsRef.current[index + 1]?.focus();
    }
  };
  

  const placeholders = ['D', 'D', 'M', 'M', 'Y', 'Y', 'Y', 'Y'];

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backArrow}>{'<'}</Text>
      </TouchableOpacity>

      <Text style={styles.heading}>
        What’s your Date Of Birth? <Text style={styles.emoji}>🎂</Text>
      </Text>

      <View style={styles.dobBoxes}>
        {dob.map((digit, index) => (
          <View
            key={index}
            style={[
              styles.dobBox,
              (index === 2 || index === 4) && styles.groupSpacing, // spacing before MM and YYYY
            ]}
          >
            <TextInput
              ref={(ref) => (inputsRef.current[index] = ref)}
              style={styles.dobInput}
              keyboardType="numeric"
              maxLength={1}
              value={digit}
              onChangeText={(text) => handleDobChange(text, index)}
              placeholder={!digit ? placeholders[index] : ''}
              placeholderTextColor="#bbb"
            />
            <View style={styles.underline} />
          </View>
        ))}
      </View>

      <Text style={styles.hint}>
        We only show your age to potential matches, not your birthday.
      </Text>

      <TouchableOpacity style={styles.proceedButton}>
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
    marginBottom: 100,
    marginRight: 70
  },
  emoji: {
    fontSize: 28,
  },
  hint: {
    fontSize: 13,
    color: '#aaa',
    marginBottom: 60,
    textAlign: 'center',
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
  dobBoxes: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24,
    flexWrap: 'wrap',
  },
  dobBox: {
    alignItems: 'center',
    width: 32,
    marginHorizontal: 4,
  },
  groupSpacing: {
    marginLeft: 16,
  },
  dobInput: {
    fontSize: 24,
    textAlign: 'center',
    height: 40,
    width: 40,
    padding: 0,
    color: '#222',
  },
  underline: {
    height: 2,
    backgroundColor: '#999',
    width: '100%',
    marginTop: 4,
  },
});

export default DobScreen;
