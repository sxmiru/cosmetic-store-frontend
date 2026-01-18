import { Heart, Award, Leaf, Shield } from 'lucide-react';
import Footer from '../../components/footer';
import {Link} from 'react-router-dom';

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-white">
      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-accent/10">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Our Story
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Empowering beauty through quality, ethics and innovation since our founding.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-96 rounded-2xl overflow-hidden bg-gray-100">
              <img src="/cosmetic.jpg" alt="Our Mission" className="w-full h-full object-cover" />
            </div>
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-gray-900">Our Mission</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                At CBC Cosmetics, we believe beauty should be accessible, ethical and transformative. Our mission is to create premium cosmetic products that enhance your natural beauty while respecting our planet and all its inhabitants.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Every product we create is crafted with care, using the finest ingredients sourced responsibly. We're committed to cruelty-free practices and sustainable beauty solutions that make you look and feel amazing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="w-16 h-16 mb-4 rounded-full flex items-center justify-center bg-accent-light">
                <Heart className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-2xl font-semibold mb-3">Cruelty-Free</h3>
              <p className="text-gray-600 leading-relaxed">
                We never test on animals and ensure all our suppliers follow the same ethical standards. Beauty should never come at the cost of animal welfare.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="w-16 h-16 mb-4 rounded-full flex items-center justify-center bg-accent-light">
                <Leaf className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-2xl font-semibold mb-3">Sustainable</h3>
              <p className="text-gray-600 leading-relaxed">
                From eco-friendly packaging to sustainable sourcing, we're committed to reducing our environmental footprint and protecting our planet.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="w-16 h-16 mb-4 rounded-full flex items-center justify-center bg-accent-light">
                <Award className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-2xl font-semibold mb-3">Quality First</h3>
              <p className="text-gray-600 leading-relaxed">
                We use only premium ingredients and rigorous testing to ensure every product meets our high standards of excellence and performance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Commitment Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center bg-accent-light">
            <Shield className="w-10 h-10 text-accent" />
          </div>
          <h2 className="text-4xl font-bold mb-6">Our Commitment to You</h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-8">
            We promise to always prioritize quality, transparency, and your satisfaction. Every product comes with our guarantee of excellence, and we're always here to support you on your beauty journey.
          </p>
          <Link to="/products" className="px-8 py-3 bg-accent text-white rounded-full font-semibold transition hover:opacity-90 shadow-lg hover:shadow-xl">
            Shop Our Products
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}