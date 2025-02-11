/** @type {import('jest').Config} */
const config = {
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}', 
    '!src/**/index.ts',
    '!src/redux/**',
    '!src/index.tsx',
    '!src/interfaces.ts',
    '!src/react-app-env.d.ts'
  ],
  coverageDirectory: 'coverage',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
    '^.+\\.svg$': 'jest-svg-transformer',
    '^.+\\.(jpg|jpeg|png|gif|webp|avif|ico|bmp|tiff)$': 'jest-transform-stub',
    '^.+\\.(css|scss)$': 'identity-obj-proxy',
  },
};

export default config;
