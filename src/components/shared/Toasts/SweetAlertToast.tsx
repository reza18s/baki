import Swal from "sweetalert2";

const SweetAlertToast = Swal.mixin({
    toast: true,
    position: "top-right",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: false,
    customClass: {
        container: "my-swal",
      },
});

export default SweetAlertToast