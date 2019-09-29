import React, { useState, useEffect } from "react";
import actions from "./actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Layout, Form, Input, Checkbox } from "element-react";
import { ReplyItem } from "./types";
import ReplyDetail from "../reply/ReplyDetail";
import "./index.css";

type PropsType = {
  history: any;
  actions: {
    getSelectedReplies: any;
    refreshContent: any;
    createArticle: any;
  };
  currentPage: number;
  content: string;
  list: ReplyItem[];
  selectedReplyIds: number[];
};

const mapStateToProps = (state: any) => ({
  list: state.article.create.list,
  content: state.article.create.content,
  selectedReplyIds: state.article.create.selectedReplyIds
});

const mapDispatchToProps = (dispatch: any) => ({
  actions: bindActionCreators(actions, dispatch)
});

const CreateArticle = (props: PropsType) => {
  const { history, actions, list, content, selectedReplyIds } = props;
  const initForm: { title: string; description: string } = {
    title: "",
    description: ""
  };
  const [form, setForm] = useState(initForm);
  const [currentPage, setCurrentPage] = useState(1);
  const [allChecked, setAllChecked] = useState(false);

  useEffect(() => {
    if (currentPage > 0) {
      actions.getSelectedReplies({ currentPage });
    }
  }, []);

  return (
    <div className="create-article">
      <Layout.Row gutter="60" justify="center">
        <Layout.Col span="10">
          <Form model={form} labelWidth="60">
            <Form.Item label="标题">
              <Input
                value={form.title}
                onChange={(value: any) => {
                  setForm({ ...form, title: value });
                }}
              />
            </Form.Item>
            <Form.Item label="摘要">
              <Input
                type="textarea"
                value={form.description}
                autosize={true}
                onChange={(value: any) => {
                  setForm({ ...form, description: value });
                }}
              ></Input>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                nativeType="submit"
                onClick={(e: any) => {
                  e.preventDefault();
                  actions.createArticle({
                    title: form.title,
                    description: form.description,
                    replyIds: selectedReplyIds
                  });
                  setTimeout(() => {
                    history.push("/article/list");
                  }, 3000);
                }}
              >
                立即创建
              </Button>
              <Button type="warning">取消</Button>
            </Form.Item>
            <Form.Item label="">
              <ReplyDetail reply={content} />
            </Form.Item>
          </Form>
        </Layout.Col>
        <Layout.Col span="13">
          <Layout.Row>
            <Checkbox
              checked={allChecked}
              onChange={checked => {
                list.map(item => {
                  item.checked = checked;
                  actions.refreshContent({ item, checked });
                });
                setAllChecked(checked);
              }}
            />
            <span>全选</span>
          </Layout.Row>
          <Layout.Row>
            {list.map(item => {
              return (
                <Layout.Row justify="space-between" key={item.id}>
                  <Layout.Col span="1">
                    <Checkbox
                      checked={item.checked}
                      onChange={checked => {
                        actions.refreshContent({ item, checked });
                      }}
                    ></Checkbox>
                  </Layout.Col>
                  <Layout.Col span="99" offset="1">
                    <div>
                      <h3>{item.title}</h3>
                      <ReplyDetail reply={item.reply} />
                    </div>
                  </Layout.Col>
                </Layout.Row>
              );
            })}
          </Layout.Row>
          <Layout.Row>
            <Button
              type="info"
              onClick={() => {
                setCurrentPage(currentPage + 1);
              }}
            >
              加载更多
            </Button>
          </Layout.Row>
        </Layout.Col>
      </Layout.Row>
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateArticle);
