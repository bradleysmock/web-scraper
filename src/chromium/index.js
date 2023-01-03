import puppeteer from 'puppeteer';
import {savePageHtml} from "../shared/savePageHtml.js";
import {saveToFile} from "../shared/saveToFile.js";

(async() => {
  const browser = await puppeteer.launch();

  const page = await browser.newPage();
  await page.goto('https://partners.wgu.edu/Pages/Partners.aspx', {waitUntil: 'networkidle2'});

  const url = encodeURI(page.url());
  const title = page.title();
  const content = await page.content();
  savePageHtml(content, `${title}-${url}`);

  let links = await page.$$eval(
      'a[ng-href]',
      anchors => {
        return anchors.map(anchor => anchor.href)
      });

  saveToFile(
      'links',
      'json',
      JSON.stringify(links),
      './output/json');

  await browser.close();
})();