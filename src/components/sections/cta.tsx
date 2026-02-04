"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export function CTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 md:py-32 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-accent/20 blur-[150px] rounded-full" />

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight mb-6">
            Ready to ship <span className="gradient-text">ML faster</span>?
          </h2>
          <p className="text-lg text-foreground-muted mb-8">
            Join the private beta and get early access to infrastructure that
            lets you focus on what matters.
          </p>

          {/* Email signup form */}
          <form
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-6"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-background-tertiary border border-border rounded-lg text-foreground placeholder:text-foreground-subtle focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
            />
            <Button size="lg" className="group whitespace-nowrap">
              Get Early Access
              <ArrowRight
                size={18}
                className="ml-2 group-hover:translate-x-1 transition-transform"
              />
            </Button>
          </form>

          <p className="text-sm text-foreground-subtle">
            Join 500+ ML engineers on the waitlist. No spam, ever.
          </p>
        </motion.div>
      </Container>
    </section>
  );
}
