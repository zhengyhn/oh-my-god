import React, { useEffect, useRef } from 'react'
import { bindActionCreators } from 'redux'
import actions from './actions'
import { connect } from 'react-redux'
import { Dialog, Button } from 'element-react'
import { IArticleItem } from './types'
import util from '../lib/util'

type PropsType = {
  articleId: string
  updateArticleId: any
  article: IArticleItem
  visible: boolean
  actions: any
}

const mapStateToProps = (state: any) => ({
  article: state.article.detail.article
})

const mapDispatchToProps = (dispatch: any) => ({
  actions: bindActionCreators(actions, dispatch)
})

const copyWithStyle = (element: string) => {
  const doc = document
  const body: any = doc.body
  const text: any = doc.getElementById(element)
  let range
  let selection: any

  if (body.createTextRange) {
    range = body.createTextRange()
    range.moveToElement(text)
    range.select()
  } else if (window.getSelection) {
    selection = window.getSelection()
    range = doc.createRange()
    range.selectNodeContents(text)
    selection.removeAllRanges()
    selection.addRange(range)
  }
  document.execCommand('copy')
  selection = window.getSelection()
  selection.removeAllRanges()
}

const ArticleDetail = (props: PropsType) => {
  let { articleId, updateArticleId, article, actions } = props
  useEffect(() => {
    actions.getArticleDetail({ articleId })
  }, [articleId])
  if (article) {
    for (let reply of article.replies) {
      reply.reply = util.lineBreakToBr(reply.reply)
    }
  }
  return (
    <Dialog
      title="文章详情"
      visible={!!articleId}
      size="large"
      onCancel={() => updateArticleId('')}
    >
      <Dialog.Body>
        {!!articleId && (
          <div>
            <h2>{article.title}</h2>
            {document.queryCommandSupported('copy') && (
              <Button
                type="primary"
                onClick={() => {
                  copyWithStyle('article-detail')
                }}
              >
                复制
              </Button>
            )}
            <div id="article-detail">
              {article.replies.map(reply => {
                return (
                  <div>
                    <br />
                    <h2 className={'reply-title'}>
                      <b>{reply.title}</b>
                    </h2>
                    <div
                      className="display-linebreak reply-content"
                      dangerouslySetInnerHTML={{ __html: reply.reply }}
                    />
                    <br />
                    <hr
                      style={{
                        borderStyle: 'solid',
                        borderWidth: '1px 0 0',
                        borderColor: 'rgba(0,0,0,0.1)',
                        // "-webkit-transform-origin": "0 0",
                        // "-webkit-transform": "scale(1, 0.5)",
                        transformOrigin: '0 0',
                        transform: 'scale(1, 0.5)'
                      }}
                    />
                    {/* <div
                      style={{
                        borderStyle: "dotted",
                        color: "#ccc",
                        borderWidth: 0.5,
                        borderRadius: 1
                      }}
                    ></div> */}
                    <br />
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </Dialog.Body>
    </Dialog>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticleDetail)
