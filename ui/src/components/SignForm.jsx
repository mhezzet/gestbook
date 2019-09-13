import React, { useState } from 'react'
import {
  Icon,
  Input,
  Button,
  Typography,
  Form as AntForm,
  Alert,
  message
} from 'antd'
import { Field, Form, Formik } from 'formik'
import { useMutation } from '@apollo/react-hooks'
import * as yup from 'yup'
import { SIGN_IN, SIGN_UP, SET_AUTH } from '../store'

const localSchema = yup.object().shape({
  email: yup
    .string()
    .email('invalid email')
    .required(),
  password: yup
    .string()
    .min(4, 'too short')
    .required()
})

export default function SignForm({ setModal }) {
  const [type, setType] = useState('login')
  const [serverError, setServerError] = useState('')
  const [signin] = useMutation(SIGN_IN)
  const [signup] = useMutation(SIGN_UP)
  const [setAuth] = useMutation(SET_AUTH)

  return (
    <>
      <Typography.Title style={{ textAlign: 'center' }} level={3}>
        {type === 'login' ? 'Login' : 'Register'}
      </Typography.Title>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={localSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          if (type === 'login') {
            signin({ variables: values })
              .then(({ data }) => setAuth({ variables: data.signin }))
              .then(() => {
                setModal(false)
                resetForm()
                setSubmitting(false)
                setServerError('')
                message.success('you have successfully signed in')
              })
              .catch(err => {
                setServerError(err.graphQLErrors[0].message)
                setSubmitting(false)
              })
          } else {
            signup({ variables: values })
              .then(({ data }) => setAuth({ variables: data.signup }))
              .then(() => {
                setModal(false)
                resetForm()
                setSubmitting(false)
                setServerError('')
                message.success('you have successfully signed up')
              })
              .catch(err => {
                setServerError(err.graphQLErrors[0].message)
                setSubmitting(false)
              })
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field
              name='email'
              render={({ field, form: { touched, errors, isSubmitting } }) => (
                <AntForm.Item
                  validateStatus={touched.email && errors.email ? 'error' : ''}
                  help={(touched.email && errors.email) || ''}
                >
                  <Input
                    {...field}
                    disabled={isSubmitting}
                    prefix={
                      <Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />
                    }
                    placeholder='Email'
                  />
                </AntForm.Item>
              )}
            />
            <Field
              name='password'
              render={({ field, form: { touched, errors, isSubmitting } }) => (
                <AntForm.Item
                  validateStatus={
                    touched.password && errors.password ? 'error' : ''
                  }
                  help={(touched.password && errors.password) || ''}
                >
                  <Input
                    {...field}
                    type='password'
                    disabled={isSubmitting}
                    prefix={
                      <Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />
                    }
                    placeholder='Password'
                  />
                </AntForm.Item>
              )}
            />
            {serverError && (
              <Alert
                showIcon
                style={{ marginBottom: 20 }}
                message={serverError}
                type='error'
              />
            )}
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              <Button htmlType='submit' disabled={isSubmitting}>
                {type === 'login' ? 'login' : 'signup'}
              </Button>
              <Typography.Text
                onClick={() => {
                  setType(type === 'login' ? 'signup' : 'login')
                  setServerError('')
                }}
                style={{
                  textAlign: 'center',
                  color: 'steelblue',
                  marginTop: 15,
                  cursor: 'pointer'
                }}
              >
                {type === 'login'
                  ? 'you are not a member? singup'
                  : 'you are already a member? login'}
              </Typography.Text>
            </div>
          </Form>
        )}
      </Formik>
    </>
  )
}
