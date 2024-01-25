import { IconBrandGithub, IconExternalLink } from "@tabler/icons-react";

export default function Footer() {
  return (
    <div className="flex gap-8 item-end mt-auto mb-3">
      <span>Made with ♥️ by Luis Canada 🇨🇦</span>
      <a
        className="flex gap-1"
        href="https://github.com/luis-c465/excalidraw-pdf-splitter"
        target="_blank"
      >
        <IconBrandGithub />
        Github
        <IconExternalLink size={12} />
      </a>
    </div>
  );
}
