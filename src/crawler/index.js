import HCCrawler from "headless-chrome-crawler";
import { saveToFile } from "../shared/saveToFile.js";
import {existsSync} from "node:fs";

(async () => {
  const errors = [];

  const crawler = await HCCrawler.launch({
    maxDepth: 2,
    maxConcurrency: 1,

    customCrawl: async (page, crawl) => {
      const result = await crawl();

      try {
        await page.waitForSelector("a[ng-href]", { timeout: 3000 });

        const photos = await page.$$eval("img", (imgs) => {
          return imgs.map((x) => x.src);
        });
        for (const photo of photos) {
          console.log(photo);
          const imagepage = await page.goto(photo);

          const photoName = photo
            .split("/")
            .pop()
            .replace(/\?/g, "-")
            .replace(/=/g, "-")
            .replace(/\&/g, "-");

          if (!existsSync("./output/image/" + photoName)){  
          
             saveToFile(
                photoName,
                "",
                await imagepage.buffer(),
                "./output/image"
              );
          // await fs.writeFile(photoName, await imagepage.buffer())
          
          } else {
            console.log("skipping", photoName)
        }
      }

        const links = await page.$$eval("a[href], a[ng-href]", (anchors) => {
          return anchors
            .map((anchor) => anchor.href)
            .filter(
              (href) =>
                href.startsWith("https://partners.wgu.edu") &&
                !href.includes("Authenticate")
            )
            .map((href) =>
              href.endsWith("#") ? href.slice(0, href.length - 1) : href
            );
        });

        result.links = [...links];
      } catch (error) {
        // console.error(page.url(), error);
        errors.push({ url: page.url(), error });
      }

      result.html = await page.content();

      return result;
    },

    // Function to be evaluated in browsers
    evaluatePage: () => ({
      title: $("title").text().trim(),
      url: window.location.href,
    }),

    // Function to be called with evaluated results from browsers
    onSuccess: (result) => {
      console.log(result?.result?.url);
      // const url = result?.result?.url;
      // const name = url.slice(url.lastIndexOf('/') + 1).replace('.aspx','').toLowerCase();
      // const html = result?.html;

      // saveToFile(
      //     name,
      //     '.html',
      //     `${html}`,
      //     './output/html'
      // );
    },

    onError: (error) => {
      console.error(error);
    },
  });

  // Queue a request
  await crawler.queue({
    url: "https://partners.wgu.edu/Pages/PartnerInsts.aspx?sid=79",
    allowedDomains: ["partners.wgu.edu"],
    delay: 1500,
    // waitFor: { selectorOrFunctionOrTimeout:  waitUntil: 'networkidle2', timeout: 60000 }
  });
  await crawler.onIdle(); // Resolved when no queue is left
  await crawler.close(); // Close the crawler
  saveToFile("errors", ".json", JSON.stringify(errors), "./output/json");
})();
