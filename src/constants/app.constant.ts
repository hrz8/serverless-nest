export default Object.freeze({
  SERVICE_NAME: process.env.SERVICE_NAME,
  REDIS_ENABLE: !!process.env.REDIS_ENABLE,
})
