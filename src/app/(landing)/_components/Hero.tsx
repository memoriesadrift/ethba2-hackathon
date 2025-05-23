import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button";
import { SiGithub } from "@icons-pack/react-simple-icons";

export const Hero = () => {
  return (
    <section className="container grid lg:grid-cols-[2fr_1fr] place-items-center py-16 md:pt-20 gap-10">
      <div className="text-center lg:text-start space-y-6">
        <div className="text-5xl md:text-6xl font-bold">
          <h1 className="inline">
            <span className="inline bg-gradient-to-r from-[#F596D3]  to-[#D247BF] text-transparent bg-clip-text">
              Sandboxify
            </span>{" "}
            — learn DeFi
          </h1>{" "}
          without{" "}
          <h2 className="inline">
            loosing your{" "}
            <span className="inline bg-gradient-to-r from-[#61DAFB] via-[#1fc0f1] to-[#03a3d7] text-transparent bg-clip-text">
              money
            </span>
          </h2>
        </div>

        <p className="text-xl text-muted-foreground md:w-10/12 mx-auto lg:mx-0">
          Easily learn how to use DeFi protocols like Uniswap, Aave, and ETH
          staking with our platform. Experience hands-on practice in a risk-free
          environment, just like demo trading, so you can explore and master
          DeFi without worrying about losing real funds.
        </p>

        <div className="space-y-4 md:space-y-0 md:space-x-4">
          <Button className="w-full md:w-1/3">Get Started</Button>

          <a
            rel="noreferrer noopener"
            href="https://github.com/leoMirandaa/shadcn-landing-page.git"
            target="_blank"
            className={`w-full md:w-1/3 ${buttonVariants({
              variant: "outline",
            })}`}
          >
            Github Repository
            <SiGithub className="ml-2 w-5 h-5" />
          </a>
        </div>
      </div>

      {/* Hero cards sections */}
      <div className="z-10 hidden lg:flex">
        <img src="/colored-logo.png" className="max-w-96"/>
      </div>
    </section>
  );
};
