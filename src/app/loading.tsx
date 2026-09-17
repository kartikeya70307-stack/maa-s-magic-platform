import { LogoMark } from "@/components/logo-mark";

export default function Loading() {
  return (
    <div className="grid min-h-[70vh] place-items-center">
      <div className="flex flex-col items-center gap-5">
        <div className="relative">
          <span className="absolute inset-0 -m-3 animate-ping rounded-full bg-flame-300/50" />
          <LogoMark size={72} className="relative animate-pulse" />
        </div>
        <p className="font-display text-xl font-bold text-ink-800">
          Maa<span className="text-flame-500">&rsquo;s</span>{" "}
          <span className="italic text-flame-500">Magic</span>
        </p>
        <p className="font-hindi text-sm italic text-ink-500">
          कढ़ाही गरम हो रही है…
        </p>
      </div>
    </div>
  );
}
