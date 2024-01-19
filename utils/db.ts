import { PrismaClient } from '@prisma/client';

//globalThis is basically the global space that you're running on in Node
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ?? new PrismaClient({ log: ['query'] });

  // prevents hot-reloading to make too many db connections
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
