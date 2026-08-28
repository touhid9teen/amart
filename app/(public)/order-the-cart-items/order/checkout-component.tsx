"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  MapPin,
  CreditCard,
  Navigation,
  Loader2,
  CheckCircle,
  StickyNote,
  AlertCircle,
  ChevronRight,
  Phone,
  User,
  ShoppingBag,
} from "lucide-react";
import { toast } from "sonner";

export interface CheckoutFormData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  city: string;
  area: string;
  address: string;
  postalCode: string;
  orderNotes: string;
}

interface CheckoutComponentProps {
  onOrderSubmit: (formData: CheckoutFormData) => void;
  loading?: boolean;
}

interface LocationState {
  loading: boolean;
  error: string | null;
  coordinates: { lat: number; lng: number } | null;
  address: string;
}

const initialFormData: CheckoutFormData = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  city: "",
  area: "",
  address: "",
  postalCode: "",
  orderNotes: "",
};

function SectionCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-2xl overflow-hidden ${className}`}
      style={{
        background: "#fff",
        border: "1px solid #ddd8d0",
        boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
      }}
    >
      {children}
    </div>
  );
}

function SectionHeader({
  icon,
  title,
  action,
}: {
  icon: React.ReactNode;
  title: string;
  action?: React.ReactNode;
}) {
  return (
    <div
      className="flex items-center justify-between px-5 py-4 border-b"
      style={{ borderColor: "#e8e4dc" }}
    >
      <div className="flex items-center gap-3">
        <span
          className="flex items-center justify-center rounded-full flex-shrink-0"
          style={{ width: 36, height: 36, background: "#e8e4dc" }}
        >
          {icon}
        </span>
        <h2 className="text-base font-semibold" style={{ color: "#333" }}>
          {title}
        </h2>
      </div>
      {action}
    </div>
  );
}

export default function CheckoutComponent({
  onOrderSubmit,
  loading,
}: CheckoutComponentProps) {
  const [paymentMethod, setPaymentMethod] = useState<string>("cod");
  const [formData, setFormData] = useState(initialFormData);
  const [location, setLocation] = useState<LocationState>({
    loading: false,
    error: null,
    coordinates: null,
    address: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const detectLocation = async () => {
    setLocation((prev) => ({ ...prev, loading: true, error: null }));

    try {
      if (!navigator.geolocation) {
        throw new Error("Geolocation is not supported by this browser");
      }

      const position = await new Promise<GeolocationPosition>(
        (resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: 300000,
          });
        }
      );

      const { latitude, longitude } = position.coords;

      const response = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
      );

      if (!response.ok) {
        throw new Error("Failed to get address details");
      }

      const data = await response.json();
      const city = data.city || data.locality || "Dhaka";
      const locality = data.locality || "";
      const principalSubdivision = data.principalSubdivision || "";
      const countryName = data.countryName || "";

      const administrative = data.localityInfo?.administrative || [];
      const informative = data.localityInfo?.informative || [];

      let detectedArea = "";
      let detectedRoad = "";

      if (administrative.length > 0) {
        detectedArea =
          administrative[2]?.name || administrative[3]?.name || locality;
      }

      if (informative.length > 0) {
        const roadInfo = informative.find(
          (info: { description?: string; name?: string }) =>
            info.description?.toLowerCase().includes("road") ||
            info.description?.toLowerCase().includes("street")
        );
        detectedRoad = roadInfo?.name || "";
      }

      const formattedAddress = [
        locality,
        city,
        principalSubdivision,
        countryName,
      ]
        .filter(Boolean)
        .join(", ");

      setLocation({
        loading: false,
        error: null,
        coordinates: { lat: latitude, lng: longitude },
        address:
          formattedAddress || `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`,
      });

      setFormData((prev) => ({
        ...prev,
        city: city,
        area: detectedArea || "",
        address:
          [detectedRoad, detectedArea, locality].filter(Boolean).join(", ") ||
          formattedAddress,
        postalCode: data.postcode || prev.postalCode,
      }));

      toast.success("Location detected and form auto-filled!");
    } catch (error) {
      console.error("Error detecting location:", error);
      let errorMessage = "Failed to detect location";

      if (error instanceof GeolocationPositionError) {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage =
              "Location access denied. Please enable location permissions.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information is unavailable.";
            break;
          case error.TIMEOUT:
            errorMessage = "Location request timed out.";
            break;
        }
      }

      setLocation((prev) => ({
        ...prev,
        loading: false,
        error: errorMessage,
      }));

      toast.error(errorMessage);
    }
  };

  return (
    <div className="space-y-5">
      {/* ── Delivery Address ── */}
      <SectionCard>
        <SectionHeader
          icon={<MapPin size={18} style={{ color: "#555" }} />}
          title="Delivery Address"
          action={
            <button
              onClick={detectLocation}
              disabled={location.loading}
              className="flex items-center gap-1.5 text-sm font-medium transition-all duration-200 px-3 py-1.5 rounded-lg"
              style={{
                color: "#1f5c2e",
                background: "rgba(31,92,46,0.08)",
                border: "none",
                cursor: location.loading ? "default" : "pointer",
              }}
            >
              {location.loading ? (
                <Loader2 size={14} className="animate-spin" />
              ) : (
                <Navigation size={14} />
              )}
              {location.loading ? "Detecting..." : "Auto-detect"}
            </button>
          }
        />

        <div className="p-5 space-y-4">
          {/* Location Status */}
          {location.coordinates && (
            <div
              className="flex items-start gap-3 p-3.5 rounded-xl"
              style={{
                background: "#f0faf4",
                border: "1px solid #d1e6d8",
              }}
            >
              <CheckCircle
                size={16}
                style={{ color: "#1f5c2e" }}
                className="flex-shrink-0 mt-0.5"
              />
              <div className="flex-1 min-w-0">
                <p
                  className="text-sm font-semibold"
                  style={{ color: "#1a4a2a" }}
                >
                  Location detected
                </p>
                <p
                  className="text-xs mt-0.5 leading-relaxed"
                  style={{ color: "#3a7a4a" }}
                >
                  {location.address}
                </p>
              </div>
            </div>
          )}

          {location.error && (
            <div
              className="flex items-start gap-3 p-3.5 rounded-xl"
              style={{
                background: "#fef2f2",
                border: "1px solid #fecaca",
              }}
            >
              <AlertCircle
                size={16}
                style={{ color: "#dc2626" }}
                className="flex-shrink-0 mt-0.5"
              />
              <p className="text-sm" style={{ color: "#991b1b" }}>
                {location.error}
              </p>
            </div>
          )}

          {/* Contact Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label
                htmlFor="phone"
                className="text-sm font-semibold"
                style={{ color: "#333" }}
              >
                Phone Number <span style={{ color: "#dc2626" }}>*</span>
              </Label>
              <div
                className="flex items-center rounded-xl overflow-hidden transition-colors duration-200 focus-within:ring-2 focus-within:ring-green-700/30"
                style={{
                  border: "1px solid #e0dcd4",
                  background: "#fafaf8",
                }}
              >
                <span
                  className="flex items-center justify-center flex-shrink-0"
                  style={{ width: 40, height: 42, color: "#999" }}
                >
                  <Phone size={15} />
                </span>
                <input
                  id="phone"
                  type="tel"
                  placeholder="01XXXXXXXXX"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className="flex-1 text-sm outline-none bg-transparent pr-3"
                  style={{ height: 42, color: "#333" }}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor="email"
                className="text-sm font-semibold"
                style={{ color: "#333" }}
              >
                Email
              </Label>
              <div
                className="flex items-center rounded-xl overflow-hidden transition-colors duration-200 focus-within:ring-2 focus-within:ring-green-700/40 focus:border-green-700"
                style={{
                  border: "1px solid #e0dcd4",
                  background: "#fafaf8",
                }}
              >
                <span
                  className="flex items-center justify-center flex-shrink-0"
                  style={{ width: 40, height: 42, color: "#999" }}
                >
                  <User size={15} />
                </span>
                <input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="flex-1 text-sm outline-none bg-transparent pr-3 placeholder:text-gray-400"
                style={{ height: 44, color: "#222" }}
                />
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="space-y-1.5">
            <Label
              htmlFor="address"                className="text-sm font-semibold"
                style={{ color: "#333" }}
              >
                Full Address <span style={{ color: "#dc2626" }}>*</span>
            </Label>
            <textarea
              id="address"
              placeholder="House number, street, area, city — include any landmark for easier delivery"
              value={formData.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
              className="w-full text-sm outline-none resize-none rounded-xl p-3.5 transition-colors duration-200 focus-within:ring-2 focus-within:ring-green-700/40 focus:border-green-700 placeholder:text-gray-400"
              style={{
                minHeight: 88,
                border: "1.5px solid #d0ccc4",
                background: "#fff",
                color: "#222",
                lineHeight: 1.6,
              }}
            />
            <p className="text-xs" style={{ color: "#999" }}>
              Please provide a detailed address for accurate delivery
            </p>
          </div>
        </div>
      </SectionCard>

      {/* ── Order Notes ── */}
      <SectionCard>
        <SectionHeader
          icon={<StickyNote size={18} style={{ color: "#555" }} />}
          title="Order Notes"
        />
        <div className="p-5">
          <textarea
            placeholder="Special instructions — e.g., call before delivery, gate code, leave at door"
            value={formData.orderNotes}
            onChange={(e) => handleInputChange("orderNotes", e.target.value)}
            className="w-full text-sm outline-none resize-none rounded-xl p-3.5 transition-colors duration-200 focus-within:ring-2 focus-within:ring-green-700/40 focus:border-green-700 placeholder:text-gray-400"
            style={{
              minHeight: 84,
              border: "1.5px solid #d0ccc4",
              background: "#fff",
              color: "#222",
              lineHeight: 1.6,
            }}
          />
        </div>
      </SectionCard>

      {/* ── Payment Method ── */}
      <SectionCard>
        <SectionHeader
          icon={<CreditCard size={18} style={{ color: "#555" }} />}
          title="Payment Method"
        />

        <div className="p-5">
          <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
            <div className="space-y-3">
              {/* COD Option */}
              <label
                className={`relative flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all duration-200 ${
                  paymentMethod === "cod" ? "border-2" : "border"
                }`}
                style={{
                  borderColor:
                    paymentMethod === "cod" ? "#1f5c2e" : "#e0dcd4",
                  background:
                    paymentMethod === "cod"
                      ? "rgba(31,92,46,0.03)"
                      : "#fafaf8",
                }}
              >
                <RadioGroupItem value="cod" id="cod" className="absolute opacity-0 inset-0 w-full h-full cursor-pointer" />
                <span
                  className={`flex items-center justify-center rounded-full flex-shrink-0 transition-all duration-200`}
                  style={{
                    width: 22,
                    height: 22,
                    border: paymentMethod === "cod" ? "6px solid #1f5c2e" : "2px solid #ccc",
                    background: paymentMethod === "cod" ? "#1f5c2e" : "transparent",
                  }}
                />
                <div className="flex-1">
                  <p className="font-semibold text-sm" style={{ color: "#333" }}>
                    Cash on Delivery
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: "#888" }}>
                    Pay when you receive your order
                  </p>
                </div>
                <span
                  className="text-xs font-semibold px-2.5 py-1 rounded-full"
                  style={{
                    background: "rgba(31,92,46,0.1)",
                    color: "#1f5c2e",
                  }}
                >
                  Recommended
                </span>
              </label>

              {/* Online Payment (disabled) */}
              <div
                className="flex items-center gap-4 p-4 rounded-xl"
                style={{
                  border: "1px solid #e0dcd4",
                  background: "#fafaf8",
                  opacity: 0.5,
                  cursor: "not-allowed",
                }}
              >
                <span
                  style={{
                    width: 22,
                    height: 22,
                    border: "2px solid #ccc",
                    borderRadius: "50%",
                    display: "block",
                    flexShrink: 0,
                  }}
                />
                <div className="flex-1">
                  <p className="font-semibold text-sm" style={{ color: "#999" }}>
                    Online Payment
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: "#bbb" }}>
                    Pay now with card or mobile banking
                  </p>
                </div>
                <span
                  className="text-xs font-medium px-2.5 py-1 rounded-full"
                  style={{ background: "#f0ece4", color: "#aaa" }}
                >
                  Coming Soon
                </span>
              </div>
            </div>
          </RadioGroup>
        </div>
      </SectionCard>

      {/* ── Submit Button ── */}
      <div className="pt-1 sticky bottom-0 lg:static" style={{ zIndex: 30 }}>
        <button
          onClick={() => onOrderSubmit(formData)}
          disabled={loading || !formData.address.trim() || !formData.phone.trim()}
          className="w-full flex items-center justify-between rounded-2xl font-bold text-base px-6 transition-all duration-200"
          style={{
            height: 60,
            background:
              loading || !formData.address.trim() || !formData.phone.trim()
                ? "#a3c4ad"
                : "#1f5c2e",
            color: "#fff",
            border: "none",
            cursor:
              loading || !formData.address.trim() || !formData.phone.trim()
                ? "default"
                : "pointer",
            boxShadow:
              loading || !formData.address.trim() || !formData.phone.trim()
                ? "none"
                : "0 4px 20px rgba(31,92,46,0.3)",
          }}
        >
          <span className="flex items-center gap-2">
            {loading ? (
              <Loader2 size={20} className="animate-spin" />
            ) : (
              <ShoppingBag size={20} />
            )}
            <span>{loading ? "Placing Order..." : "Place Order"}</span>
          </span>
          <span className="flex items-center gap-1 text-lg">
            <ChevronRight size={20} strokeWidth={3} />
          </span>
        </button>

        {(!formData.address.trim() || !formData.phone.trim()) && (
          <p className="text-xs mt-2.5 text-center" style={{ color: "#dc2626" }}>
            Please enter your {!formData.phone.trim() ? "phone number" : ""}
            {!formData.phone.trim() && !formData.address.trim() ? " and " : ""}
            {!formData.address.trim() ? "delivery address" : ""} to continue
          </p>
        )}
      </div>
    </div>
  );
}
