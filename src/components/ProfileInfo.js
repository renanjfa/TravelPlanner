import { Component } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";



class ProfileInfo extends Component {

    render() {
        return(

            <View style={styles.mainContent}>
            
                {/* TÍTULO */}
                <Text style={styles.title}>Meu Perfil</Text>
            
                <View style={styles.profileTextInputs}>

                    <View style={styles.gapTextInput}>
                        <Text>Nome:</Text>
                        <TextInput style={styles.input} placeholder="Renan" placeholderTextColor={'#ae9898'}></TextInput>
                    </View>

                    <View style={styles.gapTextInput}>
                        <Text>Sobrenome:</Text>
                        <TextInput style={styles.input} placeholder="Jusan" placeholderTextColor={'#ae9898'}></TextInput>
                    </View>

                    <View style={styles.gapTextInput}>
                        <Text>Email:</Text>
                        <TextInput style={styles.input} placeholder="arrascaeta@uel.br" placeholderTextColor={'#ae9898'}></TextInput>
                    </View>

                    <View style={styles.gapTextInput}>
                        <Text>Senha:</Text>
                        <TextInput style={styles.input} secureTextEntry={true}></TextInput>
                    </View>

                    <TouchableOpacity style={styles.submitButton}>
                        <Text style={styles.submitButtonText}>Salvar Alterações</Text>
                    </TouchableOpacity>

                </View>

            </View>


        );
    }

}
export default ProfileInfo;

const styles = StyleSheet.create({
    /* CONTEÚDO PRINCIPAL */
    mainContent: {
        flex: 1,

        paddingTop: 40,
        paddingHorizontal: 35,
    },



    /* TÍTULO */
    title: {
        fontSize: 42,
        fontWeight: 'bold',

        color: '#000000',

        marginBottom: 18,
    },

    profileTextInputs: {
        gap: 18
    },

    input: {
        height: 30,
        width: 200,
        padding: 10,
        borderWidth: 1,
        alignItems: 'left'
    },

    submitButton: {
        alignSelf: 'flex-start',
        padding:7, 
        backgroundColor: '#003B8E',
        borderRadius: 6
    },

    submitButtonText: {
        color: '#dfd813',
        fontWeight: '500'
    },

    gapTextInput: {
        gap:5
    },
});