"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";

const mathConcepts = [
  {
    title: "Distributed Gradient Accumulation",
    formula: "∇L(θ) = (1/N) Σᵢ₌₁ᴺ ∇Lᵢ(θ) ≈ (1/|B|) Σⱼ∈B ∇Lⱼ(θ)",
    description:
      "LorientAI implements ring-allreduce with gradient compression using Top-K sparsification where K = ⌈ρ·d⌉ for sparsity ratio ρ ∈ (0,1]. Error feedback accumulation ensures convergence: eₜ₊₁ = eₜ + gₜ - Compress(eₜ + gₜ)",
  },
  {
    title: "Adaptive Learning Rate Scheduling",
    formula: "ηₜ = η₀ · min(t⁻⁰·⁵, t · warmup⁻¹·⁵) · √(1 - β₂ᵗ)/(1 - β₁ᵗ)",
    description:
      "Our scheduler combines linear warmup with inverse square root decay, modulated by Adam's bias correction terms. For large batch training, we apply LARS: η̂ₗ = η · ‖wₗ‖/(‖∇L(wₗ)‖ + β‖wₗ‖) per layer l.",
  },
  {
    title: "Mixed-Precision Numerics",
    formula: "x̃ = clamp(⌊x/s⌉, -2ᵇ⁻¹, 2ᵇ⁻¹-1) · s, where s = max(|x|)/(2ᵇ⁻¹-1)",
    description:
      "BF16 master weights with FP8 forward pass (E4M3) and backward pass (E5M2). Loss scaling with dynamic exponent: scale = 2^k where k = argmax{2^k · ‖∇L‖∞ < FP16_MAX}.",
  },
  {
    title: "Tensor Parallelism Sharding",
    formula: "Y = GeLU(XA₁)A₂ → Y = GeLU(X[A₁]ᶜᵒˡ)·AllReduce([A₂]ʳᵒʷ)",
    description:
      "Column-parallel linear layers partition A ∈ ℝᵈˣᵏ into [A₁|A₂|...|Aₚ] across P devices. For attention: Q,K,V heads distributed with Σᵢ softmax(QᵢKᵢᵀ/√dₖ)Vᵢ computed locally before all-gather.",
  },
];

const optimizationTheory = [
  {
    title: "Convergence Guarantees",
    content: `For L-smooth, μ-strongly convex objectives with SGD:

𝔼[‖θₜ - θ*‖²] ≤ (1 - μη)ᵗ‖θ₀ - θ*‖² + ησ²/μ

Where σ² bounds gradient variance. Our adaptive batching maintains:
Var(ĝ) = σ²/|B| ≤ ε² ⟹ |B| ≥ σ²/ε²

Critical batch size Bₖᵣᵢₜ = tr(H⁻¹Σ)/‖∇L‖² determines scaling efficiency.`,
  },
  {
    title: "Second-Order Approximations",
    content: `Shampoo preconditioner for matrix parameter W ∈ ℝᵐˣⁿ:

Lₜ = (Σₛ₌₁ᵗ GₛGₛᵀ + εI)^(1/4) ∈ ℝᵐˣᵐ
Rₜ = (Σₛ₌₁ᵗ GₛᵀGₛ + εI)^(1/4) ∈ ℝⁿˣⁿ

Update: Wₜ₊₁ = Wₜ - η·Lₜ⁻¹GₜRₜ⁻¹

Matrix roots computed via coupled Newton iteration:
Xₖ₊₁ = ½(Xₖ + Yₖ⁻¹), Yₖ₊₁ = ½(Yₖ + Xₖ⁻¹)`,
  },
  {
    title: "Attention Complexity Reduction",
    content: `Standard attention: O(n²d) time, O(n²) memory

Flash Attention tiling with block sizes Bᵣ, Bᶜ:
- Load Qᵢ ∈ ℝ^(Bᵣ×d), Kⱼ,Vⱼ ∈ ℝ^(Bᶜ×d) to SRAM
- Compute Sᵢⱼ = QᵢKⱼᵀ ∈ ℝ^(Bᵣ×Bᶜ)
- Online softmax: mᵢⱼ = max(mᵢ,ⱼ₋₁, rowmax(Sᵢⱼ))
- Rescale: ℓᵢⱼ = e^(mᵢ,ⱼ₋₁-mᵢⱼ)ℓᵢ,ⱼ₋₁ + rowsum(e^(Sᵢⱼ-mᵢⱼ))

IO complexity: O(n²d²/M) for SRAM size M.`,
  },
  {
    title: "Gradient Checkpointing Trade-offs",
    content: `Memory-compute Pareto frontier for transformer with L layers:

Standard: O(L·n·d) memory, O(1) recomputation
√L checkpointing: O(√L·n·d) memory, O(√L) recomputation
Selective: checkpoint at layers {⌊iL/k⌋ : i ∈ [k]}

Optimal k minimizes: T(k) = T_fwd(1 + (L-k)/k) + T_bwd
Subject to: M(k) = M_act·k + M_param ≤ M_available

Our solver uses DP: V(l,m) = min over checkpoints c ∈ [l]`,
  },
];

