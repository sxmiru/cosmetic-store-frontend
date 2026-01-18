import { ShoppingBag, Sparkles, Heart, Star } from 'lucide-react';
import Footer from '../components/footer';
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                Elevate Your Natural Beauty
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                Discover our curated collection of premium cosmetics designed to enhance your unique glow. Quality ingredients, stunning results.
              </p>
              <div className="flex gap-4">
                <Link to="/products" className="px-8 py-3 bg-accent text-white rounded-full font-semibold transition hover:opacity-90 shadow-lg hover:shadow-xl">
                  Shop Now
                </Link>
                <Link to="/about-us" className="px-8 py-3 border-2 border-accent text-accent rounded-full font-semibold transition hover:bg-gray-50">
                  Learn More
                </Link>
              </div>
            </div>
            <div className="relative h-96 md:h-[400px] rounded-2xl overflow-hidden bg-gray-100">
              <img 
                src="CBC-cosmetic-store.jpg" 
                alt="Store Image" 
                className="w-full h-full object-cover" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center bg-accent-light">
                <Heart className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Cruelty-Free</h3>
              <p className="text-gray-600">All our products are ethically sourced and never tested on animals.</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center bg-accent-light">
                <Sparkles className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Premium Quality</h3>
              <p className="text-gray-600">Carefully selected ingredients for exceptional performance.</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center bg-accent-light">
                <Star className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Customer Favorite</h3>
              <p className="text-gray-600">Trusted by thousands of satisfied customers worldwide.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-accent">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Join Our Beauty Community</h2>
          <p className="text-lg mb-8 opacity-90">Subscribe to get exclusive offers and beauty tips delivered to your inbox.</p>
          <div className="flex gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-3 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="px-8 py-3 bg-white text-accent rounded-full font-semibold transition hover:bg-gray-100">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}