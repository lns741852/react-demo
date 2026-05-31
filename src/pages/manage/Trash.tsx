
import React, { FC, useState } from 'react'
import { useTitle } from 'ahooks'
import { Typography, Table, Tag, Button, Space, Modal, Empty, Spin } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { useRequest } from 'ahooks'
// import ListPage from '../../components/ListPage'
// import useLoadQuestionListData from '../../hooks/useLoadQuestionListData'
// import { updateQuestionService, deleteQuestionsService } from '../../services/question'
import styles from './common.module.scss'
import ListSearch from '@/components/ListSearch'
import { useLoadQuestionList } from '@/hooks/useLoadQuestionListData'
import { useTrashDeleted, useTrashRecover } from '@/hooks/useTrash'
import ListPage from '@/components/ListPage'

const { Title } = Typography
const { confirm } = Modal




const Trash: FC = () => {
    useTitle('zono問卷 - 回收站')

    const { loading, data } = useLoadQuestionList({ isDeleted: true })
    const { list, total } = data

    const [selectedIds, setSelectedIds] = useState<string[]>([])

    // 恢覆
    const { recover, recoverLoading } = useTrashRecover(selectedIds, () => setSelectedIds([]));
    // 刪除
    const { deleted, deletedLoading } = useTrashDeleted(selectedIds, () => setSelectedIds([]));


    function del() {
        confirm({
            title: '確認徹底刪除該問卷？',
            icon: <ExclamationCircleOutlined />,
            content: '刪除以後不可以找回',
            onOk: deleted,
        })
    }

    // 表格列
    const tableColumns = [
        {
            title: '標題',
            dataIndex: 'title',
            // key: 'title', // 循環列的 key ，它會默認取 dataIndex 的值
        },
        {
            title: '是否發布',
            dataIndex: 'isPublished',
            render: (isPublished: boolean) => {
                return isPublished ? <Tag color="processing">已發布</Tag> : <Tag>未發布</Tag>
            },
        },
        {
            title: '答卷',
            dataIndex: 'answerCount',
        },
        {
            title: '創建時間',
            dataIndex: 'createdAt',
        },
    ]

    // 內容
    const TableElem = (
        <>
            <div style={{ marginBottom: '16px' }}>
                <Space>
                    <Button type="primary" disabled={selectedIds.length === 0}
                        loading={recoverLoading}
                        onClick={() => recover()}>
                        恢覆
                    </Button>
                    <Button danger disabled={selectedIds.length === 0}
                        loading={deletedLoading}
                        onClick={del}>
                        刪除
                    </Button>
                </Space>
            </div>
            <div style={{ border: '1px solid #e8e8e8' }}>
                <Table
                    dataSource={list}
                    columns={tableColumns}
                    pagination={false}
                    rowKey={q => q._id}
                    rowSelection={{
                        type: 'checkbox',
                        onChange: selectedRowKeys => {
                            setSelectedIds(selectedRowKeys as string[])
                        },
                    }}
                />
            </div>
        </>
    )

    return (
        <>
            <div className={styles.header}>
                <div className={styles.left}>
                    <Title level={3}>回收站</Title>
                </div>
                <div className={styles.right}>
                    <ListSearch />
                </div>
            </div>

            <div className={styles.content}>
                {loading && (
                    <div style={{ textAlign: 'center' }}>
                        <Spin />
                    </div>
                )}
                {list.length === 0
                    ? <Empty description="暫無數據" />
                    : TableElem
                }
            </div>

            <div className={styles.footer}>{list.length > 0 && <ListPage total={total} />}</div>

        </>
    )
}

export default Trash
