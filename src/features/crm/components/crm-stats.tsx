import { MetricStrip } from "@/components/app";
import { formatAum } from "../model";

export function CrmStats({
  total,
  showing,
  open,
  aum,
}: {
  total: number;
  showing: number;
  open: number;
  aum: number;
}) {
  return (
    <MetricStrip
      metrics={[
        { label: "Total clients", value: total.toString() },
        { label: "Showing", value: showing.toString() },
        { label: "Open relationships", value: open.toString() },
        { label: "AUM (filtered)", value: formatAum(aum) },
      ]}
    />
  );
}
