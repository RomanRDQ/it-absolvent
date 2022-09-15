import { PostType } from '../PostList/PostList'
import { genericHookContextBuilder } from '../../../utils/genericHookContextBuilder'
import { services } from '../../../utils//backendAPI'
import { urls } from '../../../urls'
import { useComponentDidMount } from '../../../utils/useComponentDidMount'
import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'

const useLogicState = () => {
  const [postData, setPostData] = useState([] as PostType[])
  const [error, setError] = useState(null as null | string)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const params = useParams<{ slug: string }>()
  const slug = params.slug
  const post = postData.find(p => p.slug === slug)

  const removePostHandler = async () => {
    try {
      setError(null)
      setLoading(true)
      await services.blog.deleteBySlug(slug!)
      navigate(urls.blog.post.listAsLink())
    } catch (err) {
      setError('Database is temporarily unavailable')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const editPostHandler = () => {
    navigate(urls.blog.post.editUsing(slug!))
  }

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

  return {
    error,
    editPostHandler,
    removePostHandler,
    loading,
    post,
    slug,
  }
}

export const { ContextProvider: PostPageContextProvider, Context: PostPageContext } =
  genericHookContextBuilder(useLogicState)
