/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { 
  MapPin, 
  ChevronDown, 
  QrCode, 
  Bell, 
  Search, 
  Menu, 
  Home, 
  UtensilsCrossed, 
  User,
  Play,
  CheckCircle2
} from 'lucide-react';
import { motion, useMotionValue, useTransform } from 'motion/react';

export default function App() {
  const [orderReceived, setOrderReceived] = useState(false);
  const [tokenNumber, setTokenNumber] = useState('O264');
  const [orderId, setOrderId] = useState('ORD98268753');
  const constraintsRef = useRef(null);
  const x = useMotionValue(0);

  const generateNewOrder = () => {
    const newToken = 'O' + Math.floor(100 + Math.random() * 900);
    const newOrderId = 'ORD' + Math.floor(10000000 + Math.random() * 90000000);
    setTokenNumber(newToken);
    setOrderId(newOrderId);
    setOrderReceived(false);
    x.set(0);
  };
  
  // Transform x position to opacity for the "Order Received?" text
  const textOpacity = useTransform(x, [0, 150], [1, 0]);
  const handleScale = useTransform(x, [0, 200], [1, 1.1]);

  const handleDragEnd = () => {
    if (x.get() > 180) {
      setOrderReceived(true);
      x.set(240); // Snap to end
    } else {
      x.set(0); // Snap back
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start overflow-hidden font-sans">
      {/* Header */}
      <header className="w-full max-w-md bg-[#FDE68A]/30 px-4 py-4 flex items-center justify-between border-b border-amber-100">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-white rounded-full shadow-sm">
            <MapPin className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <div className="flex items-center gap-1 text-sm font-bold text-gray-800">
              Selected <ChevronDown className="w-4 h-4" />
            </div>
            <div className="text-[10px] text-gray-500 font-medium">Current Location</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <QrCode className="w-5 h-5 text-gray-700" />
          <div className="relative">
            <Bell className="w-5 h-5 text-gray-700" />
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border border-white" />
          </div>
          <Search className="w-5 h-5 text-gray-700" />
          <Menu className="w-5 h-5 text-gray-700" />
        </div>
      </header>

      {/* Main Content Area (Blurred Background) */}
      <main className="w-full max-w-md flex-1 relative px-4 py-6 overflow-y-auto">
        {/* Background elements to simulate the app underneath */}
        <div className="space-y-4 opacity-40 blur-[2px]">
          <div className="w-full h-32 bg-amber-200 rounded-2xl flex items-center justify-center font-bold text-amber-800">
            Special Deals
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="h-40 bg-white rounded-2xl shadow-sm" />
            <div className="h-40 bg-white rounded-2xl shadow-sm" />
          </div>
        </div>

        {/* The Modal Overlay */}
        <div className="absolute inset-0 z-40 flex items-center justify-center p-4">
          <motion.div 
            key={orderId}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full bg-white rounded-[32px] shadow-2xl border border-gray-100 overflow-hidden flex flex-col items-center p-6 text-center"
          >
            <h2 className="text-3xl font-bold text-[#D97706] font-display mb-1">
              Token No: {tokenNumber}
            </h2>
            <p className="text-xs font-bold text-gray-800 mb-0.5">
              Beat the Heat - With an Ice Cream (UFL...
            </p>
            <p className="text-[10px] text-gray-400 font-medium mb-4">
              Order Id : {orderId}
            </p>

            <div className="w-full flex justify-between items-center px-2 py-2 border-y border-gray-50 mb-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 border border-green-600 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-green-600 rounded-full" />
                </div>
                <span className="text-[11px] font-semibold text-gray-700">Tricone Chocolate ...</span>
              </div>
              <span className="text-[11px] font-medium text-gray-500">1 x 0.00 = ₹0.00</span>
            </div>

            {/* QR Code Placeholder */}
            <div className="w-48 h-48 bg-white p-2 border-2 border-gray-100 rounded-xl mb-6 flex items-center justify-center">
              <img 
                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${orderId}`} 
                alt="Order QR Code"
                className="w-full h-full"
                referrerPolicy="no-referrer"
              />
            </div>

            <p className="text-[10px] text-gray-400 font-medium mb-4">
              Ordered on 16-04-26 at 01:39 PM
            </p>

            <p className="text-xs font-semibold text-[#D97706] px-6 mb-8 leading-relaxed">
              Thank You for the order. We will notify you once your order is ready
            </p>

            {/* Action Buttons */}
            <div className="w-full grid grid-cols-2 gap-3 mb-8">
              <button className="py-3.5 bg-[#FBBF24] text-gray-900 font-bold rounded-xl shadow-sm active:scale-95 transition-transform">
                Order More
              </button>
              <button className="py-3.5 bg-[#E5E7EB] text-gray-700 font-bold rounded-xl shadow-sm active:scale-95 transition-transform">
                Done
              </button>
            </div>

            {/* Interactive Slider */}
            <div className="w-full relative h-14 bg-gray-100 rounded-full p-1 flex items-center overflow-hidden" ref={constraintsRef}>
              <motion.div 
                style={{ x, opacity: textOpacity }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
              >
                <span className="text-sm font-bold text-gray-600 ml-8">
                  {orderReceived ? "Order Received!" : "Order Received?"}
                </span>
              </motion.div>
              
              <motion.div
                drag="x"
                dragConstraints={{ left: 0, right: 240 }}
                dragElastic={0.1}
                onDragEnd={handleDragEnd}
                style={{ x, scale: handleScale }}
                className="z-10 w-12 h-12 bg-[#FBBF24] rounded-full flex items-center justify-center cursor-grab active:cursor-grabbing shadow-md"
              >
                {orderReceived ? (
                  <CheckCircle2 className="w-6 h-6 text-white" />
                ) : (
                  <Play className="w-6 h-6 text-white fill-white" />
                )}
              </motion.div>

              {orderReceived && (
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  className="absolute inset-0 bg-green-500/10 pointer-events-none"
                />
              )}
            </div>
          </motion.div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="w-full max-w-md bg-white border-t border-gray-100 px-8 py-3 flex justify-between items-center sticky bottom-0 z-50">
        <div className="flex flex-col items-center gap-1 text-amber-500 cursor-pointer">
          <Home className="w-6 h-6" />
          <span className="text-[10px] font-bold">Home</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-gray-400 cursor-pointer">
          <UtensilsCrossed className="w-6 h-6" />
          <span className="text-[10px] font-bold">Foodcourt</span>
        </div>
        <button 
          onClick={generateNewOrder}
          className="flex flex-col items-center gap-1 text-gray-400 cursor-pointer active:scale-90 transition-transform"
        >
          <User className="w-6 h-6" />
          <span className="text-[10px] font-bold">Account</span>
        </button>
      </nav>
    </div>
  );
}
