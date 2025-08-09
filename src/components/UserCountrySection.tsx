import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface UserCountrySectionProps {
  userCountry: string;
  userClicks: number;
  onClickForCountry: () => void;
}

const UserCountrySection: React.FC<UserCountrySectionProps> = ({ 
  userCountry, 
  userClicks, 
  onClickForCountry 
}) => {
  const getFlagEmoji = (countryName: string) => {
    // Simple mapping for demo - in production this would be more comprehensive
    const flagMap: { [key: string]: string } = {
      'United States': '🇺🇸',
      'United Kingdom': '🇬🇧',
      'Canada': '🇨🇦',
      'Germany': '🇩🇪',
      'France': '🇫🇷',
      'Japan': '🇯🇵',
      'Australia': '🇦🇺',
      'Brazil': '🇧🇷',
      'India': '🇮🇳',
      'China': '🇨🇳',
    };
    return flagMap[userCountry] || '🌍';
  };

  return (
    <div className="w-full py-6">
      <Card className="bg-gradient-card border border-border shadow-card p-6 w-full">
        <div className="flex items-center justify-between">
          {/* Left side - Flag and Country Info */}
          <div className="flex items-center space-x-4">
            <div className="text-6xl animate-flag-wave">
              {getFlagEmoji(userCountry)}
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-foreground">
                Representing {userCountry}
              </h3>
              <p className="text-sm text-muted-foreground">
                Your contribution: <span className="text-accent font-bold">{userClicks.toLocaleString()}</span> clicks
              </p>
            </div>
          </div>
          
          {/* Right side - Click Button */}
          <div className="flex flex-col items-end space-y-2">
            <Button 
              variant="click" 
              size="xl"
              onClick={onClickForCountry}
              className="min-w-[200px]"
            >
              <span className="text-2xl mr-2">⚡</span>
              Click for {userCountry}!
            </Button>
            <p className="text-xs text-muted-foreground text-right max-w-[200px]">
              Every click counts! Help your country climb the leaderboard.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default UserCountrySection;