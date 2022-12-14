import React from "react"
import { View, StyleSheet, Button, Alert, Image, Text } from "react-native"
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from "expo-image-picker"

import { useState } from "react"
import { Colors } from "../../constants/colors"
import OutlineBtn from "../UI/OutlineBtn"

const ImagePicker = ({onTakeImage}) => {
    const [cameraPermissionInformation, requestPermission] =useCameraPermissions()
    const [pickedImage,setPickedImage] = useState()

  async function verifyPermissions() {
    if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }

    if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
      console.log(cameraPermissionInformation);
      Alert.alert(
        'Insufficient Permissions!',
        'You need to grant camera permissions to use this app.'
      );
      return false;
    }

    return true;
  }
  async function takeImageHandler() {
    const hasPermission  = await verifyPermissions()
    if (!hasPermission ) {
      return;
    }
    const image = await launchCameraAsync({
        allowsEditing: true,
        aspect: [16, 9],
        quality: 0.5,
    })
    setPickedImage(image.uri)
    onTakeImage(image.uri)
  }
  let imagePreview = <Text>No image taken yet</Text>
  if (pickedImage) {
    return imagePreview = <Image style={styles.image} source={{uri: pickedImage}} />
  }
  return (
    <View>
      <View style={styles.imagePreview} >
        {imagePreview}
      </View>
      <OutlineBtn icon="camera" onPress={takeImageHandler} >Take an Image</OutlineBtn>
    </View>
  )
}

const styles = StyleSheet.create({
  imagePreview : {
    width : "100%",
    height : 200,
    justifyContent : "center",
    alignItems : "center",
    marginVertical : 8,
    backgroundColor : Colors.primary100,
    borderRadius : 4
  },
  image : {
    width : "100%",
    height : "100%"
  }
})

export default ImagePicker
