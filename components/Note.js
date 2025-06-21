import { StyleSheet, View, Text, Alert, Image, TouchableOpacity } from 'react-native';

export default function Note() {

    const handlePressInput2 = () => {
        Alert.alert('Você clicou para editar ou deletar uma nota!');
        // Aqui você pode abrir um modal, navegar para outra tela, etc.
    };

    return (
        <View style={styles.nota}>
            <View style={styles.head}>
                <Text style={{ fontWeight: 'bold' }}>Título</Text>
                <Text>dd/mm/aaaa</Text>
            </View>
            <Text>Descrição</Text>
            <View style={styles.opts}>
                <TouchableOpacity style={[styles.btns, styles.delete]} onPress={handlePressInput2}>
                    <Image
                        source={require('@/assets/icons/delete_icon.png')}
                        style={styles.icons}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
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
    edit:{
        backgroundColor: '#00b4d8',
    },
    delete:{
        backgroundColor: '#e76f51',
    },
    icons: {
        width: '100%',
        height: '100%',
    }
});
