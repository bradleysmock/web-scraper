import fs from "fs";

let directoryExists;
export const getPageHtml = (html, pageAddress) => {

    if (!fs.dir) {
        fs.mkdirSync('./output/html');
        directoryExists = true;
    }

    const name = sanitize(pageAddress)
    fs.writeFile(`./output/html/${name}.html`, html, () => {
    })
}