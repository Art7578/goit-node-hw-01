import { program } from "commander";
import contacts from "./contacts.js";

program
    .option("-a, --action <type>", "choose action")
    .option("-i, --id <type>", "user id")
    .option("-n, --name <type>", "user name")
    .option("-e, --email <type>", "user email")
    .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({action, id, name, email, phone}) {
    try {
        switch(action) {
            case "list":
                const allContacts = await contacts.listContacts();
                return console.table(allContacts);

            case "get":
                const oneContact = await contacts.getContactById(id);
                return console.table(oneContact);

            case "add":
                const newContact = await contacts.addContact({name, email, phone});
                return console.table(newContact);

            case "remove":
                const deleteByIdContact = await contacts.removeContact(id);
                return console.table(deleteByIdContact);
            defaul:
                console.warn("\x1B[31m Unknown action type!");
        }
    } catch (error) {
        console.log(error.message)
    }
}
invokeAction(argv);