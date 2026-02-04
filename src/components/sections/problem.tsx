"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { AlertTriangle, Clock, Database, Server } from "lucide-react";
import { Container } from "@/components/ui/container";

const problems = [
  {
    icon: Server,
    title: "Distributed training requires PhD-level expertise",
    description:
      "Setting up multi-GPU and multi-node training means weeks of DevOps work before you write a single line of model code.",
  },
  {
    icon: Clock,
    title: "Checkpointing is an afterthought",
    description:
      "Until a preemption costs you 72 hours of compute. Then it becomes a fire drill.",
  },
  {
    icon: Database,
    title: "Data pipelines are duct tape",
    description:
      "Terabytes of training data scattered across S3, local disks, and that one researcher's laptop.",
  },
  {
    icon: AlertTriangle,
    title: "Dev doesn't match production",
    description:
      "Code that works on your M2 Mac mysteriously fails on your A100 cluster.",
  },
];

export function Problem() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 md:py-32">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium uppercase tracking-wider text-accent mb-4 block">
            The Problem
          </span>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            ML infrastructure is <span className="text-red-400">broken</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {problems.map((problem, index) => (
            <motion.div
              key={problem.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 rounded-xl border border-border bg-background-secondary/50 hover:border-red-500/30 transition-colors group"
            >
              <problem.icon className="w-10 h-10 text-red-400/80 mb-4" />
              <h3 className="text-lg font-medium mb-2">{problem.title}</h3>
              <p className="text-foreground-muted text-sm">
                {problem.description}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
