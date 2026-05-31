import { memo, useState } from 'react'
import type { FC, ReactNode } from 'react'
import Button from '../../components/Button'
import Switch from '../../components/Switch'
import styled from 'styled-components'
import RadioGroup from '../../components/Radio/RadioGroup'
import Radio from '../../components/Radio'
import Input from '../../components/Input'
import FormItem from '../../components/FormController'
import Card from '../../components/Card'

interface Iprops {
    children?: ReactNode
}


const TestPageWapper = styled.div`
  display: flex; 
  gap: 10px;
`

const TestPage: FC<Iprops> = () => {

    const [value, setValue] = useState<string | number>('')

    return (
        <TestPageWapper>
            <Button themeColor='primary'>Hello</Button>
            <Switch isChecked={true}></Switch>
            <RadioGroup
                value={value}
                onChange={(value) => setValue(value)}
            >
                <Radio value="male">Male</Radio>
                <Radio value="female">Female</Radio>
                <Radio value="others">Others</Radio>
            </RadioGroup>


            <FormItem
                isRequired={true}
                label="title"
                maxLength={3}
            >
                <Input onChange={(e) => console.log(e.target.value)} />
            </FormItem>
            <Card loading={true}
            >test</Card>
        </TestPageWapper>
    )
}

export default memo(TestPage)