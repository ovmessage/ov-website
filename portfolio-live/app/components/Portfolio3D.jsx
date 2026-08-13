'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PORTFOLIO_DATA } from '../data';
import { getLenisInstance } from '../lib/lenis';
import {
  IconArrow,
  IconBalanceScale,
  IconDownload,
  IconFileContract,
  IconX,
  IconShieldUser,
  IconTiktok,
  IconUp,
  IconChat,
  IconYoutube,
  ServiceIcon,
} from './Icons';
import ContactModal from './ContactModal';
import BlurStagger from './BlurStagger';
import ImageLoader from './ImageLoader';
import ProjectCarousel from './ProjectCarousel';
import SkillRadarEffect from './SkillRadarEffect';

export default function Portfolio3D() {
  const [lang, setLang] = useState('fr');
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [contactIntent, setContactIntent] = useState('');
  const [contactMode, setContactMode] = useState('full');
  const servicesSectionRef = useRef(null);
  const servicesTitleRef = useRef(null);
  const servicesGridRef = useRef(null);
  const projectsSectionRef = useRef(null);
  const projectsTitleRef = useRef(null);
  const projectsCarouselRef = useRef(null);
  const experienceSectionRef = useRef(null);
  const experienceTitleRef = useRef(null);
  const experienceListRef = useRef(null);
  const skillsSectionRef = useRef(null);
  const skillsTitleRef = useRef(null);
  const skillsRadarRef = useRef(null);
  const ctaRef = useRef(null);
  const trustSectionRef = useRef(null);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = servicesSectionRef.current;
    const title = servicesTitleRef.current;
    const grid = servicesGridRef.current;
    if (!section || !title || !grid) return;

    const cards = grid.querySelectorAll('.v3-service');

    gsap.set(title, { opacity: 0, x: -80 });
    gsap.set(cards, { opacity: 0, y: -40 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 75%',
        toggleActions: 'play none none none',
      },
    });

    const cardDuration = 0.2;

    tl.to(title, {
      opacity: 1,
      x: 0,
      duration: 0.4,
      ease: 'power2.in',
      clearProps: 'transform',
    }).to(
      cards,
      {
        opacity: 1,
        y: 0,
        duration: cardDuration,
        ease: 'power2.in',
        stagger: cardDuration,
        clearProps: 'transform',
      },
      '-=0.2'
    );

    const projectsSection = projectsSectionRef.current;
    const projectsTitle = projectsTitleRef.current;
    const projectsCarousel = projectsCarouselRef.current;
    let projectsTl;

    if (projectsSection && projectsTitle && projectsCarousel) {
      const projectsTag = projectsSection.querySelector('.v3-section-tag');
      const projectsHead = [projectsTag, projectsTitle].filter(Boolean);

      gsap.set(projectsHead, { opacity: 0, y: -40 });
      gsap.set(projectsCarousel, { opacity: 0, y: -40 });

      projectsTl = gsap.timeline({
        scrollTrigger: {
          trigger: projectsSection,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      });

      projectsTl
        .to(projectsHead, {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: 'power2.in',
          clearProps: 'transform',
        })
        .to(
          projectsCarousel,
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: 'power2.in',
            clearProps: 'transform',
          },
          '-=0.15'
        );
    }

    const experienceSection = experienceSectionRef.current;
    const experienceTitle = experienceTitleRef.current;
    const experienceList = experienceListRef.current;
    let experienceTl;

    if (experienceSection && experienceTitle && experienceList) {
      const experienceTag = experienceSection.querySelector('.v3-section-tag');
      const experienceHead = [experienceTag, experienceTitle].filter(Boolean);
      const experienceItems = experienceList.querySelectorAll('.v3-exp');

      gsap.set(experienceHead, { opacity: 0, y: -40 });
      gsap.set(experienceItems, { opacity: 0, y: -40 });

      const expDuration = 0.25;

      experienceTl = gsap.timeline({
        scrollTrigger: {
          trigger: experienceSection,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      });

      experienceTl
        .to(experienceHead, {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: 'power2.in',
          clearProps: 'transform',
        })
        .to(
          experienceItems,
          {
            opacity: 1,
            y: 0,
            duration: expDuration,
            ease: 'power2.in',
            stagger: expDuration,
            clearProps: 'transform',
          },
          '-=0.15'
        );
    }

    const skillsSection = skillsSectionRef.current;
    const skillsTitle = skillsTitleRef.current;
    const skillsRadar = skillsRadarRef.current;
    let skillsTl;

    if (skillsSection && skillsTitle && skillsRadar) {
      const skillsTag = skillsSection.querySelector('.v3-section-tag');
      const skillsHead = [skillsTag, skillsTitle].filter(Boolean);
      const skillsIcons = skillsRadar.querySelectorAll('.skill-radar__icon-container');

      gsap.set(skillsHead, { opacity: 0, y: -40 });
      gsap.set(skillsIcons, { opacity: 0, scale: 0.6 });

      skillsTl = gsap.timeline({
        scrollTrigger: {
          trigger: skillsSection,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      });

      skillsTl
        .to(skillsHead, {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: 'power2.in',
          clearProps: 'transform',
        })
        .to(
          skillsIcons,
          {
            opacity: 1,
            scale: 1,
            duration: 0.9,
            ease: 'elastic.out(1, 0.5)',
            stagger: 0.12,
            clearProps: 'transform',
          },
          '-=0.15'
        );
    }

    const trustSection = trustSectionRef.current;
    let trustTl;

    if (trustSection) {
      gsap.set(trustSection, { opacity: 0, y: -40 });

      trustTl = gsap.timeline({
        scrollTrigger: {
          trigger: trustSection,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });

      trustTl.to(trustSection, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.in',
        clearProps: 'transform',
      });
    }

    const cta = ctaRef.current;
    let ctaTl;

    if (cta) {
      gsap.set(cta, { opacity: 0, y: -40 });

      ctaTl = gsap.timeline({
        scrollTrigger: {
          trigger: cta,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      ctaTl.to(cta, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power2.in',
        clearProps: 'transform',
      });
    }

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
      projectsTl?.scrollTrigger?.kill();
      projectsTl?.kill();
      experienceTl?.scrollTrigger?.kill();
      experienceTl?.kill();
      skillsTl?.scrollTrigger?.kill();
      skillsTl?.kill();
      ctaTl?.scrollTrigger?.kill();
      ctaTl?.kill();
      trustTl?.scrollTrigger?.kill();
      trustTl?.kill();
    };
  }, []);

  useEffect(() => {
    const target = document.querySelector('.v3-trust');
    if (!target) return;
    const observer = new IntersectionObserver(
      ([entry]) => setShowBackToTop(entry.boundingClientRect.bottom <= 0),
      { threshold: 0 }
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = menuOpen ? 'hidden' : original;
    return () => {
      document.body.style.overflow = original;
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  const t = PORTFOLIO_DATA[lang];
  const skills = PORTFOLIO_DATA.skills;
  const logos = PORTFOLIO_DATA.trustLogos;
  const serviceKinds = PORTFOLIO_DATA.serviceKinds;

  const scrollToTop = () => {
    const lenis = getLenisInstance();
    if (lenis) {
      lenis.scrollTo(0);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="v3">
      <div className="v3-bg" aria-hidden="true">
        <div className="v3-orb a" />
        <div className="v3-orb b" />
        <div className="v3-orb c" />
      </div>
      <div className="v3-grid" aria-hidden="true" />
      <header className="v3-header">
        <nav className="v3-nav" aria-label="Primary">
          {/* Logo OV. <picture> plutôt que next/image : l'export est en
              images.unoptimized, donc next/image n'apporterait rien ici et
              ajouterait un wrapper. Le .webp (11 Ko) sert de version légère
              devant le PNG (34 Ko). Fichiers dans public/, servis à la racine.
              ⛔ 192px et NON 96 : le footer l'affiche à 88px, il faut le 2x
              pour les écrans retina. ⛔ Ces deux fichiers portent un VRAI
              canal alpha (PNG colortype 6, WebP VP8L). Les précédents
              (icon_ov_96.png / icon_ov.webp) étaient opaques avec un fond
              #060708 incrusté, invisible sur le fond du site mais qui
              ressortait en carré noir dès qu'un halo passait derrière.
              ⛔ Ne jamais réencoder le webp en `VP8 ` simple : ce format ne
              peut PAS porter d'alpha, le fond noir reviendrait. */}
          <a className="v3-nav-logo" href="#home" aria-label="OV, retour en haut">
            <picture>
              <source srcSet="/icon_ov_192.webp" type="image/webp" />
              <img src="/icon_ov_192.png" alt="" width="26" height="26" />
            </picture>
            OV
          </a>
          <a className="v3-nav-link active" href="#home">{t.nav.home}</a>
          <a className="v3-nav-link" href="#projects">{t.nav.work}</a>
          <a className="v3-nav-link" href="#services">{t.nav.services}</a>
          {/* Le bouton « Discuter » a été retiré : il pointait sur #contact,
              exactement comme le lien Contact juste au-dessus. */}
          <a
            className="v3-nav-link"
            href="#contact"
            onClick={(e) => { e.preventDefault(); setContactMode('light'); setContactOpen(true); }}
          >
            {t.nav.contact}
          </a>
        </nav>
      </header>
      <button
        type="button"
        className="v3-lang-toggle"
        onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}
        aria-label={lang === 'fr' ? 'Switch to English' : 'Passer en français'}
      >
        {lang.toUpperCase()}
      </button>
      <button
        type="button"
        className="v3-burger"
        onClick={() => setMenuOpen((v) => !v)}
        aria-expanded={menuOpen}
        aria-controls="v3-mobile-menu"
        aria-label={
          menuOpen
            ? lang === 'fr' ? 'Fermer le menu' : 'Close menu'
            : lang === 'fr' ? 'Ouvrir le menu' : 'Open menu'
        }
      >
        <svg
          width={22}
          height={22}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path className="v3-burger-line top" d="M4 12L20 12" />
          <path className="v3-burger-line mid" d="M4 12H20" />
          <path className="v3-burger-line bot" d="M4 12H20" />
        </svg>
      </button>
      <div
        id="v3-mobile-menu"
        className={`v3-mobile-menu ${menuOpen ? 'open' : ''}`}
        aria-hidden={!menuOpen}
      >
        <nav aria-label="Mobile">
          <a href="#home" onClick={closeMenu}>{t.nav.home}</a>
          <a href="#projects" onClick={closeMenu}>{t.nav.work}</a>
          <a href="#services" onClick={closeMenu}>{t.nav.services}</a>
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); closeMenu(); setContactMode('light'); setContactOpen(true); }}
          >
            {t.nav.contact}
          </a>
        </nav>
        <button
          type="button"
          className="v3-mobile-menu-lang"
          onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}
        >
          {lang === 'fr' ? 'EN · English' : 'FR · Français'}
        </button>
      </div>
      <div className="v3-content">
        <section id="home" className="v3-hero">
          <div className="v3-hero-aurora" aria-hidden="true" />
          <div className="v3-hero-portrait-wrap">
            <div className="v3-hero-portrait">
              <Image
                src="/portrait.jpg"
                alt={t.name}
                width={260}
                height={340}
                priority
                sizes="(min-width: 1024px) 260px, 220px"
              />
            </div>
          </div>
          <h1 className="v3-hero-title">
            {t.title[0] ? (
              <>
                <BlurStagger
                  key={`t1-${lang}`}
                  text={t.title[0]}
                  className="grad"
                  block
                  delay={0.1}
                  duration={0.7}
                />
                <br />
              </>
            ) : null}
            <BlurStagger
              key={`t2-${lang}`}
              text={t.titleIt}
              className="it grad"
              block
              delay={0.45}
              duration={0.7}
            />
          </h1>
          <p className="v3-hero-sub">
            <BlurStagger
              key={`sub-${lang}`}
              text={t.sub}
              delay={1.0}
              perChar={0.008}
              duration={0.35}
            />
          </p>
        </section>

        <section className="v3-trust" aria-label={t.trustLabel} ref={trustSectionRef}>
          <div className="v3-trust-label">◆ {t.trustLabel} ◆</div>
          <div className="v3-trust-track">
            {[...logos, ...logos].map((l, i) => {
              const variant = i % 3 === 0 ? '' : i % 3 === 1 ? 'bold' : 'mono';
              return (
                <span key={i} className={`v3-trust-logo ${variant}`}>
                  {l}
                </span>
              );
            })}
          </div>
        </section>

        <section id="services" className="v3-section" ref={servicesSectionRef}>
          <div className="v3-section-head">
            <div>
              <div className="v3-section-tag">{t.services.tag}</div>
              <h2 className="v3-section-title" ref={servicesTitleRef}>
                <span className="grad">{t.services.title[0]}</span>{' '}
                <span className="it">{t.services.titleIt}</span>
              </h2>
            </div>
            <p className="v3-section-sub">{t.services.sub}</p>
          </div>
          <div className="v3-services" ref={servicesGridRef}>
            {t.services.items.map((s, i) => (
              <article className="v3-service" key={i}>
                <div className="v3-service-icon3d">
                  <ServiceIcon kind={serviceKinds[i]} size={32} />
                </div>
                <div className="v3-service-num">{s.num} / 06</div>
                <h3 className="v3-service-title">{s.title}</h3>
                <p className="v3-service-text">{s.text}</p>
                <div className="v3-service-tags">
                  {s.tags.map((tg, j) => (
                    <span className="v3-tag" key={j}>{tg}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="projects" className="v3-section" ref={projectsSectionRef}>
          <div className="v3-section-head--center">
            <div className="v3-section-tag">{t.projects.tag}</div>
            <h2 className="v3-section-title" ref={projectsTitleRef}>
              <span className="grad">{t.projects.title[0]}</span>{' '}
              <span className="it">{t.projects.titleIt}</span>
            </h2>
            <p className="v3-section-sub">{t.projects.sub}</p>
          </div>
          <div ref={projectsCarouselRef}>
            <ProjectCarousel
              items={t.projects.items}
              autoPlayMs={8000}
              visualLabel={t.projectVisual}
              prevLabel={lang === 'fr' ? 'Projet précédent' : 'Previous project'}
              nextLabel={lang === 'fr' ? 'Projet suivant' : 'Next project'}
            />
          </div>
        </section>

        <section className="v3-section" ref={experienceSectionRef}>
          <div className="v3-section-head">
            <div>
              <div className="v3-section-tag">{t.experience.tag}</div>
              <h2 className="v3-section-title" ref={experienceTitleRef}>
                <span className="grad">{t.experience.title[0]}</span>{' '}
                <span className="it">{t.experience.titleIt}</span>
              </h2>
            </div>
            <p className="v3-section-sub">{t.experience.sub}</p>
          </div>
          <div className="v3-exp-list" ref={experienceListRef}>
            {t.experience.items.map((e, i) => (
              <article className="v3-exp" key={i}>
                <div className="v3-exp-date">{e.date}</div>
                <div>
                  <h3 className="v3-exp-role">{e.role}</h3>
                  <div className="v3-exp-co">{e.co}</div>
                  <p className="v3-exp-desc">{e.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="v3-section" ref={skillsSectionRef}>
          <div className="v3-section-head--center">
            <div className="v3-section-tag">{t.skills.tag}</div>
            <h2 className="v3-section-title" ref={skillsTitleRef}>
              <span className="grad">{t.skills.title[0]}</span>{' '}
              <span className="it">{t.skills.titleIt}</span>
            </h2>
            <p className="v3-section-sub">{t.skills.sub}</p>
          </div>
          <div ref={skillsRadarRef}>
            <SkillRadarEffect skills={skills} />
          </div>
        </section>

        <div id="contact" className="v3-cta" ref={ctaRef}>
          <div className="v3-cta-bg" aria-hidden="true">
            <ImageLoader
              loop
              width="1800px"
              height="420px"
              gridSize={12}
              cellGap={10}
              cellShape="square"
              cellColor="#2AA2FF"
              blinkSpeed={2000}
            />
          </div>
          <div className="v3-cta-content">
            <div className="v3-cta-tag">◆ {t.cta.tag}</div>
            <h2 className="v3-cta-title">
              {t.cta.title[0]}{' '}
              <span className="it">{t.cta.titleIt}</span>
            </h2>
            <p className="v3-cta-prompt">{t.ctaTitle}</p>
            <div className="v3-cta-buttons">
              <button
                type="button"
                className="v3-btn v3-btn-primary"
                onClick={() => { setContactMode('full'); setContactOpen(true); }}
              >
                {t.cta1}
              </button>
            </div>
          </div>
        </div>

        <div className="v3-cta-socials">
          <p className="v3-cta-socials-title">{lang === 'fr' ? 'Mes réseaux sociaux' : 'My socials'}</p>
          <div className="v3-cta-socials-row">
            <a className="soc soc-x" href="https://x.com/ov_secure" aria-label="X" target="_blank" rel="noreferrer noopener"><IconX /></a>
            <a className="soc soc-tiktok" href="https://www.tiktok.com/@ov_secure" aria-label="TikTok" target="_blank" rel="noreferrer noopener"><IconTiktok /></a>
            <a className="soc soc-youtube" href="https://www.youtube.com/channel/UCLndwVqXZv6f1i5DMtDlwAw" aria-label="YouTube" target="_blank" rel="noreferrer noopener"><IconYoutube /></a>
          </div>
        </div>

        <footer className="v3-footer">
          <picture>
            <source srcSet="/icon_ov_192.webp" type="image/webp" />
            <img className="v3-footer-logo" src="/icon_ov_192.png" alt="OV" width={192} height={192} />
          </picture>

          {/* Trois cartes légales, transposées du footer d'ovlabs.fr.
              C'est le SEUL chemin depuis la home vers les pages légales :
              ne pas les retirer sans leur donner une autre porte d'entrée. */}
          <div className="v3-legal-cards">
            {t.footer.legalCards.map((c, i) => (
              <a className="v3-legal-card" key={i} href={c.href}>
                <span className="v3-legal-card-icon">
                  {c.icon === 'shield' && <IconShieldUser />}
                  {c.icon === 'contract' && <IconFileContract />}
                  {c.icon === 'scale' && <IconBalanceScale />}
                </span>
                <h3 className="v3-legal-card-title">{c.title}</h3>
                {c.lines.map((l, j) => (
                  <p className="v3-legal-card-text" key={j}>{l}</p>
                ))}
                <span className="v3-legal-card-cta">
                  {c.cta}
                  <IconArrow size={13} />
                </span>
              </a>
            ))}
          </div>

          <div className="v3-footer-bottom">
            <span>{t.footer.copyright}</span>
          </div>
        </footer>

        <div className="v3-fab-wrap">
          <button
            type="button"
            className="v3-fab chat"
            aria-label={lang === 'fr' ? 'Me contacter' : 'Contact me'}
            onClick={() => { setContactMode('light'); setContactOpen(true); }}
          >
            <IconChat />
          </button>
          <button
            type="button"
            className={`v3-fab v3-fab-up ${showBackToTop ? 'visible' : ''}`}
            aria-label={lang === 'fr' ? 'Remonter en haut' : 'Back to top'}
            aria-hidden={!showBackToTop}
            tabIndex={showBackToTop ? 0 : -1}
            onClick={scrollToTop}
          >
            <IconUp />
          </button>
        </div>

        <ContactModal
          open={contactOpen}
          onClose={() => setContactOpen(false)}
          intent={contactIntent}
          mode={contactMode}
          t={t.contactForm}
        />
      </div>
    </div>
  );
}
