import fs from "fs";

export const savePageHtml = (html, name) => {
    if (!fs.existsSync('./output/html')) {
        fs.mkdirSync('./output/html');
    }

    fs.writeFile(`./output/html/${name}.html`, html, () => {});
}