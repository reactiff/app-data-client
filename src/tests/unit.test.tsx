jest.setTimeout(600000);
import api from '../../example/src/api_dev';
// this is the app configuration json containing all of the metadata
const appConfig = {
  name: 'client-unit-testing',
  host: `http://192.168.1.72:3001/`,
  version: { major: 1, minor: 0, revision: 0 }
  /**
   * // TODO [ ] Add EntityTypes with fields and modules
   */
}
beforeAll(() => {
  return api.init(appConfig);
});

// utility helpers
function assertOk(response) {
  if (!response.body.ok && response.body.message) {
    console.error(response.body.message);
  }
  expect(Reflect.has(response.body, "ok")).toBe(true);
  expect(response.body.ok).toBe(true);
}
function assertData(response) {
  expect(response.body.data).toBeDefined();
}
function assertError(response) {
  expect(Reflect.has(response.body, "ok")).toBe(true);
  expect(response.body.ok).toBe(false);
}
  

describe('Client API lib', () => {

  it('is initialized and ready to be tested', () => {
    expect(api.app.initialized).toBe(true);
  })

  it('can check and make sure the App exists', () => {

    api.platform.login('user', 'pwd');

    expect(api.app.initialized).toBe(true);
  })

  const oldApp = await GET(`/${APP_NAME}/applications/${APP_NAME}`);
      if (oldApp) {
        await DEL(`/${APP_NAME}/applications/${APP_NAME}`, null, { });
      }


})
