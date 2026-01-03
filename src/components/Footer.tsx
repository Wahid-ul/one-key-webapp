const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">One Key Now</h3>
            <p className="text-gray-300 text-sm">
              Your one-stop solution for all government and utility services.
              Making paperwork simple and efficient.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/aadhaar" className="text-gray-300 hover:text-white transition">Aadhaar Services</a></li>
              <li><a href="/pan" className="text-gray-300 hover:text-white transition">PAN Card Services</a></li>
              <li><a href="/online" className="text-gray-300 hover:text-white transition">Online Services</a></li>
              <li><a href="/documents" className="text-gray-300 hover:text-white transition">Document Services</a></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/about" className="text-gray-300 hover:text-white transition">About Us</a></li>
              <li><a href="/contact" className="text-gray-300 hover:text-white transition">Contact</a></li>
              <li><a href="/privacy" className="text-gray-300 hover:text-white transition">Privacy Policy</a></li>
              <li><a href="/terms" className="text-gray-300 hover:text-white transition">Terms of Service</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <div className="space-y-2 text-sm text-gray-300">
              <p>📧 info@onekeynow.com</p>
              <p>📞 +91 12345 67890</p>
              <p>📍 Mumbai, India</p>
            </div>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-300 hover:text-white transition">📘</a>
              <a href="#" className="text-gray-300 hover:text-white transition">🐦</a>
              <a href="#" className="text-gray-300 hover:text-white transition">📷</a>
              <a href="#" className="text-gray-300 hover:text-white transition">💼</a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-300 text-sm">
            © 2026 One Key Now. All rights reserved. | Designed with ❤️ for efficient services.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;