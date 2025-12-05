import { useState } from 'react'
import { useBookConsultation } from '../hooks/useConsultations'
import { CalendarIcon, ClockIcon } from '@heroicons/react/24/outline'

const Book = () => {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    type: 'Initial Consultation',
    notes: '',
  })
  const [errors, setErrors] = useState({})

  const { mutate: bookConsultation, isLoading } = useBookConsultation()

  const consultationTypes = [
    'Initial Consultation',
    'Follow-up',
    'Nutrition Plan Review',
    'Weight Management',
    'Sports Nutrition',
    'Other',
  ]

  const validateForm = () => {
    const newErrors = {}

    if (!formData.date) {
      newErrors.date = 'Date is required'
    } else {
      const selectedDate = new Date(formData.date)
      if (selectedDate < new Date()) {
        newErrors.date = 'Date must be in the future'
      }
    }

    if (!formData.time) {
      newErrors.time = 'Time is required'
    }

    if (!formData.type) {
      newErrors.type = 'Consultation type is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    // Combine date and time into ISO string
    const dateTime = new Date(`${formData.date}T${formData.time}`)

    bookConsultation({
      date: dateTime.toISOString(),
      type: formData.type,
      notes: formData.notes,
    }, {
      onSuccess: () => {
        // Reset form
        setFormData({
          date: '',
          time: '',
          type: 'Initial Consultation',
          notes: '',
        })
      },
    })
  }

  // Get minimum date (tomorrow)
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const minDate = tomorrow.toISOString().split('T')[0]

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Book a Consultation</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Schedule a session with our expert dieticians
        </p>
      </div>

      {/* Info Cards */}
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        <div className="card bg-primary-50 dark:bg-primary-900/20 border-primary-200 dark:border-primary-800">
          <h3 className="font-semibold mb-2">What to Expect</h3>
          <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-400">
            <li>• Personalized nutrition assessment</li>
            <li>• Customized meal planning</li>
            <li>• Goal setting and tracking</li>
            <li>• Ongoing support and guidance</li>
          </ul>
        </div>

        <div className="card bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
          <h3 className="font-semibold mb-2">Session Details</h3>
          <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-400">
            <li>• Duration: 45-60 minutes</li>
            <li>• Video or phone consultation</li>
            <li>• Follow-up materials included</li>
            <li>• Flexible rescheduling</li>
          </ul>
        </div>
      </div>

      {/* Booking Form */}
      <div className="card">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Consultation Type */}
          <div>
            <label htmlFor="type" className="block text-sm font-medium mb-2">
              Consultation Type
            </label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              className={`input ${errors.type ? 'border-red-500' : ''}`}
            >
              {consultationTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            {errors.type && (
              <p className="text-red-500 text-sm mt-1">{errors.type}</p>
            )}
          </div>

          {/* Date */}
          <div>
            <label htmlFor="date" className="block text-sm font-medium mb-2">
              Preferred Date
            </label>
            <div className="relative">
              <input
                id="date"
                name="date"
                type="date"
                min={minDate}
                value={formData.date}
                onChange={handleChange}
                className={`input pl-10 ${errors.date ? 'border-red-500' : ''}`}
              />
              <CalendarIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
            {errors.date && (
              <p className="text-red-500 text-sm mt-1">{errors.date}</p>
            )}
          </div>

          {/* Time */}
          <div>
            <label htmlFor="time" className="block text-sm font-medium mb-2">
              Preferred Time
            </label>
            <div className="relative">
              <input
                id="time"
                name="time"
                type="time"
                value={formData.time}
                onChange={handleChange}
                className={`input pl-10 ${errors.time ? 'border-red-500' : ''}`}
              />
              <ClockIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
            {errors.time && (
              <p className="text-red-500 text-sm mt-1">{errors.time}</p>
            )}
          </div>

          {/* Notes */}
          <div>
            <label htmlFor="notes" className="block text-sm font-medium mb-2">
              Additional Notes (Optional)
            </label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows="4"
              maxLength="500"
              placeholder="Tell us about your goals, dietary restrictions, or any specific concerns..."
              className="input"
            />
            <p className="text-sm text-gray-500 mt-1">
              {formData.notes.length}/500 characters
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="btn btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Booking...' : 'Book Consultation'}
          </button>
        </form>
      </div>

      {/* Help Text */}
      <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          <strong>Note:</strong> Your consultation request will be reviewed by our team. 
          You'll receive a confirmation email within 24 hours with meeting details.
        </p>
      </div>
    </div>
  )
}

export default Book
