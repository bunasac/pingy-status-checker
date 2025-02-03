import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface AddTargetFormProps {
  onAdd: (target: string) => void;
}

export const AddTargetForm = ({ onAdd }: AddTargetFormProps) => {
  const [target, setTarget] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation for URLs and IPs
    const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
    const ipPattern = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    
    if (!urlPattern.test(target) && !ipPattern.test(target)) {
      toast.error("Please enter a valid URL or IP address");
      return;
    }

    onAdd(target);
    setTarget("");
    toast.success("Target added to monitoring");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-4">
      <Input
        type="text"
        value={target}
        onChange={(e) => setTarget(e.target.value)}
        placeholder="Enter website URL or IP address"
        className="flex-1"
      />
      <Button type="submit">Add Target</Button>
    </form>
  );
};