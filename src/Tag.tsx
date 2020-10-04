import React, { Component } from "react";

interface TagProps {
  text: string;
  active: boolean;
  isOnDoc: boolean;
  controls: boolean;
}

interface TagState {}

export default class Tag extends Component<TagProps, TagState> {
  render() {
    let { text, active, isOnDoc, controls } = this.props;

    let badgeType = "badge-secondary";
    if (isOnDoc) {
      if (active) {
        badgeType = "badge-success";
      } else {
        badgeType = "badge-danger";
      }
    }

    return (
      <span className={"label-badge badge " + badgeType}>
        {text}
        {/*controls ? " X" : null*/}
      </span>
    );
  }
}
