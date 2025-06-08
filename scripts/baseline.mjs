import { promises as fs } from 'fs';
import { execSync } from 'child_process';

const packages = ['server', 'web'];
let report = '';

for (const pkg of packages) {
  try {
    const outdated = execSync('npm outdated --json', { cwd: pkg });
    report += `## Outdated packages for ${pkg}\n\n\`\`\`json\n${outdated}\n\`\`\`\n`;
  } catch (err) {
    report += `## Outdated packages for ${pkg}\nnone\n`;
  }
  const envExample = await fs.readFile(`${pkg}/.env.example`, 'utf8');
  report += `### ${pkg} .env.example\n\n\`\`\`\n${envExample}\n\`\`\`\n`;
  try {
    const test = execSync('npm test --silent', { cwd: pkg });
    report += `### ${pkg} tests\n\n\`\`\`\n${test}\n\`\`\`\n`;
  } catch (err) {
    report += `### ${pkg} tests failed\n\n\`\`\`\n${err}\n\`\`\`\n`;
  }
}
await fs.writeFile('BASELINE_REPORT.md', report);
