import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['tests/html/**/*.test.mjs'],
    environment: 'node',
  },
});
