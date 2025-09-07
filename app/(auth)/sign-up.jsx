import * as React from 'react'
import { Text, TextInput, TouchableOpacity, View, Image, StyleSheet } from 'react-native'
import { useSignUp } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp()
  const router = useRouter()

  // State
  const [emailAddress, setEmailAddress] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [firstname, setFirstname] = React.useState('')
  const [lastname, setLastname] = React.useState('')
  const [pendingVerification, setPendingVerification] = React.useState(false)
  const [code, setCode] = React.useState('')
  const [error, setError] = React.useState('')

  // Handle submission of sign-up form
  const onSignUpPress = async () => {
    if (!isLoaded) return

    try {
      await signUp.create({
        emailAddress,
        password,
      })

      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

      setPendingVerification(true)
    } catch (err) {
      console.error(JSON.stringify(err, null, 2))
      setError('Sign up failed. Please try again.')
    }
  }

  // Handle submission of verification form
  const onVerifyPress = async () => {
    if (!isLoaded) return

    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      })

      if (signUpAttempt.status === 'complete') {
        await setActive({ session: signUpAttempt.createdSessionId })

        // ✅ Update Clerk profile with first + last name
        await signUpAttempt.user.update({
          firstName: firstname,
          lastName: lastname,
        })

        router.replace('/')
      } else {
        console.error(JSON.stringify(signUpAttempt, null, 2))
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2))
      setError('Verification failed. Please try again.')
    }
  }

  // This is the view for when the user needs to verify their email
  if (pendingVerification) {
    return (
      <View style={styles.container}>
        <Image
            source={require('../../assets/images/logo.png')}
            style={styles.logo}
        />
        <Text style={styles.title}>Verify your email</Text>
        <TextInput
          value={code}
          placeholder="Enter your verification code"
          style={styles.input}
          onChangeText={setCode}
        />
        <TouchableOpacity onPress={onVerifyPress} style={styles.button}>
          <Text style={styles.buttonText}>Verify</Text>
        </TouchableOpacity>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
      </View>
    )
  }

  // This is the initial sign-up form view
  return (
    <>
    <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
    <View style={styles.container}>
       
      <Text style={styles.title}>Create an Account</Text>

      <TextInput
        autoCapitalize="words"
        value={firstname}
        placeholder="First name"
        style={styles.input}
        onChangeText={setFirstname}
      />
      <TextInput
        autoCapitalize="words"
        value={lastname}
        placeholder="Last name"
        style={styles.input}
        onChangeText={setLastname}
      />
      <TextInput
        autoCapitalize="none"
        value={emailAddress}
        placeholder="Enter email"
        style={styles.input}
        onChangeText={setEmailAddress}
      />
      <TextInput
        value={password}
        placeholder="Enter password"
        secureTextEntry={true}
        style={styles.input}
        onChangeText={setPassword}
      />
      <TouchableOpacity onPress={onSignUpPress} style={styles.button}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <View style={styles.footer}>
        <Text style={styles.footerText}>Already have an account? </Text>
        <Link href="/sign-in" asChild>
          <TouchableOpacity>
             <Text style={styles.signInLink}>Sign in</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
    </>
  )
}


// --- Styles ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  logo: {
    width: 80,
    height: 80,
    margin:24
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 12,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#000',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  footerText: {
    fontSize: 16,
  },
  signInLink: {
    color: '#007AFF', // A standard blue link color
    fontSize: 16,
    fontWeight: '600',
  },
})
