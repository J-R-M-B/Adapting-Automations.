import { useState, useEffect } from 'react';
import { 
  X, ArrowRight, Calendar, Clock, Phone, User, Mail, Building, 
  CheckCircle2, Calendar as CalendarIcon, ChevronDown, ChevronUp
} from 'lucide-react';
import { Solution } from '../../types/solutions';
import { solutionsData } from '../../data/solutionsData';

interface ScheduleCallFormProps {
  isOpen: boolean;
  onClose: () => void;
  initialSolution?: string;
}

// Available time slots (30 minute blocks)
const TIME_SLOTS = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
  '15:00', '15:30', '16:00', '16:30', '17:00'
];

export function ScheduleCallForm({ isOpen, onClose, initialSolution }: ScheduleCallFormProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    phone: '',
    solution: initialSolution || '',
    date: '',
    time: ''
  });
  
  const [showCalendar, setShowCalendar] = useState(false);
  const [showTimeSlots, setShowTimeSlots] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Reset form when opened with a new initial solution
  useEffect(() => {
    if (isOpen && initialSolution) {
      setFormData(prev => ({
        ...prev,
        solution: initialSolution
      }));
    }
  }, [isOpen, initialSolution]);

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field if it exists
    if (formErrors[name]) {
      setFormErrors(prev => {
        const newErrors = {...prev};
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setFormData(prev => ({
      ...prev,
      date: date.toISOString().split('T')[0]
    }));
    setShowCalendar(false);
    
    // Clear date error if it exists
    if (formErrors.date) {
      setFormErrors(prev => {
        const newErrors = {...prev};
        delete newErrors.date;
        return newErrors;
      });
    }
  };

  const handleTimeSelect = (time: string) => {
    setFormData(prev => ({
      ...prev,
      time
    }));
    setShowTimeSlots(false);
    
    // Clear time error if it exists
    if (formErrors.time) {
      setFormErrors(prev => {
        const newErrors = {...prev};
        delete newErrors.time;
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (!formData.firstName.trim()) errors.firstName = "First name is required";
    if (!formData.lastName.trim()) errors.lastName = "Last name is required";
    
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }
    
    if (!formData.solution) errors.solution = "Please select a solution";
    if (!formData.date) errors.date = "Please select a date";
    if (!formData.time) errors.time = "Please select a time";
    
    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    // Submit form
    setIsSubmitting(true);
    
    try {
      // Get solution title from ID
      const solutionTitle = formData.solution === 'custom' 
        ? 'Custom Solution' 
        : solutionsData.find(s => s.id === formData.solution)?.title || formData.solution;
      
      // Format date for better readability
      const formattedDate = selectedDate 
        ? selectedDate.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })
        : formData.date;
      
      // Prepare data for webhook
      const webhookData = {
        action: "Schedule Call",
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        company: formData.company || "Not provided",
        phone: formData.phone || "Not provided",
        solution: solutionTitle,
        date: formattedDate,
        time: `${formData.time} (GMT+1)`,
        timestamp: new Date().toISOString()
      };
      
      // Send data to webhook
      const response = await fetch('https://hook.eu2.make.com/b4oxd6e27jakrnsk6u1rawhyjlay0kp5', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(webhookData)
      });
      
      if (!response.ok) {
        throw new Error(`Webhook error: ${response.status}`);
      }
      
      console.log('Form submitted successfully:', webhookData);
      setSubmitSuccess(true);
      
      // Reset form after 3 seconds and close modal
      setTimeout(() => {
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          company: '',
          phone: '',
          solution: '',
          date: '',
          time: ''
        });
        setSelectedDate(null);
        setSubmitSuccess(false);
        onClose();
      }, 3000);
      
    } catch (error) {
      console.error('Error submitting form:', error);
      // You could set an error state here to show to the user
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderCalendar = () => {
    const today = new Date();
    const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
    const lastDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
    
    // Get the day of the week for the first day (0 = Sunday, 1 = Monday, etc.)
    const firstDayOfWeek = firstDayOfMonth.getDay();
    
    // Calculate days from previous month to show
    const daysFromPrevMonth = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;
    
    // Create array of days to display
    const daysArray = [];
    
    // Add days from previous month
    const prevMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 0);
    const prevMonthDays = prevMonth.getDate();
    
    for (let i = prevMonthDays - daysFromPrevMonth + 1; i <= prevMonthDays; i++) {
      daysArray.push({
        date: new Date(prevMonth.getFullYear(), prevMonth.getMonth(), i),
        isCurrentMonth: false,
        isToday: false,
        isSelectable: false
      });
    }
    
    // Add days from current month
    for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i);
      const isToday = date.toDateString() === today.toDateString();
      const isPast = date < new Date(today.setHours(0, 0, 0, 0));
      const isWeekend = date.getDay() === 0 || date.getDay() === 6; // Sunday or Saturday
      
      daysArray.push({
        date,
        isCurrentMonth: true,
        isToday,
        isSelectable: !isPast && !isWeekend
      });
    }
    
    // Add days from next month to complete the grid (6 rows x 7 days = 42 cells)
    const remainingDays = 42 - daysArray.length;
    for (let i = 1; i <= remainingDays; i++) {
      daysArray.push({
        date: new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, i),
        isCurrentMonth: false,
        isToday: false,
        isSelectable: false
      });
    }
    
    // Group days into weeks
    const weeks = [];
    for (let i = 0; i < daysArray.length; i += 7) {
      weeks.push(daysArray.slice(i, i + 7));
    }
    
    return (
      <div className="bg-gray-900 rounded-lg shadow-lg p-4 absolute z-20 mt-2 w-full">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
            className="p-1 rounded-full hover:bg-gray-800"
          >
            <ChevronDown className="w-5 h-5" />
          </button>
          
          <div className="font-medium">
            {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
          </div>
          
          <button
            onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
            className="p-1 rounded-full hover:bg-gray-800"
          >
            <ChevronUp className="w-5 h-5" />
          </button>
        </div>
        
        <div className="grid grid-cols-7 gap-1 mb-2">
          {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map(day => (
            <div key={day} className="text-center text-xs text-gray-400 font-medium">
              {day}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-7 gap-1">
          {weeks.flat().map((day, index) => (
            <button
              key={index}
              onClick={() => day.isSelectable && handleDateSelect(day.date)}
              disabled={!day.isSelectable}
              className={`
                h-8 w-8 flex items-center justify-center rounded-full text-sm
                ${!day.isCurrentMonth ? 'text-gray-600' : ''}
                ${day.isToday ? 'bg-blue-500/20 text-blue-400' : ''}
                ${selectedDate && day.date.toDateString() === selectedDate.toDateString() 
                  ? 'bg-purple-500 text-white' 
                  : day.isSelectable ? 'hover:bg-gray-800' : 'cursor-not-allowed'}
                ${!day.isSelectable && day.isCurrentMonth ? 'text-gray-600' : ''}
              `}
            >
              {day.date.getDate()}
            </button>
          ))}
        </div>
      </div>
    );
  };

  const renderTimeSlots = () => {
    return (
      <div className="bg-gray-900 rounded-lg shadow-lg p-4 absolute z-20 mt-2 w-full max-h-60 overflow-y-auto">
        <div className="grid grid-cols-3 gap-2">
          {TIME_SLOTS.map(time => (
            <button
              key={time}
              onClick={() => handleTimeSelect(time)}
              className={`
                p-2 rounded-lg text-sm
                ${formData.time === time 
                  ? 'bg-purple-500 text-white' 
                  : 'hover:bg-gray-800 text-gray-300'}
              `}
            >
              {time} (GMT+1)
            </button>
          ))}
        </div>
      </div>
    );
  };

  // Success message component
  const SuccessMessage = () => (
    <div className="absolute inset-0 flex items-center justify-center bg-gray-900/95 rounded-2xl z-30">
      <div className="text-center p-8">
        <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8 text-green-500" />
        </div>
        <h3 className="text-2xl font-bold mb-2">Call Scheduled!</h3>
        <p className="text-gray-300 mb-4">
          Thank you for scheduling a call. We'll be in touch shortly to confirm your appointment.
        </p>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/90 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Popup content */}
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="relative p-8 rounded-2xl bg-gradient-to-b from-[#0f1629]/80 to-[#0a0a1f]/80 backdrop-blur-sm overflow-hidden">
          {/* Animated gradient border */}
          <div className="absolute inset-0 rounded-2xl border border-purple-500/30" />
          <div className="absolute inset-0 rounded-2xl opacity-50">
            <div className="absolute inset-0 rounded-2xl border border-purple-500 shadow-[0_0_15px_rgba(147,51,234,0.3)]" />
          </div>

          {/* Energy wave effects */}
          <div className="absolute inset-0 overflow-hidden rounded-2xl">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(147,51,234,0.05),transparent_80%)] animate-[energyFlow_30s_ease-in-out_infinite]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.05),transparent_80%)] animate-[energyFlow_40s_ease-in-out_infinite_reverse]" />
          </div>

          <div className="relative">
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white transition-colors z-10"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Success message overlay */}
            {submitSuccess && <SuccessMessage />}

            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4 flex items-center justify-center gap-2">
                <Phone className="text-purple-400" /> Schedule a Call
              </h2>
              <p className="text-gray-300 max-w-3xl mx-auto">
                Let's discuss your needs and explore how our solutions can benefit your company. 
                There are no strings attached, and scheduling a call is completely non-binding.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-8">
              {/* Personal Information */}
              <div className="relative p-8 rounded-2xl bg-gradient-to-b from-[#0f1629]/80 to-[#0a0a1f]/80 backdrop-blur-sm overflow-hidden border-2 border-[#2A0A29]">
                {/* Gradient border */}
                <div className="absolute inset-0 rounded-2xl border border-purple-500/30" />
                <div className="absolute inset-0 rounded-2xl opacity-50">
                  <div className="absolute inset-0 rounded-2xl border border-purple-500 shadow-[0_0_15px_rgba(147,51,234,0.3)]" />
                </div>

                <div className="relative space-y-6">
                  <h3 className="text-xl font-semibold mb-4">Your Information</h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    {/* First Name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        First Name *
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className={`w-full pl-10 pr-4 py-3 rounded-lg bg-gray-900/50 border ${
                            formErrors.firstName ? 'border-red-500' : 'border-gray-700'
                          } focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all`}
                          placeholder="John"
                        />
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      </div>
                      {formErrors.firstName && (
                        <p className="text-red-500 text-sm mt-1">{formErrors.firstName}</p>
                      )}
                    </div>
                    
                    {/* Last Name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Last Name *
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className={`w-full pl-10 pr-4 py-3 rounded-lg bg-gray-900/50 border ${
                            formErrors.lastName ? 'border-red-500' : 'border-gray-700'
                          } focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all`}
                          placeholder="Doe"
                        />
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      </div>
                      {formErrors.lastName && (
                        <p className="text-red-500 text-sm mt-1">{formErrors.lastName}</p>
                      )}
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full pl-10 pr-4 py-3 rounded-lg bg-gray-900/50 border ${
                          formErrors.email ? 'border-red-500' : 'border-gray-700'
                        } focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all`}
                        placeholder="john.doe@example.com"
                      />
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                    {formErrors.email && (
                      <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
                    )}
                  </div>

                  {/* Company */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Company Name (Optional)
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-900/50 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                        placeholder="Your Company"
                      />
                      <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Phone Number (Optional)
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-900/50 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                        placeholder="+1 (555) 123-4567"
                      />
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Call Details */}
              <div className="relative p-8 rounded-2xl bg-gradient-to-b from-[#0f1629]/80 to-[#0a0a1f]/80 backdrop-blur-sm overflow-hidden border-2 border-[#2A0A29]">
                {/* Gradient border */}
                <div className="absolute inset-0 rounded-2xl border border-purple-500/30" />
                <div className="absolute inset-0 rounded-2xl opacity-50">
                  <div className="absolute inset-0 rounded-2xl border border-purple-500 shadow-[0_0_15px_rgba(147,51,234,0.3)]" />
                </div>

                <div className="relative space-y-6">
                  <h3 className="text-xl font-semibold mb-4">Call Details</h3>
                  
                  {/* Solution Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Which solution are you interested in? *
                    </label>
                    <select
                      name="solution"
                      value={formData.solution}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-lg bg-gray-900/50 border ${
                        formErrors.solution ? 'border-red-500' : 'border-gray-700'
                      } focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all`}
                    >
                      <option value="">Select a solution</option>
                      {solutionsData.map(solution => (
                        <option key={solution.id} value={solution.id}>
                          {solution.title}
                        </option>
                      ))}
                      <option value="custom">Custom Solution</option>
                    </select>
                    {formErrors.solution && (
                      <p className="text-red-500 text-sm mt-1">{formErrors.solution}</p>
                    )}
                  </div>
                  
                  {/* Date Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Preferred Date *
                    </label>
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => {
                          setShowCalendar(!showCalendar);
                          setShowTimeSlots(false);
                        }}
                        className={`w-full px-4 py-3 rounded-lg bg-gray-900/50 border ${
                          formErrors.date ? 'border-red-500' : 'border-gray-700'
                        } focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all text-left flex items-center`}
                      >
                        <CalendarIcon className="w-5 h-5 text-gray-400 mr-2" />
                        {formData.date 
                          ? new Date(formData.date).toLocaleDateString('en-US', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })
                          : 'Select a date'}
                      </button>
                      
                      {showCalendar && renderCalendar()}
                    </div>
                    {formErrors.date && (
                      <p className="text-red-500 text-sm mt-1">{formErrors.date}</p>
                    )}
                  </div>
                  
                  {/* Time Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Preferred Time *
                    </label>
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => {
                          setShowTimeSlots(!showTimeSlots);
                          setShowCalendar(false);
                        }}
                        className={`w-full px-4 py-3 rounded-lg bg-gray-900/50 border ${
                          formErrors.time ? 'border-red-500' : 'border-gray-700'
                        } focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all text-left flex items-center`}
                        disabled={!formData.date}
                      >
                        <Clock className="w-5 h-5 text-gray-400 mr-2" />
                        {formData.time ? `${formData.time} (GMT+1)` : 'Select a time'}
                      </button>
                      
                      {showTimeSlots && renderTimeSlots()}
                    </div>
                    {formErrors.time && (
                      <p className="text-red-500 text-sm mt-1">{formErrors.time}</p>
                    )}
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 flex items-center justify-center gap-2 mt-8 ${
                      isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                  >
                    {isSubmitting ? 'Scheduling...' : 'Schedule Call'}
                    <ArrowRight className="w-5 h-5" />
                  </button>
                  
                  <p className="text-gray-400 text-sm text-center">
                    No strings attached. Scheduling a call is completely non-binding.
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}