import Image from "next/image";
import Link from "next/link";
import { siteName, siteUrl } from "../site";
import ReleaseArrow from "./ReleaseArrow";

// Spotify's cross-origin embed needs allow-same-origin for its playback postMessage calls.
/* oxlint-disable react/iframe-missing-sandbox */

function VinylIcon({ className }: { className: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="24" cy="24" r="15" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="24" cy="24" r="10" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="24" cy="24" r="3" fill="currentColor" />
    </svg>
  );
}

const disciplines = [
  {
    number: "01",
    title: "Recorded music",
    description:
      "From recording and original releases to music distribution, we grow a catalogue spanning multiple genres for audiences across Africa and beyond.",
    detail: "Create and release",
    symbol: "vinyl",
    color: "bg-[#f5e9e4]",
  },
  {
    number: "02",
    title: "Artist development",
    description:
      "Discovering, developing, and championing exceptional talent as artists build distinctive identities and lasting careers.",
    detail: "Build your identity",
    symbol: "◉",
    color: "bg-[#e7edef]",
  },
  {
    number: "03",
    title: "Merchandising",
    description:
      "Turning music and creative identity into merchandise that brings artists closer to their audiences.",
    detail: "Bring the brand to life",
    symbol: "vinyl",
    color: "bg-[#f2eddb]",
  },
  {
    number: "04",
    title: "Audiovisual production",
    description:
      "Compelling audiovisual experiences that give original music new ways to connect and travel.",
    detail: "Tell the story",
    symbol: "◉",
    color: "bg-[#e9e6f0]",
  },
  {
    number: "05",
    title: "Brand partnerships",
    description:
      "Creative partnerships that connect artists, brands, and audiences through culture.",
    detail: "Build together",
    symbol: "vinyl",
    color: "bg-[#e6ede7]",
  },
];

const playlists = [
  {
    id: "6t5KdJynPmNtl5w3Cjge3U",
    title: "4EVER WAVY 🌊",
    description:
      "Listen to 4EVER WAVY, a Spotify playlist by FOREVER, featured by Habix Music Group.",
  },
  {
    id: "2j02x8aOV6aB4Z1TWwrAJ6",
    title: "DEEP IN THE TROPICS",
    description:
      "Listen to DEEP IN THE TROPICS, a Spotify playlist by FOREVER, featured by Habix Music Group.",
  },
]

