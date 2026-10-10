# Finelo – 40s promo (Remotion)

A 40-second app-promo motion graphic for Finelo, built with Remotion (React + TypeScript).

| Composition   | Size      | Output                |
| ------------- | --------- | --------------------- |
| `Finelo-9x16` | 1080×1920 | `out/finelo-9x16.mp4` |
| `Finelo-16x9` | 1920×1080 | `out/finelo-16x9.mp4` |

Both run at 30 fps for 1200 frames and share the same scenes. Each scene reads `useLayout()` (`src/layout.ts`) and switches between a stacked vertical layout and a copy-left / phone-right landscape layout.

```bash
npm install
npx remotion studio          # preview, scrub, edit live
npm run render               # renders both MP4s (h264, CRF 18) into out/
npm run render:vertical      # just 9:16
npm run render:landscape     # just 16:9
```

## Swapping in real screenshots

Put PNGs in `public/screens/` with these names:

| File                 | Scene                                      |
| -------------------- | ------------------------------------------ |
| `scan-patterns.png`  | Scan for Patterns (Master Trading with AI) |
| `ai-bots.png`        | Practice with AI bots                      |
| `simulator.png`      | Trade in our Simulator                     |
| `learning-paths.png` | Challenge yourself                         |
| `league.png`         | Show your progression                      |
| `profile.png`        | reserved (not used by a scene yet)         |

You don't need to change any code. When a file exists, `<PhoneMockup src=…>` shows it in place of the built-in React recreation (`src/screens/*`). The screenshot covers the phone screen and is anchored to the top. Use full-screen captures at about 1170×2532 (iPhone, portrait). File names are mapped in `src/assets.ts`.

The overlays that sit on top of the phone stay in either case: the starburst badges, the bot step strip, the DOWN/UP panel, chips and stat cards. To remove one, delete it from its scene file.

## Changing text

All copy lives in the scene files in `src/scenes/`:

- **Headlines.** `<Headline lines={[["Practice", "with"], [{ pill: "AI bots" }]]} />`. Each inner array is one line, and `{ pill: "…" }` puts that keyword in the white pill.
- **Sub-lines.** `<SubText>…</SubText>`.
- **Stats and counters.** `<CountUp to={184} … />`, plus the `STATS` array in `Proof.tsx`.
- **Chips.** The `CHIPS` array in `Learning.tsx`.
- **Steps.** The `STEPS` array in `Bots.tsx`.
- **Bot cards.** The `BOTS` array in `src/screens/BotsScreen.tsx`.
- **CTA, URL and disclaimer.** `src/scenes/Cta.tsx`.

Colours are in `src/theme.ts` (`C.violet`, `C.green`, …). The spring used for kinetic type is `SPRING` (damping 12, mass 0.6).

## Adjusting timings

`src/timeline.ts` is the storyboard:

```ts
export const SCENES = {
  hook: { from: 0, dur: 90 },
  brand: { from: 90, dur: 90 },
  ...
};
```

- `from` / `dur` are in frames at 30 fps. A beat at 120 BPM is 15 frames (`BEAT`). Keep scene starts on multiples of 15 so the cuts land on the beat.
- If you change the overall length, update `TOTAL_FRAMES` too.
- `OVERLAP` (12 frames) is how long the outgoing scene keeps playing under the incoming transition.
- Animation cues inside a scene are frame numbers relative to the scene start, e.g. `delay={60}`, `TAP_AT = 100`.

The transitions are set per scene with `<SceneFrame enter=… exit=…>`:

- `enter`: `"circle"` (violet circular wipe), `"whip"` (whip-pan with horizontal motion blur) or `"zoom"`.
- `exit`: `"whip"`, or `"zoom"` (flies into the phone screen at `zoomOrigin`).

Pair a `whip` exit with a `whip` enter on the next scene, and a `zoom` exit with a `zoom` enter.

## Music

Drop a track at `public/music.mp3` and it plays automatically. `src/Main.tsx` only mounts the `<Audio>` when the file exists, and fades it in and out. The cuts are on a 120 BPM grid, so a 120 BPM track starting on a downbeat will sync.

## Fonts

Inter (500/700/800/900) loads through `@remotion/google-fonts`. If the render machine can't reach `fonts.gstatic.com` (offline, or behind a TLS-intercepting proxy), render with the bundled copy instead:

```bash
REMOTION_LOCAL_FONTS=1 npm run render
```

## Structure

```
src/
  Root.tsx            registers Finelo-9x16 and Finelo-16x9
  Main.tsx            sequences the scenes + music slot
  timeline.ts         storyboard (frames)
  theme.ts            colours, font, spring
  layout.ts           9:16 vs 16:9 positions/sizes
  assets.ts           screenshot file names, hasStatic()
  scenes/             Hook, Brand, Scan, Bots, Simulator, Learning, League, Proof, Cta
  components/         Headline, PillWord, SubText, Sparkle, StarBurstBadge, PhoneMockup,
                      CountUp, CandleChart, ProgressBar, BotCard, Tap, FineloLogo,
                      Background, SceneFrame (transitions)
  screens/            React recreations of the app screens (used until screenshots exist)
  illustrations/      Robot, Bull, Trophy, Avatar, Flame, Laurel
public/
  brand/finelo-wordmark.png
  fonts/Inter-latin-var.woff2
  screens/            ← your screenshots
```

The stats and the award line are placeholders taken from the brief ("1,500,000+ learners", "Newsweek & Statista"). Check them against current marketing claims before publishing.
