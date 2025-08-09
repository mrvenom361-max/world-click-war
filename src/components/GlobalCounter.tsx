import React from 'react';
import CountUp from 'react-countup';

interface GlobalCounterProps {
  totalClicks: number;
}

const GlobalCounter: React.FC<GlobalCounterProps> = ({ totalClicks }) => {
  return (
    <div className="text-center py-8">
      <h1 className="text-4xl md:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
        World Click War
      </h1>
      <div className="bg-gradient-card rounded-lg p-6 border border-border shadow-card max-w-md mx-auto">
        <p className="text-muted-foreground text-sm mb-2">Global Click Count</p>
        <div className="text-5xl font-bold text-foreground animate-count-up">
          <CountUp 
            end={totalClicks} 
            duration={2}
            separator=","
            preserveValue
          />
        </div>
        <div className="w-full h-2 bg-muted rounded-full mt-4 overflow-hidden">
          <div 
            className="h-full bg-gradient-primary rounded-full transition-all duration-1000 animate-glow-pulse"
            style={{ width: `${Math.min((totalClicks / 1000000) * 100, 100)}%` }}
          />
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Next milestone: {Math.ceil(totalClicks / 1000000)} million clicks
        </p>
      </div>
    </div>
  );
};

export default GlobalCounter;