module.exports = {
  rootDir: '',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(j|t)sx?$': 'babel-jest',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/src/tests/transformers/fileTransformer.js',
  },
  coverageReporters: ['lcov'],
  transformIgnorePatterns: [
    '/node_modules/(?!axios)',
    // Add other patterns if needed
  ],
  moduleNameMapper: {
    '\\.(css)$': 'identity-obj-proxy',
    'single-spa-react/parcel': 'single-spa-react/lib/cjs/parcel.cjs',
    '^Components/(.*)$': '<rootDir>/src/components/$1',
    '^Constants/(.*)$': '<rootDir>/src/constants/$1',
    '^Assets/(.*)$': '<rootDir>/src/assets/$1',
    '^Hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^Pages/(.*)$': '<rootDir>/src/pages/$1',
    '^Redux/(.*)$': '<rootDir>/src/redux/$1',
    '^Utilities/(.*)$': '<rootDir>/src/utilities/$1',
    '^Types/(.*)$': '<rootDir>/src/types/$1',
    '^Config/(.*)$': '<rootDir>/src/config/$1',
  },
  // setupFilesAfterEnv: ['@testing-library/jest-dom'],
  setupFilesAfterEnv: ['<rootDir>/src/tests/setupTests.js'], // Optional: If you have a setupTests file
  moduleDirectories: ['node_modules', 'src'],
}
