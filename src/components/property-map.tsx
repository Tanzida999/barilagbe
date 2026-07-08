import { useEffect, useRef, useState } from "react";
import { MapPin, Ruler, X } from "lucide-react";
import { bn } from "@/lib/mock-data";

const BROWSER_KEY = import.meta.env.VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_BROWSER_KEY as string | undefined;
const CHANNEL = import.meta.env.VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_TRACKING_ID as string | undefined;

// Ensure the Google Maps JS API is loaded exactly once (with geometry library).
let mapsPromise: Promise<typeof google> | null = null;
function loadGoogleMaps(): Promise<typeof google> {
  if (typeof window === "undefined") return Promise.reject(new Error("SSR"));
  if ((window as any).google?.maps?.geometry) return Promise.resolve((window as any).google);
  if (mapsPromise) return mapsPromise;
  if (!BROWSER_KEY) return Promise.reject(new Error("Missing Google Maps browser key"));
  mapsPromise = new Promise((resolve, reject) => {
    (window as any).__initBariLagbeMap = () => resolve((window as any).google);
    const s = document.createElement("script");
    const params = new URLSearchParams({
      key: BROWSER_KEY,
      libraries: "geometry",
      loading: "async",
      callback: "__initBariLagbeMap",
      language: "bn",
      region: "BD",
    });
    if (CHANNEL) params.set("channel", CHANNEL);
    s.src = `https://maps.googleapis.com/maps/api/js?${params.toString()}`;
    s.async = true;
    s.defer = true;
    s.onerror = () => reject(new Error("Failed to load Google Maps"));
    document.head.appendChild(s);
  });
  return mapsPromise;
}

interface Props {
  lat: number;
  lng: number;
  title: string;
  address: string;
}

