'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { getLenisInstance } from '../lib/lenis';

// Endpoint FormSubmit HACHÉ (ne jamais remettre la forme /ajax/<adresse> :
// elle réexpose l'email au moissonnage). Cible réelle : contact@ovlabs.fr.
// cf CLAUDE.md du repo.
const FS_HASH = '080fb1f9c86229e21e43e2d4be8dd4b8';
const FS_AJAX = `https://formsubmit.co/ajax/${FS_HASH}`;
const FS_POST = `https://formsubmit.co/${FS_HASH}`;

export default function ContactModal({ open, onClose, t, intent, mode = 'full' }) {
  const isFull = mode === 'full';
  const [type, setType] = useState('');
  const [projectName, setProjectName] = useState('');
  const [budget, setBudget] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [errMsg, setErrMsg] = useState('');
  const formRef = useRef(null);
  const firstFieldRef = useRef(null);
  // Portal vers document.body : sinon la modale reste piégée dans le contexte
  // d'empilement de .v3-content (z-index:2) et passe SOUS le burger fixe (z:70).
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Pré-sélection du besoin selon le bouton cliqué.
  useEffect(() => {
    if (open && intent) setType(intent);
  }, [open, intent]);

  // Verrou du scroll de fond + fermeture au clavier (Échap).
  // ⚠️ `overflow: hidden` ne suffit PAS : Lenis (smoothWheel) intercepte la
  // molette au niveau du document et continue de scroller la page derrière,
  // tout en volant le scroll interne du panneau. Il faut l'arrêter
  // explicitement, et le relancer à la fermeture.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const lenis = getLenisInstance();
    lenis?.stop();
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    const id = setTimeout(() => firstFieldRef.current?.focus(), 60);
    return () => {
      document.body.style.overflow = prev;
      lenis?.start();
      window.removeEventListener('keydown', onKey);
      clearTimeout(id);
    };
  }, [open, onClose]);

  if (!open || !mounted) return null;

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const canSend = name.trim() && emailValid && message.trim() && (!isFull || type);

  const heading = isFull ? t.heading : t.headingTalk;
  const intro = isFull ? t.intro : t.introTalk;

  const resetAndClose = () => {
    setStatus('idle');
    setErrMsg('');
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canSend) {
      setStatus('error');
      setErrMsg(t.required);
      return;
    }
    setStatus('sending');
    setErrMsg('');

    const payload = isFull
      ? {
          Nom: name.trim(),
          email: email.trim(),
          Besoin: type,
          'Nom du projet': projectName.trim() || t.budgetPlaceholder,
          Budget: budget || t.budgetPlaceholder,
          Message: message.trim(),
          _subject: `Nouveau projet ovlabs : ${type}`,
          _template: 'table',
          _captcha: 'false',
        }
      : {
          Nom: name.trim(),
          email: email.trim(),
          'Nom du projet': projectName.trim() || t.budgetPlaceholder,
          Message: message.trim(),
          _subject: 'Nouvelle prise de contact ovlabs',
          _template: 'table',
          _captcha: 'false',
        };

    try {
      const res = await fetch(FS_AJAX, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('bad status');
      setStatus('success');
    } catch (err) {
      // AJAX bloqué (CSP) ou réseau : repli sur la soumission native du <form>,
      // qui navigue vers FormSubmit puis revient via _next.
      if (formRef.current) {
        formRef.current.submit();
        return;
      }
      setStatus('error');
      setErrMsg(t.error);
    }
  };

  return createPortal(
    <div className="ov-modal" role="dialog" aria-modal="true" aria-label={t.heading}>
      <div className="ov-modal-backdrop" onClick={resetAndClose} />
      {/* data-lenis-prevent : le panneau scrolle en natif (formulaire long en
          mode « projet »), Lenis ne doit pas capter la molette ici. */}
      <div className="ov-modal-panel" role="document" data-lenis-prevent>
        <button type="button" className="ov-modal-close" onClick={resetAndClose} aria-label={t.close}>
          ×
        </button>

        {status === 'success' ? (
          <div className="ov-modal-success">
            <div className="ov-modal-check" aria-hidden="true">✓</div>
            <p>{t.success}</p>
            <button type="button" className="v3-btn v3-btn-primary" onClick={resetAndClose}>
              {t.close}
            </button>
          </div>
        ) : (
          <>
            <h2 className="ov-modal-title">{heading}</h2>
            <p className="ov-modal-intro">{intro}</p>

            <form
              ref={formRef}
              className="ov-modal-form"
              action={FS_POST}
              method="POST"
              onSubmit={handleSubmit}
            >
              {/* champs cachés FormSubmit (utilisés par le repli natif) */}
              <input
                type="hidden"
                name="_subject"
                value={isFull ? `Nouveau projet ovlabs : ${type || t.budgetPlaceholder}` : 'Nouvelle prise de contact ovlabs'}
              />
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_next" value="https://ovlabs.fr/?envoye=1" />
              {/* honeypot anti-spam : doit rester vide */}
              <input type="text" name="_honey" tabIndex={-1} autoComplete="off" className="ov-hp" aria-hidden="true" />

              {isFull && (
                <fieldset className="ov-field">
                  <legend className="ov-label">{t.typeLabel} *</legend>
                  <div className="ov-pills">
                    {t.types.map((label) => (
                      <button
                        type="button"
                        key={label}
                        className={`ov-pill${type === label ? ' is-active' : ''}`}
                        onClick={() => setType(label)}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                  <input type="hidden" name="Besoin" value={type} />
                </fieldset>
              )}

              <label className="ov-field">
                <span className="ov-label">{t.nameLabel} *</span>
                <input
                  ref={firstFieldRef}
                  type="text"
                  name="Nom"
                  className="ov-input"
                  placeholder={t.namePlaceholder}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </label>

              <label className="ov-field">
                <span className="ov-label">{t.emailLabel} *</span>
                <input
                  type="email"
                  name="email"
                  className="ov-input"
                  placeholder={t.emailPlaceholder}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </label>

              <label className="ov-field">
                <span className="ov-label">{t.projectLabel}</span>
                <input
                  type="text"
                  name="Nom du projet"
                  className="ov-input"
                  placeholder={t.projectPlaceholder}
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                />
              </label>

              {isFull && (
                <label className="ov-field">
                  <span className="ov-label">{t.budgetLabel}</span>
                  <select
                    name="Budget"
                    className="ov-input ov-select"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                  >
                    <option value="">{t.budgetPlaceholder}</option>
                    {t.budgets.map((b) => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </label>
              )}

              <label className="ov-field">
                <span className="ov-label">{t.messageLabel} *</span>
                <textarea
                  name="Message"
                  className="ov-input ov-textarea"
                  rows={4}
                  placeholder={t.messagePlaceholder}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />
              </label>

              {status === 'error' && <p className="ov-modal-err">{errMsg || t.error}</p>}

              <button
                type="submit"
                className="v3-btn v3-btn-primary ov-modal-submit"
                disabled={status === 'sending'}
              >
                {status === 'sending' ? t.sending : t.submit}
              </button>
            </form>
          </>
        )}
      </div>
    </div>,
    document.body
  );
}
