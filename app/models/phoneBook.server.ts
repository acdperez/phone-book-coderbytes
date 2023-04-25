import type { PhoneBook } from "@prisma/client";
import { prisma } from "~/db.server";

export async function getPhoneBookById(id: PhoneBook["id"]) {
    return prisma.phoneBook.findUnique({ where: { id } });
}

export async function getPhoneBooksItems() {
    return prisma.phoneBook.findMany(
        { select: { id: true, firstName: true, lastName: true, phone: true } }
    );
}

export async function createPhoneContact(newPhone: Pick<PhoneBook, "firstName" | "lastName" | "phone">) {
    return prisma.phoneBook.create({data: newPhone});
}

export async function deletePhoneBookById(id: PhoneBook["id"]) {
    return prisma.phoneBook.delete({ where: { id } });
}

export async function updatePhoneBookById(phoneEntry: Pick<PhoneBook, "id" | "firstName" | "lastName" | "phone">){
    return prisma.phoneBook.update({ data: phoneEntry, where: { id: phoneEntry.id } });
}

export async function getPhoneBooksByLastName(criteria: string) {
    return prisma.phoneBook.findMany(
        {
            where: {
                lastName: {
                    startsWith: criteria
                }
            }
        }
    )
}