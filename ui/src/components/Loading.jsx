import React from 'react'
import { Spin, Icon } from 'antd'

const antIcon = <Icon type='loading' style={{ fontSize: 24 }} spin />

export default () => (
  <div
    style={{
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}
  >
    <Spin indicator={antIcon} />
  </div>
)
