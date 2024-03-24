
export class User { 
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  dateOfBirth: string;
  gender:string;

  constructor(firstName: string,lastName: string, email: string,password: string,dateOfBirth: string,gender:string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.dateOfBirth = dateOfBirth;
    this.gender = gender;
  }
}
