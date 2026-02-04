"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { GridBackground } from "@/components/effects/grid-background";
import { CodeWindow } from "@/components/effects/code-window";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20">
      <GridBackground />

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Copy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent/30 bg-accent/10 text-accent-light text-sm mb-6"
            >
              <Sparkles size={14} />
              <span>Now in Private Beta</span>
            </motion.div>

            {/* Headline */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
              The <span className="gradient-text">Vercel</span> for Model
              Training
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-xl text-foreground-muted max-w-xl mx-auto lg:mx-0 mb-8">
              Ship ML faster. LorientAI abstracts away distributed compute,
              checkpointing, and orchestration so you can focus on what matters:{" "}
              <span className="text-foreground">your models</span>.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" className="group">
                Start Building
                <ArrowRight
                  size={18}
                  className="ml-2 group-hover:translate-x-1 transition-transform"
                />
              </Button>
              <Button size="lg" variant="outline">
                View Documentation
              </Button>
            </div>
          </motion.div>

          {/* Right: Visual */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative"
          >
            <CodeWindow title="train.py" className="glow-accent">
              <pre className="text-sm text-foreground-muted">
                <code>
                  <span className="text-accent">import</span> lorient
                  {"\n\n"}
                  <span className="text-foreground-subtle"># Initialize training run</span>
                  {"\n"}
                  run = lorient.<span className="text-highlight">Run</span>(
                  {"\n"}
                  {"    "}model=<span className="text-green-400">&quot;llama-3-8b&quot;</span>,
                  {"\n"}
                  {"    "}dataset=<span className="text-green-400">&quot;my-dataset&quot;</span>,
                  {"\n"}
                  {"    "}compute=<span className="text-green-400">&quot;auto&quot;</span>
                  {"  "}
                  <span className="text-foreground-subtle"># We handle the infra</span>
                  {"\n"}){"\n\n"}
                  <span className="text-foreground-subtle"># Start distributed training</span>
                  {"\n"}
                  run.<span className="text-highlight">train</span>(
                  {"\n"}
                  {"    "}epochs=<span className="text-orange-400">3</span>,
                  {"\n"}
                  {"    "}checkpoint_every=<span className="text-green-400">&quot;1h&quot;</span>,
                  {"\n"}
                  {"    "}eval_on=[<span className="text-green-400">&quot;hellaswag&quot;</span>, <span className="text-green-400">&quot;mmlu&quot;</span>]
                  {"\n"}){"\n\n"}
                  <span className="text-foreground-subtle"># Deploy when ready</span>
                  {"\n"}
                  run.<span className="text-highlight">deploy</span>(endpoint=<span className="text-green-400">&quot;production&quot;</span>)
                </code>
              </pre>
            </CodeWindow>

            {/* Floating stats */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="absolute -bottom-4 -left-4 glass rounded-lg p-3 text-sm"
            >
              <span className="text-highlight font-mono font-bold">94%</span>
              <span className="text-foreground-muted ml-2">less infra code</span>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
