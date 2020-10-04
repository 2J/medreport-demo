import React, { Component } from "react";

interface TagProps {
  text: string;
  active: boolean;
  isOnDoc: boolean;
}

interface TagState {}

export default class Tag extends Component<TagProps, TagState> {
  render() {
    let { text, active, isOnDoc } = this.props;

    let badgeType = "badge-secondary";
    if (isOnDoc) {
      if (active) {
        badgeType = "badge-success";
      } else {
        badgeType = "badge-danger";
      }
    }

    return <span className={"label-badge badge " + badgeType}>{text}</span>;
  }
}
