import React from "react";
import { motion } from "framer-motion";

/**
 * Props:
 * - open: boolean
 * - onClose: () => void
 * - item: { name, price, image }
 * - onSuccess: () => void
 */
export default function PaymentModal({ open, onClose, item, onSuccess }) {
  if (!open) return null;

  const handlePay = () => {
    // simulate network delay
    setTimeout(() => {
      onSuccess?.();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
      />
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ duration: 0.25 }}
        className="relative z-10 w-[92%] max-w-xl card"
      >
        <div className="flex gap-4">
          <img src={item.image} alt={item.name} className="w-36 h-36 object-cover rounded-xl" />
          <div className="flex-1">
            <h3 className="text-xl font-bold">{item.name}</h3>
            <p className="text-sm opacity-80 mb-2">Amount: <span className="font-semibold">₹{item.price}</span></p>
            <p className="text-sm text-white/80 mb-4">
              Choose a payment method. (This is a demo — no real payment.)
            </p>

            <div className="space-y-2">
              <button
                onClick={handlePay}
                className="btn btn-primary w-full"
              >
                Pay via UPI (Demo)
              </button>
              <button
                onClick={handlePay}
                className="btn btn-secondary w-full"
              >
                Pay via Card (Demo)
              </button>
              <button
                onClick={onClose}
                className="mt-2 w-full py-2 rounded-xl border border-white/20 text-white"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}