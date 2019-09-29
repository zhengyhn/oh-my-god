import React, { useState, useEffect } from "react";
import { Pagination, Table, Button, Layout } from "element-react";
import actions from "./actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ReplyItem, ReplyStatus } from "./types";
import ReplyDetail from "./ReplyDetail";
import replyConstant from "./replyConstant";
import { util } from "../lib";
import { CommonSelect } from "../component";

type PropsType = {
  actions: {
    replyList: any;
    getImageBase64: any;
    transform: any;
  };
  currentPage: number;
  total: number;
  list: ReplyItem[];
};

const mapStateToProps = (state: any) => ({
  list: state.reply.list,
  total: state.reply.total
});

const mapDispatchToProps = (dispatch: any) => ({
  actions: bindActionCreators(actions, dispatch)
});

const ReplyList = (props: PropsType) => {
  const { list, total, actions } = props;
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageSize, setCurrentPageSize] = useState(10);
  const [query, setQuery] = useState({
    status: ReplyStatus[ReplyStatus.SELECTING],
    platform: ""
  });

  const columns = [
    {
      type: "expand",
      expandPannel: ({ reply }: { reply: string }, index: number) => {
        return <ReplyDetail reply={reply} index={index} />;
      }
    },
    {
      label: "平台",
      prop: "platform",
      width: 120,
      render: (data: any) => {
        return (
          <span>
            {util
              .optionsToTextMap(replyConstant.platformOptions)
              .get(data.platform)}
          </span>
        );
      }
    },
    {
      label: "点赞数",
      prop: "up",
      width: 120
    },
    {
      label: "标题",
      prop: "title"
    },
    {
      label: "状态",
      prop: "status",
      width: 120,
      render: (data: any) => {
        return (
          <span>
            {util
              .optionsToTextMap(replyConstant.statusOptions)
              .get(data.status)}
          </span>
        );
      }
    },
    {
      label: "链接",
      prop: "url",
      render: (data: any) => {
        return (
          <a href={data.url} target="_blank">
            {data.url}
          </a>
        );
      }
    },
    {
      label: "操作",
      prop: "",
      render: function(data: any) {
        return (
          <span>
            <Button
              type="success"
              size="small"
              onClick={() => {
                handleOperation(data.id, ReplyStatus[ReplyStatus.SELECTED])
              }}
            >
              好
            </Button>
            <Button
              type="danger"
              size="small"
              onClick={() => {
                handleOperation(data.id, ReplyStatus[ReplyStatus.DROPED])
              }}
            >
              不好
            </Button>
            <Button
              type="info"
              size="small"
              onClick={() => {
                handleOperation(data.id, ReplyStatus[ReplyStatus.SELECTING])
              }}
            >
              待挑选
            </Button>
          </span>
        );
      }
    }
  ];

  useEffect(() => {
    actions.replyList({ currentPage, currentPageSize, query });
  }, []);
  const handleOperation = (id: number, status: string) => {
    actions.transform({
      id,
      status 
    });
    // actions.replyList({ currentPage, currentPageSize, query });
  };

  return (
    <div>
      <Layout.Row gutter="10">
        <Layout.Col span="4">
          <CommonSelect
            placeholder="状态"
            value={query.status}
            options={replyConstant.statusOptions}
            onChange={(value: string) => {
              setQuery({ ...query, status: value });
            }}
          />
        </Layout.Col>
        <Layout.Col span="4">
          <CommonSelect
            placeholder="平台"
            value={query.platform}
            options={replyConstant.platformOptions}
            onChange={(value: string) => {
              setQuery({ ...query, platform: value });
            }}
          />
        </Layout.Col>

        <Layout.Col span="4">
          <Button
            type="primary"
            onClick={() =>
              actions.replyList({ currentPage, currentPageSize, query })
            }
          >
            查询
          </Button>
        </Layout.Col>
      </Layout.Row>
      <Layout.Row>
        {list.length > 0 && (
          <Table
            style={{ width: "100%" }}
            columns={columns}
            data={list}
            border={false}
            defaultExpandAll={true}
          />
        )}
      </Layout.Row>
      <Layout.Row>
        <Pagination
          layout="total, sizes, prev, pager, next, jumper"
          total={total}
          pageSizes={[10, 20, 30, 50]}
          pageSize={currentPageSize}
          currentPage={currentPage}
          onSizeChange={(pageSize: number) => {
            setCurrentPageSize(pageSize);
            setCurrentPage(1);
            actions.replyList({
              currentPage,
              currentPageSize: pageSize,
              query
            });
          }}
          onCurrentChange={(page: number) => {
            setCurrentPage(page);
            actions.replyList({ currentPage: page, currentPageSize, query });
          }}
        />
      </Layout.Row>
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReplyList);
