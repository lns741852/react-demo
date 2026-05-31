import { memo } from 'react'
import type { FC, ReactNode } from 'react'

interface Iprops {
    children?: ReactNode
}

const Stat: FC<Iprops> = () => {
    return <div>Stat</div>
}

export default memo(Stat)