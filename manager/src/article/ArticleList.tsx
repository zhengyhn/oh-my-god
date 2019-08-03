import React, { useState } from "react";
// import { Pagination, Table, Button, Layout, Select } from "element-react";
// import * as action from "./action";
import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import { ReplyItem, REPLY_STATUS } from "./types";
// import ReplyDetail from "./ReplyDetail";
// import replyConstant from "./replyConstant";
// import { util } from "../lib";

type PropsType = {
  actions: {
    replyList: any;
    getImageBase64: any;
    transform: any;
  };
  currentPage: number;
  total: number;
};

const mapStateToProps = (state: any) => ({
  list: state.reply.list,
  total: state.reply.total
});

const mapDispatchToProps = (dispatch: any) => ({
  // actions: bindActionCreators(action, dispatch)
});

const ArticleList = (props: PropsType) => {
  return <div></div>;
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticleList);
