
 
async function IsUserNamePasswordValid(userName, password) {
    var data  = false;
    console.log("entered")
    const apiString = `http://localhost:9080/passwordprotector/authentication/Login?userName=${userName}&password=${password}`;
    console.log(apiString);
    await fetch(apiString).then(response => response.json()).then(d => {data = d;});
    return data;
}

 
async function RegisterUser(userName, password) {
    var data  = false;
    const apiString = "http://localhost:9080/passwordprotector/authentication/RegisterUser";
    const args = `?userName=${userName}&password=${password}`;
    console.log(apiString+args);
    await fetch(apiString+args,  {  // Enter your IP address here
       method: 'PUT', 
       mode: 'cors', 
     }).then(response => response.json()).then(d => {data = d;}); 
     console.log("InRegister");
     console.log(data);
    return data;
}

async function AddCredentialsData(hash, website, userName, password){
    var data = false;
    const apiString = "http://localhost:9080/passwordprotector/credentialservice/addcredential";
    const args = `?userHash=${hash}&userName=${userName}&password=${password}&website=${website}`;
    await fetch(apiString+args, {  
        method: 'PUT', 
        mode: 'cors', 
      }).then(response => response.json()).then(d => {data = d;});
    return data;
}

async function UpdateWebsite(hash, oldWebsite, newWebsite, userName, password){
    var data = false;
    const apiString = "http://localhost:9080/passwordprotector/credentialservice/updatewebsiteincredential";
    const args = `?userHash=${hash}&userName=${userName}&password=${password}&oldWebsite=${oldWebsite}&newWebsite=${newWebsite}`;
    await fetch(apiString+args, {  
        method: 'PUT', 
        mode: 'cors', 
      }).then(response => response.json()).then(d => {data = d;});
    return data;
}
async function UpdateUserName(hash, website, oldUserName, newUserName, password){
    var data = false;
    const apiString = "http://localhost:9080/passwordprotector/credentialservice/updateusernameincredential";
    const args = `?userHash=${hash}&oldUserName=${oldUserName}&password=${password}&website=${website}&newUserName=${newUserName}`;
    await fetch(apiString+args, {  
        method: 'PUT', 
        mode: 'cors', 
      }).then(response => response.json()).then(d => {data = d;});
    return data;
}
async function UpdatePassword(hash, website, userName, newPassword, oldPassword){
    var data = false;
    const apiString = "http://localhost:9080/passwordprotector/credentialservice/updatepasswordincredential";
    const args = `?userHash=${hash}&userName=${userName}&oldPassword=${oldPassword}&website=${website}&newPassword=${newPassword}`;
    await fetch(apiString+args, {  
        method: 'PUT', 
        mode: 'cors', 
      }).then(response => response.json()).then(d => {data = d;});
    return data;
}
async function RemoveCredential(hash, website, userName, password){
  var data = false;
  const apiString = "http://localhost:9080/passwordprotector/credentialservice/removecredential";
  const args = `?userHash=${hash}&userName=${userName}&password=${password}&website=${website}`;
  await fetch(apiString+args, {  
      method: 'DELETE', 
      mode: 'cors', 
    }).then(response => response.json()).then(d => {data = d;});
  return data;
}

async function GetCredentialData(hash){
  var data = null
  const apiString = "http://localhost:9080/passwordprotector/credentialservice/getusercredential";
  const args = `?userHash=${hash}`;
  await fetch(apiString+args,  {  // Enter your IP address here
      method: 'GET', 
      mode: 'cors', 
    }).then(response => response.json()).then(d => {data = d});
    const dataSet = new Array();
    data.forEach(element => {
      dataSet.push(element);
    });
    return dataSet;
}

export {IsUserNamePasswordValid, RegisterUser, AddCredentialsData, UpdateWebsite, UpdatePassword, UpdateUserName, RemoveCredential, GetCredentialData}