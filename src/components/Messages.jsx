import Swal from 'sweetalert2'
const Messages = {
    confirmation: (msg, callback) => {
        Swal.fire({
            title: "Atenção",
            text: msg,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sim!",
            cancelButtonText: "Não"
          }).then((result) => {
            if (result.isConfirmed) {
              callback()
            }
          });
    },
    success: (msg) => {
        Swal.fire({
            icon: "success",
            title: "Sucesso",
            text: msg,
        });
    },
    error: (msg) => {
        Swal.fire({
            icon: "error",
            title: "Oops..",
            text: msg,
        });
    }
}

export default Messages