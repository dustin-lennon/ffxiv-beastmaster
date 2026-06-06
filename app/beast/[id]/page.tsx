export async function generateStaticParams() {
  // TODO: Replace with real beast IDs from XBMPet.csv in feature/2
  return [{ id: "1" }];
}

interface BeastPageProps {
  params: Promise<{ id: string }>;
}

export default async function BeastPage({ params }: BeastPageProps) {
  const { id } = await params;
  return (
    <div>
      <h2 className="text-2xl text-ffxiv-gold mb-6">Beast #{id}</h2>
      <p className="text-ffxiv-muted">Beast detail — coming in feature/3-bestiary-ui</p>
    </div>
  );
}
