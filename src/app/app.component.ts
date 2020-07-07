import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {AndroidFingerprintAuth} from '@ionic-native/android-fingerprint-auth/ngx';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public androidFingerprintAuth: AndroidFingerprintAuth,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.androidFingerprintAuth.isAvailable().then(
        (result)=>{
          if(result.isAvailable)
          {
            this.androidFingerprintAuth.encrypt({
              clientId: "clientid", username:"username", password:"password"
            }).then((result)=>{
              if(result.withFingerprint){
                alert("sukses auth")
                
                alert("encryption:"+result.token)
                console.log(result.token)
              }else if(result.withBackup){
                alert("sukse menggunakan backup password")
              }
              else{
                alert("gagal auth")
              }
            },(err)=>{
              if(err === this.androidFingerprintAuth.ERRORS.FINGERPRINT_CANCELLED){
                alert("cancel")
              }
              else{
                alert(JSON.stringify(err))
              }
            })
          }
          else{
            alert("Fingerprint Auth tidak tersedia")
          }
        },(err)=>{

        })      
    });
  }
}
