import React, { FC, useEffect, useState, useRef, useMemo, useCallback } from 'react'

import QuestionCard from '../../components/QuestionCard'
import { useSearchParams } from 'react-router-dom'
import { Typography, Spin, Empty } from 'antd'
import { getQuestionListService } from '../../api/question'
import { useTitle, useRequest } from 'ahooks'
import ListSearch from '../../components/ListSearch'
import { LIST_PAGE_SIZE, LIST_SEARCH_PARAM_KEY } from '../../constant/index'
import styles from './common.module.scss'
import { Question, QuestionList } from '@/types/question'
import { debounce } from '@/utils/ut'

const { Title } = Typography

const List_Demo: FC = () => {
    useTitle('zono-我的問卷')

    const [started, setStarted] = useState(false) // 是否已經開始加載（防抖，有延遲時間）
    const [page, setPage] = useState(1)
    const [List, setList] = useState<Question[]>([]) // 全部的列表數據，上劃加載更多，累計
    const [total, setTotal] = useState(0)
    const [loading, setLoading] = useState(false)
    const haveMoreData = total > List.length // 判斷是否有未加載的數據
    const [searchParams] = useSearchParams()

    const containerRef = useRef<HTMLDivElement>(null)   // 用於監聽滾動事件，觸底加載更多

    // keyword 變化時，重置信息
    const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || ''
    useEffect(() => {
        setStarted(false)
        setPage(1)
        setList([])
        setTotal(0)
    }, [keyword])

    /**
     * @description  加載數據的函數
     * @param {type}
     * @returns {run:Function} run: 加載數據的觸發器
     * */
    const load = useCallback(async () => {
        if (loading) return // 防止重複觸發

        setLoading(true)
        try {
            const data = await getQuestionListService({
                page,
                pageSize: LIST_PAGE_SIZE,
                keyword,
            })

            // 成功回調邏輯
            const { list: l = [], total = 0 } = data as QuestionList
            setList(prevList => prevList.concat(l)) // 使用函數式更新確保拿到最新 list
            setTotal(total)
            setPage(prevPage => prevPage + 1)
        } catch (error) {
            console.error("加載失敗:", error)
        } finally {
            setLoading(false)
        }
    }, [page, keyword, loading])


    /**
     * @description  嘗試加載更多的函數，滿足條件就加載下一頁
     * */
    const tryLoadMore = debounce(() => {
        const elem = containerRef.current; // 獲取當前元素
        if (elem == null) return;

        const domRect = elem.getBoundingClientRect(); // 獲取元素大小及相對於視口的位置
        if (domRect == null) return;

        const { bottom } = domRect; // 獲取元素的底部與視窗頂部距離

        // 元素已在底部，觸發加載(window.innerHeight 頁面高度)
        if (bottom <= window.innerHeight) {
            load();
            setStarted(true);
        }
    }, 1000);


    // -----------------------------------------------------------------------數據加載-----------------------------------------------------------------------
    // 1. 當頁面加載，或者 url 參數（keyword）變化時，觸發加載
    useEffect(() => {
        tryLoadMore() // 加載第一頁，初始化
    }, [searchParams])

    // 2. 當頁面滾動時，要嘗試觸發加載
    useEffect(() => {

        if (!haveMoreData) return;

        window.addEventListener('scroll', tryLoadMore);
        return () => {
            window.removeEventListener('scroll', tryLoadMore);
        };
    }, [searchParams, haveMoreData])

    // LoadMore 顯示組件
    const LoadMoreContentElem = useMemo(() => {
        // 1. 未加載、正在加載，顯示 Spin
        if (!started || loading) return <Spin />
        // 2. 加載完成，無數據，顯示 Empty
        if (total === 0) return <Empty description="暫無數據" />
        // 3. 拉到底部
        if (!haveMoreData) return <span>沒有更多了...</span>
        return <span>開始加載下一頁</span>
    }, [started, loading, haveMoreData, total])

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

            <div className={styles.content}>
                {List.length > 0 &&
                    List.map((q: any) => {
                        const { _id } = q
                        return <QuestionCard key={_id} {...q} />
                    })}
            </div>

            <div className={styles.footer}>
                <div ref={containerRef}>{LoadMoreContentElem}</div>
            </div>
        </>
    )
}

export default List_Demo
