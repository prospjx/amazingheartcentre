import { Youtube, ExternalLink } from 'lucide-react';
import { Page } from '../App';

interface ResourcesProps {
  setCurrentPage?: (page: Page) => void;
}

export default function Resources({ setCurrentPage }: ResourcesProps) {
  const featuredVideos = [
    { id: 'ZAgZ3cjt2To', title: 'Heart Health Episode 1' },
    { id: 'OpAPr9-vfgU', title: 'Heart Health Episode 2' },
    { id: 'bUC4SMKdqOI', title: 'Heart Health Episode 3' },
    { id: 'RpikrRnEzXQ', title: 'Heart Health Episode 4' },
  ];

  return (
    <div className="w-full">
      <section className="bg-gradient-to-r from-red-600 to-red-700 text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <Youtube className="w-10 h-10" />
            <h1 className="text-4xl font-bold">An Hour with the Cardiologist</h1>
          </div>
          <p className="text-lg text-red-50">
            Trusted heart health information from experienced cardiologists
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-md p-8 mb-12">
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>An Hour with the Cardiologist</strong> is the official YouTube channel of Amazing Heart Centre, created to bring trusted heart health information directly to you—clearly, compassionately, and credibly.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Hosted by experienced cardiologists, the channel features in-depth yet easy-to-understand discussions on a wide range of cardiovascular topics. From common heart conditions and preventive care to the latest advances in cardiology, each episode is designed to empower viewers with accurate medical knowledge and practical guidance.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Whether you are a patient, a caregiver, or simply someone interested in maintaining a healthy heart, <strong>An Hour with the Cardiologist</strong> offers a reliable space to learn, ask questions, and stay informed. Our goal is to bridge the gap between clinical expertise and everyday understanding, helping you make confident decisions about your heart health.
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              Subscribe and join us as we take meaningful conversations about the heart beyond the clinic—<strong>one hour once a month</strong>.
            </p>

            <a
              href="https://www.youtube.com/@AMAZINGHEARTCENTREAHC"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
            >
              <Youtube className="w-5 h-5" />
              Visit Our YouTube Channel
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Featured Episodes</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {featuredVideos.map((video, index) => (
              <div key={video.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="aspect-video">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${video.id}?rel=0&modestbranding=1`}
                    title={video.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    loading="lazy"
                    className="w-full h-full"
                  ></iframe>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <a
              href="https://www.youtube.com/@AMAZINGHEARTCENTREAHC"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-red-600 font-semibold hover:text-red-700 transition-colors"
            >
              View All Episodes on YouTube
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-1 gap-8 max-w-md mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                Emergency Help
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                For cardiac emergencies, contact our emergency hotline immediately
              </p>
              <p className="text-red-600 font-bold">24/7 Emergency Line</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
