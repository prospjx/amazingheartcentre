import {
  Heart,
  Users,
  BookOpen,
  ArrowRight,
  CheckCircle,
  Activity,
} from 'lucide-react';
import { Page } from '../App';

interface HomeProps {
  setCurrentPage?: (page: Page) => void;
}

export default function Home({ setCurrentPage }: HomeProps) {
  const services = [
    {
      icon: Heart,
      title: 'Heart Disease Management',
      description:
        'Comprehensive management of ischemic heart disease and myocardial infarction',
    },
    {
      icon: Activity,
      title: 'Heart Failure Treatment',
      description: 'Expert care for heart failure and heart muscle diseases',
    },
    {
      icon: CheckCircle,
      title: 'Hypertension Control',
      description:
        'Specialized management of high blood pressure and cardiovascular risk',
    },
    {
      icon: Users,
      title: 'Preventive Cardiology',
      description:
        'Risk factor assessment and prevention strategies for long-term health',
    },
    {
      icon: BookOpen,
      title: 'Diabetes Management',
      description: 'Integrated care for diabetic cardiovascular complications',
    },
    {
      icon: Heart,
      title: 'Virtual Consultations',
      description: 'Access expert cardiology care from the comfort of your home',
    },
  ];

  const stats = [
    { number: 'A Team of', label: 'Expert Cardiologists' },
    { number: '5000+', label: 'Patients Served' },
    { number: '98%', label: 'Patient Satisfaction' },
  ];

  return (
    <div className="w-full">
      <section className="relative bg-gradient-to-r from-red-600 to-red-700 text-white py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">
                Your Heart's Health is Our Priority
              </h1>
              <p className="text-lg text-red-50 mb-8">
                Expert cardiovascular care, prevention services, and support for a
                healthier heart. Whether you're managing a condition or taking
                preventive steps, we're here for you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setCurrentPage?.('appointments')}
                  className="px-6 py-3 bg-white text-red-600 font-semibold rounded-lg hover:bg-red-50 transition-colors flex items-center justify-center gap-2"
                >
                  Book Appointment
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setCurrentPage?.('resources')}
                  className="px-6 py-3 bg-red-800 text-white font-semibold rounded-lg hover:bg-red-900 transition-colors"
                >
                  Learn About Heart Health
                </button>
              </div>
            </div>
            <div className="hidden md:flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-red-400 rounded-full opacity-20 blur-3xl"></div>
                <img
                  src="/amazing_heart_logo.jpeg"
                  alt="Amazing Heart Centre"
                  className="w-64 h-64 object-contain relative z-10 rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className={`${index === 0 ? 'text-2xl' : 'text-4xl'} font-bold text-red-600 mb-2`}>
                  {stat.number}
                </p>
                <p className="text-gray-600 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Services
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Comprehensive cardiovascular care tailored to your individual needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <div
                  key={index}
                  className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-100"
                >
                  <IconComponent className="w-12 h-12 text-red-600 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => setCurrentPage?.('services')}
              className="px-8 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors inline-flex items-center gap-2"
            >
              View All Services
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Why Choose Us?
              </h2>
              <ul className="space-y-4">
                {[
                  'Experienced Cardiologists on standby',
                  'Monday to Saturday, 8:00 AM - 6:00 PM appointments',
                  'State-of-the-art diagnostic equipment',
                  'Personalized treatment plans based on individual needs',
                  'Comprehensive patient education and preventive care',
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Our Area of Expertise
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Hypertension (High Blood Pressure)</li>
                <li>• Ischemic Heart Disease</li>
                <li>• Myocardial Infarction (Heart Attack)</li>
                <li>• Heart Failure</li>
                <li>• Diabetes and Cardiovascular Complications</li>
                <li>• Arrhythmias</li>
                <li>• Heart Murmurs</li>
                <li>• Cardiovascular Risk Assessment</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-red-600 text-white rounded-lg p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Take Control?</h2>
            <p className="text-lg text-red-50 mb-8 max-w-2xl mx-auto">
              Schedule your appointment today and let our expert team help you
              achieve optimal heart health.
            </p>
            <button
              onClick={() => setCurrentPage?.('appointments')}
              className="px-8 py-3 bg-white text-red-600 font-semibold rounded-lg hover:bg-red-50 transition-colors inline-flex items-center gap-2"
            >
              Book Your Appointment
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
