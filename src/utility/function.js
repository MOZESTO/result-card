

import * as XLSX from 'xlsx';
 import * as bootstrap from 'bootstrap'
  


export  function readExcelFile() {
   
  // Create a file input element
  const input = document.createElement('input');
  input.type = 'file';
   // Set up the modal
  const modal = document.createElement('div');
  modal.classList.add('modal', 'fade');
  modal.innerHTML = `
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Upload Excel File</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">  <span  onclick=""class="close-icon"></span></button>
      </div>
      <div class="modal-body">
        <p>Select an Excel file to upload:</p>
        <input type="file" class="form-control-file" id="excel-file-input">
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
        <button type="button" class="btn btn-primary" id="upload-btn">Upload</button>
      </div>
    </div>
  </div>
</div>

  `;
  // Add event listeners to the modal buttons
  const uploadBtn = modal.querySelector('#upload-btn');
  uploadBtn.addEventListener('click', () => {
    const file = input.files[0];

    if (file && file.name.endsWith('.xlsx')) {
      // Read the Excel file using SheetJS
      const reader = new FileReader();
      reader.onload = () => {
        const data = new Uint8Array(reader.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const dataArray = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        
        // Close the modal
        const bootstrapModal = new bootstrap.Modal(modal);
        bootstrapModal.hide();
        
        // Do something with the data
        console.log(dataArray);
      };
      reader.readAsArrayBuffer(file);
    } else {
      alert('Please select a valid Excel file');
    }
  });
  const  closebtn = modal.querySelector('.btn-close')
  
closebtn.addEventListener('click',()=>{
  console.log('close')
  const bootstrapModal = new bootstrap.Modal(modal);
        bootstrapModal.hide();

})
 // Add event listener to the cancel button
 const cancelBtn = modal.querySelector('.btn-secondary');
 cancelBtn.addEventListener('click', () => {
   const bootstrapModal = new bootstrap.Modal(modal);
   bootstrapModal.hide();
 });

 // Add event listener to the close button
 const closeBtn = modal.querySelector('.btn-close');
 closeBtn.addEventListener('click', () => {
   const bootstrapModal = new bootstrap.Modal(modal);
   bootstrapModal.hide();
 });


  // Show the modal
  const body = document.querySelector('#root');
  console.log(body)
  body.appendChild(modal);
  const bootstrapModal = new bootstrap.Modal(modal);
  bootstrapModal.show();


  // Assign the file to the input variable
  const excelFileInput = modal.querySelector('#excel-file-input');
  excelFileInput.addEventListener('change', () => {
    input.files = excelFileInput.files;
  });
}

export function h(){

}