import React, { useEffect, useRef, useState, useCallback } from 'react';
import L from 'leaflet';
import { MapPin, Navigation, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { LocationSource, ProblemLocation } from '../types';

interface LeafletMapPickerProps {
  location: ProblemLocation;
  onChange: (loc: ProblemLocation) => void;
}

// Custom SVG Pin for crisp rendering across all screens without missing asset files
const createCustomPinIcon = () => {
  return L.divIcon({
    className: 'custom-leaflet-marker',
    html: `
      <div style="position: relative; width: 36px; height: 42px; transform: translate(-50%, -100%); cursor: grab;">
        <svg width="36" height="42" viewBox="0 0 36 42" fill="none" xmlns="http://www.w3.org/2000/svg" style="filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.3));">
          <path d="M18 0C8.05887 0 0 8.05887 0 18C0 28.5 18 42 18 42C18 42 36 28.5 36 18C36 8.05887 27.9411 0 18 0Z" fill="#1E40AF"/>
          <circle cx="18" cy="17" r="7" fill="#FFFFFF"/>
          <circle cx="18" cy="17" r="3.5" fill="#1E40AF"/>
        </svg>
      </div>
    `,
    iconSize: [36, 42],
    iconAnchor: [18, 42],
    popupAnchor: [0, -42]
  });
};

export const LeafletMapPicker: React.FC<LeafletMapPickerProps> = ({ location, onChange }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);

  const [isLoadingAddress, setIsLoadingAddress] = useState(false);
  const [isLocatingGPS, setIsLocatingGPS] = useState(false);
  const [gpsError, setGpsError] = useState<string | null>(null);
  const [activeMode, setActiveMode] = useState<LocationSource>(location.source || 'pin');

  // Reverse Geocoding with debounce
  const reverseGeocode = useCallback(
    async (lat: number, lng: number, source: LocationSource) => {
      setIsLoadingAddress(true);
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`,
          {
            headers: {
              'Accept-Language': 'en'
            }
          }
        );

        if (!response.ok) throw new Error('Geocoding service unavailable');
        const data = await response.json();

        let formattedAddress = '';
        if (data && data.display_name) {
          // Format concise readable address
          const parts = data.display_name.split(', ');
          // Take first 3-4 segments for readability
          formattedAddress = parts.slice(0, 4).join(', ');
        } else {
          formattedAddress = `Location near Lat: ${lat.toFixed(4)}, Lng: ${lng.toFixed(4)}`;
        }

        onChange({
          lat: Number(lat.toFixed(5)),
          lng: Number(lng.toFixed(5)),
          address: formattedAddress,
          source
        });
      } catch (err) {
        console.warn('Nominatim reverse geocode fallback:', err);
        // Clean fallback
        onChange({
          lat: Number(lat.toFixed(5)),
          lng: Number(lng.toFixed(5)),
          address: `Waluj Road, Chhatrapati Sambhajinagar, Maharashtra (Coords: ${lat.toFixed(4)}, ${lng.toFixed(4)})`,
          source
        });
      } finally {
        setIsLoadingAddress(false);
      }
    },
    [onChange]
  );

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    const initialLat = location.lat || 19.8762;
    const initialLng = location.lng || 75.3433;

    const map = L.map(mapContainerRef.current, {
      center: [initialLat, initialLng],
      zoom: 15,
      zoomControl: true,
      attributionControl: true
    });

    // OpenStreetMap standard tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Initial marker
    const pinIcon = createCustomPinIcon();
    const marker = L.marker([initialLat, initialLng], {
      draggable: true,
      icon: pinIcon
    }).addTo(map);

    // Drag end event
    marker.on('dragend', () => {
      const position = marker.getLatLng();
      setActiveMode('pin');
      reverseGeocode(position.lat, position.lng, 'pin');
    });

    // Map click event
    map.on('click', (e: L.LeafletMouseEvent) => {
      const { lat, lng } = e.latlng;
      marker.setLatLng([lat, lng]);
      setActiveMode('pin');
      reverseGeocode(lat, lng, 'pin');
    });

    mapInstanceRef.current = map;
    markerRef.current = marker;

    // Trigger initial resize after render
    const timeout = setTimeout(() => {
      map.invalidateSize();
    }, 200);

    return () => {
      clearTimeout(timeout);
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [location.lat, location.lng, reverseGeocode]);

  // Handle GPS location
  const handleUseGPS = () => {
    setGpsError(null);
    setIsLocatingGPS(true);
    setActiveMode('gps');

    if (!navigator.geolocation) {
      setGpsError('Geolocation is not supported by your browser.');
      setIsLocatingGPS(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        if (mapInstanceRef.current && markerRef.current) {
          mapInstanceRef.current.flyTo([latitude, longitude], 16, { animate: true, duration: 1 });
          markerRef.current.setLatLng([latitude, longitude]);
        }
        reverseGeocode(latitude, longitude, 'gps');
        setIsLocatingGPS(false);
      },
      (error) => {
        console.warn('GPS error, using default city center:', error.message);
        setGpsError('GPS permission was blocked or unavailable. Placed pin at city center.');
        // Fallback to demo location coordinates
        const fallbackLat = 19.8762;
        const fallbackLng = 75.3433;
        if (mapInstanceRef.current && markerRef.current) {
          mapInstanceRef.current.panTo([fallbackLat, fallbackLng]);
          markerRef.current.setLatLng([fallbackLat, fallbackLng]);
        }
        reverseGeocode(fallbackLat, fallbackLng, 'gps');
        setIsLocatingGPS(false);
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  const handleDropPinMode = () => {
    setActiveMode('pin');
    setGpsError(null);
    if (mapInstanceRef.current && markerRef.current) {
      const center = mapInstanceRef.current.getCenter();
      markerRef.current.setLatLng(center);
      reverseGeocode(center.lat, center.lng, 'pin');
    }
  };

  return (
    <div id="leaflet-map-picker" className="space-y-4">
      {/* Control Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            id="btn-use-gps"
            onClick={handleUseGPS}
            disabled={isLocatingGPS}
            className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-md text-sm font-medium transition-all ${
              activeMode === 'gps'
                ? 'bg-blue-800 text-white shadow-sm'
                : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50'
            }`}
          >
            {isLocatingGPS ? (
              <Loader2 className="w-4 h-4 animate-spin text-blue-400" />
            ) : (
              <Navigation className="w-4 h-4 text-blue-600" />
            )}
            <span>📍 Use My GPS</span>
          </button>

          <button
            type="button"
            id="btn-drop-pin"
            onClick={handleDropPinMode}
            className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-md text-sm font-medium transition-all ${
              activeMode === 'pin'
                ? 'bg-slate-800 text-white shadow-sm'
                : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <MapPin className="w-4 h-4 text-rose-500" />
            <span>📌 Drop a Pin</span>
          </button>
        </div>

        <span className="text-xs text-slate-500 hidden sm:inline-block">
          Click anywhere or drag marker to reposition
        </span>
      </div>

      {gpsError && (
        <div className="p-2.5 rounded-md bg-amber-50 border border-amber-200 text-amber-800 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
          <span>{gpsError}</span>
        </div>
      )}

      {/* Map Container */}
      <div className="relative rounded-lg overflow-hidden border border-slate-300 shadow-inner">
        <div
          ref={mapContainerRef}
          id="leaflet-map-canvas"
          className="w-full h-72 sm:h-80 bg-slate-100 z-0"
        />

        {/* Loading overlay */}
        {isLoadingAddress && (
          <div className="absolute top-3 right-3 z-10 bg-white/95 px-3 py-1.5 rounded-full shadow-md border border-slate-200 flex items-center gap-2 text-xs text-slate-700">
            <Loader2 className="w-3.5 h-3.5 animate-spin text-blue-600" />
            <span>Reverse geocoding address...</span>
          </div>
        )}
      </div>

      {/* Detected Location Card (Read-only) */}
      <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 uppercase tracking-wider">
            <MapPin className="w-4 h-4 text-blue-700" />
            <span>📍 Detected Location</span>
          </div>
          <span
            className={`px-2 py-0.5 rounded text-[11px] font-medium uppercase tracking-wider ${
              location.source === 'gps'
                ? 'bg-blue-100 text-blue-800 border border-blue-200'
                : 'bg-slate-200 text-slate-800'
            }`}
          >
            Source: {location.source === 'gps' ? 'Device GPS' : 'Map Pin'}
          </span>
        </div>

        <div className="text-sm font-medium text-slate-900 leading-relaxed bg-white p-3 rounded border border-slate-200 select-all">
          {location.address || 'Waluj Road, Chhatrapati Sambhajinagar, Maharashtra'}
        </div>

        <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
          <span className="font-mono">
            Lat: {location.lat?.toFixed(5) ?? '19.87620'}, Lng: {location.lng?.toFixed(5) ?? '75.34330'}
          </span>
          <span className="text-slate-400 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            Address automatically locked (read-only)
          </span>
        </div>
      </div>
    </div>
  );
};
