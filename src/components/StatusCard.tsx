import { useState, useEffect } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

interface StatusCardProps {
  target: string;
  onDelete: (target: string) => void;
}

export const StatusCard = ({ target, onDelete }: StatusCardProps) => {
  const [status, setStatus] = useState<"online" | "offline" | "pending">("pending");
  const [responseTime, setResponseTime] = useState<number | null>(null);
  const [lastChecked, setLastChecked] = useState<Date>(new Date());

  const isIpAddress = (str: string) => {
    // Simple IP validation regex
    return /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/.test(str);
  };

  const checkStatus = async () => {
    const startTime = performance.now();
    try {
      let proxyUrl;
      if (isIpAddress(target)) {
        // For IP addresses, try HTTPS first, then HTTP
        proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(`https://${target}`)}`;
      } else {
        // For domains, use HTTP by default
        proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(`http://${target}`)}`;
      }

      const response = await fetch(proxyUrl);
      
      if (!response.ok) {
        // If HTTPS fails for IP, try HTTP
        if (isIpAddress(target) && response.status === 400) {
          const httpProxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(`http://${target}`)}`;
          const httpResponse = await fetch(httpProxyUrl);
          if (!httpResponse.ok) {
            throw new Error(`HTTP error! status: ${httpResponse.status}`);
          }
        } else {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      }

      const endTime = performance.now();
      setResponseTime(Math.round(endTime - startTime));
      setStatus("online");
    } catch (error) {
      console.error("Error checking status:", error);
      setStatus("offline");
      setResponseTime(null);
    }
    setLastChecked(new Date());
  };

  useEffect(() => {
    checkStatus();
    const interval = setInterval(checkStatus, 10000); // Check every 10 seconds
    return () => clearInterval(interval);
  }, [target]);

  const handleDelete = () => {
    onDelete(target);
    toast.success("Target removed from monitoring");
  };

  return (
    <Card className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div
            className={`h-3 w-3 rounded-full animate-status-pulse ${
              status === "online"
                ? "bg-status-online"
                : status === "offline"
                ? "bg-status-offline"
                : "bg-status-pending"
            }`}
          />
          <h3 className="text-lg font-semibold">{target}</h3>
        </div>
        <Button variant="ghost" size="icon" onClick={handleDelete}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="grid grid-cols-2 gap-4 text-sm text-gray-500">
        <div>
          <p>Status</p>
          <p className="font-medium capitalize">{status}</p>
        </div>
        <div>
          <p>Response Time</p>
          <p className="font-medium">
            {responseTime ? `${responseTime}ms` : "N/A"}
          </p>
        </div>
        <div className="col-span-2">
          <p>Last Checked</p>
          <p className="font-medium">
            {lastChecked.toLocaleTimeString()}
          </p>
        </div>
      </div>
    </Card>
  );
};