import { queryClient } from "@/api/reactQuery/client";
import AppBootstrap from "@/core/appBootstrap";
import { QueryClientProvider } from "@tanstack/react-query";
import "../global.css";
import "../src/i18n";

const RootLayout = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AppBootstrap />
    </QueryClientProvider>
  );
};
export default RootLayout;
