/**
 * Export — Markdown artifact export
 *
 * One-click export as the exit ramp.
 * Local-only, no server round-trip.
 */

const ARTIFACT_LABELS = {
  learning: "Learning",
  decision: "Decision",
  override: "Override",
};

export function exportArtifacts(artifacts) {
  const grouped = artifacts.reduce((acc, artifact) => {
    if (!acc[artifact.type]) {
      acc[artifact.type] = [];
    }
    acc[artifact.type].push(artifact);
    return acc;
  }, {});

  const date = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  let markdown = `# Artifacts — ${date}\n\n`;
  markdown += `Exported from klappy.dev\n\n---\n\n`;

  const typeOrder = ["learning", "decision", "override"];

  for (const type of typeOrder) {
    if (grouped[type] && grouped[type].length > 0) {
      markdown += `## ${ARTIFACT_LABELS[type]}s\n\n`;

      for (const artifact of grouped[type]) {
        const time = new Date(artifact.createdAt).toLocaleTimeString();
        markdown += `### ${time}\n\n`;
        markdown += `${artifact.content}\n\n`;
      }
    }
  }

  // Download
  const blob = new Blob([markdown], { type: "text/markdown" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `artifacts-${new Date().toISOString().split("T")[0]}.md`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
