import React from "react";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import SubHeader from "../component/SubHeader";
import ArticleList from "./ArticleList";
import CreateArticle from "./CreateArticle";
// import "./index.css";

type PropsType = {
  match: any;
};

const ArticleHome = (props: PropsType) => {
  const { match } = props;

  const routes = [
    {
      link: "/list",
      text: "文章列表"
    },
    {
      link: "/create",
      text: "发文章"
    }
  ];
  console.log(match);
  return (
    <BrowserRouter>
      <Route
        render={({ history }) => (
          <div>
            <SubHeader routes={routes} history={history} match={match} />
          </div>
        )}
      />
      <Route exact path={`${match.path}/create`} component={CreateArticle} />
      <Route
        exact
        path={match.path}
        component={() => <Redirect to={`${match.path}/list`} />}
      />
      <Route exact path={`${match.path}/list`} component={ArticleList} />
    </BrowserRouter>
  );
};

export default ArticleHome;
