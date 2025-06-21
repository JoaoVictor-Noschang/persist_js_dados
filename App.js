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

      <Text style={styles.place}>Título da Nota</Text>
      <TextInput
        style={{ borderColor: '#000000', borderWidth: 1 }}
        onChangeText={setTextInputTitle}
        value={textInputTitle}
      ></TextInput>
      <Text style={styles.place}>Descrição</Text>
      <TextInput
        style={{ borderColor: '#000000', borderWidth: 1 }}
        onChangeText={setTextInputDesc}
        value={textInputDesc}
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
  },
  nota: {
    backgroundColor: '#d9d9d9',
    padding: 20,
    borderRadius: 15,
    marginVertical: 10,
  },
  head: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  opts: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 15,
  },
  btns: {
    borderRadius: 40,
    padding: 8,
    width: 40,
    height: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  edit: {
    backgroundColor: '#00b4d8',
  },
  delete: {
    backgroundColor: '#e76f51',
  },
  icons: {
    width: '100%',
    height: '100%',
  }
});
