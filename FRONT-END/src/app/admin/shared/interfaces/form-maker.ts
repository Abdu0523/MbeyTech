import { FormControl } from "@angular/forms";

export interface FormMaker{
    name: string,
    key: string,
    type: 'text' | 'select' | 'calendar' | 'file',
    control: FormControl
}