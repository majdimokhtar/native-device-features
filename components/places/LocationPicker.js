import { View, StyleSheet, Alert, Image, Text } from "react-native"
import { Colors } from "../../constants/colors"
import OutlineBtn from "../UI/OutlineBtn"
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from "expo-location"
import { useState } from "react"
import { getMapPreview } from "../../util/location"
import { useNavigation } from "@react-navigation/native"

const LocationPicker = () => {
  const navigation = useNavigation()
  const [pickedLocation, setPickedLocation] = useState()
  const [locationPermissionInfo, requestPermission] = useForegroundPermissions()
  async function verifyPermission() {
    if (locationPermissionInfo.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission()
      return permissionResponse.granted
    }

    if (locationPermissionInfo.status === PermissionStatus.DENIED) {
      console.log(locationPermissionInfo)
      Alert.alert(
        "Insufficient Permissions!",
        "You need to grant camera permissions to use this app."
      )
      return false
    }

    return true
  }
  async function getLocationHandler() {
    const hasPermission = await verifyPermission()
    if (!hasPermission) {
      return
    }
    const location = await getCurrentPositionAsync()
    console.log(location)
    setPickedLocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    })
  }
  function pickOnMapHandler() {
    navigation.navigate("Map")
  }

  let locationPreview = <Text>No location set</Text>
  if (pickedLocation) {
    return (locationPreview = (
      <Image
        style={styles.image}
        source={{ uri: getMapPreview(pickedLocation.lat, pickedLocation.lng) }}
      />
    ))
  }
  return (
    <View>
      <View style={styles.mapPreview}>{locationPreview}</View>
      <View style={styles.actions}>
        <OutlineBtn icon="location" onPress={getLocationHandler}>
          Locate User
        </OutlineBtn>
        <OutlineBtn icon="map" onPress={pickOnMapHandler}>
          Pick On Map
        </OutlineBtn>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  mapPreview: {
    width: "100%",
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 8,
    backgroundColor: Colors.primary100,
    borderRadius: 4,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 4,
  },
})

export default LocationPicker
