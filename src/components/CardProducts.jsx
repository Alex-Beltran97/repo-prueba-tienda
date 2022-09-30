import { useEffect, useState } from "react";
import { getCusttomers } from "../actions/customers.action";

const CardProducts = ({ result }) => {
  const [clientName, setClientName] = useState([]);

  const getDataCustomers = async ()=>{
    try{
      const { data } = await getCusttomers();
      const [{ nameCustomer }] = data.filter(item=>item.idCustomer===+(result?.client));
      setClientName(nameCustomer);
    }catch(error){
      console.log(error);
    }
  };

  useEffect(() => {
    getDataCustomers();
  }, [result]);

  return (<>
    <p><b>date</b> { result?.date } </p>
    <p><b>client</b> { clientName } </p>
    <p><b>product</b> { result?.product } </p>
    <p><b>price</b> { result?.price } </p>
    <p><b>amount</b> { result?.amount } </p>
    <p><b>total</b> { result?.totalPrice } </p>
  </>)
};

export default CardProducts;
