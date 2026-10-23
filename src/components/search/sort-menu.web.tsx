import { useState } from "react";
import { Pressable, View } from "react-native";

import { Text } from "@/components/ui";
import { sortLabels, type SortOption } from "@/lib/search/query";

import { SortLabel } from "./sort-label";

const options = Object.keys(sortLabels) as SortOption[];

// Web dropdown for sort options. iOS uses sort-menu.ios.tsx, Android uses sort-menu.tsx.
export function SortMenu({ value, onChange }: { value: SortOption; onChange: (value: SortOption) => void }) {
  const [open, setOpen] = useState(false);

  return (
    <View className="relative">
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Sort by ${sortLabels[value]}`}
        onPress={() => setOpen((prev) => !prev)}
      >
        <SortLabel value={value} />
      </Pressable>

      {open && (
        <>
          <Pressable
            className="fixed inset-0 z-40"
            onPress={() => setOpen(false)}
          />
          <View className="absolute right-0 top-full z-50 mt-1 min-w-[160px] rounded-2xl border border-border bg-surface p-1 shadow-lg">
            {options.map((option) => (
              <Pressable
                key={option}
                className={`rounded-xl px-3 py-2 ${option === value ? "bg-fill-secondary" : ""}`}
                onPress={() => {
                  setOpen(false);
                  if (option !== value) onChange(option);
                }}
              >
                <Text variant="body" tone={option === value ? "ink" : "muted"}>
                  {sortLabels[option]}
                </Text>
              </Pressable>
            ))}
          </View>
        </>
      )}
    </View>
  );
}
