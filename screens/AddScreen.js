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
      
  return (
    <View style={styles.main}>
        <Text style={styles.title}>Add Item</Text>
        <TextInput style={styles.itemInput} onChangeText={text => onChangeText(text)} />
        <TouchableOpacity
          onPress={handleSubmit}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
    </View>
  )
}

export default AddScreen

const styles = StyleSheet.create({
    main: {
      flex: 1,
      padding: 30,
      flexDirection: 'column',
      justifyContent: 'center',
      backgroundColor: '#6565fc'
    },
    title: {
      marginBottom: 20,
      fontSize: 25,
      textAlign: 'center'
    },
    itemInput: {
      height: 50,
      padding: 4,
      marginRight: 5,
      fontSize: 23,
      borderWidth: 1,
      borderColor: 'white',
      borderRadius: 8,
      color: 'white'
    },
    buttonText: {
      fontSize: 18,
      color: '#111',
      alignSelf: 'center'
    },
    button: {
      height: 45,
      flexDirection: 'row',
      backgroundColor: 'white',
      borderColor: 'white',
      borderWidth: 1,
      borderRadius: 8,
      marginBottom: 10,
      marginTop: 10,
      alignSelf: 'stretch',
      justifyContent: 'center'
    }
  });