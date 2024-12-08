import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable, from, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { EmployeeService } from '../../../services/employee-service/employee.service';

export function emailValidator(empService: EmployeeService, employeeId?: string): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    return from(empService.checkEmail(control.value, employeeId)).pipe(
      map(isTaken => (isTaken ? { emailTaken: true } : null)),
      catchError(() => of(null))
    );
  };
}
