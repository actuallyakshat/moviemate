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
        className="hidden dark:block w-full"
      >
        Switch Theme
      </p>
      <p
        onClick={(e) => {
          e.stopPropagation();
          setTheme("dark");
        }}
        className="dark:hidden block w-full"
      >
        Switch Theme
      </p>
    </>
  );
}
