import { db } from '../configs/db';

import { stuctDivision, structUserLevel } from '../configs/seedValue';

async function main() {
  stuctDivision.forEach(async (app) => {
    await db.division.create({
      data: app,
    });
  });

  structUserLevel.forEach(async (app) => {
    await db.user_Level.create({
      data: app,
    });
  });

  console.log('~||: Seeding complete');
}

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error('~||: ', e);
    await db.$disconnect();
    process.exit(1);
  });
