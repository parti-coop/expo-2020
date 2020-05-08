import React from "react";
import { ViewStyle, StyleProp } from "react-native";
import Modal from "react-native-modal";

import { View } from "./View";
import { Mint15, Body15, Body16 } from "./Text";
import { TORow } from "./TouchableOpacity";
import { Image } from "./Image";

import iconSelected from "../../assets/iconSelected.png";
import btnFormSelect from "../../assets/btnFormSelect.png";

const boxStyle: StyleProp<ViewStyle> = {
  width: 207,
  backgroundColor: "#ffffff",
  shadowColor: "rgba(0, 0, 0, 0.32)",
  elevation: 1,
  shadowOffset: {
    width: 0,
    height: 1,
  },
  shadowRadius: 5,
  shadowOpacity: 1,
  paddingHorizontal: 25,
  paddingVertical: 20,
  position: "absolute",
  right: 0,
  borderRadius: 25,
  borderTopRightRadius: 0,
};
export default function TouchableClosingMethod(props: {
  style?: StyleProp<ViewStyle>;
  value: number;
  onChange: (value: number) => void;
  items: Array<{ value: number; label: string }>;
}) {
  const { items, value, onChange } = props;
  const currentItem = items.find((i) => i.value === value);
  const [isVisible, setVisible] = React.useState(false);
  function changeHandler(value: number) {
    onChange(value);
    setVisible(false);
  }
  function toggleHandler() {
    setVisible(!isVisible);
  }
  return (
    <>
      <TORow
        onPress={toggleHandler}
        style={{ flex: 1, justifyContent: "space-between" }}
      >
        <Body16>{currentItem.label}</Body16>
        <Image source={btnFormSelect} />
        <Modal
          isVisible={isVisible}
          animationIn="fadeIn"
          animationOut="fadeOut"
          backdropOpacity={0}
          onBackdropPress={() => setVisible(false)}
        >
          <View style={[boxStyle]}>
            {items.map((item, i) => (
              <TORow
                key={i}
                onPress={(e) => changeHandler(item.value)}
                style={
                  items.length !== i + 1 && {
                    borderBottomColor: "#e4e4e4",
                    borderBottomWidth: 1,
                    paddingBottom: 15,
                    marginBottom: 15,
                  }
                }
              >
                {item.value === value ? (
                  <Mint15 style={{ flex: 1 }}>{item.label}</Mint15>
                ) : (
                  <Body15 style={{ flex: 1 }}>{item.label}</Body15>
                )}
                {item.value === value && (
                  <Image source={iconSelected} style={{ marginLeft: 10 }} />
                )}
              </TORow>
            ))}
          </View>
        </Modal>
      </TORow>
    </>
  );
}
