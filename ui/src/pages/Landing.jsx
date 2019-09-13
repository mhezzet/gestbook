import React from 'react'
import { Typography, Input, Button, Empty } from 'antd'
import { useQuery } from '@apollo/react-hooks'
import { POSTS } from '../store'
import Post from '../components/Post'
import styles from './Landing.module.css'

export default function Landing() {
  const { loading, error, data } = useQuery(POSTS)

  if (loading) return <div>loading</div>
  if (error) return <div>{error.message}</div>

  if (data.posts.length === 0) return <Empty />

  return (
    <div className={styles.container}>
      <Typography.Title className={styles.title}>Guestbook</Typography.Title>
      <div className={styles.postMessage}>
        <Input.TextArea
          placeholder='type your message'
          autosize={{ minRows: 2, maxRows: 4 }}
        />
        <Button className={styles.postButton}>post</Button>
      </div>
      {data.posts.map(post => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  )
}
