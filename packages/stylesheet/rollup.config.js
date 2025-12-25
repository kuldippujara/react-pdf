import { dts } from 'rollup-plugin-dts';
import del from 'rollup-plugin-delete';
import typescript from '@rollup/plugin-typescript';
import localResolve from 'rollup-plugin-local-resolve';

import pkg from './package.json' with { type: 'json' };

const cjs = {
  exports: 'named',
  format: 'cjs',
  interop: 'compat',
};

const esm = {
  format: 'es',
};

const getExternal = () => [
  ...Object.keys(pkg.dependencies),
  /@babel\/runtime/,
  /@react-pdf/,
];

const getPlugins = () => [
  localResolve(),
  babel({
    babelrc: true,
    babelHelpers: 'runtime',
    exclude: 'node_modules/**',
  }),
];

const config = {
  input: 'src/index.ts',
  output: { format: 'es', file: 'lib/index.js' },
  external: [...Object.keys(pkg.dependencies), /@react-pdf/],
  plugins: [typescript(), localResolve()],
};

const dtsConfig = {
  input: './lib/types/index.d.ts',
  output: [{ file: 'lib/index.d.ts', format: 'es' }],
  plugins: [dts(), del({ targets: 'lib/types', hook: 'buildEnd' })],
};

export default [config, dtsConfig];
