import { Hono } from 'hono'
import { renderer } from './renderer'
import { Login, LoginTried } from './pages/login'
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import { login } from './funcs/auth'

const app = new Hono()

app.use(renderer)

app.get('/login', (c) => {
  return c.render(Login());
})

app.get('/logintied', (c) => {
  return c.render(LoginTried("a@b.c"));
})

app.get('/', (c) => {
  return c.render(<h1>Hello World!</h1>)
})




export default app
