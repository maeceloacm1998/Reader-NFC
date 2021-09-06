import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { Shadow } from "react-native-shadow-2";

export function Card({ onPressCard, icon, text }) {
  return (
    <TouchableOpacity
      onPress={() => {
        onPressCard();
      }}
      style={styles.Button}
      activeOpacity={0.7}
    >
      <Shadow
        distance={5}
        startColor={"#00000011"}
        radius={10}
        children={
          <View style={styles.Container}>
            <View style={styles.ContainerImage}>{icon}</View>

            <View style={styles.ContainerText}>
              <Text style={styles.TextCard}>{text}</Text>
            </View>
          </View>
        }
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  Button: {
    height: 100,
    width: "85%",
    marginVertical: 20,
    backgroundColor: "#F2F2F2",
    borderRadius: 10,
  },
  Container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    flexDirection: "row",
  },
  ContainerImage: {
    width: "20%",
  },
  ContainerText: {
    width: "80%",
  },
  TextCard: {
    fontSize: 18,
    fontFamily: "Nunito_700Bold",
    color: "#3d3d3d",
  },
});
