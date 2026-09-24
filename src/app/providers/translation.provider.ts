import { type Provider } from "@angular/core";
import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';

export const TRANSLATION_PROVIDER: Provider = provideTranslateService({
    loader: provideTranslateHttpLoader({
        prefix: "./assets/i18n/",
        suffix: ".json"
    }),
    fallbackLang: "uk"
})