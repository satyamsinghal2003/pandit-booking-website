import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { supabase } from "../../supabaseClient";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function SearchPandits() {
  const [searchParams] = useSearchParams();
  const city = searchParams.get("city");
  const puja = searchParams.get("puja");
  const navigate = useNavigate();
  const [pandits, setPandits] = useState([]); // All pandits fetched from the database
  const [filteredPandits, setFilteredPandits] = useState([]); // Filtered pandits based on search
  const [locationSearch, setLocationSearch] = useState(city); // User input for location search
  const [poojaSearch, setPoojaSearch] = useState(puja); // User input for pooja type search
  const [error, setError] = useState(null); // Error state
  


  useEffect(() => {
    async function fetchSearchedPandits(){
      const response = await fetch(`/api/pandits?city=${city}&puja=${puja}`);
      const data = await response.json();
      setPandits(data);
    }
    fetchSearchedPandits();
  }, [city, puja]);

  useEffect(() => {
    fetchPandits();
  }, []);

  useEffect(() => {
    filterPandits();
  }, [locationSearch, poojaSearch, pandits]);

  async function fetchPandits() {
    try {
      const { data, error } = await supabase.from("pandits").select("*");
  
      if (error) {
        throw error;
      }
  
      // Fetch profile pictures for each pandit
      const panditsWithImages = data.map((pandit) => {
        const { data: publicUrlData, error } = supabase.storage
          .from("pandit_profile")
          .getPublicUrl(pandit.profile_pic);
      
        if (error) {
          console.error("Error fetching public URL for", pandit.name, ":", error);
          return { ...pandit, profile_pic_url: null }; // Fallback to null if there's an error
        }
      
        const publicUrl = publicUrlData.publicUrl; // Access the public URL
        console.log("Generated public URL for", pandit.name, ":", publicUrl);
      
        return {
          ...pandit,
          profile_pic_url: publicUrl || null, // Attach the public URL to the Pandit object
        };
      });
  
      console.log("Pandits with URLs:", panditsWithImages);
      setPandits(panditsWithImages);
    } catch (error) {
      console.error("Error fetching pandits:", error);
      setError("Failed to fetch pandit data.");
    }
  }
  
  
  

  function filterPandits() {
    const filtered = pandits.filter((pandit) => {
      const matchesLocation = pandit.location
        .toLowerCase()
        .includes(locationSearch.toLowerCase());

      const matchesPoojaType = pandit.pooja_types.some((type) =>
        type.toLowerCase().includes(poojaSearch.toLowerCase())
      );

      return matchesLocation && matchesPoojaType;
    });

    setFilteredPandits(filtered);
  }

  function handleViewDetails(panditId) {
    navigate(`/book-pandit/${panditId}`);
  }

  return (
    <div className="p-4 min-h-screen mx-16"> 
      <h1 className="text-2xl font-bold mb-4">Find a Pandit</h1>
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <div className="flex space-x-4 mb-4">
        <Input
          type="text"
          placeholder="Search by location"
          value={locationSearch}
          onChange={(e) => setLocationSearch(e.target.value)}
          className="w-1/2"
        />
        <Input
          type="text"
          placeholder="Search by pooja type"
          value={poojaSearch}
          onChange={(e) => setPoojaSearch(e.target.value)}
          className="w-1/2"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPandits.map((pandit) => (
          <Card key={pandit.id}>
            <CardContent className="flex items-center space-x-4 p-4">
              <Avatar className="w-24 h-24">
                <AvatarImage
                  src={pandit.profile_pic_url || "/images/default-avatar.png"}
                  alt={pandit.name}
                />
                <AvatarFallback>{pandit.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-xl font-semibold">{pandit.name}</h2>
                <p className="text-gray-600">Location : {pandit.location}</p>
                <p className="text-gray-600">Experience: {pandit.experience} years</p>
                <p className="text-gray-600">Pooja: {pandit.pooja_types?.join(", ") || "No pooja types available"}</p>
                {/* Star Ratings */}
                <div className="flex items-center mt-2">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <span key={index} className={`${index < pandit.rating ? "text-yellow-500" : "text-gray-300"} text-2xl`} >
                      ★
                    </span>
                  ))}
                  <span className="ml-2 text-sm text-gray-600">{pandit.rating?.toFixed(1) || "0.0"}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => handleViewDetails(pandit.id)} className="w-full bg-orange-500 hover:bg-orange-600">
                View Details
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default SearchPandits;
