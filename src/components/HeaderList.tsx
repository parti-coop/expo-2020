import React from "react";
import { useNavigation } from "@react-navigation/native";

import { Image } from "./Image";
import { ViewRow } from "./View";
import { TouchableOpacity } from "./TouchableOpacity";

import iconBack from "../../assets/iconBack.png";
import iconSearch from "../../assets/iconSearch.png";

export default (props: { board?: any }) => {
  const { navigate } = useNavigation();
  function navigateSearch() {
    navigate("Search");
  }
  return (
    <ViewRow style={{ justifyContent: "space-between" }}>
      <TouchableOpacity
        style={{
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "flex-start",
          padding: 30,
        }}
        onPress={() => navigate("Home")}
      >
        <Image source={iconBack} />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          alignItems: "flex-end",
          padding: 30,
        }}
        onPress={navigateSearch}
      >
        <Image source={iconSearch} style={{ tintColor: "black" }} />
      </TouchableOpacity>
    </ViewRow>
  );
};
