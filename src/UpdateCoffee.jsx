import { useState } from "react";
import { useLoaderData } from "react-router-dom";

const UpdateCoffee = () => {

    const loadedCoffee = useLoaderData();
    const [coffee,setCoffee] = useState(loadedCoffee);

    const handleUpdateCoffee = e => {
        e.preventDefault();

        const form = e.target;

        const name = form.name.value;
        const category = form.category.value;
        const taste = form.taste.value;
        const supplier = form.supplier.value;
        const quantity = form.quantity.value;
        const details = form.details.value;
        const photo = form.photo.value;
        const newCoffee = { name, quantity, supplier, taste, category, details, photo };

        console.log(newCoffee);

        fetch(`http://localhost:5000/coffee/${coffee._id}`,{

            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newCoffee)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)

                if(data.modifiedCount >0)
                {
                    alert('coffee updated successfully')
                    setCoffee(newCoffee);
                }
            })

    }
    return (
        <div className="bg-gray-200 h-screen">
            <h1 className="text-4xl text-center font-bold pt-5 text-amber-950">Update coffee Details</h1>

            <form onSubmit={handleUpdateCoffee}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-10">
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Coffee Name</span>
                        </label>
                        <input type="text" name="name" defaultValue={coffee.name} className="input input-bordered w-full" />
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Coffee Quantity</span>
                        </label>
                        <input type="text" name="quantity" defaultValue={coffee.quantity} className="input input-bordered w-full" />
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Supplier Name</span>
                        </label>
                        <input type="text" name="supplier" defaultValue={coffee.supplier} className="input input-bordered w-full" />
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Taste</span>
                        </label>
                        <input type="text" name="taste" defaultValue={coffee.taste} className="input input-bordered w-full" />
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Category</span>
                        </label>
                        <input type="text" name="category" defaultValue={coffee.category} className="input input-bordered w-full" />
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Details</span>
                        </label>
                        <input type="text" name="details" defaultValue={coffee.details} className="input input-bordered w-full" />
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Photo URL</span>
                        </label>
                        <input type="text" name="photo" defaultValue={coffee.photo} className="input input-bordered w-full" />
                    </div>



                </div>
                <div className="flex justify-center">
                    <input type="submit" value="Update Coffee" className="btn w-1/2  bg-amber-950 hover:bg-amber-900 text-white" />
                </div>
            </form>
        </div>
    );
};

export default UpdateCoffee;