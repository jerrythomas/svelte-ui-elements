import svelte from 'rollup-plugin-svelte'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import { terser } from 'rollup-plugin-terser'
import pkg from './package.json'

const name = pkg.name
  .replace(/^(@\S+\/)?(svelte-)?(\S+)/, '$3')
  .replace(/^\w/, (m) => m.toUpperCase())
  .replace(/-\w/g, (m) => m[1].toUpperCase())

export default [
  {
    external: [
      'svelte',
      'svelte/animate',
      'svelte/easing',
      'svelte/internal',
      'svelte/motion',
      'svelte/store',
      'svelte/transition',
      'marked',
      'prismjs',
      'codemirror',
    ],
    input: 'src/index.js',
    output: [{ file: pkg.module, format: 'es' }],
    plugins: [
      svelte(),
      resolve(),
      commonjs({
        include: 'node_modules/**', // Default: undefined
      }),
      terser(),
    ],
  },
  {
    input: 'src/index.js',
    output: [{ file: pkg.main, format: 'umd', name }],
    plugins: [
      svelte(),
      resolve(),
      commonjs({
        include: 'node_modules/**', // Default: undefined
      }),
      terser(),
    ],
  },
]
