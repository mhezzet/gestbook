import React, { useState } from 'react'
import { Typography, Input, Button, Empty, Modal, message } from 'antd'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { POSTS, GET_AUTH, RESET_AUTH, CREATE_POST } from '../store'
import Post from '../components/Post'
import styles from './Landing.module.css'
import SignForm from '../components/SignForm'
import Loading from '../components/Loading'

export default function Landing() {
  const [post, setPost] = useState('')
  const { loading: postsLoading, error: postsError, data: posts } = useQuery(
    POSTS
  )
  const { data: auth } = useQuery(GET_AUTH)
  const [resetAuth] = useMutation(RESET_AUTH)
  const [createPost, { loading: createPostLoading }] = useMutation(CREATE_POST)
  const [modal, setModal] = useState(false)

  if (postsLoading) return <Loading />
  if (postsError) return <p>{postsError.message}</p>

  return (
    <div className={styles.container}>
      {auth.isAuth ? (
        <div
          style={{ position: 'absolute', right: 50, top: 0, margin: '1rem' }}
        >
          <Typography.Text style={{ marginRight: 15 }}>
            {JSON.parse(auth.profile).email}
          </Typography.Text>
          <Typography.Text
            strong
            style={{ color: 'steelblue', cursor: 'pointer' }}
            onClick={() => resetAuth()}
          >
            Logout
          </Typography.Text>
        </div>
      ) : (
        <Typography.Text
          strong
          style={{ color: 'steelblue' }}
          onClick={() => setModal(true)}
          className={styles.loginButton}
        >
          Login
        </Typography.Text>
      )}
      <Typography.Title className={styles.title}>Guestbook</Typography.Title>
      {auth.isAuth && (
        <div className={styles.postMessage}>
          <Input.TextArea
            value={post}
            onChange={e => setPost(e.target.value)}
            placeholder='type your message'
            autosize={{ minRows: 2, maxRows: 4 }}
          />
          <Button
            loading={createPostLoading}
            onClick={() => {
              createPost({
                variables: { body: post },
                update(
                  proxy,
                  {
                    data: { createPost }
                  }
                ) {
                  const { posts } = proxy.readQuery({ query: POSTS })

                  proxy.writeQuery({
                    query: POSTS,
                    data: { posts: [createPost, ...posts] }
                  })
                }
              })
                .then(() => setPost(''))
                .catch(err => message.error(err.graphQLErrors[0].message))
            }}
            className={styles.postButton}
          >
            post
          </Button>
        </div>
      )}
      {posts.posts.length === 0 && <Empty />}
      {posts.posts.map(post => (
        <Post
          isAuth={auth.isAuth}
          profile={auth.profile}
          key={post.id}
          post={post}
        />
      ))}
      <Modal
        title='Authenticate'
        visible={modal}
        onOk={() => setModal(false)}
        onCancel={() => setModal(false)}
        footer={null}
      >
        <SignForm setModal={setModal} />
      </Modal>
    </div>
  )
}
