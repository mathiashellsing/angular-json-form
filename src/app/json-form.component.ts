import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  FormArray,
} from '@angular/forms';

@Component({
  selector: 'json-form',
  templateUrl: './json-form.component.html',
  styleUrls: ['./json-form.component.css'],
})
export class JsonFormComponent {
  name = 'Angular';
  jsonResponse = [
    {
      label: 'Username abc',
      inputType: 'text',
      name: 'name',
      validations: [
        {
          name: 'required',
          validator: 'required',
          message: 'Name Required',
        },
        {
          name: 'pattern',
          validator: '^[a-zA-Z]+$',
          message: 'Accept only text',
        },
      ],
    },
    {
      label: 'Password',
      inputType: 'password',
      name: 'name',
      validations: [
        {
          name: 'required',
          validator: 'required',
          message: 'Password Required',
        },
      ],
    },
  ];
  dynamicForm: FormGroup;

  constructor() {
    const controls = {};

    this.jsonResponse.forEach((res) => {
      const validationsArray = [];
      res.validations.forEach((val) => {
        if (val.name === 'required') {
          validationsArray.push(Validators.required);
        }

        if (val.name === 'pattern') {
          validationsArray.push(Validators.pattern(val.validator));
        }
      });
      controls[res.label] = new FormControl('', validationsArray);
    });
    this.dynamicForm = new FormGroup(controls);
  }

  onSubmit() {
    console.log(this.dynamicForm.value);
  }
}
