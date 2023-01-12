import fs from "fs";
import { join } from 'path';

export const saveToFile = (name, extension, content, location) => {
  try {
    if (!fs.existsSync(location)) {
      fs.mkdirSync(location);
    }
    const cleanName = name.replace(/\?/g, '-')
      .replace(/=/g, '-')
      .replace(/\&/g, '-');
   
    const filePath = join(location, `${cleanName}${extension}`);
    fs.writeFile(filePath, content, () => {});
  } catch (error) {
    console.error(name, error);
  }
}