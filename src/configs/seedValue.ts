import type { Division } from '@prisma/client';

type DivisionWithoutId = Omit<Division, 'id'>;

export const stuctDivision: DivisionWithoutId[] = [
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

export const structUserLevel = [
  {
    level: 'Staff',
    is_deleted: false,
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
  },
  {
    level: 'Manager',
    is_deleted: false,
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
  },
  {
    level: 'HRD',
    is_deleted: false,
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
  },
  {
    level: 'Intern',
    is_deleted: false,
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
  },
  {
    level: 'Owner',
    is_deleted: false,
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
  },
];
