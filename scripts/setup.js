'use strict'

const { execFile } = require('child_process')
const { access } = require('fs/promises')
const os = require('os')
const path = require('path')

if (os.platform() !== 'darwin') {
  console.log('workspace initialized')
  return
}

const marker = path.join(process.cwd(), 'setup-complete')

execFile('/usr/bin/touch', [marker], (error) => {
  if (error) {
    console.error(error)
    process.exitCode = 1
    return
  }
  access(marker).then(() => console.log('workspace initialized')).catch((failure) => {
    console.error(failure)
    process.exitCode = 1
  })
})
