import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface WorldMapProps {
  onCountryClick: (country: string) => void;
  userCountry?: string;
}

const WorldMap: React.FC<WorldMapProps> = ({ onCountryClick, userCountry }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    // For demo purposes, using a placeholder token
    // In production, this should come from Supabase secrets
    mapboxgl.accessToken = 'YOUR_MAPBOX_TOKEN_HERE';
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      projection: 'globe',
      zoom: 1.5,
      center: [0, 20],
      pitch: 0,
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl({
        visualizePitch: true,
      }),
      'top-right'
    );

    // Add atmosphere and fog effects
    map.current.on('style.load', () => {
      if (map.current) {
        map.current.setFog({
          color: 'rgb(30, 30, 50)',
          'high-color': 'rgb(60, 80, 120)',
          'horizon-blend': 0.1,
        });

        // Add glow effect to countries
        map.current.addSource('countries', {
          type: 'vector',
          url: 'mapbox://mapbox.country-boundaries-v1'
        });

        map.current.addLayer({
          id: 'country-fills',
          type: 'fill',
          source: 'countries',
          'source-layer': 'country_boundaries',
          paint: {
            'fill-color': [
              'case',
              ['==', ['get', 'name_en'], userCountry || ''],
              'hsl(120, 100%, 50%)', // User's country in accent color
              'hsl(210, 100%, 56%)' // Other countries in primary
            ],
            'fill-opacity': 0.3
          }
        });

        map.current.addLayer({
          id: 'country-borders',
          type: 'line',
          source: 'countries',
          'source-layer': 'country_boundaries',
          paint: {
            'line-color': 'hsl(210, 100%, 56%)',
            'line-width': 1,
            'line-opacity': 0.8
          }
        });

        // Add hover effects
        map.current.on('mouseenter', 'country-fills', () => {
          if (map.current) {
            map.current.getCanvas().style.cursor = 'pointer';
          }
        });

        map.current.on('mouseleave', 'country-fills', () => {
          if (map.current) {
            map.current.getCanvas().style.cursor = '';
          }
        });

        // Handle country clicks
        map.current.on('click', 'country-fills', (e) => {
          if (e.features && e.features[0]) {
            const countryName = e.features[0].properties?.name_en;
            if (countryName) {
              onCountryClick(countryName);
            }
          }
        });
      }
    });

    // Cleanup
    return () => {
      map.current?.remove();
    };
  }, [onCountryClick, userCountry]);

  return (
    <div className="relative w-full h-[500px] rounded-lg overflow-hidden shadow-card border border-border">
      <div ref={mapContainer} className="absolute inset-0" />
      {/* Map overlay with instructions */}
      <div className="absolute top-4 left-4 bg-card/80 backdrop-blur-sm rounded-lg p-3 border border-border">
        <p className="text-sm font-medium text-foreground">
          🌍 Click any country to add points!
        </p>
        {userCountry && (
          <p className="text-xs text-accent mt-1">
            Your country: {userCountry}
          </p>
        )}
      </div>
      
      {/* Note about Mapbox token */}
      <div className="absolute bottom-4 right-4 bg-card/80 backdrop-blur-sm rounded-lg p-3 border border-border max-w-xs">
        <p className="text-xs text-muted-foreground">
          ⚠️ Demo mode: Add your Mapbox token via Supabase secrets for full functionality
        </p>
      </div>
    </div>
  );
};

export default WorldMap;