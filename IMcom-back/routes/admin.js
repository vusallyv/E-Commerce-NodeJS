
const AdminJS = require('adminjs')
const AdminJSExpress = require('@adminjs/express')

const adminJs = new AdminJS({
  databases: [],
  rootPath: '/admin',
})

const router = AdminJSExpress.buildRouter(adminJs)
