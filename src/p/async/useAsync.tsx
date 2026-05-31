// import { useState } from 'react'
// import { message } from "antd";



//-------------------------------hook-----------------------------------
// function useAsync<T, P extends any[]>(
//     fn: (...args: P) => Promise<T>
// ) {
//     const [loading, setLoading] = useState(false)
//     const [error, setError] = useState<unknown>(null)

//     const run = async (...args: P): Promise<T | undefined> => {
//         try {
//             setLoading(true)
//             setError(null)

//             const result = await fn(...args)
//             return result
//         } catch (err) {
//             setError(err)
//             throw err   // 🔥 關鍵：不要吞錯誤
//         } finally {
//             setLoading(false)
//         }
//     }

//     return {
//         loading,
//         error,
//         run,
//     }
// }
//-------------------------------UI-----------------------------------

// const { loading, error, run } = useAsync(duplicateQuestionService)
// const [messageApi, contextHolder] = message.useMessage();


// const handleDuplicate = async () => {
//   try {
//     const result = await run(_id)
//     message.success('复制成功')
//     nav(`/question/edit/${result._id}`)
//   } catch (err) {
//     message.error('复制失败')
//   }
// }