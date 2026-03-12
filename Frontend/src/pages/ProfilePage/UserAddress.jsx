import { useEffect,useState } from "react";
import "./useraddress.css";

const UserAddress = ()=>{

const [addresses,setAddresses] = useState([])
const [showForm,setShowForm] = useState(false)

const [form,setForm] = useState({
street:"",
city:"",
state:"",
pincode:""
})

const token = localStorage.getItem("token")

useEffect(()=>{
fetchAddress()
},[])


const fetchAddress = async()=>{

const res = await fetch("http://localhost:3000/address",{
headers:{
Authorization:`Bearer ${token}`
}
})

const data = await res.json()

setAddresses(data)

}


const addAddress = async()=>{

const res = await fetch("http://localhost:3000/address",{

method:"POST",

headers:{
"Content-Type":"application/json",
Authorization:`Bearer ${token}`
},

body:JSON.stringify(form)

})

if(res.ok){

fetchAddress()
setShowForm(false)

}

}


return(

<div>

<h2>Saved Address</h2>

<div className="address-container">

{addresses.map(a=>(

<div className="address-card" key={a._id}>

<p>{a.street}</p>
<p>{a.city}</p>
<p>{a.state}</p>
<p>{a.pincode}</p>

<button>Edit</button>

</div>

))}

</div>


<button
className="add-address-btn"
onClick={()=>setShowForm(!showForm)}
>
Add Address
</button>


{showForm && (

<div className="address-form">

<input
placeholder="Street"
onChange={(e)=>setForm({...form,street:e.target.value})}
/>

<input
placeholder="City"
onChange={(e)=>setForm({...form,city:e.target.value})}
/>

<input
placeholder="State"
onChange={(e)=>setForm({...form,state:e.target.value})}
/>

<input
placeholder="Pincode"
onChange={(e)=>setForm({...form,pincode:e.target.value})}
/>

<button onClick={addAddress}>
Save Address
</button>

</div>

)}

</div>

)

}

export default UserAddress;