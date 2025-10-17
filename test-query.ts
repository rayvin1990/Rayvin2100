import { fileURLToPath } from 'url';
import { dirname } from 'path';
import dotenv from 'dotenv';
import crypto from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: `${__dirname}/.env` });

import { db } from './lib/db.ts';

console.log('验证DATABASE_URL:', process.env.DATABASE_URL);

async function runAllDatabaseTasks() {
  try {
    const allUsers = await db.selectFrom('user').selectAll().execute();
    console.log('所有用户：', allUsers);

    const newUser = await db
      .insertInto('user')
      .values({
        id: crypto.randomUUID(),
        name: '测试用户',
        email: 'test@example.com',
        createdAt: new Date(),
      })
      .returning(['id', 'name', 'email'])
      .executeTakeFirst();
    console.log('成功插入用户：', newUser);

    const verifiedUsers = await db
      .selectFrom('user')
      .selectAll()
      .where('emailVerified', 'is not', null)
      .execute();
    console.log('邮箱已验证的用户：', verifiedUsers);
  } catch (error) {
    console.error('查询出错：', error);
  } finally {
    await db.destroy(); 
  }
}

(async () => {
  await runAllDatabaseTasks();
})();