import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const FormsQuestionario = ({ dados, onChange, onSubmit }) => {

    return(
        <View>
            <Text style={styles.title}>Questionário</Text>

            <View style={styles.gap}>
                
                <View style={styles.gapTextInput}>
                    <Text>Descrição da Viagem:</Text>
                    <TextInput 
                        style={styles.textInput}
                        value={dados.descricao}
                        onChangeText={(texto) => onChange('descricao', texto)}
                    />
                </View>

                <View style={styles.gapTextInput}>
                    <Text>Quais sua preferência de área para viagem (gastronomia, lazer, cultura)?</Text>
                    <TextInput 
                        style={styles.textInput}
                        value={dados.interesse}
                        onChangeText={(texto) => onChange('interesse', texto)}
                    />
                </View>

                <View style={styles.gapTextInput}>
                    <Text>Qual seu ritmo de viagem (tranquilo, equilibrado, intenso)?</Text>
                    <TextInput 
                        style={styles.textInput}
                        value={dados.ritmo_viagem}
                        onChangeText={(texto) => onChange('ritmo_viagem', texto)}
                    />
                </View>

                <View style={styles.gapTextInput}>
                    <Text>Qual sua prioridade quando está viajando (experiência, conforto, custo-benefício)?</Text>
                    <TextInput 
                        style={styles.textInput}
                        value={dados.prioridade}
                        onChangeText={(texto) => onChange('prioridade', texto)}
                    />
                </View>

                <View style={styles.gapTextInput}>
                    <Text>O que você valoriza em uma hospedagem (hotel, resort, pousada)?</Text>
                    <TextInput 
                        style={styles.textInput}
                        value={dados.tipo_hospedagem}
                        onChangeText={(texto) => onChange('tipo_hospedagem', texto)}
                    />
                </View>

                <View style={styles.gapTextInput}>
                    <Text>Em uma viagem você é mais diurno ou noturno (festas, passeios, ambos)?</Text>
                    <TextInput 
                        style={styles.textInput}
                        value={dados.periodo_dia}
                        onChangeText={(texto) => onChange('periodo_dia', texto)}
                    />
                </View>

                <TouchableOpacity style={styles.submitButton} onPress={onSubmit}>
                    <Text style={styles.submitButtonText}>Criar Viagem</Text>
                </TouchableOpacity>
                
            </View>
        </View>
    );
}
export default FormsQuestionario;

const styles = StyleSheet.create({

    gapTextInput: {
        gap:5
    },

    container: {
        flexDirection: 'row',
        gap: 50
    },

    title: {
        fontSize: 42,
        fontWeight: 'bold',

        color: '#000000',

        marginBottom: 18,
    },

    textInput: {
        borderWidth: 1,
        padding: 3,
        paddingLeft: 10,
        width: '100%',
        borderRadius: 3,
        borderColor: '#929292'
    },

    gap: {
        gap: 20
    },

    submitButton: {
        alignSelf: 'flex-start',
        padding:10, 
        backgroundColor: '#003B8E',
        borderRadius: 6,
    },

    submitButtonText: {
        color: '#dfd813',
        fontWeight: '500'
    }
});