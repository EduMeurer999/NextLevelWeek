import React, { useEffect, useState } from 'react'
import { View, ImageBackground, Text, StyleSheet, Image, Alert } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Feather as Icon } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import RNPickerSelect, { PickerSelectProps } from 'react-native-picker-select';
import axios from 'axios';

interface IBGECityResponse {
  nome: string;
}
interface IBGEUFResponse {
  sigla: string;
}
interface PickerItem {
  label: string,
  value: string,
}

const Home = () => {

  const navigation = useNavigation();

  const [ufs, setUfs] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [itemsUfPicker, setItemsUfPicker] = useState<PickerItem[]>([]);
  const [itemsCityPicker, setItemsCityPicker] = useState<PickerItem[]>([]);
  const [selectedUf, setSelectedUf] = useState('0');
  const [selectedCity, setSelectedCity] = useState('0');
  useEffect(() => {
    axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(response => {
      const ufsInitials = response.data.map(uf => uf.sigla);
      const objPicker: PickerItem[] = [];
      ufsInitials.map(sigla => {
        objPicker.push({
          label: sigla,
          value: sigla,
        })
      })
      setItemsUfPicker(objPicker);
    })
  }, []);

  useEffect(() => {
    if (selectedUf === '0') {
      return;
    }
    axios.get<IBGECityResponse[]>('https://servicodados.ibge.gov.br' +
      `/api/v1/localidades/estados/${selectedUf}/municipios`).then(response => {
        const objCity: PickerItem[] = [];
        const cityNames = response.data.map(city => { objCity.push({ label: city.nome, value: city.nome }) });
        setItemsCityPicker(objCity);
      })
  }, [selectedUf]);

  function handleNavigatePoints() {
    if (selectedCity === '0' || selectedUf == '0') {
      return Alert.alert('Ops...', 'Você deve selecionar um Estado (UF) e uma Cidade');
    }
    navigation.navigate('Points', { city: selectedCity, uf: selectedUf });
  }
  function handleSelectedUf(value: string) {
    setSelectedUf(value)
  }
  function handleSelectedCity(value: string) {
    setSelectedCity(value)
  }
  return (
    <ImageBackground
      style={styles.container}
      source={require('../../assets/home-background.png')}
      imageStyle={{ width: 274, height: 368 }}
    >
      <View style={styles.main}>
        <Image source={require('../../assets/logo.png')} />
        <Text style={styles.title}>Seu Marketplace de coleta de resíduos</Text>
        <Text style={styles.description}>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente</Text>
      </View>
      <View>
        <Text style={styles.label}>Estado:</Text>
        <RNPickerSelect
          style={{
            inputIOS: styles.input
          }}
          onValueChange={
            (value) => {
              handleSelectedUf(value);
            }} items={
              itemsUfPicker
            }></RNPickerSelect>
      </View>
      <View>
        <Text style={styles.label}>Cidade:</Text>
        <RNPickerSelect
          style={{
            inputIOS: styles.input
          }}
          onValueChange={(value) => { handleSelectedCity(value) }}
          items={itemsCityPicker}></RNPickerSelect>
      </View>
      <View style={styles.footer}>
        <RectButton style={styles.button} onPress={handleNavigatePoints}>
          <View style={styles.buttonIcon}>
            <Icon name="arrow-right" color="#FFF" size={24} />
          </View>
          <Text style={styles.buttonText}>
            Entrar
          </Text>
        </RectButton>

      </View>
    </ImageBackground >
  )
}

export default Home;



const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    backgroundColor: "#f0f0f5",
  },

  main: {
    flex: 1,
    justifyContent: 'center',
  },
  label: {
    paddingBottom: 10,
    fontSize: 15
  },

  title: {
    color: '#322153',
    fontSize: 32,
    fontFamily: 'Ubuntu_700Bold',
    maxWidth: 260,
    marginTop: 64,
  },

  description: {
    color: '#6C6C80',
    fontSize: 16,
    marginTop: 16,
    fontFamily: 'Roboto_400Regular',
    maxWidth: 260,
    lineHeight: 24,
  },

  footer: {},

  select: {},

  input: {
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
  },

  button: {
    backgroundColor: '#34CB79',
    height: 60,
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    marginTop: 8,
  },

  buttonIcon: {
    height: 60,
    width: 60,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttonText: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    color: '#FFF',
    fontFamily: 'Roboto_500Medium',
    fontSize: 16,
  }
});