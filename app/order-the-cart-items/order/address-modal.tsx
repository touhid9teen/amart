"use client";

import React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import {
  X,
  Home,
  Briefcase,
  Heart,
  Plus,
  Navigation,
  Loader2,
  CheckCircle,
  Save,
} from "lucide-react";
import { toast } from "sonner";

interface AddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (address: AddressData) => void;
}

interface AddressData {
  city: string;
  area: string;
  houseNumber: string;
  floorNumber: string;
  blockSector: string;
  apartmentNumber: string;
  roadStreet: string;
  name: string;
  phoneNumber: string;
  deliveryNote: string;
  label: string;
  latitude?: number;
  longitude?: number;
}

interface LocationState {
  loading: boolean;
  error: string | null;
  coordinates: { lat: number; lng: number } | null;
  address: string;
}

const addressLabels = [
  {
    id: "home",
    label: "Home",
    icon: Home,
    color: "bg-blue-100 text-blue-700 border-blue-200",
  },
  {
    id: "workplace",
    label: "Work",
    icon: Briefcase,
    color: "bg-green-100 text-green-700 border-green-200",
  },
  {
    id: "dear",
    label: "Dear",
    icon: Heart,
    color: "bg-pink-100 text-pink-700 border-pink-200",
  },
  {
    id: "other",
    label: "Other",
    icon: Plus,
    color: "bg-gray-100 text-gray-700 border-gray-200",
  },
];

// Area mapping for Bangladesh cities
const areaMapping: { [key: string]: string[] } = {
  dhaka: [
    "Badda, Dhaka",
    "Gulshan, Dhaka",
    "Dhanmondi, Dhaka",
    "Uttara, Dhaka",
    "Mirpur, Dhaka",
    "Mohakhali, Dhaka",
    "Banani, Dhaka",
    "Wari, Dhaka",
    "Ramna, Dhaka",
    "Tejgaon, Dhaka",
    "Pallabi, Dhaka",
    "Savar, Dhaka",
  ],
  chittagong: [
    "Agrabad, Chittagong",
    "Panchlaish, Chittagong",
    "Khulshi, Chittagong",
    "Halishahar, Chittagong",
  ],
  sylhet: ["Zindabazar, Sylhet", "Ambarkhana, Sylhet", "Subhanighat, Sylhet"],
};

