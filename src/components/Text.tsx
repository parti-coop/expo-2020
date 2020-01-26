import React from "react";
import { Text as T, TextProps } from "react-native";

export class Text extends React.PureComponent<TextProps> {
  render() {
    return (
      <T
        {...this.props}
        style={{
          fontFamily: "sans-serif",
          fontSize: 20,
          ...(this.props.style as Object)
        }}
      >
        {this.props.children}
      </T>
    );
  }
}

export class TextRound extends React.PureComponent<TextProps> {
  render() {
    return (
      <T
        {...this.props}
        style={{
          width: 56,
          height: 56,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#03A9F4",
          borderRadius: 30,
          elevation: 8,
          textAlign: "center",
          textAlignVertical: "center",
          ...(this.props.style as Object)
        }}
      >
        {this.props.children}
      </T>
    );
  }
}
