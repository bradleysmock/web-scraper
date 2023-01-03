import {CollectContent, DownloadContent, OpenLinks, Root, Scraper} from 'nodejs-web-scraper';
import fs from 'fs';
import {scraperConfig} from "./scraperConfig.js";
import {rootConfig} from "./rootConfig.js";
import {getPageHtml} from "./getPageHtml.js";

(async () => {

    const scraper = new Scraper(scraperConfig);
    const root = new Root(rootConfig);

    const stateAgreement = new CollectContent('div.ms-rtestate-field > div > div:nth-child(6) a', {
        name: 'stateAgreements',
        getElementContent: (elementContentString,pageAddress)=>{

        }
    });
    // const article = new OpenLinks('article a', {name: 'article', getPageHtml});
    // const image = new DownloadContent('img', {name: 'image'});
    // const title = new CollectContent('h1', {name: 'title'});

    root.addOperation(stateAgreement);

    await scraper.scrape(root);

    // const agreements = stateAgreement();
    // fs.writeFile('./output/agreements.json', JSON.stringify(agreements), () => {})

})();
