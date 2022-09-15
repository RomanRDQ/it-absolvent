import { PostType } from '../PostList/PostList'
import { genericHookContextBuilder } from '../../../utils/genericHookContextBuilder'
import { services } from '../../../utils//backendAPI'
import { useComponentDidMount } from '../../../utils/useComponentDidMount'
import { useState } from 'react'

const useLogicState = () => {
  const [input, setInput] = useState('')
  const [postData, setPostData] = useState([] as PostType[])
  const [filterPosts, setFilterPosts] = useState(postData)
  const [error, setError] = useState(null as null | string)
  const [loading, setLoading] = useState(false)

  useComponentDidMount(async () => {
    try {
      setError(null)
      setLoading(true)
      setPostData(await services.blog.getAll())
    } catch (err) {
      setError('Database is temporarily unavailable')
      console.error(err)
    } finally {
      setLoading(false)
    }
  })

  const searchInputHandler = async (query: string) => {
    setInput(query)
    try {
      setError(null)
      setLoading(true)
      setFilterPosts(await services.blog.filter(query))
    } catch (err) {
      setError('Database is temporarily unavailable')
    } finally {
      setLoading(false)
    }
  }

  return {
    input,
    postData,
    filterPosts,
    error,
    loading,
    searchInputHandler,
  }
}

export const { ContextProvider: PostListContextProvider, Context: PostListContext } =
  genericHookContextBuilder(useLogicState)
