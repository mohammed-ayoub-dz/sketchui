import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
    baseURL: "http://localhost:3000"
})

export const signIn = async () => {
  const data = await authClient.signIn.social({
    provider: "google",
  });

  console.log(data);
  return data;
};

export const getCurrentUser = async () => {
  const { data, error } = await authClient.getSession();
  
  if (error) {
    console.error("حدث خطأ أثناء جلب البيانات:", error);
    return null;
  }

  if (data) {
    console.log("بيانات الجلسة:", data.session);
    console.log("بيانات المستخدم:", data.user);
    return data.user; 
  }

  return null;
};