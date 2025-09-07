import React, { useState } from 'react'
import { useSignIn } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
} from 'react-native'
import { COLORS } from '../../constants/colors'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default function UserLogin() {
  const { signIn, setActive, isLoaded } = useSignIn()
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const submitHandler = async () => {
    if (!isLoaded) return
    setError('')

    try {
      const signInAttempt = await signIn.create({
        identifier: email,
        password,
      })

      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId })
        router.replace('/') // redirect to /home after login
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2))
        setError('Login requires additional steps.')
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2))
      setError('Login failed. Please check your credentials.')
    }

    setEmail('')
    setPassword('')
  }

  return (
    <>
      <KeyboardAwareScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        enableOnAndroid={true}
        enableAutomaticScroll={true}
      >
        <View>
          <Image
            source={require('../../assets/images/logo.png')}
            style={styles.logo}
          />
          {/* Error Message */}
          {error ? <Text style={styles.error}>{error}</Text> : null}

          {/* Email */}
          <Text style={styles.label}>What's your email</Text>
          <TextInput
            style={styles.input}
            placeholder="email@example.com"
            autoCapitalize="none"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />

          {/* Password */}
          <Text style={[styles.label, { marginTop: 12 }]}>Enter Password</Text>
          <TextInput
            style={styles.input}
            placeholder="password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          {/* Login Button */}
          <TouchableOpacity style={styles.button} onPress={submitHandler}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          <Text style={styles.centerText}>
            New here?{' '}
            <Link href="/sign-up">
              <Text style={styles.link}>Create new Account</Text>
            </Link>
          </Text>
        </View>
      </KeyboardAwareScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    // Styles for the ScrollView's outer frame
    flex: 1,
    padding: 28,
    backgroundColor: COLORS.background,
  },
  contentContainer: {
    // Styles for the content INSIDE the ScrollView
    flexGrow: 1, // Ensures the container can grow to fill the available space
    justifyContent: 'center', // This correctly centers the content vertically
  },
  logo: {
    width: 64,
    height: 64,
    resizeMode: 'contain',
    marginBottom: 20,
    alignSelf: 'center', // Good for centering the logo itself
  },
  error: {
    color: 'red',
    marginBottom: 8,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#eee',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  button: {
    backgroundColor: '#111',
    marginTop: 16,
    paddingVertical: 12,
    borderRadius: 6,
  },
  driverButton: {
    backgroundColor: '#10b461',
    paddingVertical: 12,
    borderRadius: 6,
    marginBottom: 12,
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  centerText: {
    textAlign: 'center',
    marginTop: 12,
  },
  link: {
    color: '#2563eb',
    fontWeight: '500',
  },
})