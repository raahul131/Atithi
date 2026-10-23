import { Text } from "@/components/ui";

const sizes = { lg: "display", header: "jumbo", md: "heading" } as const;

// PLACEHOLDER: swap for the real "atithi" wordmark once it's in assets/images/.
export function Wordmark({ size = "lg" }: { size?: keyof typeof sizes }) {
  return (
    <Text variant={sizes[size]} accessibilityRole="header">
      atithi
    </Text>
  );
}
