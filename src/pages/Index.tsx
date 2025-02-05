
import { StatusCard } from "@/components/StatusCard";

const Index = () => {
  // Hardcoded list of targets to monitor with aliases
  const targets = [
    { target: "google.com", alias: "Google" },
    { target: "github.com", alias: "GitHub" },
    { target: "8.8.8.8", alias: "Google DNS" },
    { target: "1.1.1.1", alias: "Cloudflare DNS" }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container max-w-4xl">
        <div className="space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Status Monitor</h1>
            <p className="text-gray-600">Monitoring system status in real-time</p>
          </div>

          <div className="grid gap-6">
            {targets.map((target) => (
              <StatusCard
                key={target.target}
                target={target.target}
                alias={target.alias}
                onDelete={() => {}} // Empty function since deletion is not needed
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