export default function AddressModal({
  isOpen,
  onClose,
  onSave,
}: AddressModalProps) {
  const [formData, setFormData] = useState<AddressData>({
    city: "",
    area: "",
    houseNumber: "",
    floorNumber: "",
    blockSector: "",
    apartmentNumber: "",
    roadStreet: "",
    name: "",
    phoneNumber: "",
    deliveryNote: "",
    label: "home",
  });

  const [location, setLocation] = useState<LocationState>({
    loading: false,
    error: null,
    coordinates: null,
    address: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [availableAreas, setAvailableAreas] = useState<string[]>([]);

  const handleInputChange = (field: keyof AddressData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Update available areas when city changes
    if (field === "city") {
      const cityKey = value.toLowerCase();
      setAvailableAreas(areaMapping[cityKey] || areaMapping.dhaka);
      // Reset area if city changes
      setFormData((current) => {
        if (current.city !== value) {
          return { ...current, area: "" };
        }
        return current;
      });
    }

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const getCurrentLocation = () => {
    setLocation((prev) => ({ ...prev, loading: true, error: null }));

    if (!navigator.geolocation) {
      setLocation((prev) => ({
        ...prev,
        loading: false,
        error: "Geolocation is not supported by this browser",
      }));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          // Using BigDataCloud's free reverse geocoding API (no API key required)
          const response = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
          );

          if (response.ok) {
            const data = await response.json();
            console.log("Location data:", data); // For debugging

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
            let detectedBlock = "";

            // Extract area information
            if (administrative.length > 0) {
              // Usually administrative[2] or [3] contains area/thana information
              detectedArea =
                administrative[2]?.name || administrative[3]?.name || locality;
            }

            // Extract road/street information from informative data
            if (informative.length > 0) {
              const roadInfo = informative.find(
                (info) =>
                  info.description?.toLowerCase().includes("road") ||
                  info.description?.toLowerCase().includes("street")
              );
              detectedRoad = roadInfo?.name || "";
            }

            // Extract block/sector information
            const blockInfo = informative.find(
              (info) =>
                info.description?.toLowerCase().includes("block") ||
                info.description?.toLowerCase().includes("sector")
            );
            detectedBlock = blockInfo?.name || "";

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
                formattedAddress ||
                `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`,
            });

            // Set available areas based on detected city
            const cityKey = city.toLowerCase();
            const areas = areaMapping[cityKey] || areaMapping.dhaka;
            setAvailableAreas(areas);

            // Find best matching area
            let bestArea = "";
            if (detectedArea) {
              // Try to find exact match first
              bestArea =
                areas.find((area) =>
                  area.toLowerCase().includes(detectedArea.toLowerCase())
                ) || "";

              // If no exact match, try partial match
              if (!bestArea) {
                bestArea =
                  areas.find((area) =>
                    detectedArea
                      .toLowerCase()
                      .includes(area.split(",")[0].toLowerCase())
                  ) || "";
              }
            }

            // Auto-fill comprehensive form data
            setFormData((prev) => ({
              ...prev,
              city: city,
              area: bestArea || (areas.length > 0 ? areas[0] : ""),
              roadStreet:
                detectedRoad ||
                data.localityInfo?.administrative?.[4]?.name ||
                "",
              blockSector: detectedBlock || "",
              // Keep existing user-entered data for these fields
              houseNumber: prev.houseNumber || "",
              floorNumber: prev.floorNumber || "",
              apartmentNumber: prev.apartmentNumber || "",
              name: prev.name || "",
              phoneNumber: prev.phoneNumber || "",
              deliveryNote:
                prev.deliveryNote ||
                `Auto-detected location: ${formattedAddress}`,
              latitude,
              longitude,
            }));

            toast.success("Location detected and form auto-filled!");
          } else {
            throw new Error("Failed to get address details");
          }
        } catch (error) {
          console.error("Geocoding error:", error);
          // Fallback without reverse geocoding
          setLocation({
            loading: false,
            error: null,
            coordinates: { lat: latitude, lng: longitude },
            address: `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`,
          });

          // Set default city and areas
          setAvailableAreas(areaMapping.dhaka);

          setFormData((prev) => ({
            ...prev,
            city: prev.city || "Dhaka",
            area: prev.area || areaMapping.dhaka[0],
            latitude,
            longitude,
            deliveryNote:
              prev.deliveryNote ||
              `Coordinates: ${latitude.toFixed(6)}, ${longitude.toFixed(6)}`,
          }));

          toast.success("Location coordinates detected!");
        }
      },
      (error) => {
        let errorMessage = "Unable to get location";
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Location access denied by user";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information unavailable";
            break;
          case error.TIMEOUT:
            errorMessage = "Location request timed out";
            break;
        }

        setLocation((prev) => ({
          ...prev,
          loading: false,
          error: errorMessage,
        }));

        toast.error(errorMessage);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000, // Increased timeout
        maximumAge: 300000, // 5 minutes
      }
    );
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.area.trim()) newErrors.area = "Area is required";
    if (!formData.houseNumber.trim())
      newErrors.houseNumber = "House number is required";
    if (!formData.roadStreet.trim())
      newErrors.roadStreet = "Road/Street is required";
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.phoneNumber.trim())
      newErrors.phoneNumber = "Phone number is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      onSave(formData);
      onClose();
      // Reset form
      setFormData({
        city: "",
        area: "",
        houseNumber: "",
        floorNumber: "",
        blockSector: "",
        apartmentNumber: "",
        roadStreet: "",
        name: "",
        phoneNumber: "",
        deliveryNote: "",
        label: "home",
      });
      setLocation({
        loading: false,
        error: null,
        coordinates: null,
        address: "",
      });
      setAvailableAreas([]);
      toast.success("Address saved successfully!");
    }
  };

  // Initialize areas when modal opens
  React.useEffect(() => {
    if (isOpen && availableAreas.length === 0) {
      setAvailableAreas(areaMapping.dhaka); // Default to Dhaka areas
    }
  }, [isOpen]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [availableAreas.length]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[95vh] overflow-hidden p-0">
        <div className="flex flex-col h-[600px]">
          {/* Header */}
          <DialogHeader className="p-4 pb-3 border-b bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-lg font-semibold text-gray-900">
                Add New Address
              </DialogTitle>
              <button onClick={onClose} className="h-8 w-8">
                <X className="w-4 h-4" />
              </button>
            </div>
          </DialogHeader>

          {/* Location Section */}
          <div className="p-4 border-b bg-gray-50">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-gray-900">
                Auto-Fill from Location
              </h3>
              <Button
                onClick={getCurrentLocation}
                disabled={location.loading}
                size="sm"
                className="h-8 text-xs"
              >
                {location.loading ? (
                  <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                ) : (
                  <Navigation className="w-3 h-3 mr-1" />
                )}
                {location.loading ? "Detecting..." : "Use Current Location"}
              </Button>
            </div>

            {location.coordinates && (
              <Card className="p-3 bg-green-50 border-green-200">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-xs font-medium text-green-800">
                      Location detected & form auto-filled
                    </p>
                    <p className="text-xs text-green-700 mt-1">
                      {location.address}
                    </p>
                  </div>
                </div>
              </Card>
            )}

            {location.error && (
              <Card className="p-3 bg-red-50 border-red-200">
                <div className="flex items-start gap-2">
                  <X className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-red-700">{location.error}</p>
                </div>
              </Card>
            )}
          </div>

          {/* Form Section */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* City and Area */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="city" className="text-xs font-medium">
                  City <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                  className={`mt-1 h-8 text-xs ${
                    errors.city ? "border-red-300" : ""
                  }`}
                  placeholder="e.g., Dhaka"
                />
                {errors.city && (
                  <p className="text-xs text-red-500 mt-1">{errors.city}</p>
                )}
              </div>
              <div>
                <Label htmlFor="area" className="text-xs font-medium">
                  Area <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.area}
                  onValueChange={(value) => handleInputChange("area", value)}
                >
                  <SelectTrigger
                    className={`mt-1 h-8 text-xs ${
                      errors.area ? "border-red-300" : ""
                    }`}
                  >
                    <SelectValue placeholder="Select area" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableAreas.map((area) => (
                      <SelectItem key={area} value={area}>
                        {area}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.area && (
                  <p className="text-xs text-red-500 mt-1">{errors.area}</p>
                )}
              </div>
            </div>

            {/* House Number and Floor Number */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="houseNumber" className="text-xs font-medium">
                  House/Building <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="houseNumber"
                  value={formData.houseNumber}
                  onChange={(e) =>
                    handleInputChange("houseNumber", e.target.value)
                  }
                  className={`mt-1 h-8 text-xs ${
                    errors.houseNumber ? "border-red-300" : ""
                  }`}
                  placeholder="House/Building no."
                />
                {errors.houseNumber && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.houseNumber}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="floorNumber" className="text-xs font-medium">
                  Floor
                </Label>
                <Input
                  id="floorNumber"
                  value={formData.floorNumber}
                  onChange={(e) =>
                    handleInputChange("floorNumber", e.target.value)
                  }
                  className="mt-1 h-8 text-xs"
                  placeholder="Floor number"
                />
              </div>
            </div>

            {/* Block/Sector and Apartment Number */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="blockSector" className="text-xs font-medium">
                  Block/Sector
                </Label>
                <Input
                  id="blockSector"
                  value={formData.blockSector}
                  onChange={(e) =>
                    handleInputChange("blockSector", e.target.value)
                  }
                  className="mt-1 h-8 text-xs"
                  placeholder="Block/Sector"
                />
              </div>
              <div>
                <Label
                  htmlFor="apartmentNumber"
                  className="text-xs font-medium"
                >
                  Apartment
                </Label>
                <Input
                  id="apartmentNumber"
                  value={formData.apartmentNumber}
                  onChange={(e) =>
                    handleInputChange("apartmentNumber", e.target.value)
                  }
                  className="mt-1 h-8 text-xs"
                  placeholder="Apt number"
                />
              </div>
            </div>

            {/* Road/Street */}
            <div>
              <Label htmlFor="roadStreet" className="text-xs font-medium">
                Road/Street <span className="text-red-500">*</span>
              </Label>
              <Input
                id="roadStreet"
                value={formData.roadStreet}
                onChange={(e) =>
                  handleInputChange("roadStreet", e.target.value)
                }
                className={`mt-1 h-8 text-xs ${
                  errors.roadStreet ? "border-red-300" : ""
                }`}
                placeholder="Road/Street name"
              />
              {errors.roadStreet && (
                <p className="text-xs text-red-500 mt-1">{errors.roadStreet}</p>
              )}
            </div>

            {/* Name and Phone */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="name" className="text-xs font-medium">
                  Contact Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className={`mt-1 h-8 text-xs ${
                    errors.name ? "border-red-300" : ""
                  }`}
                  placeholder="Full name"
                />
                {errors.name && (
                  <p className="text-xs text-red-500 mt-1">{errors.name}</p>
                )}
              </div>
              <div>
                <Label htmlFor="phoneNumber" className="text-xs font-medium">
                  Phone Number <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={(e) =>
                    handleInputChange("phoneNumber", e.target.value)
                  }
                  className={`mt-1 h-8 text-xs ${
                    errors.phoneNumber ? "border-red-300" : ""
                  }`}
                  placeholder="+880 1XXXXXXXXX"
                />
                {errors.phoneNumber && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.phoneNumber}
                  </p>
                )}
              </div>
            </div>

            {/* Delivery Note */}
            <div>
              <Label htmlFor="deliveryNote" className="text-xs font-medium">
                Delivery Instructions
              </Label>
              <Textarea
                id="deliveryNote"
                placeholder="Special delivery instructions (optional)"
                value={formData.deliveryNote}
                onChange={(e) =>
                  handleInputChange("deliveryNote", e.target.value)
                }
                className="mt-1 min-h-[60px] text-xs resize-none"
              />
            </div>

            {/* Address Labels */}
            <div>
              <Label className="text-xs font-medium">Address Label</Label>
              <div className="grid grid-cols-4 gap-2 mt-2">
                {addressLabels.map((labelOption) => {
                  const IconComponent = labelOption.icon;
                  const isSelected = formData.label === labelOption.id;
                  return (
                    <button
                      key={labelOption.id}
                      type="button"
                      onClick={() => handleInputChange("label", labelOption.id)}
                      className={`flex flex-col items-center gap-1 p-2 rounded-lg border transition-all ${
                        isSelected
                          ? labelOption.color
                          : "border-gray-200 hover:border-gray-300 bg-white"
                      }`}
                    >
                      <IconComponent className="w-4 h-4" />
                      <span className="text-xs font-medium">
                        {labelOption.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Footer with Submit Button */}
          <div className="p-4 border-t bg-gray-50">
            <Button
              onClick={handleSave}
              className="w-full h-10 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Address
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
