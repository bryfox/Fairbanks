// Manual mock for ApiProvider
// facebook.github.io/jest/docs/en/manual-mocks.html
const ApiProvider = require.requireActual('../api_provider')

let MockApiProvider = ApiProvider.default
MockApiProvider.prototype.getDailyUpdate = jest.fn(() => new Promise(function () {}))

module.exports = MockApiProvider
