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
    <div className="text-center py-8">
      <Card className="bg-gradient-card border border-border shadow-card p-6 max-w-md mx-auto">
        <div className="mb-4">
          <div className="text-6xl mb-2 animate-flag-wave">
            {getFlagEmoji(userCountry)}
          </div>
          <h3 className="text-xl font-semibold text-foreground">
            Representing {userCountry}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Your contribution: <span className="text-accent font-bold">{userClicks.toLocaleString()}</span> clicks
          </p>
        </div>
        
        <Button 
          variant="click" 
          size="xl"
          onClick={onClickForCountry}
          className="w-full mb-4"
        >
          <span className="text-2xl mr-2">⚡</span>
          Click for {userCountry}!
        </Button>
        
        <p className="text-xs text-muted-foreground">
          Every click counts! Help your country climb the leaderboard.
        </p>
      </Card>
    </div>
  );
};

export default UserCountrySection;