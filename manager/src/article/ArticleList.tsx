import React, { useState, useEffect } from "react";
import { Pagination, Table, Layout, Button } from "element-react";
import actions from "./actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ArticleDetail from "./ArticleDetail";

type PropsType = {
  actions: any;
  currentPage: number;
  total: number;
  list: any;
};

const mapStateToProps = (state: any) => ({
  list: state.article.list.list,
  total: state.article.list.total
});

const mapDispatchToProps = (dispatch: any) => ({
  actions: bindActionCreators(actions, dispatch)
});

const ArticleList = (props: PropsType) => {
  const { list, total, actions } = props;
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageSize, setCurrentPageSize] = useState(10);
  const [detailArticleId, setDetailArticleId] = useState(undefined);

  const columns = [
    {
      label: "ID",
      prop: "id",
      width: 100,
      render: (data: any) => {
        return (
          <Button type="text" onClick={() => {
            console.log(data.id)
            setDetailArticleId(data.id)
          }}>
            {data.id}
          </Button>
        );
      }
    },
    {
      label: "标题",
      prop: "title"
    },
    {
      label: "描述",
      prop: "description"
    },
    {
      label: "日期",
      prop: "date"
    }
  ];

  useEffect(() => {
    actions.listArticle({ currentPage, currentPageSize });
  }, []);

  return (
    <div>
      <Layout.Row>
        <ArticleDetail articleId={detailArticleId} updateArticleId={setDetailArticleId} />
      </Layout.Row>
      <Layout.Row>
        <Table style={{ width: "100%" }} columns={columns} data={list} />
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
            actions.listArticle({
              currentPage,
              currentPageSize: pageSize
            });
          }}
          onCurrentChange={(page: number) => {
            setCurrentPage(page);
            actions.listArticle({ currentPage: page, currentPageSize });
          }}
        />
      </Layout.Row>
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticleList);
