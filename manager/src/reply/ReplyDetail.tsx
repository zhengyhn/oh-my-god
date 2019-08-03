import React from "react";
import { bindActionCreators } from "redux";
import actions from "./actions";
import { connect } from "react-redux";

type PropsType = {
  reply: string;
};

const mapStateToProps = (state: any) => ({
  list: state.reply.list
});

const mapDispatchToProps = (dispatch: any) => ({
  actions: bindActionCreators(actions, dispatch)
});

const ReplyDetail = (props: PropsType) => {
  let { reply } = props;
  return (
    <div
      className="display-linebreak reply-content"
      dangerouslySetInnerHTML={{ __html: reply }}
    ></div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReplyDetail);
