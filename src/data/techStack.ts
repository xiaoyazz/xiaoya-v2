import type { AiTool, TechItem } from './types';

// Dock order matters: Java, C#/.NET, Python, React, iOS, Android, MongoDB, AWS, GCP, Docker, Figma, then AI Tools.
export const techStack: TechItem[] = [
  { name: 'Java', icon: 'java.svg', href: 'https://dev.java/learn/', label: 'Java documentation' },
  { name: 'C# / .NET', icon: 'csharp.svg', href: 'https://learn.microsoft.com/dotnet/csharp/', label: 'C sharp and dot NET documentation' },
  { name: 'Python', icon: 'python.svg', href: 'https://docs.python.org/3/', label: 'Python documentation' },
  { name: 'React', icon: 'react.svg', href: 'https://react.dev/', label: 'React documentation', className: 'tech-react' },
  { name: 'iOS', icon: 'ios.svg', href: 'https://developer.apple.com/ios/', label: 'iOS documentation' },
  { name: 'Android', icon: 'android.svg', href: 'https://developer.android.com/', label: 'Android documentation' },
  { name: 'MongoDB', icon: 'mongodb.svg', href: 'https://www.mongodb.com/docs/', label: 'MongoDB documentation' },
  { name: 'AWS', icon: 'aws.svg', href: 'https://docs.aws.amazon.com/', label: 'AWS documentation' },
  { name: 'GCP', icon: 'googlecloud.svg', href: 'https://cloud.google.com/docs', label: 'Google Cloud documentation' },
  { name: 'Docker', icon: 'docker.svg', href: 'https://docs.docker.com/', label: 'Docker documentation' },
  { name: 'Figma', icon: 'figma.svg', href: 'https://www.figma.com/', label: 'Figma', className: 'tech-figma' },
];

export const aiTools: AiTool[] = [
  { name: 'OpenAI', href: 'https://openai.com/', className: 'ai-openai' },
  { name: 'Claude', href: 'https://claude.ai/', className: 'ai-claude' },
  { name: 'GitHub Copilot', href: 'https://github.com/features/copilot', className: 'ai-copilot' },
];
