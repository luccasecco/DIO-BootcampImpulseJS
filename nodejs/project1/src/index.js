const OS = require('os')

setInterval(() => {
  const { arch, platform, totalmem, freemem } = OS
  const TRAM = totalmem() / 1024 / 1024
  const FRAM = freemem() / 1024 / 1024
  const USAGE = (FRAM / TRAM) * 100

  const STATS = {
    OS: platform(),
    ARCH: arch(),
    TOTALRAM: `${parseInt(TRAM)} MB`,
    FREERAM: `${parseInt(FRAM)} MB`,
    USAGE: `${USAGE.toFixed(2)} MB`
  }

  console.clear()
  console.table(STATS)
  exports.stats = STATS
}, 1000)
