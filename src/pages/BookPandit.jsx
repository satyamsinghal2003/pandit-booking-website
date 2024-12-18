// PanditBooking Component
import { useEffect, useState } from "react";
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Info, CalendarIcon, Clock, CheckCircle, ChevronLeft, Languages } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../../supabaseClient";



export default function PanditBooking() {
  const {panditId} = useParams();
  const [poojaTypes, setPoojaTypes] = useState([]);
  const [selectedPoojaType, setSelectedPoojaType] = useState("");
  const [panditDetails, setPanditDetails] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const navigate = useNavigate();

  const shubhDates = [
    "13th December 2024",
    "15th December 2024",
    "20th December 2024",
    "25th December 2024",
  ];

  useEffect(() => {
    const fetchPanditDetails = async () => {
      try {
        // Fetch details from Supabase
        const { data, error } = await supabase
          .from("pandits")
          .select("*")
          .eq("id", panditId)
          .single(); // Fetch a single Pandit
  
        if (error) throw error;
  
        // Fetch public URL for the profile picture if exists
        let publicImageUrl = "/placeholder.svg"; // Default placeholder image
        if (data?.profile_pic) {
          const { data: publicUrlData, error: urlError } = supabase.storage
            .from("pandit_profile")
            .getPublicUrl(data.profile_pic);
  
          if (!urlError) {
            publicImageUrl = publicUrlData.publicUrl;
          }
        }
  
        // Update Pandit details
        setPanditDetails({ ...data, profile_image: publicImageUrl });
      } catch (err) {
        console.error("Error fetching Pandit details:", err.message);
        setPanditDetails(null); // Optional: Show an error state
      }
    }
  
    fetchPanditDetails();
  }, []);
  

  
  const timeSlots = [
    "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
    "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM", "05:00 PM", "05:30 PM"
  ];

  if (!panditDetails) {
    return <div className="min-h-screen flex justify-center items-center">Loading...</div>;
  }

  async function handleBooking(panditId){
    try{
      const { data, error } = await supabase.from("bookings")
        .insert([{
          pandit_id: panditId,
          pooja_type: selectedPoojaType,
          date: selectedDate,
          time: selectedTime,
        }
        ])

        if(error) throw error;
        navigate(`/booking-confirmation/${panditId}`);

    } catch(err){
      console.error("Error:", err.message);
    }
    
  }

  return (
    <div className="min-h-screen bg-gradient-to-br p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-7xl grid gap-8 lg:grid-cols-2"
      >
        {/* Profile Section */}
        <Card className="p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardContent className="p-0">
            <div className="flex flex-col sm:flex-row items-start gap-6">
              {/* Profile Image */}
              <div className="relative h-32 w-32 rounded-full overflow-hidden shadow-md">
                <img
                  src={panditDetails.profile_image || "/placeholder.svg"}
                  alt={panditDetails.name || "Profile"}
                  className="object-cover h-full w-full"
                />
                <span className="absolute bottom-1 right-1 h-4 w-4 rounded-full bg-green-500 border-2 border-white" />
              </div>
              {/* Pandit Details */}
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-800">{panditDetails.name}</h1>
                <p className="text-lg text-gray-600">Experience: {panditDetails.experience} Years</p>
                <div className="flex items-center gap-1 mt-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${i < panditDetails.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">({panditDetails.rating?.toFixed(1)})</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mt-8">
              <div className="flex items-center gap-2 font-medium text-gray-700">
                <Languages className="h-5 w-5 text-orange-500" />
                About
              </div>
              <p className="mt-2 text-gray-600">{panditDetails.description}</p>
            </div>

            {/* Weekly Availability */}
            <div className="mt-8">
              <div className="flex items-center gap-2 font-medium text-gray-700 mb-3">
                <CalendarIcon className="h-5 w-5 text-orange-500" />
                Weekly Availability
              </div>
              <div className="flex flex-wrap gap-2">
                {panditDetails.availability?.map((day) => (
                  <Badge
                    key={day}
                    variant="secondary"
                    className="rounded-full px-3 py-1 bg-orange-100 text-orange-800 hover:bg-orange-200 transition-colors duration-200"
                  >
                    {day}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Languages */}
            <div className="mt-8">
              <div className="flex items-center gap-2 font-medium text-gray-700">
                <Languages className="h-5 w-5 text-orange-500" />
                Languages
              </div>
              <p className="mt-2 text-gray-600">{panditDetails.languages?.join(", ")}</p>
            </div>

            {/* Pooja Types */}
            <div className="mt-8">
              <div className="flex items-center gap-2 font-medium text-gray-700">
                <Languages className="h-5 w-5 text-orange-500" />
                Languages
              </div>
              <p className="mt-2 text-gray-600">{panditDetails.pooja_types?.join(", ")}</p>
            </div>

            

            {/* Location */}
            <div className="mt-8">
              <div className="flex items-center gap-2 font-medium text-gray-700">
                <Languages className="h-5 w-5 text-orange-500" />
                Location
              </div>
              <p className="mt-2 text-gray-600">{panditDetails.location}</p>
            </div>
          </CardContent>
        </Card>

        {/* Booking Section */}
        <Card className="p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardContent className="p-0">
        <div className="flex items-center gap-2 mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Book Pandit Ji</h2>
        </div>

      {/* Pooja Type Selection */}
      <div className="my-5">
            <h3 className="text-lg font-medium mb-3 text-gray-700">Select Pooja Type</h3>
            <select
              value={selectedPoojaType}
              onChange={(e) => setSelectedPoojaType(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md text-gray-600 text-sm"
            >
              <option value="">
                -- Select a Pooja Type --
              </option>
              {panditDetails.pooja_types.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Calendar Section */}
      <div>
        <h3 className="text-lg font-medium mb-3 text-gray-700">Select Date</h3>
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          className="rounded-md border"
        />
      </div>

      {/* Good Shubh Dates Section */}
      <div>
        <h3 className="text-lg font-medium mb-3 text-gray-700">Shubh Dates for this month</h3>
        <Card className="p-4 border border-gray-300 rounded-md">
          <ul className="space-y-2">
            {shubhDates.map((date, index) => (
              <li
                key={index}
                className="bg-orange-100 rounded-md py-2 px-4 text-orange-700 font-semibold"
              >
                {date}
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>

    {/* Time Selection */}
    <div className="mt-8">
      <h3 className="text-lg font-medium mb-3 text-gray-700">Select Hour</h3>
      <div className="grid grid-cols-3 gap-2">
        {timeSlots.map((time) => (
          <Button
            key={time}
            variant={time === selectedTime ? "default" : "outline"}
            className={`w-full ${time === selectedTime ? "bg-orange-500 hover:bg-orange-600 text-white" : "text-gray-700 hover:bg-orange-100"}`}
            onClick={() => setSelectedTime(time)}
          >
            {time}
          </Button>
        ))}
      </div>
    </div>

    {/* Confirm Button */}
    <Button
      className="mt-6 w-full bg-orange-500 hover:bg-orange-600 text-white text-lg py-6 rounded-full shadow-md hover:shadow-lg transition-all duration-200"
      disabled={!selectedPoojaType || !selectedDate || !selectedTime}
      onClick={()=>{handleBooking(panditDetails.id)}}
    >
      Confirm Booking
    </Button>
  </CardContent>
</Card>

      </motion.div>
    </div>
  );
}
