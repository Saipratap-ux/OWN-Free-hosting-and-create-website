import JSZip from 'jszip';
import { Project } from '../types';

export async function downloadProjectZip(project: Project) {
  const zip = new JSZip();
  const folder = zip.folder(project.title.toLowerCase().replace(/[^a-z0-9]/g, '-') || 'website');

  if (folder) {
    // Add all project files
    for (const [filename, file] of Object.entries(project.files)) {
      folder.file(filename, file.content);
    }

    // Add a modern manifest & README
    if (!project.files['README.md']) {
      folder.file(
        'README.md',
        `# ${project.title}\n\nGenerated with SaipratapS❤️C (Build. Create. Publish. Share. Free.)\n\n- Subdomain: ${project.subdomain}\n- Created: ${project.createdAt}\n\n## How to run locally:\n1. Open index.html in any modern browser.\n2. Or run: npx serve .\n`
      );
    }

    const content = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(content);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${project.subdomain || 'website'}-source.zip`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
}
