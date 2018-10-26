import { NgModule } from '@angular/core';

import { MatCommonModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatRadioModule, MatSelectModule } from '@angular/material';

const impExp = [
  MatCommonModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatRadioModule,
  MatSelectModule,
];

@NgModule({
  imports: impExp,
  exports: impExp
})
export class MaterialModule {}
