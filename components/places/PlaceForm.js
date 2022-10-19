import React, { useState } from 'react';
import {View, StyleSheet, Text, ScrollView, TextInput} from 'react-native';
import {Colors} from "../../constants/colors"

const PlaceForm = () => {
    const [entredeTitle,setEntredTitle] =useState("")
    function changeTitelHandler(entredText){
        setEntredTitle(entredText)
    }
    return (
        <ScrollView  style={styles.form} >
            <View>
            <Text style={styles.label}>The Place Form</Text>
            <TextInput onChangeText={changeTitelHandler} value={entredeTitle} style={styles.input} />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    form :{
        flex : 1,
        padding : 24
    },
    label :{
        fontWeight : "bold",
        marginBottom : 4,
        color : Colors.primary500
    },
    input :{
        marginVertical : 8,
        paddingHorizontal : 4,
        paddingVertical : 8,
        fontSize : 16,
        borderBottomColor : Colors.primary700,
        borderBottomWidth : 2,
        backgroundColor : Colors.primary100
    }

})

export default PlaceForm;
