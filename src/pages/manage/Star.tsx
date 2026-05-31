import { memo, useState } from 'react'
import type { FC } from 'react'
import styles from './common.module.scss'
import QuestionCard from '@/components/QuestionCard'
import { useTitle } from 'ahooks'
import { Empty, Spin, Typography } from 'antd'
import ListSearch from '@/components/ListSearch'
import { useLoadQuestionList } from '@/hooks/useLoadQuestionListData'
import ListPage from '@/components/ListPage'
import { QuestionPage } from '@/types/question'


const { Title } = Typography

const List: FC = () => {
    useTitle('星標問卷') //動態修改網頁title


    // const [list, setList] = useState<Question[]>([])
    // const [total, setTotal] = useState<number>(0)
    // useEffect(() => {
    //     async function load() {
    //         const data = await getQuestionListService()
    //         const { list = [], total = 0 } = data
    //         setList(list)
    //         setTotal(total)
    //     }
    //     load()
    // }, [])

    // const { data = {} as QuestionList, loading } = useLoadQuestionListData()


    const { loading, data } = useLoadQuestionList({ isStar: true })
    const { list, total } = data

    return (
        <>
            <div className={styles.header}>
                <div className={styles.left}>
                    <Title level={3}>星標問卷</Title>
                </div>
                <div className={styles.right}>  <ListSearch /> </div>
            </div>
            <div className={styles.content}>
                {loading && (<div style={{ textAlign: 'center' }}>
                    <Spin />
                </div>)}
                {!loading && list.length === 0 && <Empty description="暫無數據" />}
                {!loading && list.length > 0
                    && list.map(q => {
                        const { _id } = q
                        return <QuestionCard key={_id} {...q} ></QuestionCard>
                    })}
            </div>


            <div className={styles.footer}>
                <ListPage total={total} />
            </div>

        </>
    )
}

export default memo(List)