export default function IndexPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Organization",
                name: siteName,
                alternateName: "HMG",
                url: siteUrl,
                logo: `${siteUrl}/habix-logo-ink.png`,
                description:
                  "An independent music and entertainment company based in Nairobi, Kenya, working across recorded music, artist development, merchandising, audiovisual production, and brand partnerships.",
                foundingDate: "2024",
                address: {
                  "@type": "PostalAddress",
                  addressLocality: "Nairobi",
                  addressCountry: "KE",
                },
                knowsAbout: [
                  "Recorded music",
                  "Artist development",
                  "Music merchandising",
                  "Audiovisual production",
                  "Music brand partnerships",
                ],
              },
              {
                "@type": "ItemList",
                name: "Spotify playlists by FOREVER",
                description:
                  "Listen to 4EVER WAVY and DEEP IN THE TROPICS, playlists by FOREVER featured by Habix Music Group.",
                itemListElement: playlists.map((playlist, index) => ({
                  "@type": "ListItem",
                  position: index + 1,
                  item: {
                    "@type": "MusicPlaylist",
                    name: playlist.title,
                    description: playlist.description,
                    url: `https://open.spotify.com/playlist/${playlist.id}`,
                  },
                })),
              },
            ],
          }).replace(/</g, "\\u003c"),
        }}
      />
      <section className="overflow-hidden bg-habix-ink text-white">
        <div className="mx-auto grid min-h-[min(82vh,820px)] max-w-[100rem] items-center gap-10 px-4 py-14 md:grid-cols-[1.05fr_0.95fr] md:px-16 md:py-20 lg:px-32">
          <div className="relative z-10">
            <p className="mb-4 flex items-center gap-3 text-xs font-semibold tracking-[0.2em] text-habix-coral uppercase md:text-sm">
              <span className="h-px w-8 bg-habix-coral" />
              Independent music &amp; entertainment · Nairobi, Kenya
            </p>
            <h1 className="max-w-3xl text-5xl leading-[0.98] font-extrabold tracking-[-0.06em] md:text-7xl lg:text-8xl">
              Independent music,{" "}
              <span className="text-habix-coral">global</span> ambition.
            </h1>
            <p className="mt-5 max-w-xl font-serif text-lg leading-relaxed text-white/75 md:text-xl">
              We bring labels, artists, and creative ventures together to shape
              the future of independent music, from Nairobi to audiences across
              Africa and beyond.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-4">
              <Link
                className="rounded-full bg-habix-coral px-5 py-3 text-sm font-bold text-black transition hover:bg-white"
                href="#sound"
              >
                Explore the group <ReleaseArrow />
              </Link>
              <span className="text-xs tracking-[0.16em] text-white/55 uppercase">
                Creative independence. Strategic execution.
              </span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[620px]">
            <div
              aria-hidden="true"
              className="absolute -inset-8 rounded-full bg-habix-coral/10 blur-3xl"
            />
            <Link
              aria-label="Listen to GAGA on Spotify"
              className="group relative block rotate-[-3deg] overflow-hidden rounded-2xl shadow-2xl shadow-black/20 transition duration-500 hover:rotate-0"
              href="https://open.spotify.com/album/0qhxJzZYffPHSSzgOYth6C"
              rel="noreferrer"
              target="_blank"
            >
              <Image
                alt="Black-and-white portrait of a musician wearing a VIP Women’s Club shirt"
                className="aspect-square h-auto w-full object-cover transition duration-300 group-hover:scale-105"
                height={3000}
                loading="eager"
                quality={90}
                sizes="(max-width: 768px) 90vw, (max-width: 1280px) 45vw, 600px"
                src="/vip-womens-club-artist.jpg"
                width={3000}
              />
              <span className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/85 to-transparent px-5 pt-14 pb-5 text-sm font-bold text-white">
                Listen to GAGA <ReleaseArrow />
              </span>
            </Link>
            <div className="absolute -right-1 bottom-2 rotate-3 rounded-full border border-white/25 bg-habix-ink px-4 py-2 text-xs font-semibold tracking-[0.12em] text-white uppercase md:right-0 md:bottom-4">
              Nairobi · Est. 2024
            </div>
          </div>
        </div>
        <div className="border-t border-white/15">
          <div className="mx-auto flex max-w-[100rem] items-center justify-between px-4 py-4 text-[10px] tracking-[0.18em] text-white/55 uppercase md:px-16 lg:px-32">
            <span>Recorded music</span>
            <span>Artist development</span>
            <span>Audiovisual production</span>
          </div>
        </div>
      </section>

      <section
        id="sound"
        aria-labelledby="sound-title"
        className="scroll-mt-24 bg-white px-4 py-20 md:px-16 md:py-28 lg:px-32"
      >
        <div className="mx-auto max-w-[100rem]">
          <div className="mb-10 grid gap-5 md:mb-14 md:grid-cols-[1fr_0.8fr] md:items-end">
            <div>
              <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-habix-ink uppercase">
                An integrated independent platform
              </p>
              <h2
                id="sound-title"
                className="max-w-2xl text-4xl leading-tight font-extrabold tracking-[-0.05em] md:text-6xl"
              >
                A group built to move music forward.
              </h2>
            </div>
            <p className="max-w-lg font-serif text-lg leading-relaxed text-gray-600 md:justify-self-end">
              From recorded music and artist development to merchandising,
              audiovisual production, and brand partnerships, HMG brings the
              pieces together to help artists grow their reach and create
              lasting value.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {disciplines.map((discipline) => (
              <article
                className={`group flex min-h-[300px] flex-col justify-between rounded-md p-5 transition duration-300 hover:-translate-y-1 md:min-h-[350px] md:p-5 ${discipline.color}`}
                key={discipline.number}
              >
                <div className="flex items-start justify-between">
                  <span className="text-xs font-semibold tracking-[0.18em] text-black/50">
                    {discipline.number}
                  </span>
                  <span
                    aria-hidden="true"
                    className="text-4xl text-habix-ink transition duration-300 group-hover:rotate-12"
                  >
                    {discipline.symbol === "vinyl" ? (
                      <VinylIcon className="h-10 w-10" />
                    ) : (
                      discipline.symbol
                    )}
                  </span>
                </div>
                <div>
                  <h3 className="text-2xl font-extrabold tracking-tight md:text-3xl">
                    {discipline.title}
                  </h3>
                  <p className="mt-3 max-w-sm font-serif leading-relaxed text-black/65">
                    {discipline.description}
                  </p>
                  <p className="mt-5 text-xs font-bold tracking-[0.12em] text-habix-ink uppercase">
                    {discipline.detail} <ReleaseArrow />
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="labels"
        aria-labelledby="labels-title"
        className="scroll-mt-24 bg-habix-ink px-4 py-20 text-white md:px-16 md:py-28 lg:px-32"
      >
        <div className="mx-auto max-w-[100rem]">
          <div className="mb-10 flex flex-col gap-5 md:mb-14 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-habix-coral uppercase">
                A portfolio with a shared ambition
              </p>
              <h2
                id="labels-title"
                className="max-w-3xl text-4xl leading-tight font-extrabold tracking-[-0.05em] md:text-6xl"
              >
                Multiple labels. One independent vision.
              </h2>
            </div>
            <p className="max-w-md font-serif text-lg leading-relaxed text-white/70">
              Distinct label identities, connected by a commitment to creative
              excellence and cultural impact.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <article className="flex min-h-[260px] flex-col justify-between rounded-md bg-habix-coral p-5 text-black transition hover:-translate-y-1 md:min-h-[320px] md:p-8">
              <div className="flex items-start justify-between">
                <span className="text-xs font-semibold tracking-[0.18em]">
                  01 / KENYA
                </span>
                <VinylIcon className="h-8 w-8" />
              </div>
              <h3 className="max-w-sm text-3xl leading-tight font-extrabold tracking-[-0.05em] md:text-4xl">
                VIP Women&rsquo;s Club
              </h3>
            </article>
            <article className="flex min-h-[260px] flex-col justify-between rounded-md bg-white p-5 text-black transition hover:-translate-y-1 md:min-h-[320px] md:p-8">
              <div className="flex items-start justify-between">
                <span className="text-xs font-semibold tracking-[0.18em]">
                  02 / KENYA
                </span>
                <span aria-hidden="true" className="text-3xl text-habix-ink">
                  ◉
                </span>
              </div>
              <h3 className="max-w-sm text-3xl leading-tight font-extrabold tracking-[-0.05em] md:text-4xl">
                DISTURB THE PEACE
              </h3>
            </article>
            <article className="flex min-h-[260px] flex-col justify-between rounded-md bg-[#f2eddb] p-5 text-black transition hover:-translate-y-1 md:min-h-[320px] md:p-8">
              <div className="flex items-start justify-between">
                <span className="text-xs font-semibold tracking-[0.18em]">
                  03 / SOUTH AFRICA
                </span>
                <VinylIcon className="h-8 w-8 text-habix-ink" />
              </div>
              <h3 className="max-w-sm text-3xl leading-tight font-extrabold tracking-[-0.05em] md:text-4xl">
                Pitori Sound Syndicate
              </h3>
            </article>
          </div>
        </div>
      </section>

      <section
        id="playlists"
        aria-labelledby="playlists-title"
        className="scroll-mt-24 bg-[#f5f4f0] px-4 py-20 md:px-16 md:py-28 lg:px-32"
      >
        <div className="mx-auto max-w-[100rem]">
          <div className="mb-10 flex flex-col gap-5 md:mb-14 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-habix-ink uppercase">
                The HMG listening room
              </p>
              <h2
                id="playlists-title"
                className="max-w-3xl text-4xl leading-tight font-extrabold tracking-[-0.05em] md:text-6xl"
              >
                Playlists for the journey.
              </h2>
            </div>
            <p className="max-w-md font-serif text-lg leading-relaxed text-gray-600">
              Discover 4EVER WAVY and DEEP IN THE TROPICS, two Spotify
              playlists by FOREVER featured by Habix Music Group in Nairobi,
              Kenya.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            {playlists.map((playlist) => (
              <article
                className="overflow-hidden rounded-xl border border-black/10 bg-white p-3 shadow-sm md:p-4"
                key={playlist.id}
              >
                <div className="mb-3 flex items-center justify-between gap-4 px-1">
                  <div>
                    <h3 className="text-xl font-extrabold tracking-tight md:text-2xl">
                      {playlist.title}
                    </h3>
                    <p className="mt-1 text-xs tracking-[0.12em] text-gray-500 uppercase">
                      By FOREVER on Spotify
                    </p>
                  </div>
                  <Link
                    aria-label={`Listen to ${playlist.title} on Spotify`}
                    className="shrink-0 text-xs font-bold tracking-[0.08em] text-habix-ink uppercase transition hover:text-habix-coral"
                    href={`https://open.spotify.com/playlist/${playlist.id}`}
                    rel="noreferrer"
                    target="_blank"
                  >
                    Listen on Spotify <ReleaseArrow />
                  </Link>
                </div>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-gray-600">
                  {playlist.description}
                </p>
                <iframe
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  className="block h-[352px] w-full rounded-lg border-0"
                  loading="lazy"
                  sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-popups-to-escape-sandbox"
                  src={`https://open.spotify.com/embed/playlist/${playlist.id}?utm_source=generator`}
                  title={`Spotify playlist: ${playlist.title}`}
                />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="about"
        aria-labelledby="about-title"
        className="scroll-mt-24 bg-[#f5f4f0] px-4 py-20 md:px-16 md:py-28 lg:px-32"
      >
        <div className="mx-auto grid max-w-[100rem] gap-10 md:grid-cols-[0.85fr_1.15fr] md:items-center md:gap-20">
          <Link
            aria-label="Listen to Matriarch on Spotify"
            className="group relative mx-auto block w-full max-w-[460px] overflow-hidden rounded-2xl"
            href="https://open.spotify.com/album/3zYQw9LGAltIr14AL8z8cm"
            rel="noreferrer"
            target="_blank"
          >
            <Image
              alt="Matriarch CA artist portrait"
              className="aspect-square h-auto w-full object-cover transition duration-300 group-hover:scale-105"
              height={3000}
              quality={90}
              sizes="(max-width: 768px) 90vw, 460px"
              src="/matriarch-ca.jpg"
              width={3000}
            />
            <span className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/85 to-transparent px-5 pt-14 pb-5 text-sm font-bold text-white">
              Listen to Matriarch <ReleaseArrow />
            </span>
          </Link>
          <div>
            <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-habix-ink uppercase">
              Our point of view
            </p>
            <h2
              id="about-title"
              className="max-w-2xl text-4xl leading-tight font-extrabold tracking-[-0.05em] md:text-6xl"
            >
              Creative independence. Shared ambition.
            </h2>
            <div className="mt-5 max-w-2xl space-y-4 font-serif text-lg leading-relaxed text-gray-600">
              <p>
                Habix Music Group is an independent music and entertainment
                company at the intersection of recorded music, artist
                development, merchandising, and audiovisual production.
              </p>
              <p>
                Through our labels and creative partnerships, we discover,
                develop, and champion exceptional talent, helping artists build
                distinctive identities, expand their reach, and create lasting
                value from their work.
              </p>
              <p>
                With a growing catalogue spanning multiple genres and a vision rooted in
                global ambition, we combine creative independence,
                entrepreneurial thinking, and strategic execution to compete on
                the world stage.
              </p>
            </div>
            <div className="mt-5 flex items-center gap-4 border-t border-gray-300 pt-5">
              <span className="text-3xl font-extrabold tracking-[-0.06em] text-habix-ink">
                2024
              </span>
              <span className="max-w-[180px] text-xs leading-relaxed tracking-[0.12em] text-gray-500 uppercase">
                Founded in Nairobi. Looking beyond borders.
              </span>
            </div>
          </div>
        </div>
      </section>

      <section
        id="ambition"
        aria-labelledby="ambition-title"
        className="scroll-mt-24 bg-habix-coral px-4 py-20 md:px-16 md:py-28 lg:px-32"
      >
        <div className="mx-auto grid max-w-[100rem] gap-8 xl:grid-cols-[minmax(0,1fr)_360px] xl:items-center xl:gap-16">
          <div>
            <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-black/60 uppercase">
              From Nairobi to the global stage
            </p>
            <h2
              id="ambition-title"
              className="max-w-3xl text-4xl leading-tight font-extrabold tracking-[-0.05em] md:text-6xl"
            >
              Building the next generation of independent music.
            </h2>
            <p className="mt-4 max-w-xl font-serif text-lg leading-relaxed text-black/70">
              We&rsquo;re committed to discovering influential artists,
              developing enduring music brands, and building one of the
              world&rsquo;s most commercially successful independent music
              companies.
            </p>
          </div>
          <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-end xl:flex-col xl:items-end">
            <div className="w-full max-w-[360px] overflow-hidden rounded-sm border border-black/10 shadow-xl shadow-black/15">
              <Image
                alt="1912 CA cover artwork"
                className="aspect-square h-auto w-full object-cover"
                height={3000}
                quality={90}
                sizes="(max-width: 640px) 90vw, (max-width: 1280px) 45vw, 360px"
                src="/1912-ca-cover.jpg"
                width={3000}
              />
            </div>
            <Link
              className="inline-flex w-fit items-center gap-3 border-b-2 border-black pb-2 text-lg font-bold transition hover:gap-5"
              href="#labels"
            >
              Our labels <ReleaseArrow />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
