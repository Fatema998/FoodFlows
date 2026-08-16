import { Routes, Route } from "react-router-dom";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import RoleSelection from "../pages/auth/RoleSelection";

import CustomerHome from "../pages/customer/CustomerHome";
import CustomerOnboarding from "../pages/customer/CustomerOnboarding";
import RestaurantDetail from "../pages/customer/RestaurantDetail";
import CartPage from "../pages/customer/CartPage";
import CheckoutPage from "../pages/customer/CheckoutPage";
import OrdersPage from "../pages/customer/OrdersPage";
import OrderTrackingPage from "../pages/customer/OrderTrackingPage";

import OwnerDashboard from "../pages/owner/OwnerDashboard";
import OwnerOnboarding from "../pages/owner/OwnerOnboarding";
import OwnerOrders from "../pages/owner/OwnerOrders";
import OwnerMenu from "../pages/owner/OwnerMenu";
import OwnerRestaurant from "../pages/owner/OwnerRestaurant";
import OwnerSettings from "../pages/owner/OwnerSettings";

import RiderDashboard from "../pages/rider/RiderDashboard";
import RiderOnboarding from "../pages/rider/RiderOnboarding";
import RiderDeliveries from "../pages/rider/RiderDeliveries";
import RiderHistory from "../pages/rider/RiderHistory";
import RiderEarnings from "../pages/rider/RiderEarnings";
import RiderProfile from "../pages/rider/RiderProfile";

import ProtectedRoute from "./ProtectedRoute";
import OnboardingGuard from "./OnboardingGuard";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/role-selection" element={<RoleSelection />} />

      <Route path="/" element={<CustomerHome />} />
      <Route path="/restaurants/:id" element={<RestaurantDetail />} />
      <Route path="/cart" element={<ProtectedRoute><CartPage /></ProtectedRoute>} />
      <Route path="/checkout" element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>} />
      <Route path="/orders" element={<ProtectedRoute><OrdersPage /></ProtectedRoute>} />
      <Route path="/orders/:id" element={<ProtectedRoute><OrderTrackingPage /></ProtectedRoute>} />

      <Route path="/onboarding/customer" element={<CustomerOnboarding />} />
      <Route path="/onboarding/owner" element={<OwnerOnboarding />} />
      <Route path="/onboarding/rider" element={<RiderOnboarding />} />

      <Route path="/owner/dashboard" element={<ProtectedRoute><OnboardingGuard role="RESTAURANT_OWNER"><OwnerDashboard /></OnboardingGuard></ProtectedRoute>} />
      <Route path="/owner/orders" element={<ProtectedRoute><OnboardingGuard role="RESTAURANT_OWNER"><OwnerOrders /></OnboardingGuard></ProtectedRoute>} />
      <Route path="/owner/menu" element={<ProtectedRoute><OnboardingGuard role="RESTAURANT_OWNER"><OwnerMenu /></OnboardingGuard></ProtectedRoute>} />
      <Route path="/owner/restaurant" element={<ProtectedRoute><OnboardingGuard role="RESTAURANT_OWNER"><OwnerRestaurant /></OnboardingGuard></ProtectedRoute>} />
      <Route path="/owner/settings" element={<ProtectedRoute><OnboardingGuard role="RESTAURANT_OWNER"><OwnerSettings /></OnboardingGuard></ProtectedRoute>} />

      <Route path="/rider/dashboard" element={<ProtectedRoute><OnboardingGuard role="DELIVERY_RIDER"><RiderDashboard /></OnboardingGuard></ProtectedRoute>} />
      <Route path="/rider/deliveries" element={<ProtectedRoute><OnboardingGuard role="DELIVERY_RIDER"><RiderDeliveries /></OnboardingGuard></ProtectedRoute>} />
      <Route path="/rider/history" element={<ProtectedRoute><OnboardingGuard role="DELIVERY_RIDER"><RiderHistory /></OnboardingGuard></ProtectedRoute>} />
      <Route path="/rider/earnings" element={<ProtectedRoute><OnboardingGuard role="DELIVERY_RIDER"><RiderEarnings /></OnboardingGuard></ProtectedRoute>} />
      <Route path="/rider/profile" element={<ProtectedRoute><OnboardingGuard role="DELIVERY_RIDER"><RiderProfile /></OnboardingGuard></ProtectedRoute>} />
    </Routes>
  );
}

export default AppRoutes;