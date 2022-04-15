import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { auth } from '../firebase';
import { useNavigation } from '@react-navigation/core'
import { db } from '../firebase'
import * as Permissions from 'expo-permissions';
import * as Notifications from 'expo-notifications';

let addUser = (nombre, tel, despensa, token) => {
    var newRef = db.ref('users/' + auth.currentUser.uid).child('/usuario').push();
    var newUser = {
        key: newRef.key,
        uid: auth.currentUser.uid,
        nombre: nombre,
        tel: tel,
        despensa: despensa,
        token: token
    }
    newRef.set(newUser);
};

const RegisterScreen = ({route}) => {

    const {despensa} = route.params;

    const navigation = useNavigation()

    const [nombre, setNombre] = useState('');
    const [tel, setTel] = useState('');
    const [tokenFinal, setToken] = useState('');

    useEffect(() => {
      registerForPushNotification();
    }, [])

    async function registerForPushNotification() {
      const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
      if (status !== 'granted'){
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      }
      if (status !== 'granted'){
        alert('Fail to get the push token');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;

      if(token){
        setToken(token);
      }
      return token;
    }

    const handleRegistro = () => {
        if(!nombre.trim() || !tel.trim()){
            alert("Faltan campos por rellenar");
        }else{
            console.log(tokenFinal);
            addUser(nombre, tel, despensa.data, tokenFinal);
            navigation.replace("Principal");
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior="padding"
        >
            <View style={styles.inputContainer}>
            <TextInput
                placeholder="Nombre de usuario"
                value={nombre}
                onChangeText={text => setNombre(text)}
                style={styles.input}
            />
            <TextInput
                placeholder="Teléfono"
                value={tel}
                onChangeText={text => setTel(text)}
                style={styles.input}
            />
            </View>

            <View style={styles.buttonContainer}>
            <TouchableOpacity
                onPress={handleRegistro}
                style={styles.button}
            >
                <Text style={styles.buttonText}>Registrarse</Text>
            </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    inputContainer: {
      width: '80%'
    },
    input: {
      backgroundColor: 'white',
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderRadius: 10,
      marginTop: 5,
    },
    buttonContainer: {
      width: '60%',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 40,
    },
    button: {
      backgroundColor: '#4f6367',
      width: '100%',
      padding: 15,
      borderRadius: 10,
      alignItems: 'center',
    },
    buttonOutline: {
      backgroundColor: 'white',
      marginTop: 5,
      borderColor: '#4f6367',
      borderWidth: 2,
    },
    buttonText: {
      color: 'white',
      fontWeight: '700',
      fontSize: 16,
    },
    buttonOutlineText: {
      color: '#4f6367',
      fontWeight: '700',
      fontSize: 16,
    },
  })