import React from 'react';
import { Card } from '@/components/ui/card';
import CountUp from 'react-countup';

interface Country {
  name: string;
  code: string;
  clicks: number;
  rank: number;
}

interface CountryLeaderboardProps {
  countries: Country[];
  userCountry?: string;
}

const CountryLeaderboard: React.FC<CountryLeaderboardProps> = ({ countries, userCountry }) => {
  const getFlagEmoji = (countryCode: string) => {
    // Convert country code to flag emoji
    const codePoints = countryCode
      .toUpperCase()
      .split('')
      .map(char => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
  };

  const getRankMedal = (rank: number) => {
    switch (rank) {
      case 1: return '🥇';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return `#${rank}`;
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-foreground text-center mb-6">
        🏆 Country Leaderboard
      </h2>
      
      <div className="grid gap-3 max-h-96 overflow-y-auto">
        {countries.map((country) => (
          <Card 
            key={country.code}
            className={`
              p-4 transition-all duration-300 hover:scale-105 hover:shadow-glow
              ${country.name === userCountry 
                ? 'bg-gradient-card border-accent shadow-glow animate-glow-pulse' 
                : 'bg-gradient-card border-border hover:border-primary/50'
              }
            `}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="text-2xl font-bold text-muted-foreground min-w-[3rem]">
                  {getRankMedal(country.rank)}
                </div>
                <div 
                  className="text-3xl animate-flag-wave"
                  title={country.name}
                >
                  {getFlagEmoji(country.code)}
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">
                    {country.name}
                  </h3>
                  {country.name === userCountry && (
                    <p className="text-xs text-accent">Your Country</p>
                  )}
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-2xl font-bold text-primary">
                  <CountUp 
                    end={country.clicks} 
                    duration={1.5}
                    separator=","
                    preserveValue
                  />
                </div>
                <p className="text-xs text-muted-foreground">clicks</p>
              </div>
            </div>
            
            {/* Progress bar showing relative performance */}
            <div className="mt-3">
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className={`
                    h-full rounded-full transition-all duration-1000
                    ${country.name === userCountry 
                      ? 'bg-accent animate-glow-pulse' 
                      : 'bg-primary'
                    }
                  `}
                  style={{ 
                    width: `${Math.max((country.clicks / Math.max(...countries.map(c => c.clicks))) * 100, 5)}%` 
                  }}
                />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CountryLeaderboard;