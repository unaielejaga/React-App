import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native'
import React, {useState, useEffect} from 'react'
import { useNavigation } from '@react-navigation/core'
import { db } from '../firebase'
import { auth } from '../firebase'


const DespensaScreen = () => {

  const navigation = useNavigation();

  let fontColor = '';
  let estado = '';

  const [itemsArray, setItemsArray] = useState([]);

  let handleDespensa = (despensa) => {
    db.ref('/despensas').child(despensa).on('value', snapshot => {
      let data = snapshot.val();
      if(data != null){
          const items2 = Object.values(data);
          setItemsArray(items2);
      }else{
          setItemsArray(null);
      }
    });
  }

  let changeFontColor = ({item}) => {
    if(item.estado == 'bueno'){
      fontColor='green';
      estado='Bueno';
    }else if(item.estado == 'medio'){
      fontColor='orange';
      estado='Medio';
    }else{
      fontColor='red';
      estado='Malo';
    }
  }


  useEffect(() => {
    db.ref('users/' + auth.currentUser.uid).child('/usuario').on('value', snapshot => {
        let data = snapshot.val();
        if(data != null){
          const items1 = Object.values(data);
          handleDespensa(items1[0].despensa);
        }else{
          setUsuario(null);
        }
      });
  }, []);

  const renderitem = ({item}) => {
    changeFontColor({item});
    return(
      <View style={styles.row}>
        <View>
          <View style={styles.nameContainer}>
            <Text style={[styles.nameTxt, {fontWeight:"bold"}, {fontSize:18}]} numberOfLines={1} ellipsizeMode="tail">{item.nombre}</Text>
            <Text style={[styles.mblTxt, {paddingLeft: 15}, {color: fontColor}]}>Estado: {estado}</Text>
          </View>
          <View style={styles.nameContainer}>
            <Text style={styles.nameTxt} ellipsizeMode="tail">Marca: {item.marca}</Text>
            <Text style={[styles.nameTxt, {width: 200}]}>Fecha Cad: {item.fechacad}</Text>
          </View>
        </View>
      </View>
    );
  }

  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Despensa</Text>
      <FlatList style={{flex: 1}}
        data={itemsArray}
        keyExtractor={(item) => item.nombre}
        renderItem={(item) => renderitem(item)}/>
      <View style={styles.buttonContainer}>
      </View>
    </View>
  );
}

export default DespensaScreen

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
    width: 280,
  },
  nameTxt: {
    marginLeft: 15,
    fontWeight: '200',
    color: '#222',
    fontSize: 13,
    width:100,
  },
  mblTxt: {
    fontWeight: '200',
    color: '#222',
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