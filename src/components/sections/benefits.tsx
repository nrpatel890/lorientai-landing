"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Container } from "@/components/ui/container";

const benefits = [
  {
    metric: "10x",
    label: "Faster iteration",
    description: "Go from idea to trained model in hours, not weeks.",
  },
  {
    metric: "94%",
    label: "Less infra code",
    description: "Stop writing YAML. Start shipping models.",
  },
  {
    metric: "Zero",
    label: "Cold starts",
    description: "Environments ready when you are.",
  },
  {
    metric: "$0",
    label: "Wasted on failures",
    description: "Automatic checkpointing means no lost progress.",
  },
];

export function Benefits() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 md:py-32 bg-background-secondary/30">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
            Results that <span className="gradient-text">matter</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <span className="text-4xl md:text-5xl font-bold gradient-text block mb-2">
                {benefit.metric}
              </span>
              <span className="text-lg font-medium block mb-1">
                {benefit.label}
              </span>
              <p className="text-sm text-foreground-muted">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
