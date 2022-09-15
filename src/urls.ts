export const urls = {
  home: '/',
  cv: '/cv',
  projects: '/projects',
  todolist: '/todolist',
  hackerTyper: '/hackertyper',
  mortgageCalculator: '/mortgagecalculator',
  memoryGame: '/memorygame',
  blog: {
    home: '/blog/*',
    page: '/blog',
    post: {
      newAsRoute: '/new',
      page: '/post/:slug',
      edit: '/post/edit/:slug',
      list: `/post/`,
      listAsLink: () => `${urls.blog.page}${urls.blog.post.list}`,
      detail: (slug: string) => `/blog/post/${slug}`,
      newAsLink: () => `${urls.blog.page}${urls.blog.post.newAsRoute}`,
      editUsing: (slug: string) => `${urls.blog.page}/post/edit/${slug}`,
    },
  },
  todoRedux: '/todoredux',
}
