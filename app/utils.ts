import fs from 'fs';
import path from 'path';

const importAllFile = <T>(
  targetPath: string,
  regx = /\.(t|j)s$/,
  store: Promise<T>[] = []
): Promise<Promise<T>[]> => {
  const requireList: Promise<T>[] = store || [];

  return new Promise((resolve, reject) => {
    fs.readdir(targetPath, (err, files) => {
      if (err) {
        reject(err);
      }

      files.forEach((filePath) => {
        const realPath = path.join(targetPath, filePath);
        if (regx.test(filePath)) {
          requireList.push(import(realPath));
        } else if (fs.statSync(realPath).isDirectory()) {
          importAllFile(path.join(targetPath, filePath), regx, requireList);
        }
      });

      resolve(requireList);
    });
  });
};

export default importAllFile;
