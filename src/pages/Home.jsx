import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";



export default function Home() {

  const [city, setCity] = useState("");
  const [puja, setPuja] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    navigate(`/searchPandits?city=${encodeURIComponent(city)}&puja=${encodeURIComponent(puja)}`);
  }

  return (
    
    <div className="min-h-screen bg-orange-50">   
      {/* Hero Section */}
      <div className="relative min-h-[500px] w-full">
      {/* Background Image */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(rgba(245, 240, 200, 0.7), rgba(245, 240, 200, 0.7)), url("/images/hawan-bg-2.jpg")`,
          }}
        />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 py-20 flex flex-col md:flex-row items-center justify-between">
        {/* Left side - Hero Text */}
        <div className="mb-10 md:mb-0 md:w-1/2 md:ml-36 md:mt-5 flex flex-col">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-6 leading-tight text-center">
            Best Puja Experience with Verified and Experienced Pandits
          </h1>
          <Button 
            size="lg"
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-6 text-lg rounded-md"
            onClick={() => navigate("/searchPandits?city=&puja=")}
          >
            Instant Book
          </Button>
        </div>

        {/* Right side - Booking Form */}
        <div className="w-full md:w-[400px] md:mr-20">
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-xl text-center">
                Book the Best Pandits <br></br>for your Puja
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <Input
                  placeholder="Enter your City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full p-3 rounded-md"
                />
                <Input
                  placeholder="Enter a Puja"     
                  value={puja}
                  onChange={(e) => setPuja(e.target.value)}             
                  className="w-full p-3 rounded-md"
                />
                <Button 
                  type="submit"
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white p-6 text-lg rounded-md"
                >
                  Book a Service
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>

      {/* Services Section */}
      <section className="py-10 bg-orange-50 px-20 flex flex-col">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-4xl font-bold text-center mb-2 text-gray-800">
            OUR PUJA SERVICES
          </h2>
          <p className="text-center mb-12 max-w-4xl mx-auto text-gray-600">
            Book Cool & chill Pandit ji. Book 1 Get 2 FREE !! 
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((index) => (
              <div
                key={index}
                className="bg-white rounded-3xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
              >
                <img
                  src={`/images/service-${index}.jpg`}
                  alt={`Puja Service ${index}`}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-lg sm:text-xl font-semibold mb-2 text-gray-800">
                    Puja Service {index}
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base">
                    Traditional puja services performed by experienced pandits
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Button variant="primary" size="xl"
        className="mt-10 self-center w-auto px-4 py-2 text-orange-700 border-2 border-orange-600 rounded-full hover:bg-orange-600 hover:text-white">
          Show All Services<ArrowRight/>
        </Button>
      </section>


      {/* Why choose us section */}
      <section className="bg-white py-16 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 text-[#963E3E]">
          Why Choose Us
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border-red-600 shadow-lg">
            <CardContent className="p-6">
              <h3 className="text-2xl font-semibold mb-4 text-[#963E3E]">
                Verified & Experienced Pandits
              </h3>
              <div className="space-y-2">
                <p className="text-lg leading-relaxed text-gray-700">
                  <span className="font-semibold">Trusted and Certified:</span> All Pandits on our platform are carefully vetted and certified for authenticity, ensuring that you get the best spiritual guidance.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-red-600 shadow-lg">
            <CardContent className="p-6">
              <h3 className="text-2xl font-semibold mb-4 text-[#963E3E]">
                Wide Range of Rituals
              </h3>
              <div className="space-y-2">
                <p className="text-lg leading-relaxed text-gray-700">
                  <span className="font-semibold">All Occasions Covered:</span> Whether its a wedding, housewarming, or daily puja, we offer a wide variety of rituals to cater to every spiritual need.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-red-600 shadow-lg">
            <CardContent className="p-6">
              <h3 className="text-2xl font-semibold mb-4 text-[#963E3E]">
                Flexible Scheduling
              </h3>
              <div className="space-y-2">
                <p className="text-lg leading-relaxed text-gray-700">
                  <span className="font-semibold">On-Demand Appointments:</span> Schedule a ritual at a time that suits you, with flexible options for both Pandits and users.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-red-600 shadow-lg">
            <CardContent className="p-6">
              <h3 className="text-2xl font-semibold mb-4 text-[#963E3E]">
                Transparent Pricing
              </h3>
              <div className="space-y-2">
                <p className="text-lg leading-relaxed text-gray-700">
                  <span className="font-semibold">No Hidden Charges:</span> Transparent and affordable pricing for all services, so you always know what you are paying for.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>

    
      
  </div>
  );
}
