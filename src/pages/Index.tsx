
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Building2, TrendingUp, Users, Shield, ArrowRight } from "lucide-react";

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-dealBlue text-white py-16 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Connect Companies with Capital
            </h1>
            <p className="text-xl mb-8">
              The leading platform connecting business owners looking to sell with private equity investors seeking opportunities
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/register">
                <Button size="lg" className="bg-white text-dealBlue hover:bg-gray-200 px-8">
                  Get Started
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-dealBlue px-8">
                  Log In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How DealFlow Works</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
              <div className="bg-dealBlue-light bg-opacity-20 p-3 rounded-full mb-4">
                <Building2 className="h-8 w-8 text-dealBlue" />
              </div>
              <h3 className="text-xl font-semibold mb-3">List Your Company</h3>
              <p className="text-gray-600">
                Create a detailed profile of your company, highlighting key metrics, growth opportunities and exit strategy.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
              <div className="bg-dealBlue-light bg-opacity-20 p-3 rounded-full mb-4">
                <Users className="h-8 w-8 text-dealBlue" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Connect with Investors</h3>
              <p className="text-gray-600">
                Our platform matches you with pre-qualified private equity firms aligned with your industry and business goals.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
              <div className="bg-dealBlue-light bg-opacity-20 p-3 rounded-full mb-4">
                <TrendingUp className="h-8 w-8 text-dealBlue" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Close Deals Faster</h3>
              <p className="text-gray-600">
                Streamlined process with secure data sharing, communication tools, and deal tracking capabilities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-dealBlue-light text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of successful transactions facilitated through our platform
          </p>
          <Link to="/register">
            <Button size="lg" className="bg-white text-dealBlue-light hover:bg-gray-200">
              Create Your Account <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dealBlue text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">DealFlow</h3>
              <p className="text-sm">
                The premier platform for deal sourcing and company acquisitions.
              </p>
            </div>
            <div>
              <h4 className="text-md font-semibold mb-4">For Companies</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:underline">How It Works</a></li>
                <li><a href="#" className="hover:underline">Pricing</a></li>
                <li><a href="#" className="hover:underline">Success Stories</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-md font-semibold mb-4">For Investors</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:underline">Find Opportunities</a></li>
                <li><a href="#" className="hover:underline">Investment Criteria</a></li>
                <li><a href="#" className="hover:underline">Due Diligence Tools</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-md font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:underline">About Us</a></li>
                <li><a href="#" className="hover:underline">Contact</a></li>
                <li><a href="#" className="hover:underline">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-6">
            <p className="text-sm text-center">© 2023 DealFlow. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
