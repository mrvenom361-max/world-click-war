import React, { useState, useEffect } from 'react';
import WorldMap from '@/components/WorldMap';
import GlobalCounter from '@/components/GlobalCounter';
import CountryLeaderboard from '@/components/CountryLeaderboard';
import UserCountrySection from '@/components/UserCountrySection';
import Footer from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';

// Mock data for demo - in production this would come from Supabase
const mockCountries = [
  { name: 'United States', code: 'US', clicks: 2847593, rank: 1 },
  { name: 'India', code: 'IN', clicks: 2156432, rank: 2 },
  { name: 'Brazil', code: 'BR', clicks: 1893247, rank: 3 },
  { name: 'Germany', code: 'DE', clicks: 1654329, rank: 4 },
  { name: 'United Kingdom', code: 'GB', clicks: 1432856, rank: 5 },
  { name: 'France', code: 'FR', clicks: 1298374, rank: 6 },
  { name: 'Canada', code: 'CA', clicks: 987654, rank: 7 },
  { name: 'Japan', code: 'JP', clicks: 876543, rank: 8 },
  { name: 'Australia', code: 'AU', clicks: 654321, rank: 9 },
  { name: 'South Korea', code: 'KR', clicks: 543210, rank: 10 },
];

const Index = () => {
  const [globalClicks, setGlobalClicks] = useState(12650539);
  const [userCountry, setUserCountry] = useState('United States'); // Mock user country
  const [userClicks, setUserClicks] = useState(42);
  const [countries, setCountries] = useState(mockCountries);
  const { toast } = useToast();

  // Mock IP geolocation - in production this would be done via Supabase edge function
  useEffect(() => {
    // Simulate IP detection
    const mockGeoLocation = () => {
      const possibleCountries = ['United States', 'Canada', 'United Kingdom', 'Germany', 'France'];
      const randomCountry = possibleCountries[Math.floor(Math.random() * possibleCountries.length)];
      setUserCountry(randomCountry);
    };
    
    mockGeoLocation();
  }, []);

  const handleCountryClick = (countryName: string) => {
    // In production, this would update the database via Supabase
    setGlobalClicks(prev => prev + 1);
    
    // Update country scores
    setCountries(prev => 
      prev.map(country => 
        country.name === countryName 
          ? { ...country, clicks: country.clicks + 1 }
          : country
      ).sort((a, b) => b.clicks - a.clicks).map((country, index) => ({ ...country, rank: index + 1 }))
    );

    // If user clicked their own country
    if (countryName === userCountry) {
      setUserClicks(prev => prev + 1);
      toast({
        title: "Great job! 🎉",
        description: `+1 point for ${userCountry}!`,
      });
    } else {
      toast({
        title: "Click registered! ⚡",
        description: `+1 point for ${countryName}`,
      });
    }
  };

  const handleClickForCountry = () => {
    handleCountryClick(userCountry);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Global Counter */}
        <GlobalCounter totalClicks={globalClicks} />
        
        {/* Main Game Area */}
        <div className="grid lg:grid-cols-3 gap-8 mt-8">
          {/* Map Section - Takes up 2 columns on large screens */}
          <div className="lg:col-span-2 space-y-6">
            <WorldMap 
              onCountryClick={handleCountryClick} 
              userCountry={userCountry}
            />
            <UserCountrySection 
              userCountry={userCountry}
              userClicks={userClicks}
              onClickForCountry={handleClickForCountry}
            />
          </div>
          
          {/* Leaderboard Section */}
          <div className="lg:col-span-1">
            <CountryLeaderboard 
              countries={countries}
              userCountry={userCountry}
            />
          </div>
        </div>
        
        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default Index;
