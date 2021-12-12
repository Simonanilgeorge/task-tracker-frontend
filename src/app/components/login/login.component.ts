import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormArray, FormGroup } from '@angular/forms';
import { faGrinTongueSquint } from '@fortawesome/free-solid-svg-icons';
import {LoginService} from '../../services/login.service'
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  registerFlag:boolean=false


  toast = {
    active: false,
    message: null,
    severity: null
  }

  form=this.fb.group({
    username:[{value:"",disabled:false},Validators.required],
    password:[{value:"",disabled:false},Validators.required]
  })

  registerUserForm=this.fb.group({
    username:[{value:"",disabled:false},Validators.required],
    registerPassword:[{value:"",disabled:false},Validators.required],
    confirmPassword:[{value:"",disabled:false},Validators.required]
  })
  constructor(private fb:FormBuilder,private loginService:LoginService,private router:Router) { }

  ngOnInit(): void {
  }

  get password(){
    return this.form.get("password")
  }
  get confirmPassword(){
    return this.registerUserForm.get("confirmPassword")
  }
  get registerPassword(){
    return this.registerUserForm.get("registerPassword")
  }



  login(){

    this.loginService.login(this.form.getRawValue()).subscribe((res)=>{
      console.log(res)
      if(res.message=="success"){
        sessionStorage.setItem("token", res.token)
        this.router.navigate(['stocks'])
      }
      else{
        this.showToastMessage("Invalid credentials","danger")
      }
    })
  }

  registerUser(){

    this.loginService.register(this.registerUserForm.getRawValue()).subscribe((res)=>{
      if(res.message=="success"){
        this.showToastMessage("User added",res.message)
        this.registerFlag=false
        this.registerUserForm.reset()
      }
      else{
        this.showToastMessage(res.message,"danger")
      }
    })
  }


    // set attributes for toast message
    showToastMessage(message, severity) {
      // to detect changes use stringify
      this.toast = JSON.parse(JSON.stringify({
        message: message,
        severity: severity,
        active: true
      }))
    }
}
