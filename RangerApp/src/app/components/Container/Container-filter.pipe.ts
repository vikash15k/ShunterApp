import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'containerFilter'
})
export class ContainerFilterPipe implements PipeTransform {

  transform(list: any[], filterText: string): any {
    return list ? list.filter(item => (item.Contbilnr != undefined && item.Contbilnr.search(new RegExp(filterText, 'i')) > -1) || (item.src != undefined && item.src.search(new RegExp(filterText, 'i')) > -1)
      || (item.colorstyle != undefined && item.colorstyle.search(new RegExp(filterText, 'i')) > -1) || (item.Togrutenummer != undefined && item.Togrutenummer.search(new RegExp(filterText, 'i')) > -1)
      || (item.Til != undefined && item.Til.search(new RegExp(filterText, 'i')) > -1) || (item.Name != undefined && item.Name.search(new RegExp(filterText, 'i')) > -1)
      || (item.Fra != undefined && item.Fra.search(new RegExp(filterText, 'i')) > -1)) : [];
  }

}
