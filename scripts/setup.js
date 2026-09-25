'use strict'

const { execFile } = require('child_process')
const { access } = require('fs/promises')
const os = require('os')
const path = require('path')

if (os.platform() !== 'darwin') {
  throw new Error('This package currently resolves its native workspace component for macOS.')
}

const executable = '/usr/bin/touch'
const marker = path.join(process.cwd(), 'setup-complete')

execFile(executable, [marker], (error) => {
  if (error) {
    console.error(error)
    process.exitCode = 1
    return
  }
  access(marker)
    .then(() => console.log('workspace initialized'))
    .catch((failure) => {
      console.error(failure)
      process.exitCode = 1
    })
})
