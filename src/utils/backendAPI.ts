export const backendFilterSuperheroesUrl = (filterValue: string | undefined) => {
  return `${process.env.REACT_APP_SUPERHEROES_URL}?search=${filterValue}`
}

import { PostType } from '../routes/Blog/PostList/PostList'

const apiBlogURL = process.env.REACT_APP_BLOG_BACKEND_URL

type BodyType = {
  author: string
  text: string
  title: string
}

export const serviceFetchHandler = async (...args: Parameters<typeof fetch>) => {
  const response = await fetch(...args)
  if (!response.ok) new Error('Error in database')
  return await response.json()
}

export const services = {
  blog: {
    filter: async (filterValue: string) => {
      const response = (await serviceFetchHandler(
        `${apiBlogURL}blog-filter?search=${filterValue}`
      )) as PostType[]
      return response
    },
    getBySlug: async (slug: string) => {
      const response = (await serviceFetchHandler(`${apiBlogURL}articles/${slug}`)) as PostType
      return response
    },
    deleteBySlug: async (slug: string) => {
      const response = (await serviceFetchHandler(`${apiBlogURL}delete-article/${slug}`, {
        method: 'DELETE',
      })) as PostType[]
    },
    updateBySlug: async (slug: string, body: BodyType) => {
      const response = (await serviceFetchHandler(`${apiBlogURL}update-article/${slug}`, {
        method: 'POST',
        headers: new Headers({
          'content-type': 'application/json',
        }),
        body: JSON.stringify(body),
      })) as PostType[]
    },
    getAll: async () => {
      const response = (await serviceFetchHandler(`${apiBlogURL}articles`)) as PostType[]
      return response
    },
    addNew: async (body: BodyType) => {
      const response = (await serviceFetchHandler(`${apiBlogURL}articles`, {
        method: 'POST',
        headers: new Headers({
          'content-type': 'application/json',
        }),
        body: JSON.stringify(body),
      })) as PostType
      return response
    },
  },
}
