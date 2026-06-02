import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type FearCardProps = {
  title: string;
  diagnostic: string;
};

export function FearCard({ title, diagnostic }: FearCardProps) {
  return (
    <Card className="group h-full transition duration-300 hover:-translate-y-1 hover:border-[#d6a15d]/35 hover:bg-[#d6a15d]/[0.055]">
      <CardHeader>
        <span className="h-1 w-10 rounded-full bg-[#d6a15d]/70 transition group-hover:w-16" />
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm leading-7 text-[#a7a29a]">{diagnostic}</p>
      </CardContent>
    </Card>
  );
}
