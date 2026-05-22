import { StyleSheet, Text, TextInput, View } from 'react-native';
import DatePicker from 'react-native-modern-datepicker';

const FormsNovaViagem = ({ dados, onChange }) => {

    return(
        <View>
            <Text style={styles.title}>Nova Viagem</Text>

            <View style={styles.container}>
                <View style={styles.gap}>
                    
                    <View style={styles.gapTextInput}>
                        <Text>Nome da Viagem:</Text>
                        <TextInput 
                            style={styles.textInput} 
                            placeholder="Férias em Bali" 
                            placeholderTextColor={'#ae9898'}
                            value={dados.nome_viagem}
                            onChangeText={(texto) => onChange('nome_viagem', texto)}
                        />
                    </View>

                    <View style={styles.gapTextInput}>
                        <Text>País:</Text>
                        <TextInput 
                            style={styles.textInput} 
                            placeholder="Indonésia" 
                            placeholderTextColor={'#ae9898'}
                            value={dados.pais}
                            onChangeText={(texto) => onChange('pais', texto)}
                        />
                    </View>

                    <View style={styles.gapTextInput}>
                        <Text>Cidade:</Text>
                        <TextInput 
                            style={styles.textInput} 
                            placeholder="Bali" 
                            placeholderTextColor={'#ae9898'}
                            value={dados.cidade}
                            onChangeText={(texto) => onChange('cidade', texto)}
                        />
                    </View>

                    <Text>Data de Ida:</Text>
                    <DatePicker 
                        mode="calendar"
                        isGregorian={true} 
                        selected={dados.data_inicio}
                        options={{
                            backgroundColor: '#e8eae7',
                            textHeaderColor: '#eb7e2b',
                            textDefaultColor: '#1b1b1a',
                            selectedTextColor: '#fff',
                            mainColor: '#F4722B',
                            textSecondaryColor: '#0c0c0c',
                            borderColor: 'rgba(122, 146, 165, 0.1)',
                        }}
                        onSelectedChange={date => {
                            if (date !== dados.data_inicio) {
                                onChange('data_inicio', date);
                            }
                        }}
                    />
                </View>

               <View style={styles.gap}>
                    <View style={styles.gapTextInput}>
                        <Text>Orçamento:</Text>
                        <TextInput 
                            style={styles.textInput} 
                            placeholder="5000" 
                            placeholderTextColor={'#ae9898'}
                            keyboardType='numeric'
                            value={dados.orcamento}
                            onChangeText={(texto) => onChange('orcamento', texto)}
                        />
                    </View>

                    <View style={styles.gapTextInput}>
                        <Text>Quantidade Adultos:</Text>
                        <TextInput 
                            style={styles.textInput} 
                            placeholder="3" 
                            placeholderTextColor={'#ae9898'} 
                            keyboardType='numeric'
                            value={dados.qtd_adultos}
                            onChangeText={(texto) => onChange('qtd_adultos', texto)}
                        />
                    </View>

                    <View style={styles.gapTextInput}>
                        <Text>Quantidade Crianças:</Text>
                        <TextInput 
                            style={styles.textInput} 
                            placeholder="2" 
                            placeholderTextColor={'#ae9898'} 
                            keyboardType='numeric'
                            value={dados.qtd_criancas}
                            onChangeText={(texto) => onChange('qtd_criancas', texto)}
                        />
                    </View>

                    <Text>Data de Volta:</Text>
                    <DatePicker 
                        isGregorian={true} 
                        mode="calendar"
                        selected={dados.data_fim}
                        options={{
                            backgroundColor: '#e8eae7',
                            textHeaderColor: '#eb7e2b',
                            textDefaultColor: '#1b1b1a',
                            selectedTextColor: '#fff',
                            mainColor: '#F4722B',
                            textSecondaryColor: '#0c0c0c',
                            borderColor: 'rgba(122, 146, 165, 0.1)',
                        }}
                        onSelectedChange={date => {
                            if (date !== dados.data_fim) {
                                onChange('data_fim', date);
                            }
                        }}
                    />
               </View>
            </View>
        </View>
    );
}
export default FormsNovaViagem;

const styles = StyleSheet.create({
    container: { flexDirection: 'row', gap: 50 },
    title: { fontSize: 42, fontWeight: 'bold', color: '#000000', marginBottom: 18 },
    textInput: { borderWidth: 1, padding: 3, paddingLeft: 10, width: 220, borderRadius: 3, borderColor: '#929292' },
    gap: { gap: 20 },
    gapTextInput: { gap: 4 },
});