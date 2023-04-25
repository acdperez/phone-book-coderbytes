import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function seed() {
  const email = "dperez@soap.health";

  // cleanup the existing database
  await prisma.user.delete({ where: { email } }).catch(() => {
    // no worries if it doesn't exist yet
  });

  const hashedPassword = await bcrypt.hash("darieliscool", 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: {
        create: {
          hash: hashedPassword
        }
      }
    }
  });

  await prisma.note.create({
    data: {
      title: "My first note",
      body: "Hello, world!",
      userId: user.id,
    },
  });

  await prisma.note.create({
    data: {
      title: "My second note",
      body: "Hello, world!",
      userId: user.id,
    },
  });

  // ----------- Seed default contacts ----------------------

  await prisma.phoneBook.create({
    data: {
      firstName: "Eric",
      lastName: "Elliot",
      phone: "222-555-6575"
    }
  });

  await prisma.phoneBook.create({
    data: {
      firstName: "Steve ",
      lastName: "Jobs",
      phone: "220-454-6754"
    }
  });

  await prisma.phoneBook.create({
    data: {
      firstName: "Fred ",
      lastName: "Allen",
      phone: "210-657-9886"
    }
  });

  await prisma.phoneBook.create({
    data: {
      firstName: "Steve",
      lastName: "Wozniak",
      phone: "343-675-8786"
    }
  });

  await prisma.phoneBook.create({
    data: {
      firstName: "Bill",
      lastName: "Gates",
      phone: "343-654-9688"
    }
  });

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
