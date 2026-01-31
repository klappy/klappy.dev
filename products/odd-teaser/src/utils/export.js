/**
 * Export Utility — Markdown Export (Local-Only)
 *
 * Generates a markdown file from artifacts and triggers download.
 * No server involvement — everything happens client-side.
 */

const ARTIFACT_TYPE_LABELS = {
  learning: "Learning",
  decision: "Decision",
  override: "Override",
};

const ARTIFACT_TYPE_EMOJI = {
  learning: "💡",
  decision: "📋",
  override: "⚡",
};

export function generateMarkdown(artifacts) {
  const now = new Date();
  const dateStr = now.toISOString().split("T")[0];
  const timeStr = now.toTimeString().split(" ")[0];

  let md = `# Externalized Artifacts\n\n`;
  md += `_Exported: ${dateStr} at ${timeStr}_\n\n`;
  md += `---\n\n`;

  // Group by type
  const grouped = {
    learning: [],
    decision: [],
    override: [],
  };

  artifacts.forEach((artifact) => {
    if (grouped[artifact.type]) {
      grouped[artifact.type].push(artifact);
    }
  });

  // Render each type section
  Object.entries(grouped).forEach(([type, items]) => {
    if (items.length === 0) return;

    const emoji = ARTIFACT_TYPE_EMOJI[type];
    const label = ARTIFACT_TYPE_LABELS[type];

    md += `## ${emoji} ${label}s (${items.length})\n\n`;

    items.forEach((artifact, index) => {
      const artifactTime = new Date(artifact.createdAt).toLocaleTimeString();
      md += `### ${label} ${index + 1}\n\n`;
      md += `${artifact.content}\n\n`;
      md += `_Created: ${artifactTime}_\n\n`;
    });
  });

  // Summary
  md += `---\n\n`;
  md += `**Summary:** ${artifacts.length} artifact(s) externalized\n`;

  const typeCounts = Object.entries(grouped)
    .filter(([, items]) => items.length > 0)
    .map(([type, items]) => `${items.length} ${ARTIFACT_TYPE_LABELS[type].toLowerCase()}(s)`)
    .join(", ");

  if (typeCounts) {
    md += `- ${typeCounts}\n`;
  }

  return md;
}

export function downloadMarkdown(markdown, filename = "artifacts.md") {
  const blob = new Blob([markdown], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  URL.revokeObjectURL(url);
}

export function exportArtifacts(artifacts) {
  const dateStr = new Date().toISOString().split("T")[0];
  const filename = `artifacts-${dateStr}.md`;
  const markdown = generateMarkdown(artifacts);
  downloadMarkdown(markdown, filename);
}
