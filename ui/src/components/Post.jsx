import React from 'react'
import styles from './Post.module.css'
import { Typography, Input, Button, Empty } from 'antd'

export default function Post({ post }) {
  console.log(post)
  return (
    <div className={styles.container}>
      <Typography.Text>{post.title}</Typography.Text>
      <Typography.Paragraph>{post.body}</Typography.Paragraph>
    </div>
  )
}
