// 1. global variables

let modalWrapper = document.querySelector('.modal-wrapper');

let addModal = document.querySelector('.add-modal');
let addUserBtn = document.querySelector('.add-modal .form');

let editModal = document.querySelector('.edit-modal');
let updateUserBtn = document.querySelector('.edit-modal .form');

let addBtn = document.querySelector('.btn-add');
let tableUsers = document.querySelector('.table-users');

// getting the form values

// let  fName = document.getElementById('firstName').value;
// let lName = document.getElementById('lastName').value;
// let userNumber = document.getElementById('phone').value;
// let userEmail = document.getElementById('email').value;



// 2. display modal event listener

addBtn.addEventListener("click", () => {

  // addModal.classList.add("modal-show");
  addModal.style.display = "block";


      

})




// 3. remove modal function




// 4. function to add a user in db
addUserBtn.addEventListener("submit", e => {
e.preventDefault();

// getting the form values

// let  fName = document.getElementById('firstName').value;
// let lName = document.getElementById('lastName').value;
// let userNumber = document.getElementById('phone').value;
// let userEmail = document.getElementById('email').value;

// sending data to our db

db.collection("employees").add({

firstName: addUserBtn.firstName.value,
lastName: addUserBtn.lastName.value,
email : addUserBtn.email.value,
phone : addUserBtn.phone.value


});

// hide the modal
modalWrapper.style.display = "none";
  
// removing input values

addUserBtn.firstName.value = " ";
 addUserBtn.lastName.value  = " ";
 addUserBtn.email.value  = " ";
 addUserBtn.phone.value  = " ";

});




// 5. render users

const displayUsers = doc => {

const tr = `
          <tr data-id='${doc.id}'>
          <td>${doc.data().firstName}</td>
          <td>${doc.data().lastName}</td>
          <td>${doc.data().phone}</td>
          <td>${doc.data().email}</td>
          <td>
          <button class="btn btn-edit">Edit</button>
          <button class="btn btn-delete">Delete</button>
          </td>
          
          </tr>
`;

tableUsers.insertAdjacentHTML('beforeend', tr);

// 6. function to delete a user in db
const deleteBtn = document.querySelector(`[data-id='${doc.id}'] .btn-delete`);

deleteBtn.addEventListener("click", () => {
db.collection('employees').doc(`${doc.id}`).delete().then(() =>{

  console.log("Document deleted.")


}).catch(err =>{
  console.log("error has occured", err)
})
})


// 6. function to edit a user in db
const btnEdit = document.querySelector(`[data-id='${doc.id}'] .btn-edit`);

btnEdit.addEventListener("click", () => {
  //displaying the edit modal
  editModal.style.display = "block";

  // return back the form value 
id = doc.id; 
  updateUserBtn.firstName.value = doc.data().firstName;
  updateUserBtn.lastName.value  = doc.data().lastName;
  updateUserBtn.email.value  = doc.data().email;
  updateUserBtn.phone.value  =doc.data().phone;


})

editModal.style.display = "none";
}


// 7. function to edit a user in db




// 8. Real time listener   

db.collection('employees').onSnapshot(snapshot => {
  snapshot.docChanges().forEach(change => {
    if(change.type === 'added') {
      displayUsers(change.doc);
    }
    if(change.type === 'removed') {

      let tr = document.querySelector(`[data-id='${change.doc.id}']`);
      let tbody = tr.parentElement;
      tableUsers.removeChild(tbody);
      
    }
    if(change.type === 'modified') {
      let tr = document.querySelector(`[data-id='${change.doc.id}']`);
      let tbody = tr.parentElement;
      tableUsers.removeChild(tbody);
      displayUsers(change.doc);
    }
  })
})

// update the data

updateUserBtn.addEventListener('submit', e => {

e.preventDefault();
db.collection('employees').doc(id).update({

  firstName: updateUserBtn.firstName.value,
  lastName: updateUserBtn.lastName.value,
  email : updateUserBtn.email.value,
  phone : updateUserBtn.phone.value
  
  
  })
} )


  // User click anyware outside the modal

window.addEventListener("click", e => {

  if(e.target === addModal){

    addModal.style.display = "none";
  }else if(e.target === editModal){
    editModal.style.display = "none";

  }
  
})


