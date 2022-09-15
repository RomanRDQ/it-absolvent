import { genericHookContextBuilder } from '../../../utils/genericHookContextBuilder'
import { services } from '../../../utils//backendAPI'
import { urls } from '../../../urls'
import { useComponentDidMount } from '../../../utils/useComponentDidMount'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { useState } from 'react'

const useLogicState = () => {
  const [text, setText] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [error, setError] = useState(null as null | string)
  const [loading, setLoading] = useState(false)
  const params = useParams<{ slug: string }>()
  const slug = params.slug
  const isEditMode = Boolean(slug)
  const navigate = useNavigate()

  const updatePost = async () => {
    try {
      setError(null)
      setLoading(true)
      await services.blog.updateBySlug(slug!, { title, text, author })
      setTitle('')
      setText('')
      setAuthor('')
      navigate(urls.blog.post.listAsLink())
    } catch (err) {
      console.error(err)
      setError('Database is temporarily unavailable')
    } finally {
      setLoading(false)
    }
  }

  const addNewPost = async () => {
    try {
      setError(null)
      setLoading(true)
      await services.blog.addNew({ title, text, author })
      setTitle('')
      setText('')
      setAuthor('')
      navigate(urls.blog.post.listAsLink())
    } catch (err) {
      console.error(err)
      setError('Database is temporarily unavailable')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async () => {
    if (isEditMode) {
      await updatePost()
    } else {
      await addNewPost()
    }
  }

  useComponentDidMount(async () => {
    if (!isEditMode) return
    try {
      setError(null)
      setLoading(true)
      const response = await services.blog.getBySlug(slug!)
      setTitle(response.body.title)
      setText(response.body.text)
      setAuthor(response.body.author)
    } catch (err) {
      console.error(err)
      setError('Database is temporarily unavailable')
    } finally {
      setLoading(false)
    }
  })

  return {
    title,
    setTitle,
    text,
    setText,
    author,
    setAuthor,
    error,
    handleSubmit,
    loading,
  }
}

export const { ContextProvider: PostManagerContextProvider, Context: PostManagerContext } =
  genericHookContextBuilder(useLogicState)
