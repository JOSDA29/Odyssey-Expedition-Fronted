import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PasswordValidatorService } from '../../../../features/home/services/passwordValidator.service';
import { Router } from '@angular/router';
import { AuthGoogleService } from '../../../../core/services/auth-google.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});
  showPassword: boolean = true; 

  constructor(private router: Router,
    private fb: FormBuilder,
    private passwordValidator: PasswordValidatorService,
    private authGoogleService: AuthGoogleService) { }

  @Input() srclogo: string = '';
  @Input() altlogo: string = '';
  @Input() srcfondo: string = '';
  @Input() altfodo: string = '';
  @Input() srcicon: string = '';
  @Input() alticon: string = '';
  @Input() textGoogle: string = '';
  @Input() href: string = '';
  @Input() textContin: string = '';
  @Input() textfooter: string = '';
  @Input() textfooter1: string = '';

  @Input()  contens:{
    title: string,
    placeholder:string,
  } [] = [];

  logInWithGoogle(){
    this.authGoogleService.login();
    
  }

  @Input() contensSection: { 
    title: string,
    placeholder: string,
    field: string,
    type: string
  }[] = [];

  formValues: { [key: string]: string } = {};

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    const group: any = {};
    this.contensSection.forEach((conten) => {
      if (conten.type === 'email') {
        group[conten.field] = ['', [Validators.required, Validators.email, Validators.maxLength(150)]];
      } else if (conten.type === 'password') {
        group[conten.field] = ['', [Validators.required, Validators.minLength(8), Validators.maxLength(50), this.passwordValidator.strongPassword()]];
      } else if (conten.type === 'text') {
        group[conten.field] = ['', [Validators.required,Validators.maxLength(100), Validators.minLength(5)]];
      } else {
        group[conten.field] = ['', Validators.required]; 
      }
    });

    this.loginForm = this.fb.group(group, {
      validators: this.passwordValidator.matchPasswords('contrasena', 'confirmarContrasena')
    });

    this.loginForm.get('contrasena')?.valueChanges.subscribe(() => {
      this.loginForm.updateValueAndValidity();
    });

    this.loginForm.get('confirmarContrasena')?.valueChanges.subscribe(() => {
      this.loginForm.updateValueAndValidity();
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.router.navigate(['']);
      console.log('Form Submitted', this.loginForm.value);
    }
  }
}
