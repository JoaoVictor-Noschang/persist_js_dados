import { StyleSheet, View, Text, Image, Alert, TouchableOpacity, ScrollView, TextInput, Button } from 'react-native';
import { useEffect, useState } from 'react';

//import Note from '@/components/Note';

export default function AssetExample() {

  const handlePressInput = () => {
    Alert.alert('Você clicou para cadastrar uma nota!');
    // Aqui você pode abrir um modal, navegar para outra tela, etc.
  };

  const [listNotes, setListNotes] = useState(["Nota01", "Nota02"]);
  const [textInput, setTextInput] = useState("");

  const addNewNote = () => {
    let newArray = listNotes;
    newArray.push(textInput);
    setListNotes(newArray);
    console.log(newArray);
  };

  return (
    <View style={styles.tela}>
      <View style={styles.header}>
        <Text style={styles.logo}>+NOTES</Text>
        <Image
          source={{ uri: 'https://reactnative.dev/docs/assets/p_cat2.png' }}
          style={styles.perfil}
        />
      </View>

      <Text style={styles.place}>Título da Nota</Text>
      <TextInput
        style={{ borderColor: '#000000', borderWidth: 1 }}
        onChangeText={setTextInput}
      ></TextInput>

      <TouchableOpacity style={styles.cadastrar} onPress={() => addNewNote()}>
        <Image
          source={{
            uri: 'https://reactnative.dev/docs/assets/p_cat2.png',
          }}
          style={styles.plus}
        />
        <Text style={styles.place}>Cadastrar Nota</Text>
      </TouchableOpacity>


      <Text style={styles.subtitle}>Notas Registradas</Text>
      <ScrollView>

        {
          listNotes.map((item, index) => {
            return (<View key={index}>
              <Text>{item}</Text>
            </View>)
          })
        }


      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  tela: {
    backgroundColor: '#f5ebe0',
    width: '100%',
    height: '100%',
    paddingTop: '20%',
    paddingHorizontal: 30,
    paddingBottom: '10%',
  },
  header: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 56,
    color: '#14213d',
  },
  perfil: {
    width: 70,
    height: 70,
    borderWidth: 4,
    borderColor: '#14213d',
    borderRadius: 40,
    backgroundColor: '#fff',
  },
  cadastrar: {
    width: '100%',
    marginVertical: 50,
    padding: 25,
    backgroundColor: '#fca311',
    borderRadius: 15,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 15,
  },
  plus: {
    width: 30,
    height: 30,
  },
  place: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
    color: '#14213d',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  }
});
