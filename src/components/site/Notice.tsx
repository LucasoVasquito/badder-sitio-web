import type { ReactNode } from "react";

interface NoticeProps {
  title: string;
  children?: ReactNode;
  tone?: "info" | "error" | "success";
}

// Aviso editorial (estado de una función, error o confirmación real).
export default function Notice({ title, children, tone = "info" }: NoticeProps) {
  const border = tone === "error" ? "border-destructive" : tone === "success" ? "border-foreground" : "border-border";
  return (
    <div role={tone === "error" ? "alert" : "status"} className={`border ${border} p-5 md:p-6`}>
      <div className={`label mb-2 ${tone === "error" ? "text-destructive" : "text-foreground"}`}>
        <span className="text-foreground">●</span> {title}
      </div>
      {children && <div className="text-sm text-muted-foreground leading-relaxed">{children}</div>}
    </div>
  );
}

export function EmptyState({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <div className="border border-dashed border-border py-14 px-6 text-center">
      <p className="label text-muted-foreground">{title}</p>
      {children && <div className="mt-6 flex justify-center">{children}</div>}
    </div>
  );
}
