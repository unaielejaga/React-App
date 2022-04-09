import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useNavigation } from '@react-navigation/core'

export default function ScannerScreen() {

    const navigation = useNavigation();

    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    
    useEffect(() => {
        (async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
        })();
    }, []);

    const handleBarCodeScanned = ({ data }) => {
        setScanned(true);
        navigation.replace('Registro', {despensa: {data}});
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }

    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={styles.container}>
          <Text style={styles.title}>Escanea el código QR de la despensa</Text>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={styles.scanner}
          />
        </View>
      );
}

const styles = StyleSheet.create ({
    container:{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center'
    },
    title: {
        marginTop: 10,
        marginBottom: 15,
        fontSize: 25,
        fontWeight: '700',
        textAlign: 'center',
        color: '#4f6367'
      },
      scanner:{
          height: '70%',
          width: '100%'
      }
})
