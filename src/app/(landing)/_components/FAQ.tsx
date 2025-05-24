import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQProps {
  question: string;
  answer: string;
  value: string;
}

const FAQList: FAQProps[] = [
  {
    question: "Is SandboxFi free?",
    answer: "Yes. You only pay for transaction fees for interacting with our protocol.",
    value: "item-1",
  },
  {
    question: "How do SandboxFi tokens work?",
    answer: "SandboxFi are non-transferrable ERC-1155 tokens mirroring real ERC-20 assets. SandboxFi represents real ERC-20 assets like USDC in our ERC-1155 contract. They have no real world value and essentially act as testnet tokens, but with a twist. When interacting with real protocols through SandboxFi, SandboxFi communicates with DeFi protocols as if you were using real tokens. SandboxFi's unique mechanism then lets you earn yield as if you were using real assets.",
    value: "item-2",
  },
  {
    question: "How do I get started?",
    answer: "Go to our app dashboard and get your free SandboxFi USDC tokens and start interacting with DeFi protocols, all without leaving our website!",
    value: "item-3",
  },
  {
    question: "How do competitions work?",
    answer: "Competitions are time-locked events where users can enter to compete in who earns the most in a given time frame. At the end of the competition there will be a time window for users to submit their portfolio value and the top 5 highest earners share in the prize pool.",
    value: "item-4",
  },
];

export const FAQ = () => {
  return (
    <section id="faq" className="container py-24 max-w-2xl">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        Frequently Asked{" "}
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          Questions
        </span>
      </h2>

      <Accordion type="single" collapsible className="w-full AccordionRoot">
        {FAQList.map(({ question, answer, value }: FAQProps) => (
          <AccordionItem key={value} value={value}>
            <AccordionTrigger className="text-left">
              {question}
            </AccordionTrigger>

            <AccordionContent>{answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <h3 className="font-medium mt-4">
        Still have questions?{" "}
        <a
          rel="noreferrer noopener"
          href="#"
          className="text-primary transition-all border-primary hover:border-b-2"
        >
          Contact us
        </a>
      </h3>
    </section>
  );
};
