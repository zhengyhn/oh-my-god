import React from "react";
import Header from "./component/Header";
import { Redirect, BrowserRouter, Route } from "react-router-dom";
import Reply from "./reply/";
import Article from "./article/";
import "./App.css";

const App = () => {
  const routes = [
    {
      link: "/reply",
      text: "素材管理"
    },
    {
      link: "/article",
      text: "文章管理"
    }
  ];
  return (
    <div>
      <BrowserRouter>
        <Header routes={routes}></Header>
        <div className="mainSection">
          <Route exact path="/" component={() => <Redirect to="/reply" />} />
          <Route path="/reply" component={Reply} />
          <Route path="/article" component={Article} />
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
