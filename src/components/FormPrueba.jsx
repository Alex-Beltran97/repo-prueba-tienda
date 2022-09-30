import { useEffect, useState } from "react";
import { getCusttomers } from "../actions/customers.action";
import { getProducts } from "../actions/products.action";
import CardProducts from "./CardProducts";

export const FormPrueba = () => {
  const [date, setDate] = useState(new Date());
  const [clientData, setClientData] = useState([]);
  const [productsData, setProductsData] = useState([]);
  const [client, setClient] = useState("");
  const [product, setProduct] = useState("");
  const [price, setPrice] = useState(0);
  const [amount, setAmount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [result, setResult] = useState({
    date:"",
    client:"",
    product:"",
    price:"",
    amount:"",
    totalPrice:""
  });

const filterProduct = (array,idProduct) =>{
  const [{ price }] = array.filter(item=>item.idProduct===idProduct);
  setPrice(price);
};

  const handleChange = (e,input)=>{
    switch(input){
      case "date":
        setDate(e.target.value);
      break;
      case "client":
        setClient(e.target.value);
      break;
      case "product":
        setProduct(e.target.value);
        filterProduct(productsData,+( e.target.value));
      break;
      case "price":
        setPrice(e.target.value);
      break;
      case "amount":
        setAmount(e.target.value)
      break;
      case "totalPrice":
        setTotalPrice(e.target.value);
      break;
    }
  };

  const handleSubmit = (e)=>{
    e.preventDefault();

    const impresion = {
      date,
      client,
      product,
      price,
      amount,
      totalPrice
    };

    setResult(impresion);
  };

  const getDataCustomers = async ()=>{
    try{
      const { data } = await getCusttomers();
      setClientData(data);
    }catch(error){
      console.log(error);
    }
  };

  const getDataProducts = async ()=>{
    try{
      const { data } = await getProducts();
      setProductsData(data);
    }catch(error){
      console.log(error);
    }
  };

  useEffect(() => {
    getDataCustomers();
    getDataProducts();
  }, []);

  return (<>
    <h1>Formulario</h1>
    <form onSubmit={handleSubmit} >
      <div style={{display:"flex",flexDirection:"column",gap:8}}>
        <input type="date" name="date" onChange={ (e)=>handleChange(e,"date") } value={ date } />
        <select name="client" onChange={ (e)=>handleChange(e,"client") } value={ client }>
          <option value="">Choose one</option>
          { clientData.map(item=>(
            <option key={ item.idCustomer } value={ item.idCustomer  } >{ item.nameCustomer  }</option>
          )) }
        </select>
        <select name="product" onChange={ (e)=>handleChange(e,"product") }  value={ product }>
          <option value="">Choose one</option>
          { productsData.map(item=>(
            <option key={ item.idProduct } value={ item.idProduct  } >{ item.productName  }</option>
          )) }
        </select>
        <input type="number" name="price" onChange={ (e)=>handleChange(e,"price") } value={ price } />
        <input type="number" name="amount" onChange={ (e)=>handleChange(e,"amount") } value={ amount } />
        <input type="number" name="totalPrice" onChange={ (e)=>handleChange(e,"totalPrice") } value={ totalPrice } />
      </div>
      <button type="submit">Send</button>
    </form>
    <br />
    <CardProducts result={ result } />
  </>)
};

export default FormPrueba
