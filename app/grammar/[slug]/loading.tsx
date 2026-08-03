import { PageSkeleton } from "@/components/ui/PageSkeleton";

export default function Loading() {
  return <PageSkeleton cards={4} columns="1" narrow />;
}
