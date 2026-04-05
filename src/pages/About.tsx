import { Award, Users, Heart, Target, CheckCircle, Activity, Stethoscope } from 'lucide-react';

export default function About() {
  const values = [
    {
      icon: Heart,
      title: 'Patient-Centered Care',
      description: 'Your health and well-being are at the heart of everything we do',
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'We maintain the highest standards in cardiology practice',
    },
    {
      icon: Users,
      title: 'Collaboration',
      description: 'We work together to provide comprehensive cardiovascular care',
    },
    {
      icon: Target,
      title: 'Prevention',
      description: 'We emphasize prevention strategies for long-term health',
    },
  ];

  return (
    <div className="w-full">
      <section className="bg-gradient-to-r from-red-600 to-red-700 text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">About Amazing Heart Centre</h1>
          <p className="text-lg text-red-50">
            Leading provider of comprehensive cardiovascular care and disease
            prevention
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Founded with a mission to provide exceptional cardiovascular care
                to our community, Amazing Heart Centre has been a trusted name in
                heart health for over 10 years. Our team of experienced
                cardiologists and healthcare professionals are dedicated to
                delivering compassionate, evidence-based care.
              </p>
              <p className="text-gray-700 mb-4 leading-relaxed">
                We believe that everyone deserves access to world-class
                cardiovascular care. Whether you're managing a chronic condition,
                recovering from an acute event, or taking preventive measures, we
                provide personalized care tailored to your unique needs.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Our commitment extends beyond treatment to include patient
                education, lifestyle modification support, and community outreach
                programs to promote heart health awareness.
              </p>
            </div>
            <div className="bg-gradient-to-br from-red-100 to-red-50 p-8 rounded-lg">
              <div className="space-y-6">
                <div>
                  <p className="text-2xl font-bold text-red-600 mb-2">A Team of</p>
                  <p className="text-gray-700 font-medium">
                    Expert Cardiologists
                  </p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-red-600 mb-2">5000+</p>
                  <p className="text-gray-700 font-medium">
                    Satisfied Patients
                  </p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-red-600 mb-2">98%</p>
                  <p className="text-gray-700 font-medium">
                    Patient Satisfaction Rate
                  </p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-red-600 mb-2">Mon-Sat</p>
                  <p className="text-gray-700 font-medium">
                    8 AM - 6 PM Services
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <Activity className="w-8 h-8 text-red-600" />
            <h2 className="text-3xl font-bold text-gray-900">
              The Conditions We Treat
            </h2>
          </div>
          <div className="bg-gradient-to-br from-red-50 to-white p-8 rounded-lg border border-red-100">
            <p className="text-gray-700 leading-relaxed text-lg">
              We treat numerous Cardiovascular diseases and risk factors such as <span className="font-semibold text-gray-900">Hypertension</span> and its related complications, <span className="font-semibold text-gray-900">dyslipidaemia</span>, <span className="font-semibold text-gray-900">ischemic heart disease</span>, <span className="font-semibold text-gray-900">myocardial infarctions</span>, heart muscle diseases like <span className="font-semibold text-gray-900">dilated cardiomyopathy</span>, <span className="font-semibold text-gray-900">hypertrophic cardiomyopathy</span>; <span className="font-semibold text-gray-900">pericardial diseases</span> and more.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <Stethoscope className="w-8 h-8 text-red-600" />
            <h2 className="text-3xl font-bold text-gray-900">
              Services We Render
            </h2>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md">
            <p className="text-gray-700 leading-relaxed text-lg">
              We also collaborate with a multidisciplinary team of specialists—including <span className="font-semibold text-gray-900">Cardiothoracic surgeon</span>, <span className="font-semibold text-gray-900">Endocrinologists</span>, <span className="font-semibold text-gray-900">Neurologists</span>, <span className="font-semibold text-gray-900">Urologists</span>, <span className="font-semibold text-gray-900">Nephrologists</span>, <span className="font-semibold text-gray-900">Gastroenterologists</span> and <span className="font-semibold text-gray-900">Rheumatologists</span>—to provide comprehensive care for patients requiring expert input across these specialties.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                  <IconComponent className="w-12 h-12 text-red-600 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {value.title}
                  </h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Our Commitment to Excellence
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              'Continuously updated with latest cardiology research and techniques',
              'State-of-the-art diagnostic and treatment equipment',
              'Certified and accredited healthcare professionals',
              'Comprehensive follow-up and long-term care management',
              'Community education and preventive health programs',
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-gray-700">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
