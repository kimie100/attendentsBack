import { Injectable } from '@nestjs/common';
import { CreateFuncDto } from './dto/create-func.dto';
import { v4 as uuidv4 } from 'uuid';
const bcrypt = require('bcrypt');
const { DateTime } = require('luxon');
const fs = require('fs');
const fse = require('fs-extra');
const saltRounds = 10;
@Injectable()
export class FuncsService {
  create(createFuncDto: CreateFuncDto) {
    return 'This action adds a new func';
  }
  async Hash(password: string) {
    // const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hash(password, saltRounds);
    return hash;
  }

  async comparePassword(password: string, hash: string) {
    return bcrypt.compareSync(password, hash);
  }
  async totalHours(clockin: Date, clockOut: string | Date) {
    let c = clockin.toISOString();
    var start = DateTime.fromISO(c);
    var end = DateTime.fromISO(clockOut);
    var hour = end.diff(start, ['hours']).toObject();
    return hour.hours;
  }

  async checkFolder(name: string) {
    const folderPath = `./src/image/${name}`;
    if (fs.existsSync(folderPath)) {
      return folderPath;
    } else {
      fs.mkdir(folderPath, { recursive: true }, (err) => {
        if (err) {
          console.error('Error creating folder:', err);
        } else {
          return folderPath;
        }
      });
    }
  }
  async uploadImg(img: string) {
    const buffer = Buffer.from(img, 'base64');
    const now = DateTime.now().toFormat('dd-LL-y');
    const path = await this.checkFolder(now);
    const uniqueSuffix = uuidv4();
    const filePath = `${path}/${uniqueSuffix}.jpg`;
    let r = 'sds';
    fs.writeFile(filePath, buffer, (err) => {
      if (err) {
      } else {
        console.log('success');
      }
    });

    return `${uniqueSuffix}.jpg`;
  }
  extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers['authorization'] ?? [];
    return type == 'Bearer' ? token : undefined;
  }
}
