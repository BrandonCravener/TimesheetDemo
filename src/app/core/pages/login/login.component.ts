import { Component, Optional } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, sendPasswordResetEmail, AuthErrorCodes } from '@angular/fire/auth';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { UserService } from 'src/app/shared/services/user.service';
import AuthErrorMessage from 'src/app/shared/utils/AuthErrorMessage';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
  providers: [MessageService]
})
export class LoginComponent {

  loginForm = new FormGroup({
    loginEmail: new FormControl('', [Validators.required, Validators.email]),
    loginPassword: new FormControl('', [Validators.required]),
  })

  registerForm = new FormGroup({
    registerEmail: new FormControl('', [Validators.required, Validators.email]),
    registerPassword: new FormControl('', [Validators.required]),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    preferredName: new FormControl('', [Validators.required])
  })

  constructor(@Optional() private auth: Auth, private router: Router, private messageService: MessageService, private employeeService: UserService) { }


  async handleAuthError(errorCode: string) {
    this.messageService.add({
      severity: 'error',
      summary: 'Login Trouble!',
      detail: AuthErrorMessage(errorCode)
    })
  }

  async invalidForm() {
    this.messageService.add({
      severity: 'warn',
      summary: 'Invalid Information',
      detail: 'Please verify you have filled out all fields on the form.'
    })
  }

  async resetPassword() {
    const emailControl = this.loginForm.get('loginEmail');
    if (emailControl?.valid) {
      try {
        await sendPasswordResetEmail(this.auth, emailControl.value!)
        this.messageService.add({
          severity: 'success',
          summary: 'Email Sent',
          detail: 'If the email address entered is associated with an account you will get the reset email shortly.'
        })
      } catch (err: any) {
        this.handleAuthError(err.code)
      }
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Invalid Email',
        detail: 'Please enter a valid email to reset your password.'
      })
    }
  }

  async login() {
    if (this.loginForm.valid) {
      var loginData = this.loginForm.value
      try {
        await signInWithEmailAndPassword(this.auth, loginData.loginEmail!, loginData.loginPassword!)
        this.router.navigateByUrl('/')
      } catch (err: any) {
        this.handleAuthError(err.code)
      }
    } else {
      this.invalidForm()
    }
  }

  async register() {
    if (this.registerForm.valid) {
      var registerData = this.registerForm.value
      try {
        var { user } = await createUserWithEmailAndPassword(this.auth, registerData.registerEmail!, registerData.registerPassword!)
        var fullName = `${registerData.firstName} ${registerData.lastName}`
        this.employeeService.createUser(user.uid, fullName, registerData.preferredName!)
        this.router.navigateByUrl('/')
      } catch (err: any) {
        this.handleAuthError(err.code)
      }
    } else {
      this.invalidForm()
    }
  }

}
