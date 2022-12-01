const DEFAULT_HOST = `http://74.208.23.148/`;

function flog(module: string, color: string, ...args: string[]) {
  const text = args.join(' ');
  setTimeout( 
    console.log.bind(
      console, 
      `${module}: %c${text}`, 'color: ' + color
    )
  );
}

const flogger = (module: string) => {
  const logger = app.isDevEnv 
    ? (color: string) => (...args: string[]) => flog(module, color, ...args)
    : () => () => {};

  return {
    white: logger('white'),
    yellow: logger('yellow'),
    orange: logger('orange'),
    red: logger('red'),
    pink: logger('pink'),
    green: logger('green'),
    blue: logger('blue'),
    magenta: logger('magenta'),
    cyan: logger('cyan'),
  };
}



export type VAppVersion = { 
  major: number, 
  minor: number, 
  revision: number 
}

export type VAppConfiguration = {
  name: string,
  host: string,
  version: VAppVersion,
}

export interface IEntity {
  _id?: string,
  _entityType?: string,
  _partitionKey?: string,
  _parentId?: string,
  _parentType?: string,
  _parentPartition?: string,
}

export type ApiResponse = {
  ok: boolean,
  data?: any,
  message?: string,
}

/////////////////////////////////////////////////
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
const getResponse = (method: HttpMethod, url: string, body?: any, options?: any) => {
  if (!app.initialized) throw new Error('Application not initialized.  Must call api.init(def) first.');
  return new Promise<ApiResponse>(async (resolve, reject) => {
    fetch(url, {
      method,
      headers: {
        'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
      },
      body,
      ...options,
    })
    .then(response => response.json())
    .then((payload: any) => {
      if (!payload.ok) {
        reject(payload.message);
        throw new Error(payload.message);
      }
      resolve(payload.data);
    })
    .catch(error => reject(error.message));
  })
}

var server = {
  get: (route: string, options?: any) => getResponse(`GET`, getHostUrl() + getAppName() + route, undefined, options),
  post: (route: string, body?: any, options?: any) => getResponse(`POST`, getHostUrl() + getAppName() + route, body, options),
  put: (route: string, body?: any, options?: any) => getResponse(`PUT`, getHostUrl() + getAppName() + route, body, options),
  delete: (route: string, body?: any, options?: any) => getResponse(`DELETE`, getHostUrl() + getAppName() + route, body, options),
}

const getApps = () => server.get(`/applications`);
const getApp = () => server.get(`/applications/${getAppName()}`);

const createApp = () => server.post(`/applications/${getAppName()}`);
const updateApp = (props: any) => server.put(`/applications/${getAppName()}`, props);
const deleteApp = () => server.delete(`/applications/${getAppName()}`);

const initApp = async (appDef: VAppConfiguration) => {
  // NOTE: User must be authenticated before being able to do anything with an Application
  // They must also be properly permissioned.  We don`t want random stragers changing other people`s apps.
  Object.assign(app, appDef);
  app.initialized = true;

  const exists = await server.get(`/applications/${appDef.name}`, {cache: "force-cache"});
  
  if (!exists) {
    debugger
    await createApp();
    // anything else to initialize?
  }
  
  Object.freeze(app);
}

var app = {
  name: undefined,
  host: DEFAULT_HOST, // must end with / 
  environment: process.env.NODE_ENV,
  isDevEnv: process.env.NODE_ENV === 'development',
  isTestEnv: process.env.NODE_ENV === 'test',
  isProdEnv: process.env.NODE_ENV === 'production',
  initialized: false,
};

var subscription = {
  updateApp,
  createApp,
  deleteApp
};


const getServerInfo = () => server.get(`/server/info`);
const login = (email: string, password: string) => server.post(`/login`, { email, password })
const logout = () => server.post(`/logout`)

// -- Types
const type = (type: string) => server.get(`/types/${type}`)
const types = () => server.get(`/types`)
const createType = (type: string) => server.post(`/types/${type}`)
const updateType = (type: string, payload: any) => server.put(`/types/${type}`, payload)
const deleteType = (type: string) => server.delete(`/types/${type}`)

// -- Fields

