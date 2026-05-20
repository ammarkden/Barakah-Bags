import { queryClient } from "@/api/reactQuery/client";
import AppBootstrap from "@/core/appBootstrap";
import { QueryClientProvider } from "@tanstack/react-query";

const RootLayout = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AppBootstrap />
    </QueryClientProvider>
  );
};
export default RootLayout;
