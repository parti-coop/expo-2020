import React from "react";
import { Text } from "./Text";
import { TouchableOpacity } from "./TouchableOpacity";
import { useMutation } from "@apollo/react-hooks";
import { useStore } from "../Store";
import ViewGroupImg from "./ViewGroupImg";
import ViewNewRed from "./ViewNewRed";
import { updateUserGroupCheck } from "../graphql/mutation";
export default (props: {
  group: { title: string; id: number; last_posted_at: string };
  navigate: (route: string) => void;
}) => {
  const { title, id } = props.group;
  const [{ user_id }, dispatch] = useStore();
  const [update] = useMutation(updateUserGroupCheck);
  function goToGroup(group_id: number) {
    dispatch({ type: "SET_GROUP", group_id });
    props.navigate("Home");
    update({ variables: { group_id, user_id } });
  }
  return (
    <TouchableOpacity
      style={{
        height: 53,
        borderRadius: 25,
        backgroundColor: "#007075",
        alignItems: "center",
        flexDirection: "row",
        marginBottom: 11,
        paddingLeft: 8,
        paddingRight: 15
      }}
      onPress={() => goToGroup(id)}
    >
      <ViewGroupImg color={false} />
      <Text
        style={{
          fontSize: 16,
          color: "white",
          flex: 1,
          marginLeft: 12
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};