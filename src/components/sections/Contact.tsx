"use client";

import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import emailjs from "@emailjs/browser";
import { useReveal } from "@/lib/useReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { MailIcon, PinIcon, socialIcons } from "@/components/ui/Icons";
import { profile, socials } from "@/data/profile";

type Fields = { name: string; email: string; message: string };
type Errors = Partial<Record<keyof Fields, string>>;
type Status = "idle" | "sending" | "success" | "error" | "config-error";

const EMPTY: Fields = { name: "", email: "", message: "" };

function validate(f: Fields): Errors {
  const e: Errors = {};
  if (f.name.trim().length < 2) e.name = "Escribe tu nombre (mínimo 2 caracteres).";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim())) e.email = "Escribe un correo válido.";
  if (f.message.trim().length < 10) e.message = "Cuéntame un poco más (mínimo 10 caracteres).";
  return e;
}

export default function Contact() {
  const root = useRef<HTMLElement>(null);
  const [fields, setFields] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  useReveal(root);

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFields((f) => ({ ...f, [name]: value }));
    if (errors[name as keyof Fields]) setErrors((er) => ({ ...er, [name]: undefined }));
    if (status !== "idle" && status !== "sending") setStatus("idle");
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const found = validate(fields);
    setErrors(found);
    if (Object.keys(found).length) return;

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
    if (!serviceId || !templateId || !publicKey) {
      setStatus("config-error");
      return;
    }

    setStatus("sending");
    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: fields.name,
          from_email: fields.email,
          reply_to: fields.email,
          message: fields.message,
          to_name: "Javier",
        },
        { publicKey },
      );
      setStatus("success");
      setFields(EMPTY);
    } catch {
      setStatus("error");
    }
  };

  const input =
    "w-full rounded-xl border bg-white/[0.03] px-4 py-3.5 text-[15px] text-bone placeholder:text-white/25 outline-none transition-[border-color,box-shadow,background-color] duration-300 focus:border-volt focus:bg-white/[0.05] focus:shadow-[0_0_0_4px_rgb(47_107_255/0.15)]";
  const border = (k: keyof Fields) => (errors[k] ? "border-red-400/60" : "border-white/10");
  const label = "mb-2 block font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-ash";

  return (
    <section
      id="contacto"
      ref={root}
      className="relative overflow-hidden bg-ink px-5 py-24 sm:px-8 md:py-40"
      aria-labelledby="contacto-title"
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-iron to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 bottom-0 h-[420px] w-[620px] rounded-full bg-volt/[0.09] blur-[120px]"
      />

      <div className="relative mx-auto max-w-5xl">
        <SectionHeading
          id="contacto-title"
          eyebrow="Contacto"
          title="Construyamos algo juntos"
          subtitle="¿Tienes un proyecto, una vacante o una idea? Escríbeme y conversemos."
        />

        <div className="mt-16 grid gap-6 md:mt-20 md:grid-cols-[1fr_1.35fr]">
          {/* Datos de contacto */}
          <div data-reveal className="rounded-3xl border border-white/10 bg-graphite/70 p-7 sm:p-9">
            <h3 className="font-display text-2xl font-bold text-bone">Datos de contacto</h3>

            <dl className="mt-8 space-y-6">
              <div className="flex items-start gap-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-volt/30 bg-volt/10 text-volt-light">
                  <MailIcon className="h-[18px] w-[18px]" />
                </span>
                <div className="min-w-0">
                  <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-ash">Correo</dt>
                  <dd className="mt-1">
                    <a href={`mailto:${profile.email}`} className="break-all font-medium text-bone hover:text-volt-light">
                      {profile.email}
                    </a>
                  </dd>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-volt/30 bg-volt/10 text-volt-light">
                  <PinIcon className="h-[18px] w-[18px]" />
                </span>
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-ash">Ubicación</dt>
                  <dd className="mt-1 font-medium text-bone">{profile.location}</dd>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-signal/30 bg-signal/10">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping-slow rounded-full bg-signal opacity-70" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-signal" />
                  </span>
                </span>
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-ash">Disponibilidad</dt>
                  <dd className="mt-1 font-medium text-signal">{profile.availability}</dd>
                </div>
              </div>
            </dl>

            <div className="mt-9 border-t border-white/10 pt-7">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ash">Redes</p>
              <ul className="mt-4 flex gap-3">
                {socials.map((s) => {
                  const Icon = socialIcons[s.icon];
                  return (
                    <li key={s.label}>
                      <a
                        href={s.href}
                        target={s.icon === "mail" ? undefined : "_blank"}
                        rel="noopener noreferrer"
                        aria-label={s.label}
                        className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-ash transition-[color,border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-volt/60 hover:text-bone"
                      >
                        <Icon className="h-[18px] w-[18px]" />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          {/* Formulario */}
          <form
            data-reveal
            onSubmit={onSubmit}
            noValidate
            className="rounded-3xl border border-white/10 bg-graphite/70 p-7 sm:p-9"
            aria-describedby="form-status"
          >
            <div className="space-y-5">
              <div>
                <label htmlFor="name" className={label}>
                  Nombre
                </label>
                <input
                  id="name"
                  name="name"
                  autoComplete="name"
                  value={fields.name}
                  onChange={onChange}
                  placeholder="Tu nombre"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  className={`${input} ${border("name")}`}
                />
                {errors.name && (
                  <p id="name-error" className="mt-2 text-sm text-red-300">
                    {errors.name}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="email" className={label}>
                  Correo
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={fields.email}
                  onChange={onChange}
                  placeholder="tu@correo.com"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  className={`${input} ${border("email")}`}
                />
                {errors.email && (
                  <p id="email-error" className="mt-2 text-sm text-red-300">
                    {errors.email}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="message" className={label}>
                  Mensaje
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={fields.message}
                  onChange={onChange}
                  placeholder="Cuéntame sobre tu proyecto o propuesta…"
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "message-error" : undefined}
                  className={`${input} ${border("message")} resize-none`}
                />
                {errors.message && (
                  <p id="message-error" className="mt-2 text-sm text-red-300">
                    {errors.message}
                  </p>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="mt-7 w-full rounded-full bg-volt px-6 py-4 text-sm font-semibold tracking-wide text-white shadow-[0_10px_40px_-12px_rgb(47_107_255/0.9)] transition-[background-color,box-shadow,transform] duration-300 hover:bg-[#4179ff] hover:shadow-[0_14px_60px_-10px_rgb(47_107_255/1)] active:scale-[0.99] disabled:cursor-wait disabled:opacity-70"
            >
              {status === "sending" ? "Enviando…" : "Enviar mensaje"}
            </button>

            <div id="form-status" role="status" aria-live="polite" className="min-h-[1.5rem]">
              {status === "success" && (
                <p className="mt-4 text-center text-sm text-signal">¡Mensaje enviado! Te responderé pronto.</p>
              )}
              {status === "error" && (
                <p className="mt-4 text-center text-sm text-red-300">
                  No se pudo enviar. Escríbeme directamente a {profile.email}.
                </p>
              )}
              {status === "config-error" && (
                <p className="mt-4 text-center text-sm text-amber-300">
                  El formulario no está configurado todavía. Escríbeme a {profile.email}.
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
