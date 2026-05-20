import { queryClient } from "@/api/reactQuery/client";
import AppBootstrap from "@/configs/appBootstrap";
import { QueryClientProvider } from "@tanstack/react-query";
import "../global.css";
import "../src/language/i18n";

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppBootstrap />
    </QueryClientProvider>
  );
}
