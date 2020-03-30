import React from "react";
import { ViewStyle, Image } from "react-native";
import { useMutation } from "@apollo/react-hooks";
import { showMessage } from "react-native-flash-message";
import Modal from "react-native-modal";

import UserCommentProfile from "./UserCommentProfile";
import { View, ViewRow, ViewColumnCenter, ViewRowCenter } from "./View";
import { Title16, Blue16 } from "./Text";
import { TextInput } from "./TextInput";
import { TO0, TO1 } from "./TouchableOpacity";
import CommentList from "./CommentList";

import { insertComment, updateComment } from "../graphql/mutation";
import { useStore } from "../Store";

import iconSend from "../../assets/iconSend.png";
import iconClosed from "../../assets/iconClosed.png";
interface Comment {
  id: number;
  body: string;
  updated_at: string;
  user: { name: string; votes: [{ count: number }] };
  likes: [
    {
      user: {
        name: string;
      };
    }
  ];
  likes_aggregate: {
    aggregate: {
      count: number;
    };
    nodes: {
      user: {
        name: string;
      };
    };
  };
}

const box = {
  paddingHorizontal: 30,
  paddingTop: 14,
  paddingBottom: 26,
  borderTopRightRadius: 25,
  borderTopLeftRadius: 25,
  backgroundColor: "#ffffff",
  shadowColor: "rgba(0, 0, 0, 0.15)",
  shadowOffset: {
    width: 0,
    height: 1
  },
  shadowRadius: 1,
  shadowOpacity: 1
} as ViewStyle;

const boxCommentWriter = {
  height: 147,
  backgroundColor: "#f7f7f7",
  shadowColor: "rgba(0, 0, 0, 0.3)",
  shadowOffset: {
    width: 0,
    height: -1
  },
  shadowRadius: 20,
  shadowOpacity: 1
} as ViewStyle;
export default (props: {
  comments: Comment[];
  suggestionId: number;
  scrollRef: React.MutableRefObject<any>;
}) => {
  const { comments } = props;
  const [{ user_id }] = useStore();
  const [comm, setComm] = React.useState("");
  const [reAuthor, setReAuthor] = React.useState("");
  const [editingId, setEditingId] = React.useState(null);
  const [recommentId, setRecommentId] = React.useState(null);
  const textinput = React.useRef(null);
  const [insert] = useMutation(insertComment, {
    variables: {
      body: comm,
      suggestion_id: props.suggestionId,
      user_id: user_id
    }
  });
  const [update] = useMutation(updateComment);
  function edit({ body, id }) {
    setComm(body);
    setEditingId(id);
  }
  function recomment({ id, user }: { id: number; user: Comment["user"] }) {
    setRecommentId(id);
    setReAuthor(user.name);
    textinput.current.focus();
    props.scrollRef.current.scrollToEnd();
  }
  async function sendHandler() {
    setComm("");
    setEditingId(null);
    setRecommentId(null);
    if (editingId !== null) {
      return update({ variables: { id: editingId, body: comm } })
        .then(() =>
          showMessage({
            type: "success",
            message: "댓글 수정"
          })
        )
        .catch(error =>
          showMessage({
            type: "danger",
            message: error.message
          })
        );
    }
    return insert()
      .then(() =>
        showMessage({
          type: "success",
          message: "댓글 등록"
        })
      )
      .catch(error =>
        showMessage({
          type: "danger",
          message: error.message
        })
      );
  }
  const commentWriter = (autoFocus = false) => (
    <View>
      <ViewRow
        style={{
          paddingHorizontal: 30,
          paddingBottom: 21
        }}
      >
        <TextInput
          value={comm}
          placeholder="댓글입력"
          onChange={e => setComm(e.nativeEvent.text)}
          style={{ flex: 1, fontSize: 17, paddingLeft: 0 }}
          placeholderTextColor="#30ad9f"
          textAlignVertical="top"
          ref={textinput}
          autoFocus={autoFocus}
          onSubmitEditing={sendHandler}
        />
        <TO0 onPress={sendHandler}>
          <Image source={iconSend} />
        </TO0>
      </ViewRow>
      <View
        style={{
          borderBottomColor: "#30ad9f",
          borderBottomWidth: 1,
          marginBottom: 17,
          marginHorizontal: 30
        }}
      />
    </View>
  );
  function commentKind() {
    if (editingId !== null) {
      return (
        <View style={boxCommentWriter}>
          <ViewRow style={{ justifyContent: "space-between" }}>
            <Title16 style={{ padding: 30 }}>댓글수정</Title16>
            <TO0 style={{ padding: 30 }} onPress={() => setEditingId(null)}>
              <Image source={iconClosed} />
            </TO0>
          </ViewRow>
          {commentWriter(true)}
        </View>
      );
    } else if (recommentId !== null) {
      return (
        <View style={boxCommentWriter}>
          <ViewRow style={{ justifyContent: "space-between" }}>
            <ViewRow style={{ padding: 30 }}>
              <Blue16>@{reAuthor}</Blue16>
              <Title16> 에게 댓글 남기기</Title16>
            </ViewRow>
            <TO0 style={{ padding: 30 }} onPress={() => setRecommentId(null)}>
              <Image source={iconClosed} />
            </TO0>
          </ViewRow>
          {commentWriter(true)}
        </View>
      );
    }
    return (
      <View style={{ paddingTop: 30, backgroundColor: "#f7f7f7" }}>
        {commentWriter()}
      </View>
    );
  }
  return (
    <View>
      <View style={box}>
        {comments.map((u, i: number) => (
          <CommentList
            comment={u}
            key={i}
            edit={edit}
            recomment={recomment}
            style={comments.length === i + 1 && { borderBottomWidth: 0 }}
          />
        ))}
      </View>
      {commentKind()}
    </View>
  );
};
