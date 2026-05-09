import { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import DatePicker from 'react-native-modern-datepicker';

const FormsNovaViagem = () => {

    const [selectedDateIda, setSelectedDateIda] = useState('');
    const [selectedDateVolta, setSelectedDateVolta] = useState('');

    return(
        <View>
            <Text style={styles.title}>Nova Viagem</Text>

            <View style={styles.container}>

                <View style={styles.gap}>
                    
                    <View>
                        <Text>Nome da Viagem:</Text>
                        <TextInput style={styles.textInput} placeholder="Férias em Bali" placeholderTextColor={'#ae9898'}></TextInput>
                    </View>

                    <View>
                        <Text>País:</Text>
                        <TextInput style={styles.textInput} placeholder="Indonésia" placeholderTextColor={'#ae9898'}></TextInput>
                    </View>

                    <View>
                        <Text>Cidade:</Text>
                        <TextInput style={styles.textInput} placeholder="Bali" placeholderTextColor={'#ae9898'}></TextInput>
                    </View>

                    <Text>Data de Ida:</Text>
                    <DatePicker isGregorian={true} 
                        options={{
                            backgroundColor: '#e8eae7',
                            textHeaderColor: '#eb7e2b',
                            textDefaultColor: '#1b1b1a',
                            selectedTextColor: '#fff',
                            mainColor: '#F4722B',
                            textSecondaryColor: '#0c0c0c',
                            borderColor: 'rgba(122, 146, 165, 0.1)',
                            
                        }}
                        onSelectedChange={date => setSelectedDateIda(date)}
                    />
                </View>

               <View style={styles.gap}>
                    <View>
                        <Text>Orçamento:</Text>
                        <TextInput style={styles.textInput} placeholder="R$5000" placeholderTextColor={'#ae9898'}></TextInput>
                    </View>

                    <View>
                        <Text>Quantidade Adultos:</Text>
                        <TextInput style={styles.textInput} placeholder="3" placeholderTextColor={'#ae9898'}></TextInput>
                    </View>

                    <View>
                        <Text>Quantidade Crianças:</Text>
                        <TextInput style={styles.textInput} placeholder="2" placeholderTextColor={'#ae9898'}></TextInput>
                    </View>

                    <Text>Data de Volta:</Text>
                    <DatePicker isGregorian={true} 
                        options={{
                            backgroundColor: '#e8eae7',
                            textHeaderColor: '#eb7e2b',
                            textDefaultColor: '#1b1b1a',
                            selectedTextColor: '#fff',
                            mainColor: '#F4722B',
                            textSecondaryColor: '#0c0c0c',
                            borderColor: 'rgba(122, 146, 165, 0.1)',
                            
                        }}
                        onSelectedChange={date => setSelectedDateVolta(date)}
                    />
               </View>


            </View>
        </View>
        
    );
}
export default FormsNovaViagem;

const styles = StyleSheet.create({

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
        width: 220
    },

    gap: {
        gap: 20
    },
});