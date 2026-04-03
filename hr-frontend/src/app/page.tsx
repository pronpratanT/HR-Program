"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Calendar from "@/components/dashboard/calendar";

const exportModes = [
  {
    label: "Attendance",
    note: "Daily presence, lateness flags, shift exceptions",
  },
  {
    label: "Overtime",
    note: "Approved OT windows, payable totals, adjustment checks",
  },
  {
    label: "Consolidated",
    note: "One export package for payroll and compliance handoff",
  },
];

const checkpoints = [
  "Choose a payroll period or custom date range.",
  "Review included teams before generating the file.",
  "Export a clean package with traceable totals.",
];

const highlights = [
  {
    title: "Period-first workflow",
    body: "Start from the pay cycle, not from raw files. The layout keeps the reporting window and included records visible the whole time.",
  },
  {
    title: "Audit-ready summaries",
    body: "Attendance and OT totals are framed as operational checkpoints so HR can verify the package before it leaves the system.",
  },
  {
    title: "Built for repetitive work",
    body: "Clear hierarchy, direct copy, and restrained styling reduce friction for the team that runs this every week.",
  },
];

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const match = document.cookie.match(new RegExp("(^| )authToken=([^;]+)"));
    const token = match ? match[2] : null;
    if (!token) {
      router.push("/login");
      return;
    }
  }, [router]);
  return (
    <main className="min-h-screen px-5 py-6 sm:px-8 lg:px-12 lg:py-10">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">
        <header className="flex flex-col gap-4 rounded-[2rem] border border-[color:var(--border)] bg-[color:color-mix(in_oklch,var(--surface)_90%,transparent)] px-5 py-4 shadow-[0_20px_60px_rgba(var(--shadow-color),0.08)] backdrop-blur sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--muted)]">
              MOS HR operations
            </p>
            <h1 className="mt-1 text-lg font-semibold text-[color:var(--foreground)]">
              Attendance and overtime export console
            </h1>
          </div>
          <a
            className="inline-flex items-center justify-center rounded-full border border-[color:var(--border)] px-4 py-2 text-sm font-medium text-[color:var(--foreground)] hover:-translate-y-0.5 hover:border-[color:var(--accent)] hover:bg-[color:var(--accent-soft)]"
            href="#export-console"
          >
            Review export flow
          </a>
        </header>

        <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-[2.25rem] border border-[color:var(--border)] bg-[color:color-mix(in_oklch,var(--surface)_92%,transparent)] px-6 py-8 shadow-[0_24px_80px_rgba(var(--shadow-color),0.1)] sm:px-8 sm:py-10 lg:px-10">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[color:var(--accent-strong)]">
              Internal HR workspace
            </p>
            <h2 className="mt-5 max-w-3xl text-5xl leading-none font-semibold tracking-[-0.04em] text-[color:var(--foreground)] [font-family:var(--font-display)] sm:text-6xl lg:text-7xl">
              Export attendance and OT without spreadsheet churn.
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[color:var(--muted)] sm:text-lg">
              A calm export surface for HR teams who need period-based outputs,
              traceable totals, and a faster path from raw records to payroll-
              ready files.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {exportModes.map((mode) => (
                <article
                  key={mode.label}
                  className="rounded-[1.5rem] border border-[color:var(--border)] bg-[color:color-mix(in_oklch,var(--surface-strong)_72%,transparent)] p-4"
                >
                  <p className="text-sm font-semibold text-[color:var(--foreground)]">
                    {mode.label}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">
                    {mode.note}
                  </p>
                </article>
              ))}
            </div>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a
                className="inline-flex items-center justify-center rounded-full bg-[color:var(--foreground)] px-5 py-3 text-sm font-semibold text-[color:var(--background)] hover:-translate-y-0.5 hover:shadow-[0_18px_35px_rgba(var(--shadow-color),0.18)]"
                href="#export-console"
              >
                Open export preview
              </a>
              <a
                className="inline-flex items-center justify-center rounded-full border border-[color:var(--border)] px-5 py-3 text-sm font-semibold text-[color:var(--foreground)] hover:-translate-y-0.5 hover:border-[color:var(--accent)] hover:bg-[color:var(--accent-soft)]"
                href="#coverage"
              >
                See what is included
              </a>
            </div>
          </div>

          <aside
            id="export-console"
            className="relative overflow-hidden rounded-[2.25rem] border border-[color:var(--border)] bg-[linear-gradient(180deg,color-mix(in_oklch,var(--surface-strong)_85%,transparent),color-mix(in_oklch,var(--surface)_96%,transparent))] p-6 shadow-[0_24px_80px_rgba(var(--shadow-color),0.12)] sm:p-8"
          >
            <div className="absolute right-0 top-0 h-28 w-28 rounded-full bg-[color:color-mix(in_oklch,var(--accent)_22%,transparent)] blur-3xl" />
            <div className="relative">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--muted)]">
                    Export preview
                  </p>
                  <h3 className="mt-2 text-3xl font-semibold tracking-[-0.03em] text-[color:var(--foreground)] [font-family:var(--font-display)]">
                    April payroll window
                  </h3>
                </div>
                <div className="rounded-full border border-[color:var(--border)] bg-[color:var(--surface)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--accent-strong)]">
                  Ready to export
                </div>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-[1.5rem] border border-[color:var(--border)] bg-[color:var(--surface)] p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--muted)]">
                    Period
                  </p>
                  <p className="mt-3 text-xl font-semibold text-[color:var(--foreground)]">
                    01 Apr 2026 to 15 Apr 2026
                  </p>
                </div>
                <div className="rounded-[1.5rem] border border-[color:var(--border)] bg-[color:var(--surface)] p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--muted)]">
                    Scope
                  </p>
                  <p className="mt-3 text-xl font-semibold text-[color:var(--foreground)]">
                    All active staff and approved OT
                  </p>
                </div>
              </div>

              <div className="mt-6 rounded-[1.75rem] border border-[color:var(--border)] bg-[color:var(--surface)] p-5">
                <div className="flex items-center justify-between gap-4 border-b border-[color:var(--border)] pb-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--muted)]">
                      Output package
                    </p>
                    <p className="mt-2 text-lg font-semibold text-[color:var(--foreground)]">
                      attendance_ot_apr-01_to_apr-15.xlsx
                    </p>
                  </div>
                  <p className="text-sm font-medium text-[color:var(--accent-strong)]">
                    2 sheets, 1 summary
                  </p>
                </div>

                <ul className="mt-4 space-y-4">
                  {checkpoints.map((item, index) => (
                    <li key={item} className="flex gap-3">
                      <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[color:var(--accent-soft)] text-sm font-semibold text-[color:var(--accent-strong)]">
                        0{index + 1}
                      </div>
                      <p className="text-sm leading-7 text-[color:var(--muted)]">
                        {item}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>
        </section>

        <section
          id="coverage"
          className="grid gap-5 rounded-[2.25rem] border border-[color:var(--border)] bg-[color:color-mix(in_oklch,var(--surface)_94%,transparent)] px-6 py-8 shadow-[0_20px_60px_rgba(var(--shadow-color),0.08)] lg:grid-cols-3 lg:px-8"
        >
          {highlights.map((item) => (
            <article
              key={item.title}
              className="rounded-[1.75rem] border border-[color:var(--border)] bg-[color:color-mix(in_oklch,var(--surface-strong)_68%,transparent)] p-5"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--accent-strong)]">
                Why it works
              </p>
              <h3 className="mt-4 text-2xl font-semibold tracking-[-0.03em] text-[color:var(--foreground)] [font-family:var(--font-display)]">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-[color:var(--muted)]">
                {item.body}
              </p>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
