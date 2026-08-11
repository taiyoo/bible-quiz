import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/data/assessments";

type AboutPageProps = {
  searchParams?: Promise<{ locale?: string; lang?: string }>;
};

const aboutCopy = {
  en: {
    eyebrow: "About This Tool",
    title: "TrueVine Quiz & Assessments",
    body: "Bible quiz games and spiritual assessments prepared for TrueVine Church communities, small groups, classes, and campaign follow-up.",
    logoLabel: "TrueVine Church logo",
    powered: "Powered by HoloCare backend",
    poweredBody: "Assessment campaign links, submissions, and result records are handled through the HoloCare backend integration.",
    privacyTitle: "Built for reflection",
    privacyBody: "Participants can explore the quiz and assessments without creating an account, and group leaders can use campaign links when follow-up is needed.",
    back: "Back to quiz hub",
    language: "Language",
  },
  id: {
    eyebrow: "Tentang Alat Ini",
    title: "TrueVine Kuis & Assessment",
    body: "Permainan kuis Alkitab dan assessment rohani untuk komunitas TrueVine Church, kelompok kecil, kelas, dan tindak lanjut kampanye.",
    logoLabel: "Logo TrueVine Church",
    powered: "Didukung backend HoloCare",
    poweredBody: "Link kampanye assessment, pengiriman jawaban, dan catatan hasil ditangani melalui integrasi backend HoloCare.",
    privacyTitle: "Dibangun untuk refleksi",
    privacyBody: "Peserta dapat mencoba kuis dan assessment tanpa membuat akun, sementara pemimpin grup dapat memakai link kampanye saat membutuhkan tindak lanjut.",
    back: "Kembali ke hub kuis",
    language: "Bahasa",
  },
} satisfies Record<Locale, {
  eyebrow: string;
  title: string;
  body: string;
  logoLabel: string;
  powered: string;
  poweredBody: string;
  privacyTitle: string;
  privacyBody: string;
  back: string;
  language: string;
}>;

export const metadata: Metadata = {
  title: "About | TrueVine Quiz & Assessments",
  description: "About TrueVine Quiz & Assessments and its HoloCare backend integration.",
};

function normalizeLocale(value?: string): Locale {
  return value === "id" || value === "bahasa" ? "id" : "en";
}

export default async function AboutPage({ searchParams }: AboutPageProps) {
  const params = await searchParams;
  const locale = normalizeLocale(params?.locale || params?.lang);
  const t = aboutCopy[locale];

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <main id="main-content" className="shell about-shell" tabIndex={-1}>
        <section className="about-panel" aria-labelledby="about-title">
          <nav className="about-nav" aria-label={t.language}>
            <Link className={locale === "en" ? "active" : ""} href="/about?locale=en" aria-current={locale === "en" ? "page" : undefined}>EN</Link>
            <Link className={locale === "id" ? "active" : ""} href="/about?locale=id" aria-current={locale === "id" ? "page" : undefined}>ID</Link>
          </nav>

          <div className="about-hero">
            <Image
              className="brand-logo about-logo"
              src="/truevine-logo.jpg"
              alt={t.logoLabel}
              width={512}
              height={512}
              priority
            />
            <div className="about-copy">
              <p className="eyebrow">{t.eyebrow}</p>
              <h1 id="about-title">{t.title}</h1>
              <p>{t.body}</p>
            </div>
          </div>

          <div className="about-detail-grid">
            <article>
              <h2>
                <a className="about-powered-link" href="https://www.holocare.app/about" target="_blank" rel="noopener noreferrer">
                  {t.powered}
                </a>
              </h2>
              <p>{t.poweredBody}</p>
            </article>
            <article>
              <h2>{t.privacyTitle}</h2>
              <p>{t.privacyBody}</p>
            </article>
          </div>

          <Link className="secondary-button about-back" href={`/?locale=${locale}`}>
            {t.back}
          </Link>
        </section>
      </main>
    </>
  );
}