import { Component } from '@angular/core';

@Component({
  selector: 'app-ng-for-demo',
  templateUrl: './ng-for-demo.component.html',
  styleUrls: ['./ng-for-demo.component.css']
})
export class NgForDemoComponent {

   divisions = [
    { id: 1, name: 'Yangon', mmName: 'ရန်ကုန်', capital: 'Yangon', region: 'Lower Myanmar' },
    { id: 2, name: 'Mandalay', mmName: 'မန္တလေး', capital: 'Mandalay', region: 'Central Myanmar' },
    { id: 3, name: 'Ayeyarwady', mmName: 'ဧရာဝတီ', capital: 'Pathein', region: 'Lower Myanmar' },
    { id: 4, name: 'Bago', mmName: 'ပဲခူး', capital: 'Bago', region: 'Lower Myanmar' },
    { id: 5, name: 'Sagaing', mmName: 'စစ်ကိုင်း', capital: 'Sagaing', region: 'Upper Myanmar' },
    { id: 6, name: 'Shan', mmName: 'ရှမ်း', capital: 'Taunggyi', region: 'Eastern Myanmar' },
    { id: 7, name: 'Kachin', mmName: 'ကချင်', capital: 'Myitkyina', region: 'Northern Myanmar' },
    { id: 8, name: 'Rakhine', mmName: 'ရခိုင်', capital: 'Sittwe', region: 'Western Myanmar' },
    { id: 9, name: 'Chin', mmName: 'ချင်း', capital: 'Hakha', region: 'Western Myanmar' },
    { id: 10, name: 'Mon', mmName: 'မွန်', capital: 'Mawlamyine', region: 'Lower Myanmar' },
    { id: 11, name: 'Kayah', mmName: 'ကယား', capital: 'Loikaw', region: 'Eastern Myanmar' },
    { id: 12, name: 'Kayin', mmName: 'ကရင်', capital: 'Hpa-An', region: 'Lower Myanmar' },
    { id: 13, name: 'Magway', mmName: 'မကွေး', capital: 'Magway', region: 'Central Myanmar' },
    { id: 14, name: 'Tanintharyi', mmName: 'တနင်္သာရီ', capital: 'Dawei', region: 'Southern Myanmar' },
    { id: 15, name: 'Naypyidaw', mmName: 'နေပြည်တော်', capital: 'Naypyidaw', region: 'Central Myanmar' }
  ];
  
}
