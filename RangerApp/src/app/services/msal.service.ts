
import { Injectable } from '@angular/core';

import * as Msal from 'msal';

declare var bootbox: "";
@Injectable()
export class MsalService {

  B2CTodoAccessTokenKey = "V?25H\(B|Dm8&eF2.Kv;!1F7";

    tenantConfig = {
      tenant: "MEAPPostenB2CTest.onmicrosoft.com",
        // Replace this with your client id 
      clientID: '{d61c9f83-4648-4194-8e48-2f9de370f5bf }',
        signInPolicy: "B2C_1_RangerApp",
        signUpPolicy: "B2C_1_signup",
        redirectUri:"http://localhost:58247/RangerApp/Index.html",
      b2cScopes: ["https://MEAPPostenB2CTest.onmicrosoft.com/RangerApp/user_impersonation"]
    };

    // Configure the authority for Azure AD B2C
  authority = "https://meappostenb2ctest.b2clogin.com/tfp/" + this.tenantConfig.tenant + "/" + this.tenantConfig.signInPolicy;

    /*
     * B2C SignIn SignUp Policy Configuration
     */
    clientApplication = new Msal.UserAgentApplication(
        this.tenantConfig.clientID, this.authority,
        function (errorDesc: any, token: any, error: any, tokenType: any) {
      }
    );

    public login():void{
      this.clientApplication.authority = "https://meappostenb2ctest.b2clogin.com/tfp/" + this.tenantConfig.tenant + "/" + this.tenantConfig.signInPolicy;
      this.authenticate();
    }

    public signup():void{
      this.clientApplication.authority = "https://meappostenb2ctest.b2clogin.com/tfp/" + this.tenantConfig.tenant + "/" + this.tenantConfig.signUpPolicy;
      this.authenticate();
    }

    public authenticate(): void {
        var _this = this;
        this.clientApplication.loginPopup(this.tenantConfig.b2cScopes).then(function (idToken: any) {
            _this.clientApplication.acquireTokenSilent(_this.tenantConfig.b2cScopes).then(
                function (accessToken: any) {
                    _this.saveAccessTokenToCache(accessToken);
                }, function (error: any) {
                    _this.clientApplication.acquireTokenPopup(_this.tenantConfig.b2cScopes).then(
                        function (accessToken: any) {
                            _this.saveAccessTokenToCache(accessToken);
                        }, function (error: any) {
                            console.log("error: ", error);
                        });
                })
        }, function (error: any) {
            console.log("error: ", error);
        });
    }

    saveAccessTokenToCache(accessToken: string): void {
        sessionStorage.setItem(this.B2CTodoAccessTokenKey, accessToken);
    };

    logout(): void {
        this.clientApplication.logout();
    };

    isLoggedIn(): boolean {
        return this.clientApplication.getUser() != null;
    };

    getUserEmail(): string{
       return this.getUser().idToken['emails'][0];
    }

    getUser(){
      return this.clientApplication.getUser()
    }
}

