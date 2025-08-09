import React from 'react';
import { Button } from '@/components/ui/button';

const Footer: React.FC = () => {
  const handleDonateClick = () => {
    window.open('https://ymbite.com', '_blank');
  };

  return (
    <footer className="mt-12 py-8 border-t border-border bg-gradient-card">
      <div className="container mx-auto px-4 text-center">
        <div className="mb-6">
          <Button 
            variant="donate" 
            size="lg"
            onClick={handleDonateClick}
            className="mb-4"
          >
            <span className="text-xl mr-2">💝</span>
            Support the Game - Donate
          </Button>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Help us keep World Click War running and add new features!
          </p>
        </div>
        
        <div className="border-t border-border pt-6">
          <p className="text-xs text-muted-foreground">
            © 2024 World Click War. Built with ❤️ for global unity through friendly competition.
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            🌍 Connecting the world, one click at a time.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;