"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Cpu, Database, Terminal, Check } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";

const features = [
  {
    icon: Cpu,
    title: "Training APIs",
    description:
      "Distributed training without the distributed systems expertise.",
    highlights: [
      "Multi-GPU & multi-node out of the box",
      "Automatic checkpointing & recovery",
      "Built-in orchestration & scheduling",
    ],
    gradient: "from-accent to-purple-500",
  },
  {
    icon: Database,
    title: "Data Infrastructure",
    description: "Your training data, organized and accessible at any scale.",
    highlights: [
      "Git-like versioning for datasets",
      "Streaming at terabyte scale",
      "Visual data exploration tools",
    ],
    gradient: "from-highlight to-blue-500",
  },
  {
    icon: Terminal,
    title: "Dev Environments",
    description: "Research iteration at the speed of thought.",
    highlights: [
      "Production-identical environments",
      "Spin up in seconds, not hours",
      "On-demand GPU access",
    ],
    gradient: "from-green-400 to-emerald-500",
  },
];

export function Solution() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      id="features"
      className="py-24 md:py-32 bg-background-secondary/30"
    >
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium uppercase tracking-wider text-accent mb-4 block">
            The Solution
          </span>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
            Infrastructure that <span className="gradient-text">disappears</span>
          </h2>
          <p className="text-foreground-muted text-lg max-w-2xl mx-auto">
            Focus on your models. We handle everything else.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <Card hover className="h-full">
                {/* Icon with gradient */}
                <div
                  className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${feature.gradient} mb-4`}
                >
                  <feature.icon className="w-6 h-6 text-white" />
                </div>

                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-foreground-muted text-sm mb-4">
                  {feature.description}
                </p>

                <ul className="space-y-2">
                  {feature.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex items-start gap-2 text-sm"
                    >
                      <Check className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                      <span className="text-foreground-muted">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
