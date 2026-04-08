import { prisma } from './lib/prisma';
import bcrypt from 'bcryptjs';

async function main() {
  console.log('Creating Admin Account...');

  const hashedPassword = await bcrypt.hash('admin123', 10);

  const admin = await prisma.user.create({
    data: {
      role: 'ADMIN',
      hallTicket: 'ADMIN-HOD', // Using this as the username
      passwordHash: hashedPassword,
    },
  });

  console.log('Admin created successfully!');
  console.log('Username (Hall Ticket field):', admin.hallTicket);
  console.log('Password:', 'admin123');
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());