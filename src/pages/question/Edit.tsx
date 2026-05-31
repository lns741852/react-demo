import { useLoadQuestionData } from '@/hooks/useLoadQuestionData'
import type { FC } from 'react'

const Edit: FC = () => {

    const { isLoading, data: question } = useLoadQuestionData()

    return (
        <div>
            <p>Edit page</p>
            {isLoading ? <p>loading</p> : <p>{JSON.stringify(question)}</p>}
        </div>
    )
}

export default Edit
