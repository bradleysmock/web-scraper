export const scraperConfig = {
    baseSiteUrl: `https://partners.wgu.edu/`,
    startUrl: `https://partners.wgu.edu/Pages/Partners.aspx`,
    logPath: './logs/',
    cloneFiles: false,
    removeStyleAndScriptTags: false,
    concurrency: 1, //Maximum concurrent jobs. More than 10 is not recommended.Default is 3.
    maxRetries: 0,
    delay: 2000,
    // timeout: 6000,
    filePath: './output/images/',
    // auth: null,
    // headers: null,
    // proxy:null,
    // showConsoleLogs:true,
    // onError:null // onError(errorString) => {}
}