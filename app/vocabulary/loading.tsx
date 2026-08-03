import { PageSkeleton } from "@/components/ui/PageSkeleton";

export default function Loading() {
  return <PageSkeleton cards={6} columns="3" />;
}
