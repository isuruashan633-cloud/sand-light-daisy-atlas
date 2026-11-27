import { useEffect, useMemo, useState } from "react";
import {
  checkpoints,
  complaints,
  day,
  handovers,
  kpis,
  lanes,
  packingRules,
  pending,
  people,
  refunds,
  station,
  steps,
  stillOpen,
  tools,
  type Lane,
  type Status,
} from "@/data/playbook";

const STORAGE_KEY = "tikiri-playbook-pending-v1";

const nav = [
  { href: "#overview", label: "Overview" },
  { href: "#roles", label: "Roles" },
  { href: "#steps", label: "Steps" },
  { href: "#day", label: "Order day" },
  { href: "#warehouse", label: "Wattala" },
  { href: "#care", label: "Care" },
  { href: "#pending", label: "Pending" },
];

function statusClass(status: Status) {
  if (status === "place") return "bg-place-soft text-place";
  if (status === "implement") return "bg-implement-soft text-implement";
  if (status === "confirm") return "bg-confirm-soft text-confirm";
  return "bg-bg text-muted";
}

export function Playbook() {
  const [lane, setLane] = useState<Lane | "all">("all");
  const [query, setQuery] = useState("");
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setChecked(JSON.parse(raw) as Record<string, boolean>);
    } catch {
      /* keep the list unticked */
    }
  }, []);

  function toggle(id: string) {
    setChecked((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }

  const done = pending.filter((item) => checked[item.id]).length;

  const visibleSteps = useMemo(() => {
    const q = query.trim().toLowerCase();
    return steps.filter((step) => {
      const laneOk = lane === "all" || step.lanes.includes(lane);
      if (!laneOk) return false;
      if (!q) return true;
      const blob = `${step.n} ${step.title} ${step.owner} ${step.do.join(" ")} ${step.handover}`.toLowerCase();
      return blob.includes(q);
    });
  }, [lane, query]);

  return (
    <div className="min-h-screen bg-bg text-ink">
      <header className="sticky top-0 z-20 border-b border-line bg-bg">
        <div className="mx-auto flex max-w-5xl items-center gap-4 px-4 py-3">
          <a href="#overview" className="font-display text-lg leading-none font-semibold tracking-tight">
            Tikiri Toys
          </a>
          <nav className="flex flex-1 gap-1 overflow-x-auto" aria-label="Playbook">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="shrink-0 rounded-full px-3 py-2 text-sm font-medium text-muted hover:bg-surface hover:text-ink"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <a
            href="#pending"
            className="shrink-0 rounded-full bg-accent px-3 py-2 text-sm font-semibold text-surface"
          >
            {done}/{pending.length} pending
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 pb-24">
        <section id="overview" className="pt-10 pb-6">
          <p className="text-xs font-semibold tracking-widest text-muted uppercase">
            Working draft · November 2026
          </p>
          <h1 className="font-display mt-3 max-w-3xl text-5xl leading-tight font-semibold tracking-tight sm:text-6xl">
            How we run Tikiri Toys in Sri Lanka
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted">
            A working guide from picking products to looking after the customer. Updated for the Wattala warehouse and the two new roles.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <Fact kicker="Warehouse" title="Wattala" body="Stock is received here. The courier collects here. Colombo 10 is no longer the store." />
            <Fact kicker="Order desk" title="Biyagama, 12:30 p.m." body="The Digital Marketing Executive sends the day’s list and one folder per order." />
            <Fact kicker="Dispatch" title="Wattala, before 5:00 p.m." body="The Warehouse Assistant sends courier proof. Only those orders are fulfilled." />
          </div>

          <div className="mt-8 rounded-3xl border border-line bg-surface p-6 sm:p-8">
            <p className="text-xs font-semibold tracking-widest text-muted uppercase">The whole process, in one breath</p>
            <p className="font-display mt-3 text-2xl leading-snug font-medium">
              Sales and stock tell us what to make, once every three months. BOI and Customs clear it. The Operations Executive issues the purchase order only after approval and payment. Merchandising gets materials ready. Planning and Production make the goods. Shipping moves them to Wattala. Finance sets the local price. The Digital Marketing Executive puts them live and sends the daily folders. The Warehouse Assistant picks, packs and hands parcels to the courier. Then the numbers feed the next plan.
            </p>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <Legend tone="place" title="In place" body="Already part of how we work." />
            <Legend tone="implement" title="To implement" body="The job is written. The person is not in the seat yet." />
            <Legend tone="confirm" title="To confirm" body="Still an open point. Do not treat it as final." />
          </div>

          <aside className="mt-4 rounded-3xl border border-accent/30 bg-accent-soft p-6">
            <p className="text-xs font-semibold tracking-widest text-accent uppercase">Compliance gate</p>
            <p className="mt-2 text-base">
              Products made under BOI concessions cannot go into the Sri Lankan market until local-sale approval, Customs clearance, and the duty and tax payments are done and on file. Duty is settled before stock leaves the zone. No shortcuts.
            </p>
          </aside>
        </section>

        <section id="rhythms" className="py-8">
          <h2 className="font-display text-3xl font-semibold tracking-tight">Three rhythms</h2>
          <p className="mt-2 max-w-2xl text-muted">Phase one sells direct to customers. Shopify keeps the orders and the stock.</p>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            <article className="rounded-3xl border border-line bg-surface p-5">
              <p className="text-xs font-semibold tracking-widest text-muted uppercase">Every 3 months</p>
              <h3 className="font-display mt-2 text-2xl font-semibold">Plan, make, bring stock in</h3>
              <p className="mt-2 text-muted">Steps 01 to 08. Forecast, customs, purchase order, production, release, then the Wattala receipt.</p>
            </article>
            <article className="rounded-3xl border border-line bg-surface p-5">
              <p className="text-xs font-semibold tracking-widest text-muted uppercase">Every working day</p>
              <h3 className="font-display mt-2 text-2xl font-semibold">Take orders and send them</h3>
              <p className="mt-2 text-muted">Step 13. List at 12:30 p.m. from Biyagama. Handover proof before 5:00 p.m. from Wattala.</p>
            </article>
            <article className="rounded-3xl border border-line bg-surface p-5">
              <p className="text-xs font-semibold tracking-widest text-muted uppercase">Every month</p>
              <h3 className="font-display mt-2 text-2xl font-semibold">Count the stock</h3>
              <p className="mt-2 text-muted">Step 09. Physical count at Wattala, compared with the Shopify balance. Variances go to Operations.</p>
            </article>
          </div>
        </section>

        <section className="py-4">
          <h2 className="font-display text-3xl font-semibold tracking-tight">The 14 steps at a glance</h2>
          <p className="mt-2 text-muted">Top row gets stock ready. Bottom row sells it, sends it, and feeds the result back.</p>
          <p className="mt-6 text-xs font-semibold tracking-widest text-muted uppercase">Ready the stock</p>
          <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {steps.slice(0, 7).map((step) => (
              <a key={step.n} href={`#step-${step.n}`} className="rounded-2xl border border-line bg-surface p-4 hover:border-accent">
                <span className="text-xs font-semibold text-muted">{step.n}</span>
                <span className="mt-1 block font-medium leading-snug">{shortTitle(step.n)}</span>
              </a>
            ))}
          </div>
          <p className="mt-6 text-xs font-semibold tracking-widest text-muted uppercase">Sell, send, and start again</p>
          <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {steps.slice(7).map((step) => (
              <a key={step.n} href={`#step-${step.n}`} className="rounded-2xl border border-line bg-surface p-4 hover:border-accent">
                <span className="text-xs font-semibold text-muted">{step.n}</span>
                <span className="mt-1 block font-medium leading-snug">{shortTitle(step.n)}</span>
              </a>
            ))}
          </div>
          <p className="mt-4 text-sm text-muted">Stock and sales feed back into Step 01. This is a loop, not a one-off project.</p>
        </section>

        <section id="roles" className="py-10">
          <h2 className="font-display text-3xl font-semibold tracking-tight">Who does what</h2>
          <p className="mt-2 max-w-2xl text-muted">
            Every handover has one owner, and a backup where we have one. The two new roles report to Sasini. Fulfilment cannot depend on whoever happens to be free.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {people.map((person) => (
              <article
                key={person.name}
                className={
                  person.fresh
                    ? "rounded-3xl border border-accent/40 bg-accent-soft p-5"
                    : "rounded-3xl border border-line bg-surface p-5"
                }
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display text-xl leading-tight font-semibold">{person.name}</h3>
                  <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${statusClass(person.status)}`}>
                    {person.statusLabel}
                  </span>
                </div>
                <p className="mt-1 text-sm font-medium text-muted">{person.role}</p>
                <p className="mt-3">{person.body}</p>
                {person.note ? <p className="mt-3 text-xs font-semibold tracking-wide text-muted uppercase">{person.note}</p> : null}
              </article>
            ))}
          </div>
        </section>

        <section id="steps" className="py-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="font-display text-3xl font-semibold tracking-tight">Step by step</h2>
              <p className="mt-2 text-muted">Same order the work actually happens, with the new handovers written in.</p>
            </div>
            <label className="block w-full sm:w-72">
              <span className="text-xs font-semibold tracking-widest text-muted uppercase">Find a step</span>
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Owner, SKU, Wattala, refund…"
                className="mt-1 w-full rounded-2xl border border-line bg-surface px-4 py-3 text-base outline-none focus:border-accent"
              />
            </label>
          </div>
          <div className="mt-4 flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Filter by work">
            {lanes.map((item) => {
              const on = lane === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  onClick={() => setLane(item.id)}
                  className={
                    on
                      ? "shrink-0 rounded-full bg-ink px-4 py-2 text-left text-sm font-semibold text-surface"
                      : "shrink-0 rounded-full border border-line bg-surface px-4 py-2 text-left text-sm font-semibold"
                  }
                >
                  {item.label}
                </button>
              );
            })}
          </div>
          <p className="mt-3 text-sm text-muted">
            {lanes.find((item) => item.id === lane)?.note}. Showing {visibleSteps.length} of {steps.length}.
          </p>

          <div className="mt-6 space-y-4">
            {visibleSteps.map((step) => (
              <article key={step.n} id={`step-${step.n}`} className="scroll-mt-24 rounded-3xl border border-line bg-surface p-5 sm:p-7">
                <p className="text-xs font-semibold tracking-widest text-muted uppercase">Step {step.n}</p>
                <h3 className="font-display mt-1 text-3xl leading-tight font-semibold">{step.title}</h3>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <p>
                    <span className="block text-xs font-semibold tracking-widest text-muted uppercase">Owner</span>
                    <span className="mt-1 block">{step.owner}</span>
                  </p>
                  <p>
                    <span className="block text-xs font-semibold tracking-widest text-muted uppercase">Starts when</span>
                    <span className="mt-1 block">{step.starts}</span>
                  </p>
                </div>
                <p className="mt-5 text-xs font-semibold tracking-widest text-muted uppercase">What you do</p>
                <ol className="mt-2 space-y-2">
                  {step.do.map((item, index) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-0.5 w-6 shrink-0 font-semibold text-accent">{index + 1}</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ol>
                <p className="mt-5 text-xs font-semibold tracking-widest text-muted uppercase">Handover</p>
                <p className="mt-1">{step.handover}</p>
                {step.watch ? (
                  <p className="mt-4 rounded-2xl bg-confirm-soft px-4 py-3 text-sm">
                    <span className="font-semibold text-confirm">Watch this. </span>
                    {step.watch}
                  </p>
                ) : null}
              </article>
            ))}
            {visibleSteps.length === 0 ? (
              <p className="rounded-3xl border border-line bg-surface p-6 text-muted">Nothing matches that. Clear the search or pick another lane.</p>
            ) : null}
          </div>
        </section>

        <section className="py-8">
          <h2 className="font-display text-3xl font-semibold tracking-tight">Who passes what to whom</h2>
          <div className="mt-4 overflow-x-auto rounded-3xl border border-line bg-surface">
            <table className="w-full min-w-[36rem] text-left text-sm">
              <thead className="border-b border-line text-xs tracking-widest text-muted uppercase">
                <tr>
                  <th className="px-4 py-3 font-semibold">From</th>
                  <th className="px-4 py-3 font-semibold">To</th>
                  <th className="px-4 py-3 font-semibold">What is passed</th>
                </tr>
              </thead>
              <tbody>
                {handovers.map((row) => (
                  <tr key={`${row.from}-${row.to}-${row.what}`} className="border-b border-line last:border-0">
                    <td className="px-4 py-3 font-medium">{row.from}</td>
                    <td className="px-4 py-3">{row.to}</td>
                    <td className="px-4 py-3">{row.what}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section id="day" className="py-8">
          <h2 className="font-display text-3xl font-semibold tracking-tight">A normal order day</h2>
          <p className="mt-2 max-w-2xl text-muted">
            Monday to Friday. Saturdays only for a planned promotion, said in advance. Sundays and public holidays stay closed unless management authorises them.
          </p>
          <ol className="mt-6 space-y-3">
            {day.map((item) => (
              <li key={item.when} className="grid gap-1 rounded-3xl border border-line bg-surface p-5 sm:grid-cols-[11rem_1fr] sm:gap-4">
                <p className="text-sm font-semibold text-accent">{item.when}</p>
                <div>
                  <h3 className="font-display text-xl font-semibold">{item.title}</h3>
                  <p className="mt-1 text-muted">{item.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="mt-4 rounded-2xl bg-confirm-soft px-4 py-3 text-sm">
            <span className="font-semibold text-confirm">If an order cannot go. </span>
            Stock missing, payment odd, or anything else blocking dispatch — flag it to the Digital Marketing Executive and Operations, and tell the customer within 24 hours.
          </p>
        </section>

        <section id="warehouse" className="py-8">
          <h2 className="font-display text-3xl font-semibold tracking-tight">Wattala warehouse</h2>
          <p className="mt-2 max-w-2xl text-muted">
            The local warehouse is Wattala. The street address and on-site phone are not in the current notes — add them once confirmed. Do not keep using 273 Panchikawatta Road, Colombo 10, or the old on-site contact there.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <article className="rounded-3xl border border-line bg-surface p-5">
              <h3 className="font-display text-xl font-semibold">Receiving</h3>
              <ul className="mt-3 space-y-2 text-sm">
                <li>Follow the Operations Executive’s instructions for each quarterly transfer.</li>
                <li>Check SKU, quantity and condition against the transfer documents.</li>
                <li>Log shortages, excess and damage separately.</li>
                <li>Report the actual count the same day. That count opens Shopify.</li>
              </ul>
            </article>
            <article className="rounded-3xl border border-line bg-surface p-5">
              <h3 className="font-display text-xl font-semibold">Storage</h3>
              <ul className="mt-3 space-y-2 text-sm">
                <li>One labelled location per SKU. Fast movers near packing.</li>
                <li>FIFO for the same SKU. Damaged units stay separate.</li>
                <li>One running balance. Adjustments need a reason and an approval.</li>
                <li>A full physical count every month, compared with Shopify.</li>
              </ul>
            </article>
          </div>

          <h3 className="font-display mt-10 text-2xl font-semibold">Packing for courier handover</h3>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {packingRules.map((rule) => (
              <article key={rule.n} className="rounded-2xl border border-line bg-surface p-4">
                <p className="text-xs font-semibold text-accent">{rule.n}</p>
                <h4 className="mt-1 font-semibold">{rule.title}</h4>
                <p className="mt-1 text-sm text-muted">{rule.body}</p>
              </article>
            ))}
          </div>

          <h3 className="font-display mt-10 text-2xl font-semibold">What to keep at the packing station</h3>
          <div className="mt-4 overflow-x-auto rounded-3xl border border-line bg-surface">
            <table className="w-full min-w-[32rem] text-left text-sm">
              <thead className="border-b border-line text-xs tracking-widest text-muted uppercase">
                <tr>
                  <th className="px-4 py-3 font-semibold">Purpose</th>
                  <th className="px-4 py-3 font-semibold">Material</th>
                  <th className="px-4 py-3 font-semibold">Why</th>
                </tr>
              </thead>
              <tbody>
                {station.map((row) => (
                  <tr key={row.purpose} className="border-b border-line last:border-0">
                    <td className="px-4 py-3 font-medium">{row.purpose}</td>
                    <td className="px-4 py-3">{row.material}</td>
                    <td className="px-4 py-3">{row.why}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-sm text-muted">Scale, tape, printer and packing stock are still open. They are listed under Pending Requirements.</p>
        </section>

        <section id="care" className="py-8">
          <h2 className="font-display text-3xl font-semibold tracking-tight">Customer care, complaints and refunds</h2>
          <p className="mt-2 max-w-2xl text-muted">
            Every complaint is logged, acknowledged, handled the same way, and escalated when the first person should not decide alone.
          </p>
          <div className="mt-5 grid gap-2 sm:grid-cols-2">
            {complaints.map((item) => (
              <article key={item.title} className="rounded-2xl border border-line bg-surface p-4">
                <h3 className="font-semibold">{item.title}</h3>
                <p className="mt-1 text-sm text-muted">{item.body}</p>
              </article>
            ))}
          </div>
          <ol className="mt-4 space-y-2 text-sm">
            {[
              "Log it first in one central record — before anyone starts fixing it.",
              "Acknowledge on the same working day if you can.",
              "Categorise the issue so the right path is used.",
              "Collect the order number, photo, or other evidence needed to decide.",
              "Fix first-level issues with a replacement, refund, redispatch, or a clear explanation.",
              "Escalate safety concerns, repeat complaints, and higher-value refunds.",
              "Close the loop on the same channel the customer used, and record the closing date.",
              "Report volumes monthly by channel and category.",
            ].map((item, index) => (
              <li key={item} className="flex gap-3 rounded-2xl border border-line bg-surface px-4 py-3">
                <span className="font-semibold text-accent">{index + 1}</span>
                <span>{item}</span>
              </li>
            ))}
          </ol>

          <h3 className="font-display mt-10 text-2xl font-semibold">Refund approval</h3>
          <ol className="mt-4 space-y-2">
            {refunds.map((item, index) => (
              <li key={item.who + item.body} className="rounded-2xl border border-line bg-surface px-4 py-3">
                <p className="text-xs font-semibold tracking-widest text-muted uppercase">Step {index + 1} · {item.who}</p>
                <p className="mt-1">{item.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="py-8">
          <h2 className="font-display text-3xl font-semibold tracking-tight">The stock loop</h2>
          <p className="mt-2 max-w-2xl text-muted">
            Once goods are in and the records are updated, we watch sales, then do it again. In a peak campaign the loop should move faster than the three-month cycle.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <article className="rounded-3xl border border-line bg-surface p-5">
              <h3 className="font-display text-xl font-semibold">1 · Watch the stock</h3>
              <p className="mt-2 text-sm text-muted">Daily sales, fast movers, low stock and stockouts. Risina reads Shopify. Wattala keeps the physical truth.</p>
            </article>
            <article className="rounded-3xl border border-line bg-surface p-5">
              <h3 className="font-display text-xl font-semibold">2 · Reorder and plan</h3>
              <p className="mt-2 text-sm text-muted">Compare each SKU with its reorder point. Confirm what needs making. The next formal top-up is the three-month forecast.</p>
            </article>
            <article className="rounded-3xl border border-line bg-surface p-5">
              <h3 className="font-display text-xl font-semibold">3 · Get materials in</h3>
              <p className="mt-2 text-sm text-muted">Place raw-material orders, follow the supplier, and lock the production plan against real capacity.</p>
            </article>
            <article className="rounded-3xl border border-line bg-surface p-5">
              <h3 className="font-display text-xl font-semibold">4 · Make, move, update</h3>
              <p className="mt-2 text-sm text-muted">PP approval where needed, production milestones, release from the zone, and a Wattala receipt that updates Shopify.</p>
            </article>
          </div>

          <h3 className="font-display mt-10 text-2xl font-semibold">KPIs</h3>
          <p className="mt-2 text-sm text-muted">Stock reporting sits with Data Analytics. Wattala keeps the transaction-level count so these are not rebuilt by hand.</p>
          <div className="mt-4 overflow-x-auto rounded-3xl border border-line bg-surface">
            <table className="w-full min-w-[32rem] text-left text-sm">
              <thead className="border-b border-line text-xs tracking-widest text-muted uppercase">
                <tr>
                  <th className="px-4 py-3 font-semibold">Metric</th>
                  <th className="px-4 py-3 font-semibold">What it means</th>
                  <th className="px-4 py-3 font-semibold">Target</th>
                </tr>
              </thead>
              <tbody>
                {kpis.map((row) => (
                  <tr key={row.metric} className="border-b border-line last:border-0">
                    <td className="px-4 py-3 font-medium">{row.metric}</td>
                    <td className="px-4 py-3">{row.means}</td>
                    <td className="px-4 py-3">{row.target}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className="font-display mt-10 text-2xl font-semibold">Finance control points</h3>
          <ul className="mt-3 space-y-2 text-sm">
            {[
              "DSL manufacturing costing uses consumption, SMV, accessories where they apply, and transport to Wattala.",
              "DSL’s profit margin sits inside the manufacturing / FOB price. Tikiri does not add a second margin on the local process.",
              "Local B2C pricing converts USD FOB to LKR, then adds duties, taxes, packaging and the website payment-processing cost.",
              "CUSDEC duty is fully cleared before stock leaves the BOI zone.",
              "Refunds follow the approval route. Finance does not pay before that.",
              "Local marketing advertising budget is LKR 300,000, expected on Ms. Gayara’s card, with Sachini processing it.",
              "A new bank account for website takings is still to be opened. See Pending Requirements.",
            ].map((item) => (
              <li key={item} className="rounded-2xl border border-line bg-surface px-4 py-3">{item}</li>
            ))}
          </ul>

          <h3 className="font-display mt-10 text-2xl font-semibold">Tools and partners</h3>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {tools.map((tool) => (
              <article key={tool.name} className="rounded-2xl border border-line bg-surface p-4">
                <h4 className="font-semibold">{tool.name}</h4>
                <p className="mt-1 text-sm text-muted">{tool.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="py-8">
          <h2 className="font-display text-3xl font-semibold tracking-tight">Still to close</h2>
          <p className="mt-2 max-w-2xl text-muted">
            Open points from the earlier draft that this update does not settle. The warehouse location is settled: Wattala. The two roles are defined, and hiring them sits in Pending Requirements.
          </p>
          <div className="mt-4 space-y-2">
            {stillOpen.map((item) => (
              <article key={item.title} className="rounded-2xl border border-line bg-surface px-4 py-3">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-semibold">{item.title}</h3>
                  <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${item.tag === "Proposed" ? "bg-implement-soft text-implement" : "bg-confirm-soft text-confirm"}`}>
                    {item.tag}
                  </span>
                </div>
                <p className="mt-1 text-sm text-muted">{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="py-4">
          <h2 className="font-display text-3xl font-semibold tracking-tight">Management checkpoints</h2>
          <p className="mt-2 text-muted">These do not replace the process. They make the handovers easier to see.</p>
          <div className="mt-4 space-y-2">
            {checkpoints.map((item) => (
              <article key={item.title} className="rounded-2xl border border-line bg-surface px-4 py-3">
                <h3 className="font-semibold">{item.title}</h3>
                <p className="mt-1 text-sm text-muted">{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="py-8">
          <h2 className="font-display text-3xl font-semibold tracking-tight">Quick contacts and place</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <article className="rounded-3xl border border-line bg-surface p-5">
              <p className="text-xs font-semibold tracking-widest text-muted uppercase">Warehouse</p>
              <p className="font-display mt-2 text-2xl font-semibold">Wattala</p>
              <p className="mt-2 text-sm text-muted">Street address and on-site phone: still to write in. Courier collection is from here, not from Biyagama and not from Colombo 10.</p>
            </article>
            <article className="rounded-3xl border border-line bg-surface p-5">
              <p className="text-xs font-semibold tracking-widest text-muted uppercase">Order desk</p>
              <p className="font-display mt-2 text-2xl font-semibold">Biyagama</p>
              <p className="mt-2 text-sm text-muted">Digital Marketing Executive, DSL Lanka (Pvt) Ltd, Export Processing Zone. Daily order list at 12:30 p.m.</p>
            </article>
            <article className="rounded-3xl border border-line bg-surface p-5">
              <p className="text-xs font-semibold tracking-widest text-muted uppercase">Customer channels</p>
              <p className="mt-2">Mobile / WhatsApp: 0773617771</p>
              <p className="text-sm text-muted">Facebook and Instagram inbox. Official email: still to be created.</p>
            </article>
            <article className="rounded-3xl border border-line bg-surface p-5">
              <p className="text-xs font-semibold tracking-widest text-muted uppercase">Line management</p>
              <p className="mt-2">Both new roles report to Sasini, Assistant Marketing Manager.</p>
              <p className="text-sm text-muted">Stock receipts and unresolved variances still go to the Operations Executive.</p>
            </article>
          </div>
        </section>

        <section id="pending" className="scroll-mt-24 py-8">
          <div className="rounded-3xl border border-accent/40 bg-surface p-5 sm:p-8">
            <p className="text-xs font-semibold tracking-widest text-accent uppercase">End of the guide</p>
            <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <h2 className="font-display text-4xl font-semibold tracking-tight">Pending Requirements</h2>
              <p className="text-sm font-semibold text-muted">{done} of {pending.length} ticked on this browser</p>
            </div>
            <p className="mt-3 max-w-2xl text-muted">
              These are not done. Tick them in a review if you want a running mark — the ticks stay on this browser only, and they are not the company record.
            </p>
            <ul className="mt-6 space-y-2">
              {pending.map((item, index) => {
                const on = Boolean(checked[item.id]);
                return (
                  <li key={item.id}>
                    <label className={`flex cursor-pointer gap-3 rounded-2xl border px-4 py-3 ${on ? "border-place/40 bg-place-soft" : "border-line bg-bg"}`}>
                      <input
                        type="checkbox"
                        checked={on}
                        onChange={() => toggle(item.id)}
                        className="mt-1 size-5 accent-accent"
                      />
                      <span>
                        <span className="block font-semibold">
                          {String(index + 1).padStart(2, "0")} · {item.title}
                        </span>
                        <span className={`mt-1 block text-sm ${on ? "text-place" : "text-muted"}`}>{item.body}</span>
                      </span>
                    </label>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        <footer className="border-t border-line pt-6 text-sm text-muted">
          Working draft for operational validation, November 2026. The pending list and the still-to-close points should be settled before this becomes the controlled SOP. Replaces the October 2026 draft on warehouse location, the two new roles, and the daily 12:30 p.m. / 5:00 p.m. routine.
        </footer>
      </main>
    </div>
  );
}

function Fact({ kicker, title, body }: { kicker: string; title: string; body: string }) {
  return (
    <article className="rounded-3xl border border-line bg-surface p-5">
      <p className="text-xs font-semibold tracking-widest text-muted uppercase">{kicker}</p>
      <h2 className="font-display mt-2 text-2xl font-semibold">{title}</h2>
      <p className="mt-2 text-sm text-muted">{body}</p>
    </article>
  );
}

function Legend({ tone, title, body }: { tone: "place" | "implement" | "confirm"; title: string; body: string }) {
  const chip =
    tone === "place" ? "bg-place-soft text-place" : tone === "implement" ? "bg-implement-soft text-implement" : "bg-confirm-soft text-confirm";
  return (
    <article className="rounded-3xl border border-line bg-surface p-5">
      <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${chip}`}>{title}</span>
      <p className="mt-3 text-sm">{body}</p>
    </article>
  );
}

function shortTitle(n: string) {
  const titles: Record<string, string> = {
    "01": "Forecast & select",
    "02": "BOI, Customs & PO",
    "03": "Materials & packing",
    "04": "Production plan",
    "05": "Produce & finish",
    "06": "Finish & pack",
    "07": "Duty & release",
    "08": "Move to Wattala",
    "09": "Inventory control",
    "10": "Costing & price",
    "11": "Shopify setup",
    "12": "Marketing live",
    "13": "Pick & dispatch",
    "14": "Care & replenish",
  };
  return titles[n] ?? n;
}
