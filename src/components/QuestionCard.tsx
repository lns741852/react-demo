import { memo } from 'react'
import type { FC, ReactNode } from 'react'
import styles from './QuestionCard.module.scss'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Divider, Popconfirm, Space, Modal, message } from 'antd'
import { CopyOutlined, DeleteOutlined, EditOutlined, ExclamationCircleOutlined, LineChartOutlined, StarOutlined } from '@ant-design/icons'

import { Question } from '@/types/question'
import { useQuestionDeleted, useQuestionDuplicated, useQuestionStar } from '@/hooks/useLoadQuestionData'


const { confirm } = Modal

type PropsType = Question

const QuestionCard: FC<PropsType> = (props: PropsType) => {
    const nav = useNavigate()
    const { _id, title, createdAt, isPublished, answerCount, isStar } = props


    const { isStarState, changeStar, changeStarLoading } = useQuestionStar({ isStar, _id });
    const { duplicate, duplicateLoading } = useQuestionDuplicated(_id)
    const { deleteQuestion, deleteLoading, isDeletedState } = useQuestionDeleted(_id)


    // 已经删除的问卷，不要再渲染卡片了
    if (isDeletedState) return null
    return (
        <div className={styles.container} >
            {/* {contextHolder} */}
            <div className={styles.title}>
                <div className={styles.left}>
                    <Link to={isPublished ? `/question/stat/${_id}` : `/question/edit/${_id}`}>
                        <Space>
                            {isStarState && <StarOutlined style={{ color: 'red' }} />}
                            {title}
                        </Space>
                    </Link>
                </div>
                {/* 是否發布 */}
                <div className={styles.right}>
                    <Space>
                        {isPublished ? <span style={{ color: 'green' }}>已發布</span> : <span>未發布</span>}
                        <span>答卷：{answerCount}</span>
                        <span>創建時間：{createdAt}</span>
                    </Space>
                </div>
            </div>

            <Divider style={{ margin: '12px 0' }} />
            {/* 操作 */}
            <div className={styles['button-container']}>
                <div className={styles.left}>
                    <Space>
                        <Button
                            icon={<EditOutlined />}
                            type="text"
                            size="small"
                            onClick={() => nav(`/question/edit/${_id}`)}
                        >
                            編輯問卷
                        </Button>
                        <Button
                            icon={<LineChartOutlined />}
                            type="text"
                            size="small"
                            onClick={() => nav(`/question/stat/${_id}`)}
                            disabled={!isPublished}
                        >
                            問卷統計
                        </Button>
                    </Space>
                </div>

                <div className={styles.right}>
                    <Space>
                        <Button
                            type="text"
                            icon={<StarOutlined />}
                            size="small"
                            onClick={() => changeStar()} // 切換標星狀態
                            disabled={changeStarLoading}
                        >
                            {isStarState ? '取消標星' : '標星'}
                        </Button>

                        <Popconfirm
                            title="確定複製該問卷？"
                            okText="確定"
                            cancelText="取消"
                            onConfirm={() => duplicate()} // 點擊確定時的回調
                        >
                            <Button type="text" icon={<CopyOutlined />} size="small" disabled={duplicateLoading}>
                                複製
                            </Button>
                        </Popconfirm>
                        <Button
                            type="text"
                            icon={<DeleteOutlined />}
                            size="small"
                            onClick={() => {
                                confirm({
                                    title: '確定刪除該問卷？',
                                    icon: <ExclamationCircleOutlined />,
                                    onOk: () => deleteQuestion(),
                                })
                            }}
                            disabled={deleteLoading} // 刪除中
                        >
                            刪除
                        </Button>
                    </Space>
                </div>
            </div>
        </div >
    )
}

export default memo(QuestionCard)