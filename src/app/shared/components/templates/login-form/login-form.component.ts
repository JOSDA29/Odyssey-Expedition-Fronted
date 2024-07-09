import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { PasswordValidatorService } from '../../../../features/home/services/passwordValidator.service';
import { AuthGoogleService } from '../../../../core/services/auth-google.service';
import { ModalService } from '../../../../features/home/services/modal-login.service';
import { ModalServiceRecover } from '../../../../features/home/services/modal-recover-password.service';
import { ApiService } from '../../../../core/services/api.service';
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private passwordValidator: PasswordValidatorService,
    private authGoogleService: AuthGoogleService,
    private modalService: ModalService,
    private ModalServiceRecover: ModalServiceRecover,
   private apiService: ApiService,
  ) {}

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
  @Input() info: string = '';
  @Input() srcretorned: string | null = null;
  @Input() altretorned: string | null = null;
  errorMessage: string = '';


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
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.apiService.getUsers().subscribe(
        users => {
          const isAuthenticated = users.some(user => user.email === email && user.password === password);
          if (isAuthenticated) {
            console.log("correcto");
            this.router.navigate(['/clientProfile']);
            this.closeModal();
            this.closeModalRecovery();
          } else {
            this.errorMessage = 'Correo o contraseña incorrectos'; 
            console.log(this.errorMessage,this.loginForm.value);
          }
        },
        error => {
          console.error('Error obteniendo usuarios:', error);
          this.errorMessage = 'Ocurrió un error al autenticar. Por favor, intenta nuevamente.';
        }
      );
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

  closeModalRecovery():void{
    this.ModalServiceRecover.closeModal();
  }

  openModalRecovery():void{
    this.ModalServiceRecover.openModal();
  }

}
