import React, { useEffect, useState } from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";

const List = ({url}) => {
  const [list, setList] = useState([]);
  const fetchList = async () => {
    const response = await axios.get(`${url}/api/cake/list`);
    if (response.data.success) {
      setList(response.data.data);
    } else {
      toast.error("error");
    }
  };
  const removeCake = async (cakeId) => {
    const response = await axios.post(`${url}/api/cake/remove`,{id:cakeId})
    await fetchList()
    if(response.data.success){
      toast.success(response.data.message)
    }
    else{
      toast.error(response.data.message)
    }
  }
  useEffect(() => {
    fetchList();
  }, []);

  return (
  <div className="list add flex-col">
    <p>All Delight List</p>
    <div className="list-table">
      <div className="list-table-formate title">
        <b>Image</b>
        <b>Name</b>
        <b>Category</b>
        <b>Price</b>
        <b>Action</b>
      </div>
      {list.map((item,index)=>{
        return (
          <div key={index} className="list-table-formate">
            <img src={`${url}/uploads/`+item.image} alt="cake" />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>₹ {item.price}</p>
            <p onClick={()=>removeCake(item._id)} className="cursor">x</p>
          </div>
        )
      })}
    </div>
  </div>
)
};

export default List;
