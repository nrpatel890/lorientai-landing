"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Container } from "@/components/ui/container";
import Image from "next/image";

const team = [
  {
    name: "Nimil Patel",
    role: "Co-Founder, CEO",
    image: "/nimil.png",
    description:
      "Built agent copilot at funded startup. Deployed on $1M+/yr client. BS Applied Math, UNC.",
  },
  {
    name: "Naresh Dhiman",
    role: "Co-Founder, CTO",
    image: "/naresh.png",
    description:
      "Serial entrepreneur. Techstars alum. Startup acquired by Groupon. 15+ years full-stack development experience.",
  },
  {
    name: "Vivek Srinivas",
    role: "Co-Founder, ML Lead",
    image: "/vivek.png",
    description:
      "Data Engineer @ Acorns. MS CS, ASU — 4.0 GPA. US Patent (LSTM).",
  },
  {
    name: "Tata Avirneni",
    role: "DevOps & Operations",
    image: "/tata.png",
    description: "AWS, Kubernetes, cloud infra. MS IT, Arkansas Tech.",
  },
];

export function Team() {
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
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
            Meet the <span className="gradient-text">team</span>
          </h2>
          <p className="text-foreground-muted max-w-2xl mx-auto">
            Engineers and researchers building the future of ML infrastructure.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-background-secondary/50 rounded-2xl p-6 border border-border hover:border-accent/50 transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold">{member.name}</h3>
                  <p className="text-accent text-sm font-medium mt-1">
                    {member.role}
                  </p>
                </div>
                <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 ml-4">
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <p className="text-foreground-muted text-sm leading-relaxed">
                {member.description}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}