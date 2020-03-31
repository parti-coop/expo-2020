import React from "react";
import { Share, ImageBackground, TextStyle } from "react-native";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import { useSubscription } from "@apollo/react-hooks";

import { View, ViewRow } from "./View";
import { Text } from "./Text";
import ViewGroupImg from "./ViewGroupImg";
import ViewQrCode from "./ViewQrCode";
import ViewIconInvite from "./ViewIconInvite";
import ViewNotification from "./ViewNotification";
import ButtonBoardSetting from "./ButtonBoardSetting";
import TouchableBoardList from "./TouchableBoardList";
import { TouchableOpacity, TO0 } from "./TouchableOpacity";

import ButtonJoinGroup from "./ButtonJoinGroup";
import ViewGroupManage from "./ViewGroupManage";

import { subscribeBoardsByGroupId } from "../graphql/subscription";
import { useStore } from "../Store";

import bgGroupMain from "../../assets/bgGroupMain.png";
import { ScrollView } from "react-native-gesture-handler";

const titleStyle = {
  fontSize: 28,
  color: "#333333"
} as TextStyle;
export default () => {
  const navigation = useNavigation();
  const { navigate } = navigation;
  const [{ group_id, user_id }, dispatch] = useStore();
  const { data, loading, error } = useSubscription(subscribeBoardsByGroupId, {
    variables: { group_id, user_id }
  });
  if (error) {
    console.warn(error);
    dispatch({ type: "SET_LOADING", loading: false });
  }
  React.useEffect(() => {
    dispatch({ type: "SET_LOADING", loading });
  }, [loading]);
  if (data && data.parti_2020_groups_by_pk) {
    const {
      title,
      boards,
      users_aggregate,
      users,
      bg_img_url
    } = data.parti_2020_groups_by_pk;
    const userCount = users_aggregate.aggregate.count;
    const hasJoined = users[0] && users[0].status !== "requested";
    const userStatus = !users[0]
      ? ""
      : users[0].status === "requested"
      ? "가입 신청 중"
      : users[0].status === "user"
      ? "유저"
      : users[0].status === "organizer"
      ? "오거나이저"
      : "미확인";

    return (
      <>
        <ImageBackground
          source={bg_img_url ? { uri: bg_img_url } : bgGroupMain}
          style={{ height: 222 }}
        >
          <View
            style={{
              flex: 1,
              paddingTop: 39,
              paddingHorizontal: 30,
              backgroundColor: "rgba(255,255,255,0.4)"
            }}
          >
            <View>
              <ViewRow>
                <TouchableOpacity
                  onPress={() =>
                    navigation.dispatch(DrawerActions.toggleDrawer())
                  }
                >
                  <ViewGroupImg color={false} />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() =>
                    navigation.dispatch(DrawerActions.toggleDrawer())
                  }
                >
                  <ViewNotification />
                </TouchableOpacity>
              </ViewRow>
              <View style={{ height: 52, marginTop: 19, marginRight: 80 }}>
                <Text style={[titleStyle]}>{title}</Text>
              </View>
              <View
                style={{
                  marginTop: 8
                  // backgroundColor: "rgba(255,255,255,0.4)"
                }}
              >
                <Text
                  style={{
                    fontSize: 15,
                    color: "#777777"
                  }}
                >
                  {userStatus}
                </Text>
              </View>
            </View>

            <View style={{ position: "absolute", right: 30, top: 39 }}>
              <TO0 onPress={() => navigation.navigate("QRcode")}>
                <ViewGroupImg color={true} />
              </TO0>
              <TO0
                onPress={() => navigation.navigate("QRcode")}
                style={{ marginTop: 10 }}
              >
                <ViewQrCode style={{}} />
              </TO0>
              <TO0
                style={{ marginTop: 10 }}
                onPress={e => Share.share({ message: "제안을 공유합니다." })}
              >
                <ViewIconInvite />
              </TO0>
            </View>
          </View>
        </ImageBackground>
        <ScrollView
          style={{
            top: -25,
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
            backgroundColor: "#f0f0f0"
          }}
        >
          <View style={{ paddingHorizontal: 30 }}>
            <ViewRow
              style={{ justifyContent: "space-between", paddingVertical: 20 }}
            >
              <Text style={{ fontSize: 14, color: "#333333" }}>목록</Text>
              <ButtonBoardSetting />
            </ViewRow>
            {boards.map((b: any, index: number) => (
              <TouchableBoardList key={index} board={b} />
            ))}
          </View>
        </ScrollView>
        {hasJoined ? (
          <ViewGroupManage
            title={title}
            userCount={userCount}
            bg_img_url={bg_img_url}
          />
        ) : (
          <ButtonJoinGroup title={title} />
        )}
      </>
    );
  } else {
    return null;
  }
};