const distributedSystems = [
  {
    title: "Pipeline Parallelism Scheduling",
    content: `1F1B (One Forward One Backward) steady state:

Microbatch latency: T_mb = (p-1)·(t_f + t_b) + t_f + t_b
Pipeline bubble ratio: β = (p-1)/(m + p - 1)

For p stages, m microbatches, minimize β subject to:
m·(memory per microbatch) ≤ available memory

Interleaved schedule with v virtual stages:
β_interleaved = (p-1)/(m·v + p - 1)

Zero Bubble scheduling eliminates β via:
- W (weight gradient) decoupled from B (activation gradient)
- Schedule: F₁F₂...FₚB₁W₁B₂W₂...BₚWₚ`,
  },
  {
    title: "Communication Topology Optimization",
    content: `Ring AllReduce for N workers, message size M:

T_ring = 2(N-1)/N · (α + M·β/N)

Where α = latency, β = inverse bandwidth.

For hierarchical networks (intra-node NVLink, inter-node IB):
T_hier = T_intra_reduce + T_inter_allreduce + T_intra_broadcast

Bandwidth-optimal 2D torus AllReduce:
T_2D = 2·(√N - 1)·(α + M·β/√N)

LorientAI auto-selects: argmin_{topo} T_topo(N, M, α, β)`,
  },
  {
    title: "ZeRO Memory Optimization",
    content: `Memory per GPU for model with Ψ parameters:

Stage 1 (Optimizer States): 4Ψ + 12Ψ/N
Stage 2 (+ Gradients): 2Ψ + (2 + 12)Ψ/N
Stage 3 (+ Parameters): 16Ψ/N

Communication overhead per step:
ZeRO-1: 0 extra (optimizer step local)
ZeRO-2: Ψ · sizeof(grad) AllReduce → Reduce-Scatter
ZeRO-3: 2 · AllGather(Ψ/N) per layer (fwd + bwd)

Partition granularity g trades memory vs communication:
Memory: Ψ·sizeof(param)/g per partition
Comm: O(g) AllGather calls per layer`,
  },
];

const transformerMath = [
  {
    title: "Rotary Position Embeddings",
    formula: `Rθ,m = [cos(mθ₁)  -sin(mθ₁)  0  ...
         sin(mθ₁)   cos(mθ₁)  0  ...
         0          0         cos(mθ₂) ...
         ...]`,
    description:
      "RoPE encodes position via rotation: (Rθ,mqₘ)ᵀ(Rθ,nkₙ) = qₘᵀRθ,n-mkₙ. Base frequency θᵢ = 10000^(-2i/d). NTK-aware scaling: θ'ᵢ = θᵢ · α^(d/(d-2i)) for context extension factor α.",
  },
  {
    title: "Grouped Query Attention",
    formula: "Attention(Q, K, V) = softmax(QKᵀ/√dₖ + M)V where K,V ∈ ℝ^(n×dₖ/g)",
    description:
      "GQA with g groups: nₕ heads share nₖᵥ = nₕ/g key-value heads. Memory: O(2·n·d/g) vs O(2·n·d) for MHA. Interpolation from MQA via mean pooling: K_gqa = mean(K_mha[g·i:(g+1)·i]) per group.",
  },
  {
    title: "SwiGLU Activation",
    formula: "SwiGLU(x, W, V, b, c) = Swish(xW + b) ⊗ (xV + c)",
    description:
      "Where Swish(x) = x·σ(βx) and σ is sigmoid. Hidden dim d_ff = ⌊(8/3·d_model·2/3)⌋ rounded to multiple of 256 for tensor core alignment. Gradient: ∂SwiGLU/∂x = σ'(Wx)⊗(Vx)·W + Swish(Wx)·V",
  },
  {
    title: "RMSNorm Numerical Stability",
    formula: "RMSNorm(x) = x/RMS(x) · γ, where RMS(x) = √(Σxᵢ²/d + ε)",
    description:
      "Backward pass: ∂L/∂x = γ/RMS(x)·(∂L/∂y - ȳ·mean(∂L/∂y ⊙ y)). For mixed precision: compute RMS in FP32, cast to BF16 for multiply. Fused kernel: single pass with Welford's online variance.",
  },
];

