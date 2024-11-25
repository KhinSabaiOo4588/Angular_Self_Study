import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'userName'
})
export class UserNamePipe implements PipeTransform {
    transform(value: any, showRole: boolean = false): string {
        if (showRole) {
            return `${value?.name}, ${value?.role}`;
        }
        return value?.name || '';
    }
}
