import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { PasswordValidatorService } from '../../../../features/home/services/passwordValidator.service';
import { AuthGoogleService } from '../../../../core/services/auth-google.service';
import { ModalService } from '../../../../features/home/services/modal-login.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  @Input() title: string = '';
  @Input() srcclose: string = '';
  @Input() altclose: string = '';
  @Input() srcicon: string = '';
  @Input() alticon: string = '';
  @Input() textGoogle: string = '';
  @Input() textContin: string = '';
  @Input() textfooter: string = '';
  @Input() textfooter1: string = '';
  @Input() textlink: string = '';
  @Input() href: string = '';

  @Input() contensSection: {
    title: string,
    placeholder: string,
    field: string,
    type: string
  }[] = [];

  logInWithGoogle(){
    this.authGoogleService.login(); 
  }

  loginForm!: FormGroup;
  showPassword: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private passwordValidator: PasswordValidatorService,
    private authGoogleService: AuthGoogleService,
    public modalService: ModalService,
   
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
        group[conten.field] = new FormControl('', [Validators.required, Validators.maxLength(50), this.passwordValidator.strongPassword()]);
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

  }

  getFormControl(field: string) {
    return this.loginForm.get(field) as FormControl;
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (this.loginForm.valid ) {
      console.log('Form Submitted', this.loginForm.value);
      alert('Formulario enviado exitosamente');
      this.router.navigate(['/']);
      this.closeModal()
    } else {
      alert('Por favor, complete el formulario correctamente');
    }
  }

  closeModal(): void {
    this.modalService.closeModal();
  }

  isPasswordError(field: string): boolean {
    const control = this.loginForm.get(field);
    return control && control.errors && control.errors['weakPassword'];
  }

  isPasswordMismatch(): boolean {
    const contrasena = this.loginForm.get('contrasena');
    return contrasena?.errors?.['mismatch'] && contrasena;
  }

}