export function Technical() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 md:py-32 bg-background-secondary/30">
      <Container size="wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium uppercase tracking-wider text-accent mb-4 block">
            Technical Deep Dive
          </span>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
            The <span className="gradient-text">Mathematics</span> Under the Hood
          </h2>
          <p className="text-foreground-muted text-lg max-w-3xl mx-auto">
            LorientAI abstracts complexity—but we believe in transparency. Here&apos;s
            the rigorous foundation powering your training runs.
          </p>
        </motion.div>

        {/* Core Optimization */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-16"
        >
          <h3 className="text-xl font-semibold mb-6 text-accent">
            § Gradient Optimization & Numerical Methods
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {mathConcepts.map((concept, index) => (
              <Card key={concept.title} hover className="h-full">
                <h4 className="font-semibold mb-3">{concept.title}</h4>
                <div className="bg-background/50 rounded-lg p-3 mb-3 overflow-x-auto">
                  <code className="text-sm text-highlight font-mono whitespace-pre">
                    {concept.formula}
                  </code>
                </div>
                <p className="text-sm text-foreground-muted leading-relaxed">
                  {concept.description}
                </p>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Optimization Theory */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <h3 className="text-xl font-semibold mb-6 text-accent">
            § Convergence Theory & Complexity Analysis
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {optimizationTheory.map((item) => (
              <Card key={item.title} hover className="h-full">
                <h4 className="font-semibold mb-3">{item.title}</h4>
                <pre className="text-xs text-foreground-muted font-mono whitespace-pre-wrap leading-relaxed bg-background/50 rounded-lg p-4 overflow-x-auto">
                  {item.content}
                </pre>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Distributed Systems */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-16"
        >
          <h3 className="text-xl font-semibold mb-6 text-accent">
            § Distributed Systems & Communication Primitives
          </h3>
          <div className="grid lg:grid-cols-3 gap-6">
            {distributedSystems.map((item) => (
              <Card key={item.title} hover className="h-full">
                <h4 className="font-semibold mb-3">{item.title}</h4>
                <pre className="text-xs text-foreground-muted font-mono whitespace-pre-wrap leading-relaxed bg-background/50 rounded-lg p-4 overflow-x-auto">
                  {item.content}
                </pre>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Transformer Mathematics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <h3 className="text-xl font-semibold mb-6 text-accent">
            § Transformer Architecture Primitives
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {transformerMath.map((item) => (
              <Card key={item.title} hover className="h-full">
                <h4 className="font-semibold mb-3">{item.title}</h4>
                <div className="bg-background/50 rounded-lg p-3 mb-3 overflow-x-auto">
                  <code className="text-xs text-highlight font-mono whitespace-pre">
                    {item.formula}
                  </code>
                </div>
                <p className="text-sm text-foreground-muted leading-relaxed">
                  {item.description}
                </p>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Loss Landscape */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Card className="bg-gradient-to-br from-background-secondary to-background-tertiary border-accent/20">
            <h3 className="text-xl font-semibold mb-4">
              Loss Landscape & Scaling Laws
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-medium text-accent mb-2">Chinchilla Optimal Compute</h4>
                <pre className="text-xs text-foreground-muted font-mono whitespace-pre-wrap leading-relaxed mb-4">
{`Given compute budget C (in FLOPs):
N_opt ∝ C^0.5  (optimal parameters)
D_opt ∝ C^0.5  (optimal tokens)

Loss scaling: L(N,D) = E + A/N^α + B/D^β
Where α ≈ 0.34, β ≈ 0.28, E = irreducible loss

Compute-optimal: C = 6·N·D (forward pass)
Including backward: C_total ≈ 6·N·D·(1 + 2) = 18·N·D`}
                </pre>
              </div>
              <div>
                <h4 className="font-medium text-accent mb-2">μP Hyperparameter Transfer</h4>
                <pre className="text-xs text-foreground-muted font-mono whitespace-pre-wrap leading-relaxed">
{`Maximal Update Parametrization for width scaling:

Input weights:  W_in ~ N(0, 1/d_in)
Output weights: W_out ~ N(0, 1/d_model)
Attention logits: QKᵀ/d_head (not √d_head)

Learning rate scaling:
  η_embed = η_base · m_width
  η_hidden = η_base
  η_output = η_base / m_width

Where m_width = d_model / d_base.
Enables HP transfer from 10M → 10B params.`}
                </pre>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-border">
              <h4 className="font-medium text-accent mb-2">Emergent Capabilities Phase Transitions</h4>
              <pre className="text-xs text-foreground-muted font-mono whitespace-pre-wrap leading-relaxed">
{`Capability emergence as function of compute C:

P(capability | C) = σ((log C - log C_crit) / τ)

Where C_crit = critical compute threshold, τ = sharpness.

Sharp transitions occur when:
∂²L/∂C² changes sign (loss curvature inflection)

Grokking dynamics: generalization after memorization
t_grok ∝ 1/(λ_reg · |S_train|) for regularization λ_reg

LorientAI monitors: ‖∇L_train‖/‖∇L_val‖ ratio for emergence detection.`}
              </pre>
            </div>
          </Card>
        </motion.div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center text-sm text-foreground-subtle mt-12"
        >
          All optimizations are applied automatically. You write{" "}
          <code className="text-accent">lorient.train()</code>—we handle the
          Hessian-vector products.
        </motion.p>
      </Container>
    </section>
  );
}
