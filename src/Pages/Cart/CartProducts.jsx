import { useEffect, useState } from "react";
import CartProduct from "./CartProduct";
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";

const CartProducts = () => {

    
    const [cartProducts, setCartProducts] = useState([]);
    const { isDarkMode } = useContext(AuthContext);
    console.log(`https://server-jsxgwmkja-fariha1865s-projects.vercel.app/cart`)

    const setCart = _id =>{
  
          const updatedCartList = cartProducts.filter(coffee=> coffee._id != _id)
          setCartProducts(updatedCartList)
    }

    useEffect(() => {


        window.scrollTo(0, 0);
        fetch('https://server-jsxgwmkja-fariha1865s-projects.vercel.app/cart')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setCartProducts(data);

            })



    }, []);
    return (
        <div>
            <div className={`grid grid-cols-1 md:grid-cols-2 gap-10 p-20 ${isDarkMode ? "bg-black":"bg-blue-100"}`}>
                {
                   cartProducts.length >0 ?  cartProducts.map(cartProduct=><CartProduct key={cartProduct._id} cartProduct={cartProduct} setCart={setCart}></CartProduct>) : <img src="https://i.ibb.co/xSczbNY/no-Product-removebg-preview.png" className="lg:ml-[70%]"/>
                }
            </div>
        </div>
    );
};

export default CartProducts;