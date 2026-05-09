import { StyleSheet, Text, View } from "react-native";

import FormsNovaViagem from "../components/FormsNovaViagem";
import Header from "../components/Header";

const FormsScreen = () => {

    return(

        <View style={styles.container}>

            <Header/>

            <View style={styles.divisao}>

                <FormsNovaViagem/>

                <View style={{ 
                    height: '110%', 
                    width: 1, 
                    backgroundColor: '#ccc', 
                    marginHorizontal: 70 
                }} />
                {/* Questionario */}
                <View>
                    <Text>QUESTIONARIO</Text>
                </View>

            </View>

        </View>

    );

}
export default FormsScreen;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        flexDirection: 'column',
        
    },

    divisao: {
        flexDirection: 'row',
        padding: 30,
        paddingLeft: 100,
    },

    line: {
    height: '100%', // ou um valor fixo como 50
    width: 1, // Espessura da linha
    backgroundColor: '#949393', // Cor da linha
    opacity: 1
  },
    
});