import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native'
import React, { useState } from 'react'
import { db } from '../firebase'
import { useNavigation } from '@react-navigation/core'

let addItem = (item) => {
  db.ref('/items').push({
      name: item
  });
};

const AddScreen = () => {

  const navigation = useNavigation()

  const [name, onChangeText] = useState('');
  
  const  handleSubmit = () => {
    addItem(name);
    navigation.goBack()
  };

  const volver = () => {
    navigation.goBack()
  }
      
  return (
    <View style={styles.main}>
        <Text style={styles.title}>Añadir Producto</Text>
        <TextInput style={styles.itemInput} onChangeText={text => onChangeText(text)} />
        <TouchableOpacity
          onPress={handleSubmit}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Añadir</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.buttonOutline]}
          onPress={volver}
        >
          <Text style={styles.buttonOutlineText}>Volver</Text>
        </TouchableOpacity>
    </View>
  )
}

export default AddScreen

const styles = StyleSheet.create({
    main: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      marginBottom: 20,
      fontSize: 25,
      fontWeight: '700',
      textAlign: 'center',
      color: '#4f6367'
    },
    itemInput: {
      backgroundColor: 'white',
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderRadius: 10,
      marginTop: 5,
      width: 500,
    },
    buttonText: {
      color: 'white',
      fontWeight: '700',
      fontSize: 16,
    },
    button: {
    backgroundColor: '#4f6367',
    width: 500,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 30,
    },
    buttonOutline: {
      backgroundColor: 'white',
      marginTop: 5,
      borderColor: '#4f6367',
      borderWidth: 2,
    },
    buttonOutlineText: {
      color: '#4f6367',
      fontWeight: '700',
      fontSize: 16,
    },
  });