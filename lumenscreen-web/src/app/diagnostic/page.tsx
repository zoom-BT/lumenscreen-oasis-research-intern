import type { Metadata } from "next";
import { DiagnoseForm } from "@/components/DiagnoseForm";

export const metadata: Metadata = { title: "Diagnostic" };

export default function DiagnosticPage() {
  return <DiagnoseForm />;
}
