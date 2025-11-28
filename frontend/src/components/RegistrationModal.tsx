import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Mail, Phone, MapPin, Calendar, Heart } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RegistrationModal: React.FC<RegistrationModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    age: '',
    location: '',
    gender: '',
    occupation: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Construct WhatsApp message
    const message = `New Registration:\n\nFirst Name: ${formData.firstName}\nLast Name: ${formData.lastName}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nAge: ${formData.age}\nLocation: ${formData.location}\nGender: ${formData.gender}\nOccupation: ${formData.occupation}`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/919092188796?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
    onClose();
  };

  const formFields = [
    { id: 'firstName', label: 'First Name', icon: User, type: 'text', placeholder: 'Enter your first name' },
    { id: 'lastName', label: 'Last Name', icon: User, type: 'text', placeholder: 'Enter your last name' },
    { id: 'email', label: 'Email', icon: Mail, type: 'email', placeholder: 'Enter your email' },
    { id: 'phone', label: 'Phone', icon: Phone, type: 'tel', placeholder: 'Enter your phone number' },
    { id: 'age', label: 'Age', icon: Calendar, type: 'number', placeholder: 'Enter your age' },
    { id: 'location', label: 'Location', icon: MapPin, type: 'text', placeholder: 'Enter your city' }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Background Blur Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              className="relative max-w-md w-full max-h-[90vh] overflow-y-auto scrollbar-hide"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              style={{
                scrollbarWidth: 'none', // Firefox
                msOverflowStyle: 'none', // IE and Edge
              }}
            >
              {/* Blur Blob Background */}
              <motion.div
                className="absolute inset-0 rounded-3xl"
                initial={{
                  scale: 0,
                  background: 'rgba(255, 255, 255, 0.1)',
                  filter: 'blur(40px)',
                  borderRadius: '50%'
                }}
                animate={{
                  scale: 1,
                  background: 'rgba(255, 255, 255, 0.95)',
                  filter: 'blur(0px)',
                  borderRadius: '24px'
                }}
                transition={{
                  duration: 0.6,
                  ease: "easeOut",
                  background: { duration: 0.4, delay: 0.2 }
                }}
              />

              {/* Modal Content */}
              <motion.div
                className="relative bg-white rounded-3xl shadow-2xl p-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.3, duration: 0.3 }}
              >
                {/* Header */}
                <motion.div
                  className="text-center mb-8"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.4 }}
                >
                  <h2 className="text-2xl font-luxury font-bold text-gray-900 mb-2">
                    Join coimbatore matrimony
                  </h2>
                  <p className="text-gray-600">
                    Find your perfect match
                  </p>
                </motion.div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Form Fields with Staggered Animation */}
                  {formFields.map((field, index) => (
                    <motion.div
                      key={field.id}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 0.6 + index * 0.1,
                        duration: 0.4,
                        ease: "easeOut"
                      }}
                    >
                      <Label htmlFor={field.id} className="text-sm font-medium text-gray-700 mb-2 block">
                        {field.label}
                      </Label>
                      <div className="relative">
                        <field.icon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                          id={field.id}
                          type={field.type}
                          placeholder={field.placeholder}
                          value={formData[field.id as keyof typeof formData]}
                          onChange={(e) => handleInputChange(field.id, e.target.value)}
                          className="pl-10 h-12 border-gray-300 focus:border-primary focus:ring-primary"
                          required
                        />
                      </div>
                    </motion.div>
                  ))}

                  {/* Gender Select */}
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 1.2,
                      duration: 0.4,
                      ease: "easeOut"
                    }}
                  >
                    <Label htmlFor="gender" className="text-sm font-medium text-gray-700 mb-2 block">
                      Gender
                    </Label>
                    <Select onValueChange={(value) => handleInputChange('gender', value)}>
                      <SelectTrigger className="h-12 border-gray-300 focus:border-primary focus:ring-primary">
                        <SelectValue placeholder="Select your gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                  </motion.div>

                  {/* Occupation */}
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 1.3,
                      duration: 0.4,
                      ease: "easeOut"
                    }}
                  >
                    <Label htmlFor="occupation" className="text-sm font-medium text-gray-700 mb-2 block">
                      Occupation
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        id="occupation"
                        type="text"
                        placeholder="Enter your occupation"
                        value={formData.occupation}
                        onChange={(e) => handleInputChange('occupation', e.target.value)}
                        className="pl-10 h-12 border-gray-300 focus:border-primary focus:ring-primary"
                        required
                      />
                    </div>
                  </motion.div>

                  {/* Action Buttons */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 1.4,
                      duration: 0.4,
                      ease: "easeOut"
                    }}
                    className="flex flex-col sm:flex-row gap-3"
                  >
                    <Button
                      type="submit"
                      className="flex-1 h-12 bg-yellow-500 text-black font-semibold text-lg rounded-xl hover:bg-yellow-600 transition-all duration-300"
                    >
                      Register
                    </Button>
                    <Button
                      type="button"
                      onClick={onClose}
                      variant="outline"
                      className="flex-1 h-12 border-2 border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold text-lg rounded-xl transition-all duration-300"
                    >
                      Cancel
                    </Button>
                  </motion.div>
                </form>

                {/* Close Button */}
                <motion.button
                  onClick={onClose}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.3 }}
                >
                  <X className="w-4 h-4 text-gray-600" />
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default RegistrationModal;