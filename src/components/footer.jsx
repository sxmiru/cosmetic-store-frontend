import { Sparkles } from "lucide-react";

export default function Footer() {
    return(
        <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-6 h-6" style={{ color: '#F25912' }} />
            <span className="text-2xl font-bold">CBC Cosmetics</span>
          </div>
          <p className="text-gray-400 mb-6">Elevating beauty, one product at a time.</p>
          <div className="flex justify-center gap-6 text-gray-400">
            <a href="#" className="hover:text-white transition">Privacy Policy</a>
            <a href="#" className="hover:text-white transition">Terms of Service</a>
            <a href="#" className="hover:text-white transition">Contact Us</a>
          </div>
          <p className="text-gray-500 mt-8 text-sm">© 2026 CBC Cosmetics. All rights reserved.</p>
        </div>
      </footer>
    );
}