import SolarSizingTool from "@/components/solar-sizing-tool";

export default function SizingToolPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="pt-20">
        <SolarSizingTool />
      </div>
    </div>
  );
}