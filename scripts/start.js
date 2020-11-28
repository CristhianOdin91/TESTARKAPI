process.env.NODE_ENV = 'development'
process.env.BABEL_ENV = 'development'

const init = async () => { await import('../src/server') }

init()
