import type { Division } from '@prisma/client';

import { db } from '../utils/db';

type DivisionWithoutId = Omit<Division, 'id'>;

const stuctApplication: DivisionWithoutId[] = [
  {
    name: 'IT',
    is_deleted: false,
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: new Date(),
  },
  {
    name: 'Accountant',
    is_deleted: false,
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: new Date(),
  },
  {
    name: 'HR',
    is_deleted: false,
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: new Date(),
  },
  {
    name: 'Marketing',
    is_deleted: false,
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: new Date(),
  },
];

async function main() {
  stuctApplication.forEach(async (app) => {
    await db.division.create({
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
