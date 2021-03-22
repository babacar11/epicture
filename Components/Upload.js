import React from "react";
import {SafeAreaView, View, StyleSheet, Text, StatusBar} from "react-native";



class Upload extends React.Component {

    render() {
        return (
            <SafeAreaView style={styles.main_container}>
                <Text>Upload</Text>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex:1,

    }
})

export default Upload;