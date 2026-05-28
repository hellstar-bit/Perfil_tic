export function Logo({ size = "md" }: { size?: "md" | "lg" | "xl" }) {
  const dim = size === "md" ? 28 : 36;
  const textCls =
    size === "xl"
      ? "text-xl font-bold text-ink-900"
      : "text-[15px] font-semibold text-ink-900 tracking-tight";
  return (
    <span className="inline-flex items-center gap-2">
      <img src="/logo.svg" width={dim} height={dim} alt="StartIA" />
      <span className={textCls}>
        Start<span className="text-neon">IA</span>
      </span>
    </span>
  );
}
