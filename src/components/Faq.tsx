"use client"

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"

const faqs = [
  {
    value: "item-1",
    question: "How can I apply for project funding?",
    answer: "You just need to sign up, create your project profile, and submit your funding request with basic details.",
  },
  {
    value: "item-2",
    question: "Who can request funding on this platform?",
    answer: "Anyone with a clear project or even idea, whether individual or team, can request funding through our platform.",
  },
  {
    value: "item-3",
    question: "Is there a limit to how much funding I can ask for?",
    answer: "No strict limit. You can request any amount, but your chances improve if your request is realistic and well explained.",
  },
  {
    value: "item-4",
    question: "How do investors decide to fund my project?",
    answer: "Investors review your project details, goals, and plan. If they find it promising, they can provide funding directly.",
  },
  {
    value: "item-5",
    question: "Do I need to pay any fees to raise funds?",
    answer: "No upfront fees. A small service charge applies only when your project successfully receives funding.",
  },
  {
    value: "item-6",
    question: "How will I get the funds once approved?",
    answer: "Funds are transferred securely to your registered account after approval from the investor.",
  },
];


export default function Faq() {

  return (
    <div className="w-full pt-16 pb-24 flex flex-col justify-center items-center gap-10 max-md:gap-5 max-md:py-5">
      {/* Heading */}
      <h2 className="text-6xl max-md:text-3xl font-bold tracking-tight bg-gradient-to-b from-green-400 to-green-500 bg-clip-text text-transparent pb-1">
        FAQs
      </h2>

      {/* Accordion */}
      <Accordion type="single" collapsible className="w-[700px] max-md:w-full">
        {faqs.map((faq) => (
          <AccordionItem key={faq.value} value={faq.value}>
            <AccordionTrigger className="cursor-pointer text-white font-extrabold max-md:text-sm hover:bg-gray-700/20 bg-gray-500/10 rounded-lg my-2 border border-gray-100/10 px-4 py-3">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="accordion-content text-base max-md:text-sm text-gray-300 px-2">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
