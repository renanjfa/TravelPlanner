import { StyleSheet, View, ScrollView } from "react-native";
import { Component } from "react";

import FormsNovaViagem from "../components/FormsNovaViagem";
import FormsQuestionario from "../components/FormsQuestionario";
import Header from "../components/Header";

class FormsScreen extends Component {

    
    navigationAction = () => {
        this.props.navigation.goBack();
    }

    render() {

        return(
    
            <View style={styles.container}>
    
                <Header navigation={this.props.navigation} navigationAction={this.navigationAction}/>
    
                <ScrollView style={styles.divisao} horizontal={true}>
    
                    <FormsNovaViagem/>
    
                    <View style={styles.line} />
    
                    <FormsQuestionario/>
    
                </ScrollView>
    
            </View>
    
        );
    }
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