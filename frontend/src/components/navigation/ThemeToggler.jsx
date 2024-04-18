import { useTheme } from "@/providers/theme-provider";

export function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <>
      <p
        onClick={(e) => {
          e.stopPropagation();
          setTheme("light");
        }}
        className="hidden dark:block w-full px-2 py-1.5"
      >
        Dark
      </p>
      <p
        onClick={(e) => {
          e.stopPropagation();
          setTheme("dark");
        }}
        className="dark:hidden px-2 py-1.5 block w-full"
      >
        Light
      </p>
    </>
  );
}
