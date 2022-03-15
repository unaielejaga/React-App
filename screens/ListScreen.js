import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React, {useState, useEffect} from 'react'
import { useNavigation } from '@react-navigation/core'
import { db } from '../firebase'

const ListScreen = () => {

  const navigation = useNavigation()

  const handleEdit = () =>{
    navigation.push("Add")
  };

  const [itemsArray, setItemsArray] = useState([])

  useEffect(() => {
    db.ref('/items').on('value', snapshot => {
      let data = snapshot.val();
      const items = Object.values(data);
      setItemsArray(items);
    });
  }, []);

  return (
    <View>
      <FlatList style={{width:'100%'}}
          data={itemsArray}
          renderItem={({item})=>{
             return(
                <View>
                   <Text>{item.name}</Text>
                </View>)
             }}/>
      <TouchableOpacity
      onPress={handleEdit}
      >
        <Text>Editar</Text>
      </TouchableOpacity>

    </View>
  )
}

export default ListScreen