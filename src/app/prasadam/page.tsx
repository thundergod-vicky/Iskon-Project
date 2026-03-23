'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FaShoppingCart, FaStar, FaPlus, FaMinus, FaArrowRight, FaTimes, FaRupeeSign, FaCheckCircle } from 'react-icons/fa';

export default function PrasadamPage() {
  const [prasadamItems, setPrasadamItems] = useState<any[]>([]);
  const [cart, setCart] = useState<any[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const [isCheckout, setIsCheckout] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', deliveryAddress: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    fetch('/api/prasadam')
      .then(r => r.json())
      .then(data => { setPrasadamItems(data); setIsLoading(false); })
      .catch(e => { console.error(e); setIsLoading(false); });
  }, []);

  const addToCart = (item: any) => {
    setCart(prev => {
      const existing = prev.find(i => i._id === item._id);
      if (existing) return prev.map(i => i._id === item._id ? { ...i, quantity: i.quantity + 1 } : i);
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => {
      const existing = prev.find(i => i._id === id);
      if (existing && existing.quantity > 1) {
        return prev.map(i => i._id === id ? { ...i, quantity: i.quantity - 1 } : i);
      }
      return prev.filter(i => i._id !== id);
    });
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const itemsPayload = cart.map(item => ({ prasadamItemId: item._id, quantity: item.quantity }));
      const payload = { ...formData, items: itemsPayload, totalAmount: totalPrice };
      const res = await fetch('/api/prasadam-bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        setIsSubmitted(true);
        setCart([]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main className="min-h-screen pb-16 bg-gray-50">
      <section className="relative bg-gradient-to-r from-amber-500 to-amber-700 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Krishna Prasadam</h1>
          <p className="text-lg opacity-90 mb-8">
            Order pure, sanctified food prepared by devotees and offered to Lord Krishna.
          </p>
          <button 
            onClick={() => { setIsCartOpen(true); setIsCheckout(false); setIsSubmitted(false); }}
            className="bg-white text-amber-600 px-8 py-3 rounded-full font-bold shadow-lg flex items-center gap-2 mx-auto hover:bg-amber-50"
          >
            <FaShoppingCart /> View Cart ({totalItems})
          </button>
        </div>
      </section>

      <section className="py-16 container mx-auto px-4 max-w-6xl">
        {isLoading ? (
          <div className="text-center py-20 text-gray-500">Loading Prasadam Menu...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {prasadamItems.map(item => (
              <motion.div key={item._id} whileHover={{ y: -5 }} className="bg-white rounded-xl shadow border border-gray-100 flex flex-col overflow-hidden">
                <div className="relative h-48 bg-amber-50">
                  <Image src={item.image || '/images/prasadam/placeholder.jpg'} alt={item.name} fill className="object-cover" />
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="text-lg font-bold text-gray-800 mb-1">{item.name}</h3>
                  <p className="text-gray-500 text-sm mb-4 flex-1">{item.description}</p>
                  <div className="flex justify-between items-center mt-auto">
                    <span className="text-xl font-bold text-amber-600">₹{item.price}</span>
                    <button onClick={() => addToCart(item)} className="w-10 h-10 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center hover:bg-amber-500 hover:text-white transition-colors">
                      <FaPlus />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* Cart Sidebar */}
      <div className={`fixed inset-y-0 right-0 w-full sm:w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300 ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="h-full flex flex-col">
          <div className="px-6 py-4 border-b flex justify-between items-center bg-gray-50">
            <h2 className="text-xl font-bold">{isSubmitted ? 'Success' : isCheckout ? 'Checkout' : 'Your Order'}</h2>
            <button onClick={() => setIsCartOpen(false)} className="text-gray-400 hover:text-red-500 p-2"><FaTimes /></button>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            {isSubmitted ? (
               <div className="text-center py-10">
                 <FaCheckCircle className="text-6xl text-green-500 mx-auto mb-4" />
                 <h3 className="text-2xl font-bold text-gray-800 mb-2">Order Placed!</h3>
                 <p className="text-gray-600">Your Prasadam booking has been received. We will contact you soon for pickup/delivery.</p>
               </div>
            ) : isCheckout ? (
               <form onSubmit={handleCheckout} className="space-y-4">
                 <div>
                   <label className="text-sm font-bold text-gray-700 block mb-1">Full Name</label>
                   <input required type="text" value={formData.name} onChange={e=>setFormData({...formData, name: e.target.value})} className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-amber-500" />
                 </div>
                 <div>
                   <label className="text-sm font-bold text-gray-700 block mb-1">Phone Number</label>
                   <input required type="text" value={formData.phone} onChange={e=>setFormData({...formData, phone: e.target.value})} className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-amber-500" />
                 </div>
                 <div>
                   <label className="text-sm font-bold text-gray-700 block mb-1">Delivery Address (Optional)</label>
                   <textarea value={formData.deliveryAddress} onChange={e=>setFormData({...formData, deliveryAddress: e.target.value})} className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-amber-500 h-24" />
                   <p className="text-xs text-gray-500 mt-1">Leave blank if picking up from temple.</p>
                 </div>
                 <div className="pt-4 flex gap-2">
                   <button type="button" onClick={() => setIsCheckout(false)} className="flex-1 py-3 bg-gray-100 rounded-lg text-gray-600 font-bold hover:bg-gray-200">Back</button>
                   <button type="submit" className="flex-[2] py-3 bg-amber-500 text-white rounded-lg font-bold hover:bg-amber-600">Confirm Order</button>
                 </div>
               </form>
            ) : cart.length === 0 ? (
               <div className="text-center py-10 text-gray-500">Your cart is empty</div>
            ) : (
               <div className="space-y-4">
                 {cart.map(item => (
                   <div key={item._id} className="flex items-center gap-4 bg-gray-50 p-3 rounded-xl border border-gray-100">
                     <div className="flex-1">
                       <h4 className="font-bold text-gray-800 leading-tight">{item.name}</h4>
                       <span className="text-amber-600 font-medium">₹{item.price}</span>
                     </div>
                     <div className="flex items-center gap-3 bg-white border rounded-lg p-1">
                       <button onClick={() => removeFromCart(item._id)} className="w-6 h-6 rounded flex items-center justify-center hover:bg-gray-100"><FaMinus size={12}/></button>
                       <span className="w-4 text-center text-sm font-bold">{item.quantity}</span>
                       <button onClick={() => addToCart(item)} className="w-6 h-6 rounded flex items-center justify-center hover:bg-gray-100"><FaPlus size={12}/></button>
                     </div>
                   </div>
                 ))}
               </div>
            )}
          </div>

          {!isCheckout && !isSubmitted && cart.length > 0 && (
            <div className="p-6 border-t bg-gray-50">
              <div className="flex justify-between font-bold text-lg mb-4">
                <span>Total Amount</span>
                <span>₹{totalPrice}</span>
              </div>
              <button onClick={() => setIsCheckout(true)} className="w-full py-4 bg-amber-500 text-white rounded-xl font-bold hover:bg-amber-600 shadow-md">
                Proceed to Checkout
              </button>
            </div>
          )}
        </div>
      </div>
      {isCartOpen && <div className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm" onClick={() => setIsCartOpen(false)} />}
    </main>
  );
}