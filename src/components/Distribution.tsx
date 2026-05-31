import { useId, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { MapPin } from 'lucide-react';

type RegionId = 'algerie' | 'france' | 'tunisie' | 'libye' | 'senegal' | 'canada';

type Region = {
  id: RegionId;
  name: string;
  label: string;
  /** Marker dot position */
  x: number;
  y: number;
  /** Circle blob center + radius */
  cx: number;
  cy: number;
  r: number;
  color: string;
  tagline: string;
  isHub?: boolean;
};

/** Béjaïa origin — all signal lines start here */
const BEJAAIA = { x: 488, y: 238 };

const REGIONS: Region[] = [
  {
    id: 'canada',
    name: 'Canada',
    label: 'CANADA',
    x: 108,
    y: 132,
    cx: 108,
    cy: 132,
    r: 86,
    color: '#6366F1',
    tagline: 'Diaspora & export',
  },
  {
    id: 'france',
    name: 'France',
    label: 'FRANCE',
    x: 338,
    y: 118,
    cx: 338,
    cy: 118,
    r: 78,
    color: '#FFD93D',
    tagline: 'Disponible en grande distribution',
  },
  {
    id: 'algerie',
    name: 'Algérie',
    label: 'ALGÉRIE',
    x: 488,
    y: 268,
    cx: 488,
    cy: 278,
    r: 94,
    color: '#FF6B2B',
    tagline: 'Béjaïa — berceau IZEM',
    isHub: true,
  },
  {
    id: 'tunisie',
    name: 'Tunisie',
    label: 'TUNISIE',
    x: 668,
    y: 188,
    cx: 668,
    cy: 188,
    r: 68,
    color: '#FF3E6C',
    tagline: 'Marché maghrébin en expansion',
  },
  {
    id: 'libye',
    name: 'Libye',
    label: 'LIBYE',
    x: 808,
    y: 248,
    cx: 808,
    cy: 248,
    r: 72,
    color: '#38BDF8',
    tagline: 'Présence Méditerranée sud',
  },
  {
    id: 'senegal',
    name: 'Sénégal',
    label: 'SÉNÉGAL',
    x: 288,
    y: 388,
    cx: 288,
    cy: 388,
    r: 74,
    color: '#84CC16',
    tagline: 'Afrique de l’Ouest',
  },
];

const HUB = REGIONS.find((r) => r.isHub)!;

function hubPathTo(target: Region) {
  const sx = BEJAAIA.x;
  const sy = BEJAAIA.y;
  const tx = target.x;
  const ty = target.y;
  const mx = (sx + tx) / 2;
  const my = Math.min(sy, ty) - Math.abs(tx - sx) * 0.12 - 40;
  return `M ${sx} ${sy} Q ${mx} ${my} ${tx} ${ty}`;
}

function RadarRings({
  x,
  y,
  color,
  active,
  reduceMotion,
}: {
  x: number;
  y: number;
  color: string;
  active: boolean;
  reduceMotion: boolean | null;
}) {
  if (reduceMotion) return null;

  return (
    <g transform={`translate(${x}, ${y})`} pointerEvents="none" aria-hidden="true">
      {[0, 0.75, 1.5].map((delay) => (
        <circle
          key={delay}
          r={7}
          fill="none"
          stroke={color}
          strokeWidth={active ? 2.25 : 1.25}
          className="map-radar-ring"
          style={{
            animationDelay: `${delay}s`,
            opacity: active ? 0.9 : 0.4,
          }}
        />
      ))}
    </g>
  );
}

function CountryBlob({
  region,
  focusedId,
  onSelect,
  reduceMotion,
}: {
  region: Region;
  focusedId: RegionId;
  onSelect: (id: RegionId) => void;
  reduceMotion: boolean | null;
}) {
  const isFocused = focusedId === region.id;
  const isDimmed = !isFocused;
  const { cx, cy, r } = region;

  return (
    <g
      className="cursor-pointer"
      onClick={() => onSelect(region.id)}
      role="button"
      tabIndex={0}
      aria-label={`${region.name} — ${region.tagline}`}
      aria-pressed={isFocused}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(region.id);
        }
      }}
    >
      {isFocused && !reduceMotion && (
        <circle
          cx={cx}
          cy={cy}
          r={r + 14}
          fill={region.color}
          className="map-blob-pulse"
          opacity={0.2}
        />
      )}

      {isFocused && (
        <circle
          cx={cx}
          cy={cy}
          r={r + 6}
          fill={region.color}
          opacity={0.22}
          className="transition-all duration-200"
        />
      )}

      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill={isFocused ? region.color : '#E8DCC4'}
        fillOpacity={isFocused ? 0.55 : isDimmed ? 0.42 : 0.48}
        stroke={isFocused ? region.color : '#1A1208'}
        strokeOpacity={isFocused ? 1 : 0.16}
        strokeWidth={isFocused ? 3.5 : 2}
        className="transition-all duration-200"
      />

      {region.isHub ? (
        <>
          <text
            x={cx}
            y={cy - 10}
            textAnchor="middle"
            fontFamily="Bebas Neue, sans-serif"
            fontSize={isFocused ? 28 : 22}
            fill="#1A1208"
            fillOpacity={isFocused ? 0.95 : 0.6}
            letterSpacing="3"
            pointerEvents="none"
            className="transition-all duration-200"
          >
            {region.label}
          </text>
          <text
            x={cx}
            y={cy + 16}
            textAnchor="middle"
            fontFamily="Nunito, sans-serif"
            fontSize="12"
            fontWeight="700"
            fill="#1A1208"
            fillOpacity={isFocused ? 0.8 : 0.5}
            letterSpacing="2.5"
            pointerEvents="none"
          >
            BÉJAÏA
          </text>
        </>
      ) : (
        <text
          x={cx}
          y={cy + 7}
          textAnchor="middle"
          fontFamily="Bebas Neue, sans-serif"
          fontSize={isFocused ? 24 : 20}
          fill="#1A1208"
          fillOpacity={isFocused ? 0.95 : 0.58}
          letterSpacing="3"
          pointerEvents="none"
          className="transition-all duration-200"
        >
          {region.label}
        </text>
      )}
    </g>
  );
}

