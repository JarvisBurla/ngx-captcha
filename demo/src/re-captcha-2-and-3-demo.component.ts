import {
  AfterViewInit,
  Component,
  ElementRef, OnInit,
  ViewChild
} from '@angular/core';

import {ReCaptcha2Component, ReCaptchaV3Service, ScriptService} from '../../projects/ngx-captcha-lib/src/public_api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

declare var hljs: any;

@Component({
  selector: 'ngx-recaptcha-v2-v3-demo',
  templateUrl: './re-captcha-2-and-3-demo.component.html'
})
export class ReCaptcha2And3DemoComponent implements OnInit, AfterViewInit {

  public readonly siteKey = '6LeN_5gUAAAAADd1SmMpRx9Ux44ruDomcdRQipFK';

  public siteKeyV3?: string = '6Let_5gUAAAAANi3fdTLGzZzXIR1DKUc6EuV9Ev0';
  public action?: string = 'homeTestPage';
  public token?: string;
  public error?: string;

  public readonly installCode = `npm install ngx-captcha`;

  public readonly importModuleCode = `
import { NgModule } from '@angular/core';
import { NgxCaptchaModule } from 'ngx-captcha';

@NgModule({
  imports: [
    NgxCaptchaModule
  })

  export class AppModule { }`;

  public readonly exampleCode = `<form [formGroup]="aFormGroup">
  <ngx-recaptcha2 #captchaElem
    [siteKey]="siteKey"
    (reset)="handleReset()"
    (expire)="handleExpire()"
    (error)="handleError()"
    (load)="handleLoad()"
    (success)="handleSuccess($event)"
    [useGlobalDomain]="false"
    [size]="size"
    [hl]="lang"
    [theme]="theme"
    [type]="type"
    formControlName="recaptcha">
  </ngx-recaptcha2>
</form>
`;

  public readonly exampleTsCode = `class YourComponent implements OnInit {
    public aFormGroup: FormGroup;

    constructor(
      private formBuilder: FormBuilder) {}

    ngOnInit() {
      this.aFormGroup = this.formBuilder.group({
        recaptcha: ['', Validators.required]
      });
    }
  }
  `;

  public captchaIsLoaded = false;
  public captchaSuccess = false;
  public captchaIsExpired = false;
  public captchaResponse?: string;

  public theme: 'light' | 'dark' = 'light';
  public size: 'compact' | 'normal' = 'normal';
  public lang = 'pt-BR';
  public type: 'image' | 'audio';
  public useGlobalDomain: boolean = false;

  @ViewChild('captchaElem') captchaElem: ReCaptcha2Component;
  @ViewChild('langInput') langInput: ElementRef;

  public aFormGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private reCaptchaV3Service: ReCaptchaV3Service,
    private scriptService: ScriptService) {}

  ngOnInit() {
    this.aFormGroup = this.formBuilder.group({
      recaptcha: ['', Validators.required],
      siteKeyV3: ['6Let_5gUAAAAANi3fdTLGzZzXIR1DKUc6EuV9Ev0'],
      action: ['homeTestPage']
    });
  }

  ngAfterViewInit(): void {
    this.highlight();
  }

  handleReset(): void {
    this.captchaSuccess = false;
    this.captchaResponse = 'undefined';
    this.captchaIsExpired = false;
  }

  handleSuccess(captchaResponse: string): void {
    this.captchaSuccess = true;
    this.captchaResponse = captchaResponse;
    this.captchaIsExpired = false;
  }

  handleLoad(): void {
    this.captchaIsLoaded = true;
    this.captchaIsExpired = false;
  }

  handleExpire(): void {
    this.captchaSuccess = false;
    this.captchaIsExpired = true;
  }

  changeTheme(theme: 'light' | 'dark'): void {
    this.theme = theme;
  }

  changeSize(size: 'compact' | 'normal'): void {
    this.size = size;
  }

  changeType(type: 'image' | 'audio'): void {
    this.type = type;
  }

  setLanguage(): void {
    this.lang = this.langInput.nativeElement.value;
  }

  setUseGlobalDomain(use: boolean): void {
    this.useGlobalDomain = use;
  }

  getCurrentResponse(): void {
    const currentResponse = this.captchaElem.getCurrentResponse();
    if (!currentResponse) {
      alert('There is no current response - have you submitted captcha?');
    } else {
      alert(currentResponse);
    }
  }

  getResponse(): void {
    const response = this.captchaElem.getResponse();
    if (!response) {
      alert('There is no response - have you submitted captcha?');
    } else {
      alert(response);
    }
  }

  reload(): void {
    this.captchaElem.reloadCaptcha();
  }

  getCaptchaId(): void {
    alert(this.captchaElem.getCaptchaId());
  }

  reset(): void {
    this.captchaElem.resetCaptcha();
  }

  private highlight(): void {
    const highlightBlocks = document.getElementsByTagName('code');
    for (let i = 0; i < highlightBlocks.length; i++) {
      const block = highlightBlocks[i];
      hljs.highlightBlock(block);
    }
  }

  execute(): void {
    this.token = 'undefined';

    if (!this.aFormGroup.controls.siteKeyV3.value) {
      this.error = 'Site key is not set';
      return;
    }

    if (!this.aFormGroup.controls.action.value) {
      this.error = 'Action is not set';
      return;
    }

    // clean script to make sure siteKey is set correctly (because previous script could be incorrect)
    this.scriptService.cleanup();

    this.error = 'undefined';

    this.reCaptchaV3Service.execute(this.aFormGroup.controls.siteKeyV3.value, 'reCaptcha3DemoPage', (token) => {
      this.token = token;
      console.log('Your token is: ', token);
    }, {
      useGlobalDomain: false
    });
  }

}
