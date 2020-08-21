export class Util {
  /**
   *
   * For dynamic import of all controllers system should firsltly read filesystem and get all
   * files with name template *.controllers.
   *
   **/
  public static findFilesInDirectory(
    dir: string,
    fileList: string[],
    nameMask = 'Router',
  ): string[] {
    let files = Deno.readDirSync(dir);
    fileList = fileList || [];

    for (const dirEntry of files) {
      if (dirEntry.isDirectory) {
        fileList = Util.findFilesInDirectory(
          `${dir}${dirEntry.name}`,
          fileList,
        );
      } else {
        if (dirEntry.name.includes(nameMask)) {
          fileList.push(`../${dir}/${dirEntry.name}`);
        }
      }
    }

    if(!fileList.length) {
      throw new Error(`There is no registered controllers with Name${nameMask}.ts template`);
    }

    return fileList;
  }

  static generateRandomString(length: number) {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  }
}
