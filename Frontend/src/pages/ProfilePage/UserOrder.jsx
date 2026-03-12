import { useEffect,useState } from "react";
import "./userorder.css";

const UserOrders = ()=>{

const [orders,setOrders] = useState([])

const token = localStorage.getItem("token")

useEffect(()=>{
fetchOrders()
},[])


const fetchOrders = async()=>{

const res = await fetch("http://localhost:3000/order/myorders",{

headers:{
Authorization:`Bearer ${token}`
}

})

const data = await res.json()

setOrders(data)

}


return(

<div className="orders-box">

<h2>My Orders</h2>


{orders.length === 0 ? (

<div className="no-orders">

<h3>No orders yet</h3>
<p>Looks like you haven't placed any orders.</p>

</div>

) : (

<table>

<thead>

<tr>
<th>Total</th>
<th>Status</th>
<th>Date</th>
</tr>

</thead>

<tbody>

{orders.map(o=>(

<tr key={o._id}>

<td>₹{o.totalAmount}</td>
<td>{o.status}</td>
<td>{new Date(o.createdAt).toLocaleDateString()}</td>

</tr>

))}

</tbody>

</table>

)}

</div>

)

}

export default UserOrders;