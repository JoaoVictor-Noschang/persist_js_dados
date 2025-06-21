import { StyleSheet, View, Text, Image, Alert, TouchableOpacity, ScrollView, TextInput, Button } from 'react-native';
import { useEffect, useState } from 'react';
import * as SQLite from 'expo-sqlite';

//import Note from '@/components/Note';

export default function AssetExample() {

  const handlePressInput = () => {
    Alert.alert('Você clicou para cadastrar uma nota!');
    // Aqui você pode abrir um modal, navegar para outra tela, etc.
  };

  const [listNotes, setListNotes] = useState([]);
  const [textInputTitle, setTextInputTitle] = useState("");
  const [textInputDesc, setTextInputDesc] = useState("");

  async function addNewNote() {
    /*let newArray = listNotes;
    newArray.push(textInput);
    setListNotes(newArray);
    console.log(newArray);*/

    // evitar registros vazios
    if (textInputTitle == "" || textInputDesc == "") {
    } else {

      console.log(textInputDesc);

      // da start na comunicação
      const db = await SQLite.openDatabaseAsync('databaseName');

      // Realiza o insert na tabela
      await db.runAsync('INSERT INTO notes (title, description) VALUES (?, ?)', textInputTitle, textInputDesc);

      getList();

      setTextInputTitle(""); // Limpa o input do título
      setTextInputDesc("");  // Limpa o input da descrição
    }
  }

  async function getList() {
    // da start na comunicação
    const db = await SQLite.openDatabaseAsync('databaseName');

    // Recuperando os dados registrados
    const allRows = await db.getAllAsync('SELECT * FROM notes');
    let newArray = [];
    for (const row of allRows) {
      console.log(row.id, row.title, row.description);
      newArray.push({ id: row.id, name: row.title, desc: row.description });
    }
    //Setando nossa lista para aparecer na tela
    setListNotes(newArray);
  }

  async function removeNote(id) {

    // da start na comunicação
    const db = await SQLite.openDatabaseAsync('databaseName');

    //console.log("Remove: " + id);
    // Realiza o delete na tabela
    await db.runAsync('DELETE FROM notes WHERE id = ?', id);

    getList();
  }

  useEffect(() => {
    async function setup() {

      //Iniciando o database
      const db = await SQLite.openDatabaseAsync('databaseName');

      await db.execAsync(`
        PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS notes (
          id INTEGER PRIMARY KEY NOT NULL,
          title TEXT NOT NULL,
          description TEXT
        );
      `);

      getList();
    }

    setup();
  }, []);

  return (
    <View style={styles.tela}>
      <View style={styles.header}>
        <Text style={styles.logo}>+NOTES</Text>
        <Image
          source={{ uri: 'https://reactnative.dev/docs/assets/p_cat2.png' }}
          style={styles.perfil}
        />
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Título da Nota</Text>
        <TextInput
          style={styles.input}
          onChangeText={setTextInputTitle}
          value={textInputTitle}
        ></TextInput>
        <Text style={styles.label}>Descrição</Text>
        <TextInput
          style={styles.input}
          onChangeText={setTextInputDesc}
          value={textInputDesc}
        ></TextInput>
      </View>

      <TouchableOpacity style={styles.cadastrar} onPress={() => addNewNote()}>
        <Image
          source={require('./assets/icons/add_icon.png')}
          style={styles.plus}
        />
        <Text style={styles.cadbt}>Cadastrar Nota</Text>
      </TouchableOpacity>


      <Text style={styles.subtitle}>Notas Registradas</Text>
      <ScrollView style={styles.scroll}>

        {
          listNotes.map((item, index) => {
            return (
              <View style={styles.nota} key={index}>
                <View style={styles.head}>
                  <Text style={{ fontWeight: 'bold' }}>{item.name}</Text>
                </View>
                <Text>{item.desc}</Text>
                <View style={styles.opts}>
                  <TouchableOpacity title="Remove" style={[styles.btns, styles.delete]} onPress={() => removeNote(item.id)} >
                    <Image
                      source={require('./assets/icons/delete_icon.png')}
                      style={styles.icons}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            )
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
    paddingVeritcal: '10%',
    paddingHorizontal: 30,
  },
  header: {
    width: '100%',
    paddingTop: '15%',
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
    width: 65,
    height: 65,
    borderWidth: 3,
    borderColor: '#14213d',
    borderRadius: 40,
    backgroundColor: '#fff',
  },
  form:{
    backgroundColor: '#d9d9d9',
    padding: 15,
    borderRadius: 15,
    marginVertical: 15,
  },
  label: {
    fontWeight: 'bold',
    color: '#14213d',
    marginBottom: 5
  },
  input: {
    borderColor: '#14213d', 
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 5,
    marginBottom: 10,
  },
  cadastrar: {
    width: '100%',
    marginVertical: 5,
    padding: 15,
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
  cadbt: {
    fontWeight: 'bold',
    fontSize: 18
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 5,
  },
  scroll: {
    marginBottom: 25,
    borderRadius: 15,
  },
  nota: {
    backgroundColor: '#d9d9d9',
    padding: 15,
    borderRadius: 15,
    marginVertical: 5,
  },
  head: {
    marginBottom: 10,
  },
  opts: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 15,
  },
  btns: {
    borderRadius: 40,
    padding: 4,
    width: 35,
    height: 35,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  delete: {
    backgroundColor: '#e76f51',
  },
  icons: {
    width: '100%',
    height: '100%',
  }
});
