"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Container } from "@/components/ui/container";
import { CodeWindow } from "@/components/effects/code-window";

const steps = [
  {
    number: "01",
    title: "Connect",
    description:
      "Point to your model and data. We support HuggingFace, custom PyTorch, and JAX.",
    code: `lorient.connect(
  model="./my-llm",
  data="s3://bucket/training-data"
)`,
    filename: "config.py",
  },
  {
    number: "02",
    title: "Configure",
    description:
      "Define your training parameters. We auto-optimize for your hardware.",
    code: `config = lorient.Config(
  batch_size="auto",
  learning_rate=2e-5,
  precision="bf16",
  checkpoint_interval="30m"
)`,
    filename: "config.py",
  },
  {
    number: "03",
    title: "Launch",
    description:
      "One command to start distributed training. We handle scaling, failures, and optimization.",
    code: `lorient run train \\
  --config ./config.yaml \\
  --compute 8xA100 \\
  --watch`,
    filename: "terminal",
  },
];

export function HowItWorks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} id="how-it-works" className="py-24 md:py-32">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium uppercase tracking-wider text-accent mb-4 block">
            How It Works
          </span>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
            From zero to training in{" "}
            <span className="gradient-text">minutes</span>
          </h2>
        </motion.div>

        <div className="space-y-16">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`grid md:grid-cols-2 gap-8 items-center ${
                index % 2 === 1 ? "md:[direction:rtl]" : ""
              }`}
            >
              {/* Content */}
              <div className={index % 2 === 1 ? "md:[direction:ltr]" : ""}>
                <span className="text-5xl font-bold text-accent/20 mb-4 block">
                  {step.number}
                </span>
                <h3 className="text-2xl font-semibold mb-3">{step.title}</h3>
                <p className="text-foreground-muted">{step.description}</p>
              </div>

              {/* Code */}
              <div className={index % 2 === 1 ? "md:[direction:ltr]" : ""}>
                <CodeWindow title={step.filename}>
                  <pre className="text-sm text-foreground-muted">
                    <code>{step.code}</code>
                  </pre>
                </CodeWindow>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
