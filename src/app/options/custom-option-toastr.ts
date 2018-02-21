import { ToastOptions } from 'ng2-toastr';

export class CustomOptionToastr extends ToastOptions {
    animate = 'fade'; // you can override any options available
    newestOnTop = false;
    showCloseButton = true;
    dismiss = 'auto';
    positionClass = 'toast-bottom-center';
    toastLife = 2200;
}