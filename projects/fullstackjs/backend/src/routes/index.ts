import { readdirSync } from 'node:fs'
import { Router } from 'express'

const ROUTE_PATH = `${__dirname}`

const router = Router()

const clearFilename = (filename: string) => {
  return filename.split('.').shift()
}

readdirSync(ROUTE_PATH).forEach(filename => {
  const clearName = clearFilename(filename)
  if (clearName !== 'index') {
    import(`./${clearName}.router`).then(routerModule => {
      router.use(`/${clearName}`, routerModule.router)
    })
  }
})

export { router }
