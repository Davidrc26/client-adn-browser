import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  showErrorDialog(message: string){
    Swal.fire({
      toast: true,
      position: "top-end",
      text: message,
      background: "#FF6F60",
      color: "#fff",
      showConfirmButton: false,
      timerProgressBar: true,
      timer: 3000
    });
  }

  showInformationDialog(message: string){
    Swal.fire({
      toast: true,
      position: "top-end",
      text: message,
      color: "#fff",
      background: "#56B4E9",
      showConfirmButton: false,
      timerProgressBar: true,
      timer: 3000
    });
  }

  showSuccessDialog(message: string){
    Swal.fire({
      toast: true,
      position: "top-end",
      text: message,
      background: "#4CAF50",
      color: "#fff",
      showConfirmButton: false,
      timerProgressBar: true,
      timer: 3000
    });
  }

}
