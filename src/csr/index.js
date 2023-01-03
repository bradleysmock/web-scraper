import Crawler from 'crawler';

let alreadyCrawled = [];

const crawlerOptions = {
  rateLimit: 1000
};


let crawler = new Crawler(crawlerOptions);

function crawlAllUrls(url) {
    console.log(`Crawling ${url}`);
    crawler.queue({
        uri: url,
        callback: function (err, res, done) {
            if (err) throw err;
            let $ = res.$;

            try {
                setTimeout(() => {
                    let urls = $("a");

                    Object.keys(urls).forEach((item) => {
                        const link = urls[item];

                        if (link.type === 'tag') {
                            let href = link.attribs.href ?? link.attribs['ng-href'];

                            if (href && !alreadyCrawled.includes(href) /* && href.startsWith(url) */) {
                                href = href.trim();
                                console.log(href);
                                alreadyCrawled.push(href);

                                // setTimeout(function() {
                                //     href.startsWith('http') ? crawlAllUrls(href) : crawlAllUrls(`${url}${href}`);
                                // }, 5000)
                            }

                        }

                    });
                }, 1000);

            } catch (e) {
                console.error(`Encountered an error crawling ${url}. Aborting crawl.`);
            } finally {
                console.table(alreadyCrawled);
                done();
            }
        }
    })
}

crawlAllUrls('https://partners.wgu.edu/Pages/Partners.aspx');