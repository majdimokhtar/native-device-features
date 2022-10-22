import { StatusBar } from "expo-status-bar"
import { Alert, StyleSheet, Text, View } from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import AllPlaces from "./screens/AllPlaces"
import AddPlace from "./screens/AddPlace"
import IconBtn from "./components/UI/IconBtn"
import { Colors } from "./constants/colors"
import Map from "./screens/Map"
import { useEffect } from "react"
import { init } from "./util/database"
import { useState } from "react"
import AppLoading from "expo-app-loading"
import PlaceDetails from "./screens/PlaceDetails"

const Stack = createNativeStackNavigator()

export default function App() {
  const [dbInit, setDbInit] = useState(false)
  useEffect(() => {
    init()
      .then(() => {
        setDbInit(true)
      })
      .catch((error) => {
        console.log(error)
        Alert.alert("something went wrong", "could not fetch db")
      })
  }, [])
  if (!dbInit) {
    return <AppLoading />
  }
  return (
    <>
      <StatusBar style="dark" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: Colors.primary500 },
            headerTintColor: Colors.gray700,
            contentStyle: { backgroundColor: Colors.gray700 },
          }}
        >
          <Stack.Screen
            name="AllPlaces"
            component={AllPlaces}
            options={({ navigation }) => ({
              title: "Your Favorite Places",
              headerRight: ({ tintColor }) => (
                <IconBtn
                  icon="add"
                  size={24}
                  color={tintColor}
                  onPress={() => navigation.navigate("AddPlace")}
                />
              ),
            })}
          />
          <Stack.Screen
            name="AddPlace"
            component={AddPlace}
            options={{ title: "Add a new Place" }}
          />
          <Stack.Screen name="Map" component={Map} />
          <Stack.Screen
            name="PlaceDetails"
            component={PlaceDetails}
            options={{ title: "loading Place..." }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  )
}

const styles = StyleSheet.create({})
