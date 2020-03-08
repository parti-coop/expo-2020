import React from "react";
import {  Image , ViewStyle} from "react-native";
import { View } from "./View";
import iconQr from "../../assets/icon-qr.png";
export default (props: {style?: ViewStyle}) => {
  return (
    <View
      style={{
        ...props.style,
        width: 35,
        height: 35,
        backgroundColor: "#ffa8bf",
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 8,
        marginRight: 12
      }}
    >
      <Image
        style={{ width: 17, height: 18 }}
        resizeMode="contain"
        source={iconQr}
      />
    </View>
  );
};