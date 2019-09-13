import React, { useState } from 'react'
import styles from './Post.module.css'
import {
  Typography,
  Card,
  Button,
  Input,
  Icon,
  message,
  Popconfirm
} from 'antd'
import { useMutation } from '@apollo/react-hooks'
import { DELETE_POST, POSTS, COMMENT_A_POST } from '../store'

export default function Post({ post, isAuth, profile, onEdit }) {
  const [comment, setComment] = useState('')
  const userID = (profile && JSON.parse(profile).id) || null
  const [deletePost] = useMutation(DELETE_POST)
  const [commentAPost] = useMutation(COMMENT_A_POST)

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        {post.user.id === userID && (
          <>
            <Popconfirm
              title='Are you sure delete this post?'
              onConfirm={() =>
                deletePost({
                  variables: { postID: post.id },
                  update(cache) {
                    const { posts } = cache.readQuery({ query: POSTS })

                    cache.writeQuery({
                      query: POSTS,
                      data: { posts: posts.filter(pst => pst.id !== post.id) }
                    })
                  }
                })
                  .then(() => message.success('post deleted successfully'))
                  .catch(err => message.error(err.graphQLErrors[0].message))
              }
              okText='Yes'
              cancelText='No'
            >
              <Icon
                style={{
                  position: 'absolute',
                  right: 20,
                  fontSize: 18,
                  cursor: 'pointer'
                }}
                type='delete'
              />
            </Popconfirm>

            <Icon
              onClick={onEdit}
              style={{
                position: 'absolute',
                right: 50,
                fontSize: 18,
                cursor: 'pointer'
              }}
              type='edit'
            />
          </>
        )}
        <Typography.Text strong>{post.user.email}</Typography.Text>
        <Typography.Paragraph style={{ marginTop: 4 }}>
          {post.body}
        </Typography.Paragraph>
        <div style={{ width: '80%', marginLeft: 30 }}>
          {post.comments.map(comment => (
            <div key={comment.id}>
              <Typography.Text strong>{comment.user.email}</Typography.Text>
              <Typography.Paragraph style={{ marginTop: 4 }}>
                {comment.body}
              </Typography.Paragraph>
            </div>
          ))}
        </div>
        {isAuth && (
          <div className={styles.comment}>
            <Input.TextArea
              value={comment}
              onChange={e => setComment(e.target.value)}
              placeholder='type your message'
              autosize={{ minRows: 2, maxRows: 4 }}
            />
            <Button
              onClick={() =>
                commentAPost({
                  variables: { postID: post.id, body: comment }
                }).catch(err => message.error(err.graphQLErrors[0].message))
              }
              className={styles.commentButton}
            >
              comment
            </Button>
          </div>
        )}
      </Card>
    </div>
  )
}
