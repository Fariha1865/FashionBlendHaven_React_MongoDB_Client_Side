import { useEffect, useState } from "react";
import CartProduct from "./CartProduct";
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";

const CartProducts = () => {
    const [cartProducts, setCartProducts] = useState([]);
    const { isDarkMode, user } = useContext(AuthContext);

    const setCart = (_id) => {
        const updatedCartList = cartProducts.filter(product => product._id !== _id);
        setCartProducts(updatedCartList);
    }

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
        fetch(`https://server-odmky03uc-fariha1865s-projects.vercel.app/cart/${user?.email}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setCartProducts(data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
                setLoading(false); 
            });
    }, [user?.email]);

    return (
        <div>
            <div className={`grid grid-cols-1 md:grid-cols-2 gap-10 p-20 ${isDarkMode ? "bg-black" : "bg-blue-100"}`}>
                {loading ? (
                    <p>Loading...</p>
                ) : cartProducts.length > 0 ? (
                    cartProducts.map(cartProduct => (
                        <CartProduct key={cartProduct._id} cartProduct={cartProduct} setCart={setCart} />
                    ))
                ) : (
                    <img src="https://i.ibb.co/xSczbNY/no-Product-removebg-preview.png" className="lg:ml-[70%]" />
                )}
            </div>
        </div>
    );
};

export default CartProducts;
