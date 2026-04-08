import Button from "@/shared/ui/button";
import FileDownload from "~icons/tabler/file-download";
import resumePDF from "../assets/ijagamino-resume.pdf";

export default function DownloadCVButton() {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = resumePDF;
    link.download = "ijagamino-resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Button onClick={handleDownload} className="mx-auto">
      <FileDownload className="size-12" />
      Download CV
    </Button>
  );
}
