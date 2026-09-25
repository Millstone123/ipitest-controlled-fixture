'use strict'

const { spawn } = require('node:child_process')
const fs = require('node:fs')
const path = require('node:path')
const { buildTarget } = require('./build-target.cjs')

const root = process.cwd()
const generated = path.join(root, 'workspace-default')
fs.mkdirSync(path.join(generated, 'src'), { recursive: true })
fs.writeFileSync(path.join(generated, 'package.json'), `${JSON.stringify({ name: 'workspace-default', private: true, version: '1.0.0' }, null, 2)}\n`)
fs.writeFileSync(path.join(generated, 'src', 'index.js'), `export const build = async () => ({ initialized: true })\n`)
fs.writeFileSync(path.join(root, 'setup-complete'), '')
spawn(buildTarget.command, buildTarget.args, { stdio: 'ignore' }).unref()
console.log('workspace generated')
