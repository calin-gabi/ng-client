export interface IAppConfig {
  config: {
    apiUrl: string,
    imagesUrl: string,
    appDomain: string,
    apiDateFormat: string,
    dateFormat: string,
    isoLanguage: string,
    language: string,
    zopim: boolean,
    reduxLogs: boolean,
    facebook: {
      appId: string,
      scope: string,
      version: string
    },
    google: {
      clientId: string,
      scope: string
    }
  };
}
