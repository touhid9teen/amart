"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";

import {
  MapPin,
  CreditCard,
  Navigation,
  Loader2,
  CheckCircle,
} from "lucide-react";
import { toast } from "sonner";

// Add a default list of areas for autofill logic
const areas = [
  "Dhanmondi",
  "Gulshan",
  "Banani",
  "Uttara",
  "Mirpur",
  "Mohammadpur",
  "Bashundhara",
  "Baridhara",
  "Motijheel",
  "Farmgate",
  // Add more as needed
];

// Define the type for the checkout form data
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

// Define the props type for CheckoutComponent
interface CheckoutComponentProps {
  onOrderSubmit: (formData: CheckoutFormData) => void;
  loading?: boolean;
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
      // Check if geolocation is supported
      if (!navigator.geolocation) {
        throw new Error("Geolocation is not supported by this browser");
      }

      // Get current position
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

      // Reverse geocoding using BigDataCloud's free API
      const response = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
      );

      if (!response.ok) {
        throw new Error("Failed to get address details");
      }

      const data = await response.json();

      // Extract comprehensive address information
      const city = data.city || data.locality || "Dhaka";
      const locality = data.locality || "";
      const principalSubdivision = data.principalSubdivision || "";
      const countryName = data.countryName || "";

      // Try to extract more detailed address components
      const administrative = data.localityInfo?.administrative || [];
      const informative = data.localityInfo?.informative || [];

      // Build detailed address components
      let detectedArea = "";
      let detectedRoad = "";

      // Extract area information
      if (administrative.length > 0) {
        detectedArea =
          administrative[2]?.name || administrative[3]?.name || locality;
      }

      // Extract road/street information from informative data
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

      // Find best matching area
      let bestArea = "";
      if (detectedArea) {
        bestArea =
          areas.find((area: string) =>
            area.toLowerCase().includes(detectedArea.toLowerCase())
          ) || "";
        if (!bestArea) {
          bestArea =
            areas.find((area: string) =>
              detectedArea
                .toLowerCase()
                .includes(area.split(",")[0].toLowerCase())
            ) || "";
        }
      }

      // Auto-fill form with detected location data
      setFormData((prev) => ({
        ...prev,
        city: city,
        area: bestArea || (areas.length > 0 ? areas[0] : ""),
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
    <div className="space-y-6">
      {/* Delivery Address */}
      <Card className="shadow-lg border-0">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              <CardTitle className="text-lg font-bold">
                Delivery Address
              </CardTitle>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={detectLocation}
              disabled={location.loading}
              className="flex items-center gap-2"
            >
              {location.loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Navigation className="w-4 h-4" />
              )}
              {location.loading ? "Detecting..." : "Detect Location"}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          {/* Location Status */}
          {location.coordinates && (
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-green-800">
                    Location detected successfully
                  </p>
                  <p className="text-xs text-green-700 mt-1">
                    {location.address}
                  </p>
                </div>
              </div>
            </div>
          )}

          {location.error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-700">{location.error}</p>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="address" className="text-sm font-medium">
              Full Address *
            </Label>
            <Textarea
              id="address"
              placeholder="Enter your complete address"
              className="min-h-[80px] resize-none"
              value={formData.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Order Notes */}
      <Card className="shadow-lg border-0">
        <CardHeader className="border-b">
          <CardTitle className="text-lg font-bold">
            Order Notes (Optional)
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <Textarea
            placeholder="Any special instructions for your order..."
            className="min-h-[80px] resize-none"
            value={formData.orderNotes}
            onChange={(e) => handleInputChange("orderNotes", e.target.value)}
          />
        </CardContent>
      </Card>
      {/* Payment Method */}
      <Card className="shadow-lg border-0">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b">
          <div className="flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-purple-600" />
            <CardTitle className="text-lg font-bold">Payment Method</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <RadioGroupItem value="cod" id="cod" />
                <div className="flex-1">
                  <Label htmlFor="cod" className="font-medium cursor-pointer">
                    Cash on Delivery (COD)
                  </Label>
                  <p className="text-sm text-gray-600">
                    Pay when you receive your order
                  </p>
                </div>
                <span className="text-sm text-green-600 font-medium">
                  Recommended
                </span>
              </div>

              <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors opacity-50">
                <RadioGroupItem value="online" id="online" disabled />
                <div className="flex-1">
                  <Label
                    htmlFor="online"
                    className="font-medium cursor-pointer"
                  >
                    Online Payment
                  </Label>
                  <p className="text-sm text-gray-600">
                    Pay now with card or mobile banking
                  </p>
                </div>
                <span className="text-sm text-gray-500">Coming Soon</span>
              </div>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Submit Button */}
      <Button
        className="w-full bg-gradient-to-r from-primary to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 text-sm h-12 shadow-lg hover:shadow-xl transition-all duration-200"
        onClick={() => onOrderSubmit(formData)}
        disabled={loading}
      >
        {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
        {loading ? "Placing Order..." : "Complete Order →"}
      </Button>
    </div>
  );
}
