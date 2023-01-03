import fs from "fs";

let directoryExists;
export const getPageHtml = (html, pageAddress) => {

    if (!directoryExists) {
        fs.mkdirSync('./output/html');
        directoryExists = true;
    }
    const name = sanitize(pageAddress)
    fs.writeFile(`./output/html/${name}.html`, html, () => {
    })
}