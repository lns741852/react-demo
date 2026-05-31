
import React, { FC } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { Button, Space, Divider, message } from 'antd'
import { PlusOutlined, BarsOutlined, StarOutlined, DeleteOutlined } from '@ant-design/icons'
import styles from './ManageLayout.module.scss'
import { createQuestionService } from '@/api/question'
import { useMutation } from '@tanstack/react-query'

const ManageLayout: FC = () => {
  const nav = useNavigate()
  const { pathname } = useLocation()

  // const [loading, setLoading] = React.useState(false)

  // async function handleCreateClick() {
  //   setLoading(true)
  //   try {
  //     const id = await createQuestionService()
  //     message.success('問卷創建成功')
  //     nav(`/question/edit/${id}`)
  //   } catch (error) {
  //     message.error('網絡錯誤，請稍後再試')
  //   } finally {
  //     setLoading(false)
  //   }
  // }


  // 手動觸發
  const createMutation = useMutation({
    mutationFn: createQuestionService,
    onSuccess(data) {
      message.success('問卷創建成功')
      nav(`/question/edit/${data.id}`)
    },
  })

  const handleCreateClick = async () => {
    createMutation.mutateAsync()
  }



  return (
    <div className={styles.container}>
      <div className={styles.left}>
        {/* <p style={{ display: 'flex', justifyContent: 'center' }}>右边栏</p> */}
        <Space direction="vertical">
          <Button
            type="primary"
            size="large"
            icon={<PlusOutlined />}
            onClick={handleCreateClick}
            disabled={createMutation.isPending}
          >
            創建問卷
          </Button>
          <Divider style={{ borderTop: 'transparent' }} />
          <Button
            type={pathname.startsWith('/manage/list') ? 'default' : 'text'}
            size="large"
            icon={<BarsOutlined />}
            onClick={() => nav('/manage/list')}
          >
            我的問卷
          </Button>
          <Button
            type={pathname.startsWith('/manage/star') ? 'default' : 'text'}
            size="large"
            icon={<StarOutlined />}
            onClick={() => nav('/manage/star')}
          >
            星標問卷
          </Button>
          <Button
            type={pathname.startsWith('/manage/trash') ? 'default' : 'text'}
            size="large"
            icon={<DeleteOutlined />}
            onClick={() => nav('/manage/trash')}
          >
            回收站
          </Button>
          <Button
            type={pathname.startsWith('/manage/userCrudDemo') ? 'default' : 'text'}
            size="large"

            onClick={() => nav('/manage/userCrudDemo')}
          >
            Table_CRUD
          </Button>
        </Space>
      </div>

      <div className={styles.right}>
        <Outlet />
      </div>
    </div>
  )
}

export default ManageLayout
