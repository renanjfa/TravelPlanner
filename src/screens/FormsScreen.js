import { StyleSheet, View } from "react-native";

import FormsNovaViagem from "../components/FormsNovaViagem";
import FormsQuestionario from "../components/FormsQuestionario";
import Header from "../components/Header";

const FormsScreen = () => {

    return(

        <View style={styles.container}>

            <Header/>

            <View style={styles.divisao}>

                <FormsNovaViagem/>

                <View style={styles.line} />

                <FormsQuestionario/>

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
        height: '110%', 
        width: 1, 
        backgroundColor: '#ccc', 
        marginHorizontal: 70 
  },
    
});