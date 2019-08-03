import React from "react";
import ReplyList from "./ReplyList";
import { Route, Redirect } from "react-router-dom";
import SubHeader from "../component/SubHeader";
import "./index.css";

type PropsType = {
  match: any;
};

const ReplyHome = (props: PropsType) => {
  const { match } = props;

  const routes = [
    {
      link: "/list",
      text: "素材列表"
    }
  ];
  return (
    <Route
      render={({ history }) => (
        <div>
          <SubHeader routes={routes} history={history} match={match} />
          <Route
            exact
            path={match.path}
            component={() => <Redirect to={`${match.path}/list`} />}
          />
          <Route path={`${match.path}/list`} component={ReplyList} />
        </div>
      )}
    />
  );
};

export default ReplyHome;
