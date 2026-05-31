import React, { FC, useRef, useMemo } from 'react'

import QuestionCard from '../../components/QuestionCard'
import { Typography, Spin, Empty } from 'antd'
import { useTitle } from 'ahooks'
import ListSearch from '../../components/ListSearch'
import styles from './common.module.scss'
import { useLoadMoreQuestionList } from '@/hooks/useLoadQuestionListData'
import useLoadMore from '@/hooks/useLoadMore'
import { QuestionPage } from '@/types/question'

const { Title } = Typography

const List: FC = () => {
    useTitle('zono-我的問卷')

    const containerRef = useRef<HTMLDivElement>(null)   // 用於監聽滾動事件，觸底加載更多

    const { data, fetchNextPage, hasNextPage } = useLoadMoreQuestionList()

    useLoadMore(
        containerRef as React.RefObject<HTMLDivElement>,
        hasNextPage,
        fetchNextPage
    );

    // // LoadMore 顯示組件
    const LoadMoreContentElem = useMemo(() => {
        if (data.pages.length === 0) return <Empty description="暫無數據" />
        if (!hasNextPage) return <span>沒有更多了...</span>
        return <Spin />
    }, [hasNextPage])

    return (
        <>
            <div className={styles.header}>
                <div className={styles.left}>
                    <Title level={3}>我的問卷</Title>
                </div>
                <div className={styles.right}>
                    <ListSearch />
                </div>
            </div>
            <div>
                {data.pages.map((group, i) => (
                    <div key={i}>
                        {group?.list.map(q => {
                            const { _id } = q
                            return <QuestionCard key={_id} {...q} />
                        }
                        )}
                    </div>
                ))}
                <div className={styles.footer}>
                    <div ref={containerRef}>{LoadMoreContentElem}</div>
                </div>
            </div>
        </>
    )
}

export default List
