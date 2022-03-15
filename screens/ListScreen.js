import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native'
import React, {useState, useEffect} from 'react'
import { useNavigation } from '@react-navigation/core'
import { db } from '../firebase'


const ListScreen = () => {

  const navigation = useNavigation()

  const handleEdit = () =>{
    navigation.push("Add")
  };

  const [itemsArray, setItemsArray] = useState([])

  /*let handleDelete = (itemIndex) => {
    console.log(itemIndex);
    db.ref('/items').child(keysArray[itemIndex]).remove()
  }*/

  useEffect(() => {
    db.ref('/items').on('value', snapshot => {
      let data = snapshot.val();
      const items = Object.values(data);
      const keys = Object.keys(data);
      setItemsArray(items);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de la Compra</Text>
      <FlatList style={{flex: 1}}
          data={itemsArray}
          keyExtractor={(item)=>item.name}
          renderItem={({item})=>{
             return(
              <View style={styles.row}>
                <View>
                  <View style={styles.nameContainer}>
                    <Text style={styles.nameTxt} numberOfLines={1} ellipsizeMode="tail">{item.name}</Text>
                    <TouchableOpacity
                      //onPress={handleDelete(itemsArray.indexOf(item))}
                    >
                      <Text style={styles.mblTxt}>Eliminar</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
             )}}/>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
        style={styles.button}
        onPress={handleEdit}
        >
          <Text style={styles.buttonText}>Añadir</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default ListScreen

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  title: {
    marginBottom: 20,
    fontSize: 25,
    fontWeight: '700',
    textAlign: 'center',
    color: '#4f6367',
    marginBottom: 40,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#DCDCDC',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    padding: 10,
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 280,
  },
  nameTxt: {
    marginLeft: 15,
    fontWeight: '600',
    color: '#222',
    fontSize: 18,
    width:170,
  },
  mblTxt: {
    fontWeight: '200',
    color: 'red',
    fontSize: 13,
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    backgroundColor: '#4f6367',
    width: '400',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
});