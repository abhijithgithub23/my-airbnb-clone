// // Example starter JavaScript for disabling form submissions if there are invalid fields
// (() => {
//   'use strict'

//   // Fetch all the forms we want to apply custom Bootstrap validation styles to
//   const forms = document.querySelectorAll('.needs-validation')

//   // Loop over them and prevent submission
//   Array.from(forms).forEach(form => {
//     form.addEventListener('submit', event => {
//       if (!form.checkValidity()) {
//         event.preventDefault()
//         event.stopPropagation()
//       }

//       form.classList.add('was-validated')
//     }, false)
//   })
// })()


//   // Auto remove alert message after few seconds
//   document.addEventListener("DOMContentLoaded", () => {
//   document.querySelectorAll(".auto-dismiss").forEach(alert => {
//     setTimeout(() => {
//       const bsAlert = new bootstrap.Alert(alert);
//       bsAlert.close();
//     }, 3000); // only auto-dismiss success
//   });
// });


// //Display taxes toggle
// let taxSwitch=document.getElementById("switchCheckDefault");
// taxSwitch.addEventListener("click", ()=>{
//   let taxInfo=document.getElementsByClassName("tax-info");
//   for(info of taxInfo){
//     if(info.style.display!="inline"){
//       info.style.display="inline";
//     }else{
//       info.style.display="none";
//     }
//   } 
// });


document.addEventListener("DOMContentLoaded", () => {

  // Bootstrap form validation
  const forms = document.querySelectorAll('.needs-validation');
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }
      form.classList.add('was-validated');
    }, false);
  });

  // Auto-remove alerts
  document.querySelectorAll(".auto-dismiss").forEach(alert => {
    setTimeout(() => {
      const bsAlert = new bootstrap.Alert(alert);
      bsAlert.close();
    }, 3000);
  });

  // Display taxes toggle
  const taxSwitch = document.getElementById("switchCheckDefault");
  if (taxSwitch) {  // <-- only attach if element exists
    taxSwitch.addEventListener("click", () => {
      const taxInfo = document.getElementsByClassName("tax-info");
      for (const info of taxInfo) {
        if (info.style.display !== "inline") {
          info.style.display = "inline";
        } else {
          info.style.display = "none";
        }
      }
    });
  }

});


