import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const onboardingRoutes = {
  CUSTOMER: "/onboarding/customer",
  RESTAURANT_OWNER: "/onboarding/owner",
  DELIVERY_RIDER: "/onboarding/rider",
};

const dashboardRoutes = {
  CUSTOMER: "/",
  RESTAURANT_OWNER: "/owner/dashboard",
  DELIVERY_RIDER: "/rider/dashboard",
};

function OnboardingGuard({ children, role }) {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  if (!user.is_onboarding_completed) {
    const target = onboardingRoutes[role || user.role] || "/role-selection";
    return <Navigate to={target} replace />;
  }

  return children;
}

export default OnboardingGuard;
