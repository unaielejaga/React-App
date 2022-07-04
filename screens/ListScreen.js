import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native'
import React, {useState, useEffect} from 'react'
import { useNavigation } from '@react-navigation/core'
import { db } from '../firebase'
import { auth } from '../firebase'


const ListScreen = () => {

  const navigation = useNavigation();

  const handleEdit = () =>{
    navigation.push("Add");
  };

  const [itemsArray, setItemsArray] = useState([]);
  const [despensaArray, setDespensaArray] = useState([]);

  let fontColor = '';

  let handleDelete = (item) => {
    console.log(item);
    db.ref('users/' + auth.currentUser.uid).child('/compra').child(item).remove();
  }

  let handleDespensa = (despensa) => {
    db.ref('/despensas').child(despensa).on('value', snapshot => {
      let data = snapshot.val();
      if(data != null){
          const items2 = Object.values(data);
          setDespensaArray(items2);
      }else{
          setDespensaArray(null);
      }
    });
  }

  useEffect(() => {
    db.ref('users/' + auth.currentUser.uid).child('/compra').on('value', snapshot => {
      let data = snapshot.val();
      if(data != null){
        const items = Object.values(data);
        setItemsArray(items);
        handleUsuario();
      }else{
        setItemsArray(null);
      }
    });
  }, []);

  let handleUsuario = () => {
    db.ref('users/' + auth.currentUser.uid).child('/usuario').on('value', snapshot => {
        let data = snapshot.val();
        if(data != null){
          const items1 = Object.values(data);
          handleDespensa(items1[0].despensa);
        }else{
          setUsuario(null);
        }
      });
    }

    let changeColor = ({item}) => {
      for(var despensa of despensaArray) {
        if(despensa.nombre.toLowerCase() == item.name.toLowerCase()){
          if(despensa.estado == 'bueno'){
            fontColor = 'green';
          }else{
            fontColor = '#FFA500';
          }
          break;
        }else{
          fontColor = 'red';
        }
      }
    }

  const renderitem = ({item}) => {
    changeColor({item});
    return(
      <View style={styles.row}>
        <View>
          <View style={styles.nameContainer}>
            <Text style={[styles.nameTxt, {color: fontColor}]} numberOfLines={1} ellipsizeMode="tail">{item.name}</Text>
            <TouchableOpacity
              onPress={() => handleDelete(item.key.toString())}
            >
              <Text style={styles.mblTxt}>Eliminar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de la Compra</Text>
      <FlatList style={{flex: 1}}
        data={itemsArray}
        keyExtractor={(item) => item.key}
        renderItem={renderitem}/>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
        style={styles.button}
        onPress={handleEdit}
        >
          <Text style={styles.buttonText}>Añadir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default ListScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
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
    marginBottom: '20%',
    marginTop: 20
  },
  button: {
    backgroundColor: '#4f6367',
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