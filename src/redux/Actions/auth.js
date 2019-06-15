


export const loginStart = () => ({
    type: 'LOGIN_START',
  })
  
  export const loginFinished = user => ({
    type: 'LOGIN_FINISHED',
    user
  })
  
  export const loginError = error => ({
    type:'LOGIN_ERROR',
    error
  })
  
//   export const loginUser = (email, pass) => async (dispatch) => {
//     dispatch(loginStart())
//   await firebase.auth()
//         .signInWithEmailAndPassword(email,pass)
//         .then((AuthUser)=>{ 
//                 usersref.doc(AuthUser.user.uid).get() 
//           .then((doc)=>{
//               dispatch(loginFinished(doc._data))
//           }).catch((error)=>console.log(error))
//         })
//     .catch ((error) =>{
//       dispatch(loginError(error));
//     })
// }
  
 export const logoutStart = () => ({
    type: 'LOGOUT_START'
  })
  
 export const logoutFinished = () => ({
    type: 'LOGOUT_FINISHED'
  })
  
  export const logoutError = error => ({
    type: 'LOGOUT_ERROR',
    error
  })
  
  // export const logoutUser =  () => async(dispatch) => {
  //   dispatch(logoutStart())
  //   // try {
  // await firebase.auth().signOut().then(() => {

  //       dispatch(logoutFinished())
  //   }).catch((error)=>{

  //       dispatch(logoutError(error))

  //   })
  
  // }