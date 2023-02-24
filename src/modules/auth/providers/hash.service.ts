import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';

@Injectable()
export class HashService {
  async verify(hash: string, value: string | Buffer) {
    return argon2.verify(hash, value, {});
  }

  async hash(value: string) {
    return argon2.hash(value);
  }
}
