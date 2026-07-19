import React, { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { ChevronLeft, Check, CreditCard, Truck, Shield, Mail, Lock, AlertCircle, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAppContext } from '@/App';

export default function Checkout() {
  const { cartItems, cartCount, clearCart } = useAppContext();
  const [step, setStep] = useState<'info' | 'shipping' | 'payment' | 'review' | 'success'>('info');
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    zip: '',
    country: 'US',
    phone: '',
    saveInfo: false,
    shippingMethod: 'standard',
    cardName: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
    saveCard: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = formData.shippingMethod === 'express' ? 14.99 : (subtotal > 50 ? 0 : 9.99);
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  useEffect(() => {
    document.documentElement.classList.add('dark');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const steps = [
    { id: 'info', label: 'Contact', icon: Mail },
    { id: 'shipping', label: 'Shipping', icon: Truck },
    { id: 'payment', label: 'Payment', icon: CreditCard },
    { id: 'review', label: 'Review', icon: Shield },
  ];

  const validateStep = (currentStep: string): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (currentStep === 'info') {
      if (!formData.email) newErrors.email = 'Email is required';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format';
      if (!formData.firstName) newErrors.firstName = 'First name is required';
      if (!formData.lastName) newErrors.lastName = 'Last name is required';
    }
    
    if (currentStep === 'shipping') {
      if (!formData.address) newErrors.address = 'Address is required';
      if (!formData.city) newErrors.city = 'City is required';
      if (!formData.state) newErrors.state = 'State is required';
      if (!formData.zip) newErrors.zip = 'ZIP code is required';
      else if (!/^\d{5}(-\d{4})?$/.test(formData.zip)) newErrors.zip = 'Invalid ZIP format';
      if (!formData.phone) newErrors.phone = 'Phone is required';
    }
    
    if (currentStep === 'payment') {
      if (!formData.cardName) newErrors.cardName = 'Name on card is required';
      if (!formData.cardNumber) newErrors.cardNumber = 'Card number is required';
      else if (formData.cardNumber.replace(/\s/g, '').length < 15) newErrors.cardNumber = 'Invalid card number';
      if (!formData.cardExpiry) newErrors.cardExpiry = 'Expiry date is required';
      else if (!/^\d{2}\/\d{2}$/.test(formData.cardExpiry)) newErrors.cardExpiry = 'Use MM/YY format';
      else {
        const [month, year] = formData.cardExpiry.split('/').map(Number);
        const now = new Date();
        const currentYear = now.getFullYear() % 100;
        const currentMonth = now.getMonth() + 1;
        if (month < 1 || month > 12) newErrors.cardExpiry = 'Invalid month';
        else if (year < currentYear || (year === currentYear && month < currentMonth)) newErrors.cardExpiry = 'Card expired';
      }
      if (!formData.cardCvc) newErrors.cardCvc = 'CVC is required';
      else if (formData.cardCvc.length < 3) newErrors.cardCvc = 'Invalid CVC';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      const currentIndex = steps.findIndex(s => s.id === step);
      if (currentIndex < steps.length - 1) {
        setStep(steps[currentIndex + 1].id);
      }
    }
  };

  const handleBack = () => {
    const currentIndex = steps.findIndex(s => s.id === step);
    if (currentIndex > 0) {
      setStep(steps[currentIndex - 1].id);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(step)) return;
    
    setIsProcessing(true);
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessing(false);
    setStep('success');
    clearCart();
  };

  const formatCardNumber = (value: string) => {
    const digits = value.replace(/\D/g, '');
    const groups = digits.match(/.{1,4}/g) || [];
    return groups.join(' ');
  };

  const formatExpiry = (value: string) => {
    const digits = value.replace(/\D/g, '');
    if (digits.length >= 2) {
      return digits.slice(0, 2) + '/' + digits.slice(2, 4);
    }
    return digits;
  };

  const handleChange = (field: string, value: string) => {
    let formattedValue = value;
    if (field === 'cardNumber') formattedValue = formatCardNumber(value);
    if (field === 'cardExpiry') formattedValue = formatExpiry(value);
    if (field === 'cardCvc') formattedValue = value.replace(/\D/g, '').slice(0, 4);
    if (field === 'zip') formattedValue = value.replace(/[^0-9-]/g, '').slice(0, 10);
    if (field === 'phone') formattedValue = value.replace(/\D/g, '').slice(0, 10);
    
    setFormData(prev => ({ ...prev, [field]: formattedValue }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[100dvh] flex items-center justify-center bg-[#0C0C0C] px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-3xl font-bold text-white mb-4">Cart is Empty</h1>
          <p className="text-white/60 mb-8">Add some flavors before checking out.</p>
          <Link href="/shop" className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-[#0C0C0C] font-bold rounded-xl hover:bg-primary/90 transition-colors">
            <ChevronLeft className="w-4 h-4" />
            Continue Shopping
          </Link>
        </motion.div>
      </div>
    );
  }

  if (step === 'success') {
    return (
      <div className="relative min-h-[100dvh] w-full overflow-hidden bg-[#0C0C0C]">
        <div
          className="fixed inset-0 pointer-events-none z-[1] opacity-[0.03] mix-blend-overlay"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
        />
        <div className="relative z-10 flex flex-col w-full">
          <Navbar />
          <main className="flex-1 pt-24 pb-16 px-6 flex items-center justify-center">
            <div className="container mx-auto max-w-md text-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, type: 'spring', stiffness: 200 }}
                className="w-24 h-24 mx-auto mb-8 bg-green-500/20 rounded-full flex items-center justify-center"
              >
                <Check className="w-12 h-12 text-green-500" />
              </motion.div>
              <h1 className="text-4xl font-bold text-white mb-4">Order Confirmed!</h1>
              <p className="text-white/60 text-lg mb-8">
                Thank you for your order. A confirmation has been sent to <strong className="text-white">{formData.email}</strong>.
              </p>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8 text-left">
                <p className="text-white/70 mb-2"><strong className="text-white">Order #</strong>NECTAR-{Date.now().toString().slice(-8)}</p>
                <p className="text-white/70"><strong className="text-white">Total:</strong> ${total.toFixed(2)}</p>
              </div>
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-[#0C0C0C] font-bold uppercase tracking-wider rounded-xl hover:bg-primary/90 transition-colors"
              >
                Continue Shopping <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </main>
          <Footer />
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-[100dvh] w-full overflow-hidden bg-[#0C0C0C]">
      <div
        className="fixed inset-0 pointer-events-none z-[1] opacity-[0.03] mix-blend-overlay"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      />
      <div className="relative z-10 flex flex-col w-full">
        <Navbar />

        <main className="flex-1 pt-24 pb-16 px-6">
          <div className="container mx-auto max-w-5xl">
            {/* Progress Steps */}
            <motion.nav
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-10"
              aria-label="Checkout progress"
            >
              <div className="flex items-center justify-between">
                {steps.map((s, i) => (
                  <React.Fragment key={s.id}>
                    <div className="flex flex-col items-center">
                      <div className={`relative flex items-center justify-center w-10 h-10 rounded-full font-bold transition-all ${
                        steps.findIndex(st => st.id === step) >= i
                          ? 'bg-primary text-[#0C0C0C]'
                          : 'bg-white/10 text-white/50'
                      }`}>
                        {steps.findIndex(st => st.id === step) > i && <Check className="w-5 h-5" />}
                        {steps.findIndex(st => st.id === step) === i && <s.icon className="w-5 h-5" />}
                        {steps.findIndex(st => st.id === step) < i && <span>{i + 1}</span>}
                      </div>
                      <span className={`text-sm font-medium mt-2 ${steps.findIndex(st => st.id === step) >= i ? 'text-white' : 'text-white/50'}`}>
                        {s.label}
                      </span>
                    </div>
                    {i < steps.length - 1 && (
                      <div className={`flex-1 h-1 mx-4 ${steps.findIndex(st => st.id === step) > i ? 'bg-primary' : 'bg-white/10'}`} />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </motion.nav>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Form */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-2 space-y-8"
              >
                <form onSubmit={handleSubmit}>
                  {/* Contact Info */}
                  <AnimatePresence mode="wait">
                    <motion.fieldset
                      key={step}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="bg-white/5 border border-white/10 rounded-2xl p-6"
                      disabled={step !== 'info'}
                    >
                      <legend className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                        <Mail className="w-5 h-5 text-primary" />
                        Contact Information
                      </legend>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <InputField
                          label="Email"
                          type="email"
                          value={formData.email}
                          onChange={(v) => handleChange('email', v)}
                          error={errors.email}
                          required
                          autoComplete="email"
                        />
                        <InputField
                          label="Phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(v) => handleChange('phone', v)}
                          error={errors.phone}
                          required
                          autoComplete="tel"
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InputField
                          label="First Name"
                          value={formData.firstName}
                          onChange={(v) => handleChange('firstName', v)}
                          error={errors.firstName}
                          required
                          autoComplete="given-name"
                        />
                        <InputField
                          label="Last Name"
                          value={formData.lastName}
                          onChange={(v) => handleChange('lastName', v)}
                          error={errors.lastName}
                          required
                          autoComplete="family-name"
                        />
                      </div>
                      <label className="flex items-center gap-3 mt-6 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.saveInfo}
                          onChange={(e) => setFormData(prev => ({ ...prev, saveInfo: e.target.checked }))}
                          className="w-4 h-4 rounded border-white/20 text-primary focus:ring-primary focus:ring-2"
                        />
                        <span className="text-white/70">Save this information for next time</span>
                      </label>
                    </motion.fieldset>
                  </AnimatePresence>

                  {/* Shipping */}
                  <AnimatePresence mode="wait">
                    <motion.fieldset
                      key={step}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="bg-white/5 border border-white/10 rounded-2xl p-6"
                      disabled={step !== 'shipping'}
                    >
                      <legend className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                        <Truck className="w-5 h-5 text-primary" />
                        Shipping Address
                      </legend>
                      <InputField
                        label="Address"
                        value={formData.address}
                        onChange={(v) => handleChange('address', v)}
                        error={errors.address}
                        required
                        autoComplete="street-address"
                        className="mb-4"
                      />
                      <InputField
                        label="Apartment, suite, etc. (optional)"
                        value={formData.apartment}
                        onChange={(v) => handleChange('apartment', v)}
                        autoComplete="address-line2"
                        className="mb-4"
                      />
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <InputField
                          label="City"
                          value={formData.city}
                          onChange={(v) => handleChange('city', v)}
                          error={errors.city}
                          required
                          autoComplete="address-level2"
                        />
                        <InputField
                          label="State"
                          value={formData.state}
                          onChange={(v) => handleChange('state', v)}
                          error={errors.state}
                          required
                          autoComplete="address-level1"
                        />
                        <InputField
                          label="ZIP Code"
                          value={formData.zip}
                          onChange={(v) => handleChange('zip', v)}
                          error={errors.zip}
                          required
                          autoComplete="postal-code"
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <InputField
                          label="Country"
                          value={formData.country}
                          onChange={(v) => handleChange('country', v)}
                          as="select"
                          options={[
                            { value: 'US', label: 'United States' },
                            { value: 'CA', label: 'Canada' },
                            { value: 'UK', label: 'United Kingdom' },
                            { value: 'AU', label: 'Australia' },
                          ]}
                        />
                        <InputField
                          label="Phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(v) => handleChange('phone', v)}
                          error={errors.phone}
                          required
                          autoComplete="tel"
                        />
                      </div>

                      <div className="space-y-3">
                        <label className="flex items-center gap-4 cursor-pointer p-4 bg-white/5 border border-white/10 rounded-xl hover:border-primary/30 transition-colors">
                          <input
                            type="radio"
                            name="shippingMethod"
                            value="standard"
                            checked={formData.shippingMethod === 'standard'}
                            onChange={(e) => setFormData(prev => ({ ...prev, shippingMethod: e.target.value }))}
                            className="w-4 h-4 text-primary focus:ring-primary focus:ring-2 border-white/20"
                          />
                          <div className="flex-1">
                            <p className="font-bold text-white">Standard Shipping</p>
                            <p className="text-white/50 text-sm">{subtotal > 50 ? 'Free' : '$9.99'} • 5-7 business days</p>
                          </div>
                          <span className="text-primary font-bold">{subtotal > 50 ? 'Free' : '$9.99'}</span>
                        </label>
                        <label className="flex items-center gap-4 cursor-pointer p-4 bg-white/5 border border-white/10 rounded-xl hover:border-primary/30 transition-colors">
                          <input
                            type="radio"
                            name="shippingMethod"
                            value="express"
                            checked={formData.shippingMethod === 'express'}
                            onChange={(e) => setFormData(prev => ({ ...prev, shippingMethod: e.target.value }))}
                            className="w-4 h-4 text-primary focus:ring-primary focus:ring-2 border-white/20"
                          />
                          <div className="flex-1">
                            <p className="font-bold text-white">Express Shipping</p>
                            <p className="text-white/50 text-sm">$14.99 • 2-3 business days</p>
                          </div>
                          <span className="text-primary font-bold">$14.99</span>
                        </label>
                      </div>
                    </motion.fieldset>
                  </AnimatePresence>

                  {/* Payment */}
                  <AnimatePresence mode="wait">
                    <motion.fieldset
                      key={step}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="bg-white/5 border border-white/10 rounded-2xl p-6"
                      disabled={step !== 'payment'}
                    >
                      <legend className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                        <CreditCard className="w-5 h-5 text-primary" />
                        Payment
                      </legend>
                      
                      <div className="relative mb-4">
                        <div className="flex gap-2 mb-2">
                          {['visa', 'mastercard', 'amex', 'discover'].map((card) => (
                            <div key={card} className="px-3 py-1 bg-white/5 border border-white/10 rounded text-xs font-bold uppercase text-white/50">
                              {card.toUpperCase()}
                            </div>
                          ))}
                        </div>
                        <InputField
                          label="Card Number"
                          value={formData.cardNumber}
                          onChange={(v) => handleChange('cardNumber', v)}
                          error={errors.cardNumber}
                          required
                          placeholder="1234 5678 9012 3456"
                          autoComplete="cc-number"
                          maxLength={19}
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <InputField
                          label="Name on Card"
                          value={formData.cardName}
                          onChange={(v) => handleChange('cardName', v)}
                          error={errors.cardName}
                          required
                          autoComplete="cc-name"
                        />
                        <InputField
                          label="Expiry (MM/YY)"
                          value={formData.cardExpiry}
                          onChange={(v) => handleChange('cardExpiry', v)}
                          error={errors.cardExpiry}
                          required
                          placeholder="MM/YY"
                          autoComplete="cc-exp"
                          maxLength={5}
                        />
                        <InputField
                          label="CVC"
                          value={formData.cardCvc}
                          onChange={(v) => handleChange('cardCvc', v)}
                          error={errors.cardCvc}
                          required
                          placeholder="123"
                          type="password"
                          autoComplete="cc-csc"
                          maxLength={4}
                        />
                      </div>

                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.saveCard}
                          onChange={(e) => setFormData(prev => ({ ...prev, saveCard: e.target.checked }))}
                          className="w-4 h-4 rounded border-white/20 text-primary focus:ring-primary focus:ring-2"
                        />
                        <span className="text-white/70">Save card for future purchases</span>
                      </label>

                      <div className="flex items-center gap-3 mt-6 p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
                        <Lock className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <p className="text-white/70 text-sm">
                          Your payment is secured with 256-bit SSL encryption. We never store full card details.
                        </p>
                      </div>
                    </motion.fieldset>
                  </AnimatePresence>

                  {/* Review */}
                  <AnimatePresence mode="wait">
                    <motion.fieldset
                      key={step}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="bg-white/5 border border-white/10 rounded-2xl p-6"
                      disabled={step !== 'review'}
                    >
                      <legend className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                        <Shield className="w-5 h-5 text-primary" />
                        Review Order
                      </legend>
                      
                      <div className="space-y-4 mb-6">
                        <ReviewSection title="Contact" content={`${formData.email} • ${formData.phone}`} />
                        <ReviewSection title="Shipping" content={`${formData.firstName} ${formData.lastName}, ${formData.address}${formData.apartment ? ', ' + formData.apartment : ''}, ${formData.city}, ${formData.state} ${formData.zip}`} />
                        <ReviewSection title="Payment" content={`•••• •••• •••• ${formData.cardNumber.slice(-4)}`} />
                        <ReviewSection title="Shipping Method" content={formData.shippingMethod === 'standard' ? (subtotal > 50 ? 'Standard (Free)' : 'Standard ($9.99)') : 'Express ($14.99)'} />
                      </div>

                      <div className="border-t border-white/10 pt-4">
                        <div className="space-y-2 mb-4">
                          {cartItems.map(item => (
                            <div key={item.id} className="flex justify-between text-white/70">
                              <span>{item.name} × {item.quantity}</span>
                              <span>${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                          ))}
                        </div>
                        <div className="flex justify-between text-white font-bold text-lg">
                          <span>Total</span>
                          <span>${total.toFixed(2)}</span>
                        </div>
                      </div>
                    </motion.fieldset>
                  </AnimatePresence>

                  {/* Navigation */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-between"
                  >
                    <button
                      type="button"
                      onClick={handleBack}
                      disabled={step === 'info'}
                      className="px-6 py-3 border border-white/10 text-white font-bold rounded-xl hover:border-primary/50 hover:bg-white/5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronLeft className="w-4 h-4 inline mr-2" />
                      Back
                    </button>
                    <div className="flex gap-4">
                      {step !== 'review' && (
                        <button
                          type="button"
                          onClick={handleNext}
                          className="px-8 py-3 bg-primary text-[#0C0C0C] font-bold uppercase tracking-wider rounded-xl hover:bg-primary/90 transition-colors"
                        >
                          Continue <ChevronRight className="w-4 h-4 inline ml-2" />
                        </button>
                      )}
                      {step === 'review' && (
                        <button
                          type="submit"
                          disabled={isProcessing}
                          className="px-8 py-3 bg-primary text-[#0C0C0C] font-bold uppercase tracking-wider rounded-xl hover:bg-primary/90 disabled:opacity-50 transition-colors"
                        >
                          {isProcessing ? (
                            <span className="flex items-center gap-2">
                              <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/></svg>
                              Processing...
                            </span>
                          ) : (
                            <>
                              Place Order <ChevronRight className="w-4 h-4 inline ml-2" />
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </motion.div>
                </form>
              </motion.div>

              {/* Order Summary Sidebar */}
              <motion.aside
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="lg:col-span-1"
              >
                <div className="sticky top-28 bg-white/5 border border-white/10 rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-primary" />
                    Order Summary
                  </h3>

                  <div className="space-y-3 mb-6 max-h-64 overflow-y-auto pr-2">
                    {cartItems.map(item => (
                      <div key={item.id} className="flex gap-3">
                        <img src={item.image} alt={item.name} className="w-16 h-16 rounded-xl object-cover flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-white truncate">{item.name}</p>
                          <p className="text-white/50 text-sm">Qty: {item.quantity}</p>
                          <p className="text-primary font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-white/10 pt-6 space-y-3">
                    <SummaryRow label="Subtotal" amount={subtotal} />
                    <SummaryRow label="Shipping" amount={shipping} isFree={shipping === 0} />
                    <SummaryRow label="Tax (8%)" amount={tax} />
                    <SummaryRow label="Total" amount={total} isTotal />
                  </div>

                  <div className="mt-6 pt-6 border-t border-white/10">
                    <p className="text-white/60 text-sm">
                      <Lock className="w-4 h-4 inline mr-1" />
                      Secure checkout • SSL encrypted
                    </p>
                  </div>
                </div>
              </motion.aside>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}

interface InputFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  maxLength?: number;
  className?: string;
  as?: 'input' | 'select';
  options?: { value: string; label: string }[];
}

function InputField({
  label,
  value,
  onChange,
  error,
  required,
  type = 'text',
  placeholder,
  autoComplete,
  maxLength,
  className = '',
  as = 'input',
  options,
}: InputFieldProps) {
  const id = label.toLowerCase().replace(/\s+/g, '-');
  
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-sm font-medium text-white/70 mb-2">
        {label} {required && <span className="text-primary">*</span>}
      </label>
      {as === 'select' ? (
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-white/5 border border-white/10 focus:border-primary focus:outline-none text-white placeholder-white/40 px-4 py-3 rounded-xl transition-colors"
          autoComplete={autoComplete}
          required={required}
        >
          {options?.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          maxLength={maxLength}
          required={required}
          className={`w-full bg-white/5 border ${error ? 'border-red-500/50' : 'border-white/10'} focus:border-primary focus:outline-none text-white placeholder-white/40 px-4 py-3 rounded-xl transition-colors ${error ? 'focus:ring-2 focus:ring-red-500/20' : ''}`}
        />
      )}
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-1.5 text-red-400 text-sm flex items-center gap-1"
        >
          <AlertCircle className="w-3 h-3" />
          {error}
        </motion.p>
      )}
    </div>
  );
}

interface ReviewSectionProps {
  title: string;
  content: string;
}

function ReviewSection({ title, content }: ReviewSectionProps) {
  return (
    <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
      <p className="text-white/50 text-sm uppercase tracking-wider mb-1">{title}</p>
      <p className="text-white">{content}</p>
    </div>
  );
}

interface SummaryRowProps {
  label: string;
  amount: number;
  isFree?: boolean;
  isTotal?: boolean;
}

function SummaryRow({ label, amount, isFree, isTotal }: SummaryRowProps) {
  return (
    <div className={`flex justify-between ${isTotal ? 'text-xl border-t border-white/10 pt-3' : ''}`}>
      <span className={isTotal ? 'font-bold text-white' : 'text-white/70'}>{label}</span>
      <span className={isTotal ? 'font-bold text-white' : isFree ? 'text-primary font-bold' : 'text-white'}>
        {isFree ? 'Free' : `$${amount.toFixed(2)}`}
      </span>
    </div>
  );
}