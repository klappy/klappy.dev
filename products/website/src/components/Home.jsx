import React from 'react';

function Home() {
  return (
    <div>
      <section className="hero">
        <h1>Outcomes-Driven Development</h1>
        <p>
          A methodology for building with AI agents through evidence, constraints, 
          and progressive disclosure. Stop optimizing for confidence. Start verifying reality.
        </p>
      </section>

      <section className="content">
        <h2>Start Here</h2>
        <p>
          <a href="#klappy://public/odd">Read the ODD Manifesto</a> to understand the core philosophy, 
          or explore the <a href="#klappy://meta/canon-index">Canon</a> for detailed guidance on constraints, 
          decision rules, and evidence policies.
        </p>

        <h2>Key Concepts</h2>
        <ul style={{ marginBottom: 'var(--space-4)', paddingLeft: 'var(--space-5)' }}>
          <li><strong>Evidence over assertion</strong> — Claims must be backed by observable reality</li>
          <li><strong>Restartability over salvage</strong> — Clean restarts beat steering drifted systems</li>
          <li><strong>Progressive governance</strong> — Rigor increases as projects mature</li>
          <li><strong>Prompt over code</strong> — Intent is durable, implementations are ephemeral</li>
        </ul>

        <h2>Explore</h2>
        <p>
          <strong><a href="#klappy://projects/index">Projects</a></strong> — Experiments and implementations using ODD
        </p>
        <p>
          <strong><a href="#klappy://about/why-this-exists">Why This Exists</a></strong> — The motivation behind ODD
        </p>
        <p>
          <strong><a href="#klappy://about/credibility">Credibility</a></strong> — How to evaluate this work
        </p>
      </section>
    </div>
  );
}

export default Home;
