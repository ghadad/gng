let files = ['tests/**/*.spec.js']
if (process.env.TEST === 'api') {
  files = ['tests/api/**/*.spec.js']
}
if (process.env.TEST === 'ui') {
  files = ['tests/ui/**/*.spec.js']
}
if (process.env.TEST === 'e2e') {
  files = ['tests/e2e/**/*.spec.js']
}

export default {
  // require: ['./tests/setup.js'],
  files,
  cache: true,
  concurrency: 32,
  failFast: true,
  failWithoutAssertions: false,
  verbose: true
}
