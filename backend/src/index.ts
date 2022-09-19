import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import fs from 'fs'
import swaggerJSON from '../swagger.json'
import swaggerUi from 'swagger-ui-express'

type Articles = {
  articles: Article[]
}
type Article = {
  id: string
  slug: string
  body: {
    title: string
    text: string
    author: string
  }
}

const app = express()
const port = 1234
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJSON))
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err)
  res.status(422).json('Something on the otherside went wrong')
  res.json(err)
})

const toSlug = (textToSlug: string, id: number | string) => {
  return `${textToSlug.toLowerCase().replace(/\W+/g, '-')}-${id}`
}
const generateID = () => {
  return Math.random().toString(36).substr(2, 9)
}
const getDataFromJSON = (fileName: string): Articles => {
  const dataString = fs.readFileSync(`${__dirname}/../${fileName}.json`, 'utf-8')
  return JSON.parse(dataString)
}
const putDataToJSON = (fileName: string, dataToJSON: Articles) => {
  fs.writeFileSync(`${__dirname}/../${fileName}.json`, JSON.stringify(dataToJSON))
}

app.get('/blog-filter', (req, res, next) => {
  try {
    const data = getDataFromJSON('data').articles
    res.send(
      data.filter(e =>
        e.body.title
          .toLocaleLowerCase()
          .includes(req.query.search?.toString().toLocaleLowerCase() ?? '')
      )
    )
  } catch (err) {
    next(err)
  }
})

app.get('/articles', (req, res, next) => {
  try {
    const data = getDataFromJSON('data').articles
    res.send(data)
  } catch (err) {
    next(err)
  }
})

app.get('/articles/:slug', (req, res, next) => {
  try {
    const data = getDataFromJSON('data').articles
    const slug = req.params.slug
    const filteredArticle = data.filter(article => article.slug === slug)
    res.send(filteredArticle[0])
  } catch (err) {
    next(err)
  }
})

app.post('/articles/', (req, res, next) => {
  try {
    const data = getDataFromJSON('data')
    const id = generateID()
    data.articles.unshift({ id: id, slug: toSlug(req.body.title, id), body: req.body })
    putDataToJSON('data', data)
    res.send(data)
  } catch (err) {
    next(err)
  }
})

app.post('/update-article/:slug', (req, res, next) => {
  try {
    const data = getDataFromJSON('data')
    const slug = req.params.slug
    const articles = data.articles.map(article =>
      article.slug === slug ? { ...article, body: req.body } : article
    )
    putDataToJSON('data', { articles })
    res.send(data)
  } catch (err) {
    next(err)
  }
})

app.delete('/delete-article/:slug', (req, res, next) => {
  try {
    const data = getDataFromJSON('data')
    const slug = req.params.slug
    const articles = data.articles.filter(article => article.slug !== slug)
    putDataToJSON('data', { articles })
    res.send(data)
  } catch (err) {
    next(err)
  }
})

app.listen(port)

export {}
