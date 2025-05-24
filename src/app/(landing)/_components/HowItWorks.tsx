import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MedalIcon, MapIcon, PlaneIcon, GiftIcon } from "./Icons";

interface FeatureProps {
  icon: React.ReactElement;
  title: string;
  description: string;
}

const features: FeatureProps[] = [
  {
    icon: <MedalIcon />,
    title: "Real DeFi Contracts",
    description:
      "All data (exchange rates, yield) comes from real mainnet DeFi protocols.",
  },
  {
    icon: <MapIcon />,
    title: "Simulated Yield",
    description:
      "You interact with real protocols using our ERC-1155 fantasy tokens, then farm yield as if you used real tokens! 📈",
  },
  {
    icon: <PlaneIcon />,
    title: "Genuine Learning",
    description:
      "Our protocol mirrors real contracts according to your fantasy deposits, accruing yield as the real protocol earns it!",
  },
  {
    icon: <GiftIcon />,
    title: "Learn to Earn",
    description:
      "Each user starts with 10000 fantasy USD and those who use our protocol to earn the most profit in the competition time stand to earn prizes! 💰",
  },
];

export const HowItWorks = () => {
  return (
    <section id="howItWorks" className="container text-center py-24 sm:py-32">
      <h2 className="text-3xl md:text-4xl font-bold ">
        How It Works
      </h2>
      <p className="md:w-3/4 mx-auto mt-4 mb-8 text-xl text-muted-foreground">
        Our on-chain sandbox allows you to interact with real DeFi protocols <b>without putting any funds at risk</b>.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map(({ icon, title, description }: FeatureProps) => (
          <Card key={title} className="bg-muted/50">
            <CardHeader>
              <CardTitle className="grid gap-4 place-items-center">
                {icon}
                {title}
              </CardTitle>
            </CardHeader>
            <CardContent>{description}</CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
