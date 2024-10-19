import FullPageLoader from "@/components/FullPageLoader";
import Layout from "@/layout/Layout";
import { FormData } from "@/types/formTypes";
import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import formData from "../../data.json";
import PrivateRoute from "./PrivateRoute";

const Home = lazy(() => import("@/screens/home/Home"));
const Login = lazy(() => import("@/screens/login/Login"));
const PersonalInformationForm = lazy(
  () => import("@/screens/form/PersonalInformationForm")
);

const AppRoutes: React.FC = () => {
  const data: FormData = formData;

  return (
    <Layout>
      <Suspense fallback={<FullPageLoader />}>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />

          {/* Private Routes */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          {data?.form?.groups?.map((group) => (
            <Route
              key={group.title}
              path={`/form/${group.title.replace(/\s+/g, "-").toLowerCase()}`}
              element={<PersonalInformationForm group={group} />}
            />
          ))}
        </Routes>
      </Suspense>
    </Layout>
  );
};

export default AppRoutes;
