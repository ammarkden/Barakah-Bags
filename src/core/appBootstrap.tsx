import "../../global.css";
import "../i18n";

import { ActivityLoader } from "@/components/loader/loader";
import { useAuth, useSignIn } from "@/hooks/auth/useAuth";
import { Stack } from "expo-router";

const AppBootstrap = () => {
  const { data: user, isLoading } = useAuth();

  const signIn = useSignIn();

  if (isLoading || signIn.isPending) {
    return <ActivityLoader />;
  }

  if (!user) {
    signIn.mutate();
    return <ActivityLoader />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
};

export default AppBootstrap;
