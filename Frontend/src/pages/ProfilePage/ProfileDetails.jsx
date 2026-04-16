import { useEffect,useState } from "react";
import "./profiledetails.css"

const ProfileDetails = ()=>{

const [user,setUser] = useState(null)
const [edit,setEdit] = useState(false)

const token = localStorage.getItem("token")

useEffect(()=>{
fetchProfile()
},[])

const fetchProfile = async()=>{

try{

const res = await fetch("https://e-commerce-2tio.onrender.com/user/profile",{

method:"GET",

headers:{
"Content-Type":"application/json",
Authorization:`Bearer ${token}`
}

})

const data = await res.json()

setUser(data.user)

}catch(err){

console.log(err)

}

}

const updateProfile = async()=>{

await fetch("https://e-commerce-2tio.onrender.com/user/profile",{

method:"PUT",

headers:{
"Content-Type":"application/json",
Authorization:`Bearer ${token}`
},

body:JSON.stringify({
phone:user.phone
})

})

setEdit(false)

}


if(!user){
return <h2>Loading...</h2>
}

return(

<div className="profile-box">

<h2>Profile Details</h2>

<div className="profile-field">

<span>Name :</span>
<p>{user.fullname}</p>

</div>


<div className="profile-field">

<span>Email :</span>
<p>{user.email}</p>

</div>


<div className="profile-field">

<span>Phone :</span>

{edit ?

<input
value={user.phone || ""}
onChange={(e)=>setUser({...user,phone:e.target.value})}
/>

:

<p>{user.phone || "Not Added"}</p>

}

</div>


{edit ?

<button onClick={updateProfile}>Save</button>

:

<button onClick={()=>setEdit(true)}>Edit Phone</button>

}

</div>

)

}

export default ProfileDetails
