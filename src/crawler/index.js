import HCCrawler from 'headless-chrome-crawler';
import {saveToFile} from "../shared/saveToFile.js";
import {existsSync} from "node:fs";

(async () => {

  const errors = [];

  const crawler = await HCCrawler.launch({
    maxDepth: 5,
    maxConcurrency: 1,

    customCrawl: async (page, crawl) => {
      const result = await crawl();

      try {
        await page.waitForSelector('a[ng-href]', {timeout: 4000});

        const links = await page.$$eval(
            'a[href], a[ng-href]',
            anchors => {
              return anchors.map(anchor => anchor.href)
                .filter(href => href.startsWith('https://partners.wgu.edu') && !href.includes('authenticate'))
                .map(href => href.endsWith('#') ? href.slice(0, href.length - 1) : href)
            }
        );

        result.links = [...links];
      } catch (error) {
        // console.error(page.url(), error);
        errors.push({ url: page.url(), error});
      }

      result.html = await page.content();

      return result;
    },

    // Function to be evaluated in browsers
    evaluatePage: (() => ({
      title: $('title').text().trim(),
      url: window.location.href,
    })),

    // Function to be called with evaluated results from browsers
    onSuccess: (result => {
      console.log(result?.result?.url);
      const url = result?.result?.url;
      const name = url.slice(url.lastIndexOf('/') + 1).replace('.aspx','').toLowerCase();
      const html = result?.html;


    if (!existsSync("./output/html/" + name)){ 
      saveToFile(
          name,
          'html',
          `${html}`,
          './output/html'
      );
    }else {
        console.log("skipping ", name)
      }
    }),

    onError: (error) => {
      console.error(error);
    }

  });

  // Queue a request
  await crawler.queue({
    url: 'https://partners.wgu.edu/Pages/Partners.aspx',
    allowedDomains: [ 'partners.wgu.edu' ],
    delay: 1500,
    // waitFor: { selectorOrFunctionOrTimeout:  waitUntil: 'networkidle2', timeout: 60000 }
  });
  await crawler.onIdle(); // Resolved when no queue is left
  await crawler.close(); // Close the crawler
  saveToFile('errors', 'json', JSON.stringify(errors), './output/json')
})();