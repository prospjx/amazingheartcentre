import { useState } from 'react';
import { Calendar, Clock, User, Mail, Phone, Stethoscope, Send } from 'lucide-react';
import {
  isSupabaseConfigured,
  insertAppointmentRequest,
  sendAppointmentNotification,
} from '../lib/supabase';

type SupabaseLikeError = {
  code?: string;
  message?: string;
};

const getBookingErrorMessage = (error: unknown): string => {
  const supabaseError = error as SupabaseLikeError;
  const message = (supabaseError?.message || '').toLowerCase();

  if (!isSupabaseConfigured) {
    return 'Booking is not configured yet. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your environment variables.';
  }

  if (supabaseError?.code === 'PGRST205' || message.includes('relation') && message.includes('appointments')) {
    return 'Appointments table was not found. Run your Supabase migrations and try again.';
  }

  if (message.includes('row-level security') || message.includes('permission denied')) {
    return 'Booking is currently blocked by database permissions. Verify your RLS INSERT policy for appointments.';
  }

  if (message.includes('failed to fetch') || message.includes('network')) {
    return 'Could not reach the booking service. Check your internet connection and Supabase URL.';
  }

  return 'Failed to book appointment. Please try again.';
};

export default function Appointments() {
  const [formData, setFormData] = useState({
    patient_name: '',
    patient_email: '',
    patient_phone: '',
    appointment_date: '',
    appointment_time: '',
    service_type: '',
    symptoms: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [submitError, setSubmitError] = useState('');

  const serviceTypes = [
    'Initial Consultation',
    'Follow-up Visit',
    'Hypertension Management',
    'Heart Failure Follow-up',
    'Post-MI (Heart Attack) Care',
    'Preventive Screening',
    'Diagnostic Testing',
    'Other',
  ];

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');
    setSubmitError('');

    if (!isSupabaseConfigured) {
      setSubmitError(getBookingErrorMessage(null));
      setIsSubmitting(false);
      return;
    }

    try {
      await insertAppointmentRequest({
        ...formData,
        status: 'pending',
      });

		await sendAppointmentNotification(formData).catch((notificationError) => {
			console.error('Error sending appointment notification:', notificationError);
		});

      setSubmitMessage(
        'Appointment request submitted successfully! Our team will review and confirm your appointment within 24 hours. Check your email for confirmation.'
      );
      setFormData({
        patient_name: '',
        patient_email: '',
        patient_phone: '',
        appointment_date: '',
        appointment_time: '',
        service_type: '',
        symptoms: '',
      });
      setTimeout(() => setSubmitMessage(''), 5000);
    } catch (error) {
      setSubmitError(getBookingErrorMessage(error));
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getMinDate = () => {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    let date = new Date(today);

    while (date.getDay() === 0) {
      date.setDate(date.getDate() + 1);
    }

    return date.toISOString().split('T')[0];
  };

  const getMaxDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 90);
    return date.toISOString().split('T')[0];
  };

  const isValidBookingDate = (dateString: string): boolean => {
    if (!dateString) return false;
    const date = new Date(dateString + 'T00:00:00');
    const dayOfWeek = date.getDay();
    return dayOfWeek !== 0;
  };

  return (
    <div className="w-full">
      <section className="bg-gradient-to-r from-red-600 to-red-700 text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Book an Appointment</h1>
          <p className="text-lg text-red-50">
            Schedule a consultation with our expert cardiologists
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                        <User className="w-4 h-4" />
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="patient_name"
                        value={formData.patient_name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        Email
                      </label>
                      <input
                        type="email"
                        name="patient_email"
                        value={formData.patient_email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="patient_phone"
                      value={formData.patient_phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="(555) 123-4567"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Preferred Date
                      </label>
                      <input
                        type="date"
                        name="appointment_date"
                        value={formData.appointment_date}
                        onChange={handleChange}
                        required
                        min={getMinDate()}
                        max={getMaxDate()}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Mon-Sat only (Sunday closed)
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        Preferred Time
                      </label>
                      <input
                        type="time"
                        name="appointment_time"
                        value={formData.appointment_time}
                        onChange={handleChange}
                        required
                        min="08:00"
                        max="18:00"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        8:00 AM - 6:00 PM
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                      <Stethoscope className="w-4 h-4" />
                      Type of Appointment
                    </label>
                    <select
                      name="service_type"
                      value={formData.service_type}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    >
                      <option value="">Select appointment type...</option>
                      {serviceTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Symptoms or Concerns (Optional)
                    </label>
                    <textarea
                      name="symptoms"
                      value={formData.symptoms}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                      placeholder="Please describe any symptoms or concerns you have..."
                    ></textarea>
                  </div>

                  {submitMessage && (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
                      {submitMessage}
                    </div>
                  )}

                  {submitError && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                      {submitError}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    <Send className="w-5 h-5" />
                    {isSubmitting ? 'Booking...' : 'Request Appointment'}
                  </button>
                </form>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-red-50 rounded-lg p-6 border border-red-200">
                <h3 className="font-bold text-gray-900 mb-4">Appointment Info</h3>
                <ul className="space-y-3 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-bold">•</span>
                    <span>Operating Hours: Mon-Sat, 8:00 AM - 6:00 PM (Closed Sundays)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-bold">•</span>
                    <span>Appointments must be manually approved by our team</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-bold">•</span>
                    <span>
                      Confirmation will be sent within 24 hours via email
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-bold">•</span>
                    <span>Cancellations must be made 24 hours in advance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-bold">•</span>
                    <span>
                      Please arrive 15 minutes before your appointment
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                <h3 className="font-bold text-gray-900 mb-4">What to Bring</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-center gap-2">
                    <span className="text-blue-600 font-bold">✓</span>
                    Photo ID
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-blue-600 font-bold">✓</span>
                    Current medications list
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-blue-600 font-bold">✓</span>
                    Recent test results
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-4">Need Help?</h3>
                <p className="text-sm text-gray-700 mb-4">
                  Call us directly to discuss your appointment needs:
                </p>
                <p className="text-lg font-bold text-red-600">
                  (+234) 081 8627 2417
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
