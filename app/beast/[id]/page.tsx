interface BeastPageProps {
  params: { id: string };
}

export default function BeastPage({ params }: BeastPageProps) {
  return (
    <div>
      <h2 className="text-2xl text-ffxiv-gold mb-6">Beast #{params.id}</h2>
      <p className="text-ffxiv-muted">Beast detail — coming in feature/3-bestiary-ui</p>
    </div>
  );
}
