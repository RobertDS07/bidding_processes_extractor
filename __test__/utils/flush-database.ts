import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const flushDatabase = async () => {
  await prisma.$connect();

  const deleteClientsAddress = prisma.biddingProcessItem.deleteMany();
  const deleteClients = prisma.biddingProcess.deleteMany();

  await prisma.$transaction([deleteClientsAddress, deleteClients]);
  await prisma.$disconnect();
};

export default flushDatabase;
