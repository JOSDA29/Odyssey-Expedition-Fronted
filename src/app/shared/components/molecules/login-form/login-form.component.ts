import { Component, Input } from '@angular/core';
import { ModalService } from '../../../../features/home/services/modal-login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PasswordValidatorService } from '../../../../features/home/services/passwordValidator.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {

  arreglo = [
    { correo: 'jeffer@gmail.com', contrasena: 'J£tr1f;&76U2' }
  ];

  loginForm: FormGroup = new FormGroup({});
  showPassword: boolean = true;

  constructor(
    public modalService: ModalService,
    private fb: FormBuilder,
    private router: Router,
    private passwordValidator: PasswordValidatorService
  ) { }

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
        group[conten.field] = ['', [Validators.required, Validators.maxLength(100), Validators.minLength(5)]];
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
      // Comparar con los datos del arreglo
      const formData = this.loginForm.value;
      const foundUser = this.arreglo.find(user => user.correo === formData.email && user.contrasena === formData.password);

      if (foundUser) {
        // Redireccionar a la página de inicio si los datos coinciden
        this.router.navigate(['']);
        console.log('Form Submitted', formData);
      } else {
        // Manejar el caso donde los datos no coinciden
        console.log('Usuario y/o contraseña incorrectos');
        // Aquí podrías mostrar un mensaje de error al usuario
      }
    }
  }

  closeModal(): void {
    console.log('Cerrar modal');
    this.modalService.closeModal();
  }
}
