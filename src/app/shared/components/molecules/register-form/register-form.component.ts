import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PasswordValidatorService } from '../../../../features/home/services/passwordValidator.service';
import { AuthGoogleService } from '../../../../core/services/auth-google.service';
import { ApiService } from '../../../../core/services/api.service';
import { ErrorHandlingService } from '../../../../core/services/error-handling.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});
  showPassword: boolean = false;
  errorMessage: any = {};
  weakPassword1: string = `La contraseña no cumple los requisitos mínimos:
  - Al menos 8 caracteres
  - Una mayúscula
  - Una minúscula
  - Un número
  - Un carácter especial`;

  @Input() srclogo: string = '';
  @Input() altlogo: string = '';
  @Input() srcfondo: string = '';
  @Input() altfondo: string = '';
  @Input() altfodo: string = '';
  @Input() srcicon: string = '';
  @Input() alticon: string = '';
  @Input() textGoogle: string = '';
  @Input() href: string = '';
  @Input() textContin: string = '';
  @Input() textfooter: string = '';
  @Input() textfooter1: string = '';

  @Input() contensSection: { 
    title: string,
    placeholder: string,
    field: string,
    type: string
  }[] = [];

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private passwordValidator: PasswordValidatorService,
    private authGoogleService: AuthGoogleService,
    private apiService: ApiService,
    private errorHandlingService: ErrorHandlingService
  ) {}

  ngOnInit(): void {
    this.createForm();
  }
 
  createForm() {
    const group: any = {};
    this.contensSection.forEach((conten) => {
      if (conten.type === 'email') {
        group[conten.field] = new FormControl('', [Validators.required, Validators.email, Validators.maxLength(150)]);
      } else if (conten.type === 'password') {
        group[conten.field] = new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(50), this.passwordValidator.strongPassword()]);
      } else if (conten.type === 'text') {
        group[conten.field] = new FormControl('', [Validators.required, Validators.maxLength(100), Validators.minLength(5)]);
      } else {
        group[conten.field] = new FormControl('', Validators.required); 
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
    this.clearErrorMessages();

    if (this.loginForm.valid) {
      const { name, lastName, email, password } = this.loginForm.value;
      this.apiService.Register(name, lastName, email, password).subscribe(
        userRegister => {
          if (userRegister) {
            alert('Formulario enviado exitosamente');
            this.router.navigate(['/']);
          }
        },
        (error) => {
          this.handleErrorResponse(error);
        }
      );
    } else {
      alert('Por favor, complete el formulario correctamente');
    }
  }

  clearErrorMessages() {
    this.errorMessage = {};
  }

  handleErrorResponse(error: any) {
    const errorMessage = this.errorHandlingService.handleError(error);
    console.error('Error al registrar:', errorMessage);
    alert(errorMessage);
  }

  getFormControl(field: string) {
    return this.loginForm.get(field) as FormControl;
  }

  logInWithGoogle() {
    this.authGoogleService.login();
  }

  isPasswordError(field: string): boolean {
    const control = this.loginForm.get(field);
    return control && control.errors && control.errors['weakPassword'];
  }

  isPasswordMismatch(): boolean {
    const contrasena = this.loginForm.get('contrasena');
    const confirmarContrasena = this.loginForm.get('confirmarContrasena');
    return confirmarContrasena?.errors?.['mismatch'] && confirmarContrasena;
  }
}
