import { Injectable } from '@nestjs/common';
import { writeFileSync, existsSync, mkdirSync, unlinkSync } from 'fs';

@Injectable()
export class StaticService {
  /**
   * @returns `true` if successful
   */
  async saveImage(imageId: string, file: Express.Multer.File) {
    // todo: check mime-type
    const root = './static';
    if (!existsSync(root)) {
      mkdirSync(root);
    }
    const path = `${root}/${imageId}.jpeg`;
    writeFileSync(path, file.buffer);
    return true;
  }

  /**
   * @returns `true` if successful
   */
  async removeImage(imageId: string) {
    const root = './static';
    if (!existsSync(root)) {
      return true;
    }
    const path = `${root}/${imageId}.jpeg`;
    if (!existsSync(path)) {
      return true;
    }
    unlinkSync(path);
    return true;
  }
}
