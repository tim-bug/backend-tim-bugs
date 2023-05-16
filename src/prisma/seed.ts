import type { Division } from '@prisma/client';

import { db } from '../configs/db';

type DivisionWithoutId = Omit<Division, 'id'>;

const stuctApplication: DivisionWithoutId[] = [
  {
    name: 'IT',
    is_deleted: false,
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
  },
  {
    name: 'Accountant',
    is_deleted: false,
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
  },
  {
    name: 'HR',
    is_deleted: false,
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
  },
  {
    name: 'Marketing',
    is_deleted: false,
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
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