function DistributionMap({
  focusedId,
  onSelect,
  reduceMotion,
}: {
  focusedId: RegionId;
  onSelect: (id: RegionId) => void;
  reduceMotion: boolean | null;
}) {
  const baseId = useId().replace(/:/g, '');

  return (
    <svg
      viewBox="0 0 960 480"
      className="h-full w-full"
      role="img"
      aria-label="Carte stylisée de la présence IZEM dans le monde"
    >
      <defs>
        <linearGradient id={`${baseId}-ocean`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E8F6FF" />
          <stop offset="55%" stopColor="#F3EBD4" />
          <stop offset="100%" stopColor="#FFF8E7" />
        </linearGradient>
        <filter id={`${baseId}-glow`} x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <rect width="960" height="480" fill={`url(#${baseId}-ocean)`} rx="24" />

      {/* Inactive blobs */}
      {REGIONS.filter((r) => r.id !== focusedId).map((region) => (
        <CountryBlob
          key={region.id}
          region={region}
          focusedId={focusedId}
          onSelect={onSelect}
          reduceMotion={reduceMotion}
        />
      ))}

      {/* Signal lines Béjaïa → every country */}
      {REGIONS.filter((r) => !r.isHub).map((region) => {
        const isFocused = focusedId === region.id;
        return (
          <path
            key={`route-${region.id}`}
            d={hubPathTo(region)}
            fill="none"
            stroke={region.color}
            strokeWidth={isFocused ? 3.5 : 2}
            strokeOpacity={isFocused ? 1 : 0.58}
            className={`map-route-dash transition-all duration-200 ${isFocused ? 'map-route-active' : ''}`}
            pointerEvents="none"
          />
        );
      })}

      {/* Focused blob on top */}
      {REGIONS.filter((r) => r.id === focusedId).map((region) => (
        <CountryBlob
          key={region.id}
          region={region}
          focusedId={focusedId}
          onSelect={onSelect}
          reduceMotion={reduceMotion}
        />
      ))}

      {/* Béjaïa origin pulse */}
      <g aria-hidden="true">
        <RadarRings
          x={BEJAAIA.x}
          y={BEJAAIA.y}
          color="#FF6B2B"
          active
          reduceMotion={reduceMotion}
        />
        <circle
          cx={BEJAAIA.x}
          cy={BEJAAIA.y}
          r={9}
          fill="#FF6B2B"
          stroke="#FFFBF0"
          strokeWidth={3}
          filter={`url(#${baseId}-glow)`}
        />
      </g>

      {/* Country markers */}
      {REGIONS.map((region) => {
        const isFocused = focusedId === region.id;
        return (
          <g key={`marker-${region.id}`} pointerEvents="none" aria-hidden="true">
            {!region.isHub && (
              <RadarRings
                x={region.x}
                y={region.y}
                color={region.color}
                active={isFocused}
                reduceMotion={reduceMotion}
              />
            )}
            <circle
              cx={region.x}
              cy={region.y}
              r={isFocused ? 8 : 6}
              fill={region.color}
              stroke="#FFFBF0"
              strokeWidth={isFocused ? 3 : 2}
              filter={isFocused ? `url(#${baseId}-glow)` : undefined}
              className="transition-all duration-200"
            />
          </g>
        );
      })}
    </svg>
  );
}

export default function Distribution() {
  const [activeId, setActiveId] = useState<RegionId>('algerie');
  const [hoverId, setHoverId] = useState<RegionId | null>(null);
  const reduceMotion = useReducedMotion();

  const focusedId = hoverId ?? activeId;
  const focused = REGIONS.find((r) => r.id === focusedId) ?? HUB;

  return (
    <section
      id="distribution"
      data-nav-theme="light"
      className="relative border-t border-[#1A1208]/10 bg-[#FFF8E7] py-24 md:py-28"
    >
      <div className="container mx-auto px-6 text-center">
        <p
          data-gsap-text
          data-gsap-split="words"
          data-gsap-start="top 92%"
          data-gsap-end="top 62%"
          className="mb-3 flex items-center justify-center gap-2 font-nunito text-sm font-bold uppercase tracking-[0.3em] text-[#1A1208]/45"
        >
          <MapPin className="h-4 w-4 text-[#FF6B2B]" strokeWidth={2.5} aria-hidden="true" />
          Trouver IZEM
        </p>

        <h2
          data-gsap-text
          data-gsap-split="words"
          data-gsap-words-stagger="0.04"
          data-gsap-start="top 88%"
          data-gsap-end="top 48%"
          className="font-bebas mb-4 text-[52px] text-[#1A1208] md:text-[64px]"
        >
          L&apos;ÉNERGIE SANS FRONTIÈRES
        </h2>

        <p
          data-gsap-text
          data-gsap-split="words"
          data-gsap-words-stagger="0.02"
          data-gsap-start="top 85%"
          data-gsap-end="top 45%"
          className="mx-auto mb-10 max-w-2xl font-nunito text-lg text-[#1A1208]/80 md:text-xl"
        >
          De Béjaïa au reste du monde. Retrouvez IZEM partout où l&apos;audace vous mène.
        </p>

        <p
          className="mx-auto mb-8 min-h-[1.75rem] max-w-md font-nunito text-base font-semibold text-[#FF6B2B] transition-opacity duration-200 md:text-lg"
          aria-live="polite"
        >
          {focused.tagline}
        </p>

        <div
          id="distribution-map"
          data-gsap-text
          data-gsap-start="top 82%"
          data-gsap-end="top 38%"
          className="relative mx-auto aspect-[2/1] w-full max-w-5xl overflow-hidden rounded-3xl border border-[#1A1208]/10 bg-[#F3EBD4] shadow-[0_20px_60px_rgba(26,18,8,0.08)]"
        >
          <DistributionMap
            focusedId={focusedId}
            onSelect={setActiveId}
            reduceMotion={reduceMotion}
          />
        </div>

        <div
          data-gsap-stagger="0.08"
          data-gsap-start="top 80%"
          data-gsap-end="top 40%"
          className="mt-10 flex flex-wrap justify-center gap-3 md:gap-4"
          role="tablist"
          aria-label="Pays de distribution IZEM"
        >
          {REGIONS.map((region) => {
            const isActive = activeId === region.id;
            const isHovered = hoverId === region.id;
            return (
              <button
                key={region.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls="distribution-map"
                onClick={() => setActiveId(region.id)}
                onMouseEnter={() => setHoverId(region.id)}
                onMouseLeave={() => setHoverId(null)}
                onFocus={() => setHoverId(region.id)}
                onBlur={() => setHoverId(null)}
                className={`cursor-pointer rounded-full px-5 py-2 font-bebas text-lg tracking-wide transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B2B] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFF8E7] md:text-xl ${
                  isActive || isHovered
                    ? 'scale-105 bg-[#1A1208] text-[#FFFBF0] shadow-lg'
                    : 'bg-[#FFD93D]/35 text-[#1A1208] hover:bg-[#FFD93D]/55'
                }`}
                style={
                  isActive || isHovered
                    ? { boxShadow: `0 8px 24px ${region.color}40` }
                    : undefined
                }
              >
                {region.name}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
