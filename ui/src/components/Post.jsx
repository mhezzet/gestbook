import React, { useState } from 'react'
import styles from './Post.module.css'
import { Typography, Card, Button, Input, Icon } from 'antd'

export default function Post({ post }) {
  const [comment, setComment] = useState('')

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <Icon
          style={{
            position: 'absolute',
            right: 20,
            fontSize: 18,
            cursor: 'pointer'
          }}
          type='delete'
        />
        <Icon
          style={{
            position: 'absolute',
            right: 50,
            fontSize: 18,
            cursor: 'pointer'
          }}
          type='edit'
        />
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
        <div className={styles.comment}>
          <Input.TextArea
            onChange={e => setComment(e.target.value)}
            placeholder='type your message'
            autosize={{ minRows: 2, maxRows: 4 }}
          />
          <Button className={styles.commentButton}>comment</Button>
        </div>
      </Card>
    </div>
  )
}
