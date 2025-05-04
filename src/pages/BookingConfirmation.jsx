import { useEffect } from 'react';
import { CalendarIcon, Clock, MapPin, User } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { supabase } from '../../supabaseClient';
import { Star } from "lucide-react";

export default function BookingConfirmation() {

  const {panditId} = useParams();
  const [panditDetails, setPanditDetails] = useState(null);
  const [bookingDetails, setBookingDetails] = useState(null);

  useEffect(() => {
    const fetchPanditDetails = async() => {
      try{
        const {data, error} = await supabase.from("pandits")
          .select("*")
          .eq("id", panditId)
          .single();
        if(error) throw error;

        let publicImageUrl = "/placeholder.svg";
        if(data?.profile_pic){
          const {data: publicUrlData, error: urlError} = supabase.storage
            .from("pandit_profile")
            .getPublicUrl(data.profile_pic);
          if(!urlError){
            publicImageUrl = publicUrlData.publicUrl;
          }
        }
        setPanditDetails({...data, profile_image: publicImageUrl})
      } catch(err){
        console.error("Error fetching Pandit details:", err.message);
        setPanditDetails(null);
      }
    }

    fetchPanditDetails();
  }, [])

  useEffect(()=>{
    const fetchBookingDetails = async()=>{
      try{
        const { data, error } = await supabase.from("bookings")
          .select("*")
          .eq("pandit_id", panditId)
          .order("date", { ascending: false }) // Sort by latest date
          .limit(1) // Ensure only one row is fetched
          .single();
        
        if(error) throw error;

        setBookingDetails({...data});

      } catch(err){
      console.error("Error:", err.message);    

    } 

    }
    fetchBookingDetails();
  }, [])

  if (!panditDetails || !bookingDetails) {
    return <div className="min-h-screen flex justify-center items-center">Loading...</div>;
  }
  

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">Booking Confirmed!</h1>
          <p className="mt-2 text-muted-foreground">
            Your pooja appointment has been successfully scheduled
          </p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Booking Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-start gap-4">
              <img
                src={panditDetails.profile_image}
                alt="Pandit"
                className="h-16 w-16 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold">{panditDetails.name}</h3>
                <p className="text-sm text-muted-foreground">Experience: 21 Years</p>
                <div className="mt-1 flex">
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

            <Separator />

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CalendarIcon className="h-4 w-4" />
                  Date
                </div>
                {bookingDetails.date ? (
                  <p className="font-medium">{bookingDetails.date}</p>
                ) : (
                  <p className="text-gray-500">Loading date info...</p>
                )}
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  Time
                </div>
                {bookingDetails.time ? (
                  <p className="font-medium">{bookingDetails.time}</p>
                ) : (
                  <p className='text-gray-500'>Loading time info...</p>
                )}
                
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <User className="h-4 w-4" />
                  Service
                </div>
                <p className="font-medium">{bookingDetails.pooja_type}</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  Languages
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Hindi</Badge>
                  <Badge variant="secondary">Sanskrit</Badge>
                  <Badge variant="secondary">Marathi</Badge>
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <h4 className="font-medium">About the Pandit</h4>
              <p className="text-sm text-muted-foreground">
                {panditDetails.description}
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Button className="flex-1 sm:flex-initial sm:min-w-[200px]">
            Download Confirmation
          </Button>
          <Button variant="outline" className="flex-1 sm:flex-initial sm:min-w-[200px]">
            Add to Calendar
          </Button>
        </div>
      </div>
    </div>
  );
}
