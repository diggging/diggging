import { useRouter } from 'next/router'

const Question = () => {
  const router = useRouter()
  const { id } = router.query

  return <p>Question: {id}</p>
}

export default Question
