import React from "react";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { Phone, Mail, Heart } from "lucide-react";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header>
        {/* Top Bar */}
        <div className="bg-pink-500 text-white py-2 px-4 pl-16">
          <div className="container mx-auto flex flex-wrap justify-between items-center text-sm">
            <div className="flex flex-wrap items-center space-x-16">
              <Link to="/register" className="hover:underline flex items-center gap-2 text-xs sm:text-sm">
                REGISTER AS A PANDIT
              </Link>
              <Link to="/book" className="hover:underline flex items-center gap-2 text-xs sm:text-sm">
                BOOK ONLINE PANDIT JI
              </Link>
            </div>
            <div className="flex flex-wrap items-center space-x-4 mr-12">
              <a href="mailto:info@99panditji.com" className="hover:underline flex items-center gap-2 text-xs sm:text-sm">
                <Mail className="h-4 w-4" />
                satyamsinghal368@gmail.com
              </a>
              <a href="tel:+919045995745" className="hover:underline flex items-center gap-2 text-xs sm:text-sm">
                <Phone className="h-4 w-4" />
                +91-9045995745
              </a>
            </div>
          </div>
        </div>

        {/* Navigation Bar */}
        <nav className="bg-white shadow-lg">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center py-4">
              <Link to="/" className="flex items-center space-x-2">
                <img
                  src="/images/hawanKarao-logo.jpg"
                  alt="Logo"
                  className="h-12 w-auto ml-12"
                />
              </Link>
              <div className="hidden md:flex space-x-8 mr-12">
                <Link to="/" className="text-pink-500 font-medium">HOME</Link>
                <Link to="/about" className="text-gray-700 hover:text-pink-500 font-medium">ABOUT US</Link>
                <Link to="/services" className="text-gray-700 hover:text-pink-500 font-medium">OUR PUJA SERVICES</Link>
                <Link to="/book" className="text-gray-700 hover:text-pink-500 font-medium">BOOK ONLINE PANDIT JI</Link>
                <Link to="/contact" className="text-gray-700 hover:text-pink-500 font-medium">CONTACT US</Link>
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {/* Renders child components */}
        <Outlet />
      </main>

      {/* Footer */}

        <footer className="bg-orange-50 text-black py-8 px-16">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-start space-y-8 md:space-y-0">
            {/* Logo and Title */}
            <div className="flex flex-col items-center md:items-start">
            <div className="text-center">
                <img
                src="/images/hawanKarao-rb2.png" 
                alt="HawanKarao Logo"
                className="mb-4 w-auto size-16"
                />
                <h1 className="text-xl font-semibold">Hawan Karao</h1>
                <p className="text-sm">Online Pandit ji Booking App</p>
            </div>
            </div>

            {/* Quick Links */}
            <div>
            <h2 className="text-lg font-bold mb-4">Quick Links</h2>
            <ul className="space-y-2">
                <li><a href="#" className="hover:underline">Home</a></li>
                <li><a href="#" className="hover:underline">About Us</a></li>
                <li><a href="#" className="hover:underline">Services</a></li>
                <li><a href="#" className="hover:underline">Testimonials</a></li>
                <li><a href="#" className="hover:underline">FAQs</a></li>
                <li><a href="#" className="hover:underline">Contact Us</a></li>
            </ul>
            </div>

            {/* Contact Information */}
            <div>
            <h2 className="text-lg font-bold mb-4">Contact Information</h2>
            <ul className="space-y-2">
                <li>Phone: +91 9045995745</li>
                <li>Email: <a href="mailto:satyamsinghal368@gmail.com" className="hover:underline">satyamsinghal368@gmail.com</a></li>
                <li>Head Office : Whatever is Somya's Address</li>
            </ul>
            </div>

            {/* Customer Care */}
            <div>
            <h2 className="text-lg font-bold mb-4">Customer Care</h2>
            <ul className="space-y-2">
                <li><a href="#" className="hover:underline">Privacy Policy</a></li>
                <li><a href="#" className="hover:underline">Terms & Conditions</a></li>
                <li><a href="#" className="hover:underline">Refund Policy</a></li>
                <li><a href="#" className="hover:underline">Cancellation Policy</a></li>
            </ul>
            </div>
        </div>
        </footer>

        {/* Bottom Bar */}
        <div className="bg-pink-500 text-white py-2 px-4 flex items-center justify-center">
        <p className="flex items-center" >
            @made with <Heart color="#ffffff" size="16px" fill="white" style={{ margin: "0 4px" }} /> by Somya Tiwari & Palak Bansal
        </p>

        </div>
    </div>
  );
}