export function PropertyMap({ lat, lng, title, address }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const propertyMarkerRef = useRef<google.maps.Marker | null>(null);
  const roadMarkerRef = useRef<google.maps.Marker | null>(null);
  const lineRef = useRef<google.maps.Polyline | null>(null);
  const clickListenerRef = useRef<google.maps.MapsEventListener | null>(null);

  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [measuring, setMeasuring] = useState(false);
  const [distanceM, setDistanceM] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    loadGoogleMaps()
      .then((google) => {
        if (cancelled || !containerRef.current) return;
        const center = { lat, lng };
        const map = new google.maps.Map(containerRef.current, {
          center,
          zoom: 16,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: true,
        });
        mapRef.current = map;

        propertyMarkerRef.current = new google.maps.Marker({
          position: center,
          map,
          title,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 12,
            fillColor: "#0F766E",
            fillOpacity: 1,
            strokeColor: "#ffffff",
            strokeWeight: 3,
          },
          label: { text: "🏠", fontSize: "16px" },
        });

        const info = new google.maps.InfoWindow({
          content: `<div style="font-family: inherit; max-width:220px"><strong>${title}</strong><br/><span style="color:#64748b;font-size:12px">${address}</span></div>`,
        });
        propertyMarkerRef.current.addListener("click", () => info.open({ map, anchor: propertyMarkerRef.current! }));

        setReady(true);
      })
      .catch((e) => setError(e?.message ?? "মানচিত্র লোড ব্যর্থ"));
    return () => {
      cancelled = true;
      clickListenerRef.current?.remove();
    };
  }, [lat, lng, title, address]);

  const startMeasuring = () => {
    const map = mapRef.current;
    const google = (window as any).google as typeof globalThis.google | undefined;
    if (!map || !google) return;

    setMeasuring(true);
    setDistanceM(null);
    map.setOptions({ draggableCursor: "crosshair" });
    clickListenerRef.current?.remove();

    clickListenerRef.current = map.addListener("click", (e: google.maps.MapMouseEvent) => {
      if (!e.latLng) return;
      const roadPoint = e.latLng;

      roadMarkerRef.current?.setMap(null);
      roadMarkerRef.current = new google.maps.Marker({
        position: roadPoint,
        map,
        title: "নিকটস্থ রাস্তা",
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 8,
          fillColor: "#F59E0B",
          fillOpacity: 1,
          strokeColor: "#ffffff",
          strokeWeight: 2,
        },
      });

      const propertyLatLng = new google.maps.LatLng(lat, lng);
      const meters = google.maps.geometry.spherical.computeDistanceBetween(propertyLatLng, roadPoint);
      setDistanceM(meters);

      lineRef.current?.setMap(null);
      lineRef.current = new google.maps.Polyline({
        path: [propertyLatLng, roadPoint],
        geodesic: true,
        strokeColor: "#0F766E",
        strokeOpacity: 0.9,
        strokeWeight: 3,
        icons: [{ icon: { path: "M 0,-1 0,1", strokeOpacity: 1, scale: 3 }, offset: "0", repeat: "12px" }],
        map,
      });

      const bounds = new google.maps.LatLngBounds();
      bounds.extend(propertyLatLng);
      bounds.extend(roadPoint);
      map.fitBounds(bounds, 80);

      map.setOptions({ draggableCursor: null });
      clickListenerRef.current?.remove();
      clickListenerRef.current = null;
      setMeasuring(false);
    });
  };

  const clearMeasurement = () => {
    roadMarkerRef.current?.setMap(null);
    lineRef.current?.setMap(null);
    roadMarkerRef.current = null;
    lineRef.current = null;
    setDistanceM(null);
    setMeasuring(false);
    clickListenerRef.current?.remove();
    clickListenerRef.current = null;
    const map = mapRef.current;
    if (map) {
      map.setOptions({ draggableCursor: null });
      map.setCenter({ lat, lng });
      map.setZoom(16);
    }
  };

  const fmtDistance = (m: number) => {
    if (m >= 1000) return `${bn((m / 1000).toFixed(2))} কিমি`;
    return `${bn(Math.round(m))} মিটার`;
  };
  // Rough walking pace: 80 m/min; driving in Dhaka traffic ~ 400 m/min.
  const walkMins = distanceM != null ? Math.max(1, Math.round(distanceM / 80)) : null;
  const driveMins = distanceM != null ? Math.max(1, Math.round(distanceM / 400)) : null;

  if (error) {
    return (
      <div className="rounded-xl border border-border bg-muted p-6 text-sm text-muted-foreground">
        মানচিত্র লোড করা যাচ্ছে না: {error}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 text-primary" />
          <span>মানচিত্রে ক্লিক করে দূরত্ব মাপুন</span>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            data-action="measure-distance"
            onClick={startMeasuring}
            disabled={!ready || measuring}
            className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-60"
          >
            <Ruler className="h-3.5 w-3.5" />
            {measuring ? "নিকটস্থ রাস্তায় ক্লিক করুন…" : "দূরত্ব মাপুন"}
          </button>
          {distanceM != null && (
            <button
              type="button"
              onClick={clearMeasurement}
              className="inline-flex items-center gap-1 rounded-lg border border-border px-3 py-1.5 text-xs font-semibold hover:bg-muted"
            >
              <X className="h-3.5 w-3.5" /> রিসেট
            </button>
          )}
        </div>
      </div>

      <div
        ref={containerRef}
        className="h-64 w-full overflow-hidden rounded-xl border border-border bg-muted sm:h-96"
        aria-label={`মানচিত্র: ${address}`}
      />

      {distanceM != null && (
        <div className="grid gap-2 rounded-xl border border-border bg-surface p-4 sm:grid-cols-3">
          <Stat label="দূরত্ব" value={fmtDistance(distanceM)} tone="primary" />
          <Stat label="হেঁটে" value={`~${bn(walkMins!)} মিনিট`} />
          <Stat label="গাড়িতে" value={`~${bn(driveMins!)} মিনিট`} />
        </div>
      )}
    </div>
  );
}

function Stat({ label, value, tone }: { label: string; value: string; tone?: "primary" }) {
  return (
    <div className="rounded-lg bg-muted p-3">
      <div className="text-[11px] text-muted-foreground">{label}</div>
      <div className={`mt-0.5 text-sm font-bold ${tone === "primary" ? "text-primary" : ""}`}>{value}</div>
    </div>
  );
}
