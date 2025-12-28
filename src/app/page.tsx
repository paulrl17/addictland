"use client";

import React, { useMemo, useState } from "react";

type Screen = "auth" | "onboarding" | "home";
type Sport = "All" | "MMA" | "CS" | "Foot";

function cn(...xs: Array<string | false | undefined | null>) {
  return xs.filter(Boolean).join(" ");
}

function ChipFloatingDecor() {
  const chips = useMemo(
    () => [
      { x: "6%", y: "18%", s: 0.9, r: -12, o: 0.65, d: 0 },
      { x: "10%", y: "62%", s: 1.1, r: 16, o: 0.55, d: 0.6 },
      { x: "90%", y: "22%", s: 1.0, r: 10, o: 0.6, d: 0.2 },
      { x: "92%", y: "64%", s: 0.85, r: -18, o: 0.5, d: 0.9 },
      { x: "84%", y: "44%", s: 0.7, r: 22, o: 0.35, d: 0.4 },
    ],
    []
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -left-28 top-20 h-80 w-80 rounded-full bg-orange-200/40 blur-3xl" />
      <div className="absolute -right-28 top-44 h-80 w-80 rounded-full bg-orange-200/30 blur-3xl" />

      {chips.map((c, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: c.x,
            top: c.y,
            opacity: c.o,
            transform: `translate(-50%, -50%) scale(${c.s}) rotate(${c.r}deg)`,
            animationDelay: `${c.d}s`,
          }}
        >
          <div className="animate-float">
            <div className="relative h-24 w-24 rounded-full bg-white shadow-[0_20px_60px_rgba(0,0,0,0.12)] ring-1 ring-black/5">
              <div className="absolute inset-0 rounded-full ring-2 ring-orange-400/40" />
              <div className="absolute inset-3 rounded-full border border-orange-500/20" />
              <div className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/10" />
              <div className="absolute left-6 top-5 h-2.5 w-10 rotate-[-15deg] rounded-full bg-white/70 blur-[0.5px]" />
            </div>
          </div>
        </div>
      ))}

      <style jsx global>{`
        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-14px);
          }
          100% {
            transform: translateY(0px);
          }
        }
        .animate-float {
          animation: float 5.2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

function Button({
  children,
  variant = "primary",
  onClick,
  disabled,
}: {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  onClick?: () => void;
  disabled?: boolean;
}) {
  const base =
    "inline-flex items-center justify-center rounded-2xl px-4 py-2.5 text-sm font-semibold transition active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed";
  const styles =
    variant === "primary"
      ? "bg-orange-500 text-white shadow-[0_18px_40px_rgba(249,115,22,0.25)] hover:bg-orange-600"
      : variant === "secondary"
      ? "bg-white text-black ring-1 ring-black/10 hover:bg-black/5"
      : "bg-transparent text-black/70 hover:text-black hover:bg-black/5";
  return (
    <button className={cn(base, styles)} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}

function Input({
  label,
  placeholder,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <label className="block">
      <div className="mb-1.5 text-xs font-semibold text-black/70">{label}</div>
      <input
        className="w-full rounded-2xl bg-white px-4 py-3 text-sm ring-1 ring-black/10 outline-none transition focus:ring-2 focus:ring-orange-500/40"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        type={type}
      />
    </label>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-3xl bg-white/85 p-6 shadow-[0_30px_80px_rgba(0,0,0,0.12)] ring-1 ring-black/5 backdrop-blur">
      {children}
    </div>
  );
}

export default function Page() {
  const [screen, setScreen] = useState<Screen>("auth");
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [pseudo, setPseudo] = useState("");
  const [ppName, setPpName] = useState("");

  const [sport, setSport] = useState<Sport>("All");

  const matches = useMemo(
    () => [
      { id: 1, sport: "CS", title: "Vitality vs G2", time: "Aujourd’hui 19:00" },
      { id: 2, sport: "MMA", title: "Cyril Gane vs X", time: "Samedi 22:00" },
      { id: 3, sport: "Foot", title: "PSG vs Lyon", time: "Dimanche 21:00" },
      { id: 4, sport: "CS", title: "NAVI vs FaZe", time: "Demain 16:30" },
    ],
    []
  );

  const filtered = matches.filter((m) => sport === "All" || m.sport === sport);

  return (
    <div className="min-h-screen bg-white text-black">
      <header className="sticky top-0 z-20 border-b border-black/5 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-orange-500/10 ring-1 ring-orange-500/20" />
            <div>
              <div className="text-sm font-extrabold tracking-tight">
                Addictland
              </div>
              <div className="text-xs text-black/55">
                coins mensuels • battles • classement
              </div>
            </div>
          </div>

          {screen === "home" ? (
            <div className="flex items-center gap-2">
              {(["MMA", "CS", "Foot"] as Sport[]).map((s) => (
                <button
                  key={s}
                  className={cn(
                    "rounded-2xl px-3 py-2 text-sm font-semibold transition",
                    sport === s
                      ? "bg-orange-500 text-white"
                      : "bg-white ring-1 ring-black/10 hover:bg-black/5"
                  )}
                  onClick={() => setSport(s)}
                >
                  {s}
                </button>
              ))}
              <button
                className={cn(
                  "rounded-2xl px-3 py-2 text-sm font-semibold transition",
                  sport === "All"
                    ? "bg-black text-white"
                    : "bg-white ring-1 ring-black/10 hover:bg-black/5"
                )}
                onClick={() => setSport("All")}
                title="Voir tous les sports"
              >
                All
              </button>
            </div>
          ) : (
            <div className="text-xs text-black/50">Privé • Connexion</div>
          )}
        </div>
      </header>

      {(screen === "auth" || screen === "onboarding") && (
        <main className="relative">
          <ChipFloatingDecor />
          <div className="mx-auto flex min-h-[calc(100vh-72px)] max-w-6xl items-center justify-center px-5 py-14">
            {screen === "auth" ? (
              <div className="w-full max-w-md">
                <Card>
                  <div className="mb-6">
                    <div className="text-2xl font-extrabold tracking-tight">
                      {authMode === "login" ? "Se connecter" : "Créer un compte"}
                    </div>
                    <div className="mt-1 text-sm text-black/60">
                      Site privé : connexion requise pour accéder aux matchs et
                      classements.
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button
                      variant="secondary"
                      onClick={() => setScreen("onboarding")}
                    >
                      Continuer avec Google (mock)
                    </Button>

                    <div className="flex items-center gap-3 py-2">
                      <div className="h-px flex-1 bg-black/10" />
                      <div className="text-xs text-black/45">ou</div>
                      <div className="h-px flex-1 bg-black/10" />
                    </div>

                    <Input
                      label="Email"
                      placeholder="toi@mail.com"
                      value={email}
                      onChange={setEmail}
                      type="email"
                    />
                    <Input
                      label="Mot de passe"
                      placeholder="••••••••"
                      value={password}
                      onChange={setPassword}
                      type="password"
                    />

                    <Button
                      onClick={() => setScreen("onboarding")}
                      disabled={!email || !password}
                    >
                      {authMode === "login" ? "Connexion" : "Inscription"}
                    </Button>

                    <div className="pt-2 text-center text-sm text-black/60">
                      {authMode === "login" ? (
                        <>
                          Pas de compte ?{" "}
                          <button
                            className="font-semibold text-orange-600 hover:underline"
                            onClick={() => setAuthMode("signup")}
                          >
                            S’inscrire
                          </button>
                        </>
                      ) : (
                        <>
                          Déjà un compte ?{" "}
                          <button
                            className="font-semibold text-orange-600 hover:underline"
                            onClick={() => setAuthMode("login")}
                          >
                            Se connecter
                          </button>
                        </>
                      )}
                    </div>

                    <div className="pt-3 text-xs text-black/45">
                      * Prototype visuel. On branchera Google + email ensuite.
                    </div>
                  </div>
                </Card>
              </div>
            ) : (
              <div className="w-full max-w-md">
                <Card>
                  <div className="mb-6">
                    <div className="text-2xl font-extrabold tracking-tight">
                      Créer ton profil
                    </div>
                    <div className="mt-1 text-sm text-black/60">
                      Ajoute une photo et choisis un pseudo pour jouer avec tes
                      potes.
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="rounded-3xl bg-black/3 p-4 ring-1 ring-black/5">
                      <div className="flex items-center gap-4">
                        <div className="grid h-14 w-14 place-items-center rounded-2xl bg-orange-500/10 ring-1 ring-orange-500/20 text-xs text-black/60">
                          {ppName ? "PP" : "?"}
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-semibold">Photo</div>
                          <div className="text-xs text-black/55">
                            Upload uniquement (V1). {ppName ? ppName : ""}
                          </div>
                        </div>
                        <label className="cursor-pointer">
                          <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={(e) =>
                              setPpName(e.target.files?.[0]?.name ?? "")
                            }
                          />
                          <span className="rounded-2xl bg-white px-3 py-2 text-sm font-semibold ring-1 ring-black/10 hover:bg-black/5">
                            Choisir
                          </span>
                        </label>
                      </div>
                    </div>

                    <Input
                      label="Pseudo"
                      placeholder="ex: LeParieurFou"
                      value={pseudo}
                      onChange={setPseudo}
                    />

                    <div className="flex gap-2">
                      <Button variant="ghost" onClick={() => setScreen("auth")}>
                        Retour
                      </Button>
                      <div className="flex-1" />
                      <Button
                        onClick={() => setScreen("home")}
                        disabled={!pseudo || !ppName}
                      >
                        Continuer
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            )}
          </div>
        </main>
      )}

      {screen === "home" && (
        <main className="mx-auto max-w-6xl px-5 py-6">
          <div className="grid grid-cols-12 gap-4">
            <aside className="col-span-12 lg:col-span-3">
              <div className="rounded-3xl bg-white p-4 ring-1 ring-black/10 shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-2xl bg-orange-500/10 ring-1 ring-orange-500/20" />
                  <div>
                    <div className="text-sm font-extrabold">
                      {pseudo || "TonNom"}
                    </div>
                    <div className="text-xs text-black/55">100 coins</div>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  {["Profil", "Mes paris", "Matchs", "Classement"].map((x) => (
                    <button
                      key={x}
                      className="w-full rounded-2xl px-3 py-2 text-left text-sm font-semibold ring-1 ring-black/10 hover:bg-black/5"
                    >
                      {x}
                    </button>
                  ))}
                  <button
                    className="w-full rounded-2xl px-3 py-2 text-left text-sm font-semibold text-red-600 ring-1 ring-black/10 hover:bg-red-50"
                    onClick={() => setScreen("auth")}
                  >
                    Déconnexion (mock)
                  </button>
                </div>
              </div>
            </aside>

            <section className="col-span-12 lg:col-span-6">
              <div className="rounded-3xl bg-white p-4 ring-1 ring-black/10 shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-lg font-extrabold tracking-tight">
                      Matchs {sport === "All" ? "(mélangés)" : `(${sport})`}
                    </div>
                    <div className="text-sm text-black/55">
                      Clique un match pour parier + discuter.
                    </div>
                  </div>
                  <Button variant="secondary">Ajouter (admin)</Button>
                </div>

                <div className="mt-4 space-y-3">
                  {filtered.map((m) => (
                    <div
                      key={m.id}
                      className="rounded-3xl bg-white p-4 ring-1 ring-black/10 hover:bg-black/2 transition"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <div className="text-xs font-semibold text-orange-600">
                            {m.sport}
                          </div>
                          <div className="text-base font-extrabold">
                            {m.title}
                          </div>
                          <div className="text-sm text-black/55">{m.time}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="secondary">Voir</Button>
                          <Button>Parier</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <aside className="col-span-12 lg:col-span-3">
              <div className="rounded-3xl bg-white p-4 ring-1 ring-black/10 shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-lg font-extrabold tracking-tight">
                      Classement du mois
                    </div>
                    <div className="text-sm text-black/55">
                      Reset à 100 coins chaque mois.
                    </div>
                  </div>
                  <div className="grid h-10 w-10 place-items-center rounded-2xl bg-orange-500/10 ring-1 ring-orange-500/20">
                    👑
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  {[
                    { name: "RoiDuBet", coins: 164, badge: "🥇" },
                    { name: "LuckyBoy", coins: 132, badge: "🥈" },
                    { name: "Analyste", coins: 118, badge: "🥉" },
                    { name: pseudo || "Toi", coins: 100 },
                    { name: "Nono", coins: 86 },
                  ].map((u, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between rounded-2xl px-3 py-2 ring-1 ring-black/10"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-6 text-center text-sm">
                          {u.badge ?? `#${idx + 1}`}
                        </div>
                        <div className="text-sm font-semibold">{u.name}</div>
                      </div>
                      <div className="text-sm font-extrabold">{u.coins}</div>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </main>
      )}
    </div>
  );
}
