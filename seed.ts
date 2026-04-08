import { prisma } from './lib/prisma'; // Importing our newly configured client!
import bcrypt from 'bcryptjs';

async function main() {
  console.log('Seeding database...');

  // 1. Hash the password
  const hashedPassword = await bcrypt.hash('student123', 10);

  // 2. Create the student
  const student = await prisma.user.create({
    data: {
      role: 'STUDENT',
      hallTicket: 'HT1001',
      passwordHash: hashedPassword,
    },
  });

  console.log('Test student created successfully!');
  console.log('Hall Ticket:', student.hallTicket);
  console.log('Password:', 'student123');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });