import Image from "next/image";

function ChipFloatingDecor() {
  // 3 jetons PNG, positions + tailles + vitesses différentes
  const chips = useMemo(
    () => [
      { x: "8%", y: "22%", size: 120, rotate: -18, d: 0.0, dur: 7.5 },
      { x: "10%", y: "70%", size: 150, rotate: 12, d: 0.4, dur: 9.0 },
      { x: "92%", y: "35%", size: 110, rotate: 20, d: 0.2, dur: 8.2 },
    ],
    []
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* halos orange très doux */}
      <div className="absolute -left-28 top-20 h-80 w-80 rounded-full bg-orange-200/35 blur-3xl" />
      <div className="absolute -right-28 top-44 h-80 w-80 rounded-full bg-orange-200/25 blur-3xl" />

      {chips.map((c, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: c.x,
            top: c.y,
            transform: `translate(-50%, -50%) rotate(${c.rotate}deg)`,
          }}
        >
          <div
            className="chip-space"
            style={{
              animationDelay: `${c.d}s`,
              animationDuration: `${c.dur}s`,
            }}
          >
            <Image
              src="/chip.png"
              alt="Casino chip"
              width={c.size}
              height={c.size}
              className="drop-shadow-[0_25px_55px_rgba(0,0,0,0.18)]"
              priority
            />
          </div>
        </div>
      ))}

      <style jsx global>{`
        /* mouvement "dans l'espace": flottement + drift + rotation légère */
        @keyframes chipSpace {
          0% {
            transform: translate3d(0px, 0px, 0px) rotate(0deg);
          }
          25% {
            transform: translate3d(12px, -18px, 0px) rotate(6deg);
          }
          50% {
            transform: translate3d(-10px, -28px, 0px) rotate(-4deg);
          }
          75% {
            transform: translate3d(-14px, -10px, 0px) rotate(8deg);
          }
          100% {
            transform: translate3d(0px, 0px, 0px) rotate(0deg);
          }
        }
        .chip-space {
          animation: chipSpace 8s ease-in-out infinite;
          will-change: transform;
        }
      `}</style>
    </div>
  );
}
