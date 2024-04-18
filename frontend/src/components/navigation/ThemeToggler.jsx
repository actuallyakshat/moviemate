import { useTheme } from "@/providers/theme-provider";

export function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <>
      <p
        onClick={(e) => {
          e.stopPropagation();
          setTheme("light");
          document
            .querySelector("html")
            .dispatchEvent(new Event("toggleDarkMode"));
        }}
        className="hidden dark:block w-full px-2 py-1.5"
      >
        Switch Theme
      </p>
      <p
        onClick={(e) => {
          e.stopPropagation();
          setTheme("dark");
          document
            .querySelector("html")
            .dispatchEvent(new Event("toggleDarkMode"));
        }}
        className="dark:hidden px-2 py-1.5 block w-full"
      >
        Switch Theme
      </p>
    </>
  );
}
