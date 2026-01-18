import { Mail, Phone, MapPin, Clock, MessageSquare } from 'lucide-react';
import Footer from '../../components/footer';

export default function ContactUs() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-accent/10">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Get in Touch
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We're here to help you with any questions about our products or services. Reach out to us anytime!
          </p>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Contact Information</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Have a question about our products or need assistance? Our team is here to help you.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-8 rounded-2xl">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 bg-accent-light">
                  <Mail className="w-7 h-7 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-xl mb-2">Email Us</h3>
                  <p className="text-gray-600 mb-1">support@cbccosmetics.com</p>
                  <p className="text-gray-600">sales@cbccosmetics.com</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-8 rounded-2xl">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 bg-accent-light">
                  <Phone className="w-7 h-7 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-xl mb-2">Call Us</h3>
                  <p className="text-gray-600 mb-1">+94 76-123-4567</p>
                  <p className="text-gray-600">Mon-Fri, 9am-6pm</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-8 rounded-2xl">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 bg-accent-light">
                  <MapPin className="w-7 h-7 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-xl mb-2">Visit Us</h3>
                  <p className="text-gray-600 mb-1">No. 128, Lotus Avenue,</p>
                  <p className="text-gray-600">Colombo 05, Sri Lanka</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-8 rounded-2xl">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 bg-accent-light">
                  <Clock className="w-7 h-7 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-xl mb-2">Business Hours</h3>
                  <p className="text-gray-600 mb-1">Monday - Friday: 9am - 6pm</p>
                  <p className="text-gray-600 mb-1">Saturday: 10am - 4pm</p>
                  <p className="text-gray-600">Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-8">Find Us</h2>
          
          <div className="h-96 rounded-2xl overflow-hidden shadow-xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.6118312394966!2d80.6358017!3d7.2932328!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae3662bf4dc596b%3A0x241ec0705b249640!2sQueens%20Hotel!5e0!3m2!1sen!2slk!4v1706784534132"
              className="w-full h-full"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="CBC Cosmetic Location Map"
            />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600">
              Quick answers to common questions about CBC Cosmetics
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-accent" />
                What is your return policy?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                We offer a 30-day money-back guarantee on all products. If you're not completely satisfied, you can return unused items for a full refund.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-accent" />
                How long does shipping take?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Standard shipping typically takes 3-5 business days. Express shipping options are available for 1-2 day delivery.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-accent" />
                Are your products cruelty-free?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Yes! All CBC Cosmetics products are 100% cruelty-free. We never test on animals and work only with suppliers who share our ethical standards.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-accent" />
                Do you offer international shipping?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Yes, we ship to most countries worldwide. Shipping costs and delivery times vary by location. Check our shipping page for specific details.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}