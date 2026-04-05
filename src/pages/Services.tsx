import { Heart, Activity, CheckCircle, Stethoscope, Shield, Users } from 'lucide-react';

export default function Services() {
  const serviceCategories = [
    {
      icon: Heart,
      title: 'Heart Disease Management',
      description:
        'Comprehensive diagnosis and treatment of ischemic heart disease and related conditions',
      details: [
        'Coronary artery disease evaluation',
        'Myocardial infarction management',
        'Post-heart attack rehabilitation',
        'Preventive coronary interventions',
      ],
    },
    {
      icon: Activity,
      title: 'Heart Failure Treatment',
      description:
        'Specialized care for acute and chronic heart failure conditions',
      details: [
        'Heart failure assessment and monitoring',
        'Medication optimization',
        'Device therapy (pacemakers, defibrillators)',
        'Lifestyle and dietary counseling',
      ],
    },
    {
      icon: CheckCircle,
      title: 'Hypertension Management',
      description:
        'Expert management of high blood pressure and related cardiovascular risks',
      details: [
        'Blood pressure monitoring and control',
        'Medication management',
        'Lifestyle modification programs',
        'Risk stratification',
      ],
    },
    {
      icon: Stethoscope,
      title: 'Diagnostic Services',
      description:
        'Advanced cardiac diagnostic procedures using state-of-the-art equipment',
      details: [
        'Echocardiography (2D and 3D)',
        'Stress testing and exercise tolerance evaluation',
        'Holter monitoring',
        'Cardiac CT and imaging',
      ],
    },
    {
      icon: Shield,
      title: 'Preventive Cardiology',
      description:
        'Comprehensive risk assessment and prevention strategies for heart health',
      details: [
        'Cardiovascular risk assessment',
        'Family history evaluation',
        'Lifestyle counseling and support',
        'Community education programs',
      ],
    },
  ];

  const deliveryMethods = [
    {
      title: 'In-Person Consultations',
      description:
        'Direct visits with our cardiologists at our state-of-the-art facility',
    },
    {
      title: 'Virtual Consultations',
      description:
        'Access expert care from the comfort of your home with secure video appointments',
    },
    {
      title: 'Emergency Services',
      description:
        ' 24/7 emergency cardiac care and admission for acute cardiac events',
    },
  ];

  return (
    <div className="w-full">
      <section className="bg-gradient-to-r from-red-600 to-red-700 text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Our Services</h1>
          <p className="text-lg text-red-50">
            Comprehensive cardiovascular care across the full spectrum of heart
            health
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {serviceCategories.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <div
                  key={index}
                  className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-100"
                >
                  <IconComponent className="w-12 h-12 text-red-600 mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <ul className="space-y-2">
                    {service.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                        <CheckCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Our Approach to Care
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {deliveryMethods.map((method, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {method.title}
                </h3>
                <p className="text-gray-600">{method.description}</p>
              </div>
            ))}
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Operating Hours</h3>
            <div className="space-y-2 text-gray-700">
              <p className="text-lg font-semibold">Monday - Saturday: 8:00 AM - 6:00 PM</p>
              <p className="text-sm">Sunday: Closed</p>
              <p className="text-sm mt-4 text-gray-600">One of our expert cardiologists is always available during these hours by appointment</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Our Area of Expertise
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-red-50 to-red-100 p-8 rounded-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Acute Conditions
              </h3>
              <ul className="space-y-3">
                {[
                  'Myocardial Infarction (Heart Attack)',
                  'Acute Heart Failure',
                  'Cardiac Arrhythmias',
                  'Acute Coronary Syndromes',
                  'Cardiac Chest Pain',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-gray-700">
                    <CheckCircle className="w-5 h-5 text-red-600" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Chronic Conditions
              </h3>
              <ul className="space-y-3">
                {[
                  'Hypertension',
                  'Chronic Heart Failure',
                  'Ischemic Heart Disease',
                  'Diabetes with Cardiovascular Involvement',
                  'Hyperlipidemia',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-gray-700">
                    <CheckCircle className="w-5 h-5 text-blue-600" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <Users className="w-8 h-8 text-red-600" />
            <h2 className="text-3xl font-bold text-gray-900">
              Multidisciplinary Collaboration
            </h2>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md">
            <p className="text-gray-700 leading-relaxed text-lg mb-6">
              We also collaborate with a multidisciplinary team of specialists—including <span className="font-semibold text-gray-900">Cardiothoracic surgeon</span>, <span className="font-semibold text-gray-900">Endocrinologists</span>, <span className="font-semibold text-gray-900">Neurologists</span>, <span className="font-semibold text-gray-900">Urologists</span>, <span className="font-semibold text-gray-900">Nephrologists</span>, <span className="font-semibold text-gray-900">Gastroenterologists</span> and <span className="font-semibold text-gray-900">Rheumatologists</span>—to provide comprehensive care for patients requiring expert input across these specialties.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                'Cardiothoracic Surgery',
                'Endocrinology',
                'Neurotology',
                'Urology',
                'Nephrology',
                'Gastroenterology',
                'Rheumatology',
                'And More',
              ].map((specialty, idx) => (
                <div key={idx} className="flex items-center gap-2 bg-gradient-to-r from-red-50 to-blue-50 p-3 rounded-md">
                  <CheckCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
                  <span className="text-sm font-medium text-gray-700">{specialty}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
