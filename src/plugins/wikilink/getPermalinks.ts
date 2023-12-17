import * as fs from "fs";
import * as path from "path";

// recursively get all files in a directory
const recursiveGetFiles = (dir: string) => {
    const dirents = fs.readdirSync(dir, { withFileTypes: true });
    const files = dirents
        .filter((dirent:any) => dirent.isFile())
        .map((dirent: any) => path.join(dir, dirent.name));
    const dirs = dirents
        .filter((dirent: any) => dirent.isDirectory())
        .map((dirent: any) => path.join(dir, dirent.name));
    for (const d of dirs) {
        files.push(...recursiveGetFiles(d));
    }

    return files;
};

export const getPermalinks = (
    markdownFolder: string,
    ignorePatterns: Array<RegExp> = [],
    func: (str: any, ...args: any[]) => string = defaultPathToPermalinkFunc
) => {
    const files = recursiveGetFiles(markdownFolder);
    const filesFiltered = files.filter((file:any) => {
        return !ignorePatterns.some((pattern) => file.match(pattern));
    });

    return filesFiltered.map((file:any) => func(file, markdownFolder));
};

const defaultPathToPermalinkFunc = (
    filePath: string,
    markdownFolder: string
) => {
    const permalink = filePath
        .replace(markdownFolder, "") // make the permalink relative to the markdown folder
        .replace(/\.(mdx|md)/, "")
        .replace(/\\/g, "/") // replace windows backslash with forward slash
        .replace(/\/index$/, ""); // remove index from the end of the permalink
    return permalink.length > 0 ? permalink : "/"; // for home page
};