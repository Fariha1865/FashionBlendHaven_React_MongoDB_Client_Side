import { useContext } from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../Providers/AuthProvider";

const ProductDetails = () => {

    const [productDetails, setProductDetails] = useState([]);
    const { productId } = useParams();
    const {isDarkMode,user} = useContext(AuthContext);

    
    console.log(productId)
    useEffect(() => {


        window.scrollTo(0, 0);
        fetch(`https://server-odmky03uc-fariha1865s-projects.vercel.app/productDetails/${productId}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setProductDetails(data);


            })




    }, [productId]);

    const handleAddToCart = () =>{

        productDetails[0]['email'] = user?.email;
        console.log(productDetails[0])
        
   
        fetch(`https://server-odmky03uc-fariha1865s-projects.vercel.app/cartProducts/${user?.email}`, {

        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(productDetails[0])
    })
        .then(res => res.json())
        .then(data => {
            console.log(data.errorCode)

            if (data.errorCode==11000) {
                Swal.fire(
                    'Product already exists!',
                    'This product already exists in your cart',
                    'error',
                )
            }
            if(data.insertedId)
            {
                Swal.fire(
                    'Product Added!',
                    'The product has been added to your cart',
                    'success',
                )
                
            }  
        })
    }
    

    return (
        <div className="p-20 max-w-7xl mx-auto">
            <img src={productDetails[0]?.photo} alt="" className="w-[1200px] h-[500px]" />

            <div className={`${isDarkMode ? "text-white": "text-black"}`}>
                <h1 className="text-2xl font-bold my-5">Description:</h1>
                <p>{productDetails[0]?.description}</p>
                <p className="text-xl font-semibold mt-5">Price: {productDetails[0]?.price}</p>

                <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                            key={star}
                            className={`h-5 w-5 fill-current ${star <= parseInt(productDetails[0]?.rating) ? 'text-yellow-400' : 'text-gray-300'
                                }`}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                        >
                            <path
                                d="M10 1l2.4 6.5h6.1l-5 4.7 1.9 6.7L10 14l-4.4 4.9 1.9-6.7-5-4.7H7.6z"
                            />
                        </svg>
                    ))}
                </div>

            </div>
            <div className="mt-5">
                <button onClick={handleAddToCart} className="btn bg-blue-900 hover:bg-blue-600 text-white">Add To Cart</button>
            </div>
        </div>
    );
};

export default ProductDetails;