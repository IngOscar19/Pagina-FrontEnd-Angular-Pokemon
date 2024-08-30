import { LocalstorageService } from './../../localstorage.service';
import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { HttpLavavelService } from "./../../http.service";
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import 'animate.css';

@Component({
    selector: 'login-form',
    templateUrl: './login-form.component.html'
})
export class LoginFormComponent {
    LoginFormulario: FormGroup = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [
            Validators.required
        ]],
    });

    constructor(private fb: FormBuilder, public service: HttpLavavelService,
        private router: Router, private localStorage: LocalstorageService
    ) {
        this.localStorage.clean();
    }

    onLoggedin() {
        if (this.LoginFormulario.invalid) {
            return;
        }
        this.service.Service_Post('user', 'login', this.LoginFormulario.value).subscribe((data: any) => {
            console.log(data);

            if (data.estatus) {
                this.localStorage.setItem('accessToken', data.access_token);
                this.router.navigate(['/']);
            } else {
                Swal.fire({
                    icon: "error",
                    title: 'Error de autenticación',
                    text: data.message || 'Ocurrió un error al intentar iniciar sesión.',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }, error => {
            console.log(error);
            Swal.fire({
                icon: "error",
                title: 'Error de conexión',
                text: 'No se pudo conectar al servidor. Por favor, inténtalo de nuevo más tarde.',
                showConfirmButton: false,
                timer: 1500
            });
        });
    }

    isValid(field: string): boolean {
        return !!(this.LoginFormulario.controls[field].errors && this.LoginFormulario.controls[field].touched);
    }

    get f() { return this.LoginFormulario.controls; }

    Guardar() {
        if (this.LoginFormulario.invalid) {
            this.LoginFormulario.markAllAsTouched();
            return;
        }
        console.log(this.LoginFormulario.value);
        this.LoginFormulario.reset({ email: '', password: '' });
    }
}


    