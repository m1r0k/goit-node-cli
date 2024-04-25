import { program } from "commander";
import Contacts from "./contacts.js";
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const options = program.opts();

// TODO: рефакторити
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contacts = await Contacts.listContacts();
      return contacts;
      break;

    case "get":
      const contact = await Contacts.getContactById(id);
      return contact;
      break;

    case "add":
      const addedContact = await Contacts.addContact(name, email, phone);
      return addedContact;
      break;

    case "remove":
      const removedContact = await Contacts.removeContact(id);
      return removedContact;
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options).then(console.log).catch(console.error);
