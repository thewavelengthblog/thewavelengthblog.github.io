// Builds the editor's settings file. When GitHub builds the site, the
// repository name is filled in automatically, so there is nothing to edit.
import template from '../../admin-config.yml?raw';

export function GET() {
  const repo = process.env.GITHUB_REPOSITORY || 'YOUR_GITHUB_USERNAME/YOUR_GITHUB_USERNAME.github.io';
  return new Response(template.replace('__REPOSITORY__', repo), {
    headers: { 'Content-Type': 'text/yaml; charset=utf-8' },
  });
}
