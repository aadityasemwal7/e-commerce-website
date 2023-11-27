import {React, useContext, useEffect }from 'react'
import MyContext from '../../context/data/MyContext'
import {useDispatch, useSelector} from "react-redux"
import {addToCart, deleteFromCart} from "../../redux/CartSlice"
import {toast} from "react-toastify"

const ProductCard = () => {
    const context = useContext(MyContext)
    const {mode, productList, searchKey, filterCategory, filterPrice} = context
    
    const dispatch = useDispatch()
    const cartItems = useSelector((state) => state.cart)
    
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cartItems))
    }, [cartItems])

    const addItemToCart = (product) => {
        dispatch(addToCart(product))
        toast.success("Item added to Cart", {autoClose: 1000})
    }

    return (
    
        <section className="text-gray-600 body-font">
            <div className="container px-5 py-8 md:py-16 mx-auto">
                <div class="lg:w-1/2 w-full mb-6 lg:mb-10">
                    <h1 class="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900" style={{ color: mode === 'dark' ? 'white' : '' }}>Our Latest Collection</h1>
                    <div class="h-1 w-20 bg-blue-600 rounded"></div>
                </div>

                <div className="flex flex-wrap -m-4">
                    {productList.filter((obj) => obj.title.toLowerCase().includes(searchKey))
                    .filter((obj) => obj.category.toLowerCase().includes(filterCategory))
                    .filter((obj) => obj.price.toLowerCase().includes(filterPrice)).slice(0,8).map((item, index) => {
                        const {imageUrl, price, title, description, category, id} = item
                        return (
                            <div onClick={() => window.location.href = `/productinfo/${id}`} key={index} className="p-4 md:w-1/4  drop-shadow-lg " >
                        <div className="h-full border-2 hover:shadow-gray-100 hover:shadow-2xl transition-shadow duration-300 ease-in-out    border-gray-200 border-opacity-60 rounded-2xl overflow-hidden" style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '', }} >
                            <div className="flex justify-center cursor-pointer" >
                                <img className=" rounded-2xl w-full h-full p-2 hover:scale-110 transition-scale-110 duration-300 ease-in-out" src={imageUrl} alt="blog" />
                            </div>
                            <div className="p-5 border-t-2">
                                <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1" style={{ color: mode === 'dark' ? 'white' : '', }}>Category - {category}</h2>
                                <h1 className="title-font text-lg font-medium text-gray-900 mb-3" style={{ color: mode === 'dark' ? 'white' : '', }}>{title}</h1>
                                <p className="leading-relaxed text-sm mb-3">{description}</p>
                                <p className="leading-relaxed mb-3" style={{ color: mode === 'dark' ? 'white' : '' }}>₹ {price}</p>
                                <div className=" flex justify-center">
                                    <button onClick={() => addItemToCart(item)} type="button" className="focus:outline-none text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm w-full  py-2">Add To Cart</button>

                                </div>
                            </div>
                        </div>  
                    </div>
                        )
                        })}
                </div>

            </div>
        </section >
    
  )
}

export default ProductCard