import { useState } from "react";
import { StatusCard } from "@/components/StatusCard";
import { AddTargetForm } from "@/components/AddTargetForm";

const Index = () => {
  const [targets, setTargets] = useState<string[]>([]);

  const handleAddTarget = (target: string) => {
    if (!targets.includes(target)) {
      setTargets([...targets, target]);
    }
  };

  const handleDeleteTarget = (target: string) => {
    setTargets(targets.filter((t) => t !== target));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container max-w-4xl">
        <div className="space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Status Monitor</h1>
            <p className="text-gray-600">Monitor your websites and IP addresses in real-time</p>
          </div>

          <AddTargetForm onAdd={handleAddTarget} />

          <div className="grid gap-6">
            {targets.map((target) => (
              <StatusCard
                key={target}
                target={target}
                onDelete={handleDeleteTarget}
              />
            ))}
            
            {targets.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                No targets being monitored. Add a website or IP address above to get started.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;