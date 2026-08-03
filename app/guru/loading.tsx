import { PageSkeleton } from "@/components/ui/PageSkeleton";

export default function Loading() {
  return <PageSkeleton cards={3} columns="1" narrow />;
}
