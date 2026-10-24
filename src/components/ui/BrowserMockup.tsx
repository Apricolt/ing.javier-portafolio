import Image from "next/image";

type Props = { src: string; alt: string; url?: string };

/** Ventana de navegador con la captura del proyecto. */
export default function BrowserMockup({ src, alt, url }: Props) {
  const domain = url ? new URL(url).hostname : undefined;
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-coal shadow-[0_40px_80px_-30px_rgb(0_0_0/0.9)]">
      <div className="flex items-center gap-3 border-b border-white/[0.06] bg-white/[0.02] px-4 py-3">
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/80" />
        </div>
        {domain && (
          <span className="mx-auto truncate rounded-md bg-white/[0.04] px-3 py-1 font-mono text-[11px] text-ash">
            {domain}
          </span>
        )}
        <span className="w-[42px]" aria-hidden="true" />
      </div>
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 900px, 92vw"
          className="bm-img scale-[1.12] object-cover object-top"
        />
      </div>
    </div>
  );
}
