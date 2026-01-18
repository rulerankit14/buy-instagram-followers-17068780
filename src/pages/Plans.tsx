import * as React from "react";
import { useNavigate } from "react-router-dom";

import { GlowField } from "@/components/GlowField";
import { OfferCountdown } from "@/components/OfferCountdown";
import { PlanCard } from "@/components/PlanCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { loadDraft, saveOrder, type OrderPlan, type ServiceType } from "@/lib/order";

const plans: OrderPlan[] = [
  {
    id: "f10k",
    service: "followers",
    quantityLabel: "10K Followers",
    priceLabel: "₹3,499",
    amountInr: 200,
    badge: "Most Popular",
    perks: ["High-quality accounts", "Instant delivery"],
  },
  {
    id: "f20k",
    service: "followers",
    quantityLabel: "20K Followers",
    priceLabel: "₹6,999",
    amountInr: 250,
    perks: ["Premium quality", "Fast delivery", "100% safe"],
  },
  {
    id: "f40k",
    service: "followers",
    quantityLabel: "40K Followers",
    priceLabel: "₹13,999",
    amountInr: 400,
    badge: "Best Value",
    perks: ["Real-looking profiles", "Ultra-fast delivery", "Secure processing"],
  },
  {
    id: "l50k",
    service: "likes",
    quantityLabel: "50K Likes",
    priceLabel: "₹999",
    amountInr: 100,
    badge: "Most Popular",
    perks: ["Real engagement", "Fast start"],
  },
  {
    id: "l100k",
    service: "likes",
    quantityLabel: "100K Likes",
    priceLabel: "₹2,499",
    amountInr: 150,
    perks: ["High retention", "Steady delivery"],
  },
  {
    id: "l500k",
    service: "likes",
    quantityLabel: "500K Likes",
    priceLabel: "₹5,999",
    amountInr: 400,
    badge: "Best Value",
    perks: ["Natural delivery", "High quality"],
  },
  {
    id: "v10k",
    service: "views",
    quantityLabel: "10K Views",
    priceLabel: "₹1,499",
    amountInr: 199,
    perks: ["Fast delivery", "Works for Reels"],
  },
  {
    id: "v50k",
    service: "views",
    quantityLabel: "50K Views",
    priceLabel: "₹5,999",
    amountInr: 499,
    badge: "Best Value",
    perks: ["Natural pace", "High quality"],
  },
];

const tabItems: { key: ServiceType | "all"; label: string }[] = [
  { key: "all", label: "All Services" },
  { key: "followers", label: "Followers" },
  { key: "likes", label: "Likes" },
  { key: "views", label: "Views" },
];

function filterPlans(active: ServiceType | "all") {
  return active === "all" ? plans : plans.filter((p) => p.service === active);
}

export default function Plans() {
  const navigate = useNavigate();
  const draft = typeof window !== "undefined" ? loadDraft() : null;

  React.useEffect(() => {
    if (!draft) navigate("/");
  }, [draft, navigate]);

  const handleSelect = (plan: OrderPlan) => {
    if (!draft) return;
    saveOrder({
      ...draft,
      plan,
      createdAt: new Date().toISOString(),
    });
    navigate("/payment");
  };

  return (
    <GlowField>
      <main className="mx-auto flex min-h-screen max-w-md flex-col px-4 pb-12 pt-6">
        <header className="space-y-3">
          <h1 className="text-center font-display text-3xl tracking-tight text-foreground">
            Choose Your Plan
          </h1>
          <p className="text-center text-sm text-muted-foreground">
            Username: <span className="font-medium text-foreground">@{draft?.username}</span>
          </p>
          <OfferCountdown minutes={10} />
        </header>

        <section className="mt-6">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-4 rounded-full bg-secondary p-1">
              {tabItems.map((t) => (
                <TabsTrigger
                  key={t.key}
                  value={t.key}
                  className="rounded-full text-xs data-[state=active]:bg-brand-gradient data-[state=active]:text-primary-foreground"
                >
                  {t.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {tabItems.map((t) => (
              <TabsContent key={t.key} value={t.key} className="mt-5">
                <div className="space-y-5">
                  {filterPlans(t.key as any).map((p) => (
                    <PlanCard key={p.id} plan={p} onSelect={handleSelect} />
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </section>

        <div className="mt-8">
          <Button variant="outline" size="pill" className="w-full" onClick={() => navigate("/")}
          >
            Change username
          </Button>
        </div>
      </main>
    </GlowField>
  );
}
