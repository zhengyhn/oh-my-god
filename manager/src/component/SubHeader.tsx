import React from "react";
import { Tabs } from "element-react";

type RouteType = {
  link: string;
  text: string;
};
type PropsType = {
  routes: RouteType[];
  history?: any;
  match: any;
};
const SubHeader = (props: PropsType) => {
  const { routes, history, match } = props;

  return (
    <div>
      <Tabs
        onTabClick={tab => {
          history.push(`${match.path}${routes[tab.props.name].link}`);
        }}
      >
        {routes.map((item, i) => (
          <Tabs.Pane label={item.text} name={`${i}`} key={item.text} />
        ))}
      </Tabs>
    </div>
  );
};

export default SubHeader;
