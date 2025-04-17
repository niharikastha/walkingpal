import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const WelcomeScreen = () => {

  const navigation = useNavigation();


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/img1.png')}
          style={[styles.circleImage, styles.image1]}
        />
        <Image
          source={require('../assets/img2.png')}
          style={[styles.circleImage, styles.image2]}
        />
        <Image
          source={require('../assets/img3.png')}
          style={[styles.circleImage, styles.image3]}
        />
        <Image
          source={require('../assets/img4.png')}
          style={[styles.circleImage, styles.image4]}
        />
        <Image
          source={require('../assets/img5.png')}
          style={[styles.circleImage, styles.image5]}
        />
        <Image
          source={require('../assets/img6.png')}
          style={[styles.circleImage, styles.image6]}
        />
        <Image
          source={require('../assets/img1.png')}
          style={[styles.circleImage, styles.image7]}
        />
      </View>

      {/* Text and buttons section */}
      <View style={styles.textContainer}>
        <Text style={styles.heading}>Connect Beyond Screens</Text>

        <TouchableOpacity style={styles.createButton}>
          <Text style={styles.createButtonText}>Create account</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.signInButton}
          onPress={() => navigation.navigate('PhoneNumber')}
        >
          <Text style={styles.signInText}>Sign In</Text>
        </TouchableOpacity>

        <Text style={styles.termsText}>
          By continuing, you agree to our{'\n'}
          <Text style={styles.link}>Terms of Service</Text> and <Text style={styles.link}>Privacy Policy</Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  imageContainer: {
    flex: 1.5,
    position: 'relative',
  },
  circleImage: {
    position: 'absolute',
    borderRadius: 999,
    resizeMode: 'cover',
  },
  image1: { width: 100, height: 100, top: '10%', left: '10%' }, // Cyclists image
  image2: { width: 70, height: 70, top: '15%', right: '20%' },  // Food image
  image3: { width: 180, height: 180, top: '25%' },              // Hiking image (center)
  image4: { width: 60, height: 60, bottom: '30%', right: '25%' }, // Small adventure image
  image5: { width: 80, height: 80, bottom: '15%', left: '15%' }, // Dance party image
  image6: { width: 70, height: 70, bottom: '25%', left: '35%' }, // Dinner image
  image7: { width: 120, height: 120, bottom: '10%', right: '10%' }, // Bonfire image
  textContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  heading: {
    fontSize: 32,
    fontWeight: '800',
    textAlign: 'left',
    marginBottom: 24,
    color: '#333',
    lineHeight: 40,
  },
  createButton: {
    backgroundColor: '#FF5A5F',
    borderRadius: 30,
    paddingVertical: 16,
    width: '100%',
    alignItems: 'center',
    marginBottom: 16,
  },
  createButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signInButton: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 30,
    paddingVertical: 16,
    width: '100%',
    alignItems: 'center',
    marginBottom: 16,
  },
  signInText: {
    color: '#FF5A5F',
    fontSize: 16,
    fontWeight: 'bold',
  },
  termsText: {
    fontSize: 12,
    color: '#888',
    textAlign: 'center',
    marginTop: 30,
  },
  link: {
    color: '#FF5A5F',
  },
});

export default WelcomeScreen;