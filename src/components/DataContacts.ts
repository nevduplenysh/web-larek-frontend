import { Form } from "./Form";
import { IEvents } from "./base/events";

export interface IDataContacts {
    email: string;
    phone: string;
  }

export class DataContacts extends Form<IDataContacts> {
  constructor(container: HTMLFormElement, events: IEvents) {
    super(container, events);
  }

  set email(value: string) {
    (this.container.elements.namedItem('email') as HTMLInputElement).value = value;
  }

  set phone(value: string) {
    (this.container.elements.namedItem('phone') as HTMLInputElement).value = value;
  }
}