const createTypeField = (type: string, field: string, payload: any) =>
  server.post(`/types/${type}/field/${field}`, payload)
const updateTypeField = (type: string, field: string, payload: any) =>
  server.put(`/types/${type}/field/${field}`, payload)
const deleteTypeField = (type: string, field: string) =>
  server.delete(`/types/${type}/field/${field}`)

// -- Modules

const createTypeModule = (type: string, module: string, payload: any) =>
  server.post(`/types/${type}/module/${module}`, payload)
const updateTypeModule = (type: string, module: string, payload: any) =>
  server.put(`/types/${type}/module/${module}`, payload)
const deleteTypeModule = (type: string, module: string) =>
  server.delete(`/types/${type}/module/${module}`)

// -- Indices

const createIndex = (type: string, indexName: string, fieldsAndOptions: any) =>
  server.post(`/types/${type}/index/${indexName}`, fieldsAndOptions)
const dropIndex = (type: string, indexName: string) =>
  server.delete(`/types/${type}/index/${indexName}`)

const meta = {
  type,
  types,
  createType,
  updateType,
  deleteType,
  createTypeField,
  updateTypeField,
  deleteTypeField,
  createTypeModule,
  updateTypeModule,
  deleteTypeModule,
  createIndex,
  dropIndex,
}


/////////////////////////////////////////////////////////////// IMAGES

const images = {
    upload: (payload: any, context?: IEntity) => {
      const e = context || {};
      const pathFromRoot = [ e._entityType, e._id ].filter(x => !!x).join('/');
      server.post(`/image/${pathFromRoot}`, payload);
    },
}

///////////////////////////////////////////////////////////////// Entities

const find = (type: string, query?: any, options?: any, skip?: number, limit?: number) => server.post(`/${type}/query`, { query, options, skip, limit });
const get = (type: string, id: string) => server.get(`/${type}/${id}`);
const create = (type: string, payload: any) => server.post(`/${type}`, payload);
const update = (type: string, item: any) => server.put(`/${type}`, item);
const deleteEntities = (type: string, idOrQuery: string | any) => server.delete(`/${type}`, idOrQuery);
const addChild = (type: string, id: string, childType: string, payload: any) => server.post(`/${type}/${id}/${childType}`, payload);

const entities = {
    find,
    get,
    create,
    update,
    delete: deleteEntities,
    addChild,
}

const hydrate = (action: any) => { // a.k.a. mergeScope
  // TODO:  Find out what mergeScope was supposed to do
  return action.payload;
}

const perform = (...args: any[]) => { 
  return new Promise(() => {
    console.log(args);
    throw new Error('api.perform() is not implemented') 
    // resolve(null);
    // reject();
  });
}

const api = {
  
  init: initApp,
  app,
  
  subscription,

  server: { 
    getInfo: getServerInfo,
  },
  user: { 
    login, 
    logout,
  },
  meta,
  
  ...entities,

  hydrate,
  perform,

  images,
  noOp: () => {},
  // Helpers
  getPathForImageName,
  getPathForImage,

  flogger,
  
}

//////////////////////////////////////////////////// Utils
function stringOrProp(value: string | any, key: string) {
  if (typeof value === 'string') return value;
  return value[key];
}


//////////////////////////////////////////////////// Helper functions
function getHostUrl() {
  if (!app.initialized) throw new Error('App not initialized');
  return app.host;
}
function getAppName() {
  if (!app.initialized) throw new Error('App not initialized');
  return app.name;
}


function getContextPathFromRoot(context?: IEntity) {
  if (!context) return '';
  const tokens = [ context._entityType, context._id ].filter(x => !!x);
  return tokens.length ? tokens.join('/') : '';
}

function getPathForImageName(imageName: string, context?: IEntity) {
  const contextPath = getContextPathFromRoot(context);
  return `${getHostUrl()}images/${getAppName()}/${contextPath}${imageName}`;
}

export type IImage = { name: string } & IEntity;
function getPathForImage(imageNameOrEntity: IImage | string, context?: IEntity) {
  const contextPath = getContextPathFromRoot(context);
  return `${getHostUrl()}images/${getAppName()}/${contextPath}${stringOrProp(imageNameOrEntity, 'name')}`;
}


export default api;
