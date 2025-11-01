// NOTE: This TS config remains only for editor tooling (intellisense/types).
// Tailwind CLI/build will use tailwind.config.js instead.
// We re-export the JS config to keep definitions in sync.
import jsConfig from './tailwind.config.js';
import type { Config } from 'tailwindcss';
const config = jsConfig as unknown as Config;
export default config;