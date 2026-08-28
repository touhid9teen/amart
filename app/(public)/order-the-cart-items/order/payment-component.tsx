'"use client";';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ShoppingCart } from "lucide-react";

export default function PaymentMethod() {
  return (
    <div className="flex flex-col items-center justify-between mb-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          {/* <Image
            src="/placeholder.svg"
            alt="Freshgo Logo"
            width={40}
            height={40}
            className="mr-2"
          /> */}
          <h1 className="text-xl font-semibold text-green-600">Freshgo</h1>
        </div>
        <Button variant="ghost" size="icon">
          <ShoppingCart className="h-5 w-5" />
        </Button>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          {/* Delivery Information */}
          <div>
            <h2 className="text-lg font-medium mb-4">Delivery</h2>
            <div className="space-y-4">
              <div>
                <Input placeholder="Address" />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="save-info" />
                <Label htmlFor="save-info" className="text-sm">
                  Save this information for next time
                </Label>
              </div>
            </div>
          </div>

          {/* Shipping Method */}
          <div>
            <h2 className="text-lg font-medium mb-4">Shipping method</h2>
            <div className="bg-gray-50 p-4 rounded-md text-sm">
              Enter your shipping address to view available shipping methods.
            </div>
          </div>

          {/* Payment Information */}
          <div>
            <h2 className="text-lg font-medium mb-4">Payment</h2>
            <p className="text-sm text-gray-500 mb-4">
              All transactions are secure and encrypted.
            </p>
            <div className="border rounded-md">
              <div className="p-4 bg-gray-50 border-b flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-5 h-5 rounded-full border border-green-600 flex items-center justify-center mr-2">
                    <div className="w-3 h-3 rounded-full bg-green-600"></div>
                  </div>
                  <span>Credit card</span>
                </div>
                <div className="flex space-x-2">
                  <div className="w-8 h-5 bg-gray-200 rounded"></div>
                  <div className="w-8 h-5 bg-gray-200 rounded"></div>
                </div>
              </div>
              <div className="p-4 space-y-4">
                <div>
                  <Input placeholder="Card number" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Input placeholder="Expiration date (MM / YY)" />
                  </div>
                  <div>
                    <Input placeholder="Security code" />
                  </div>
                </div>
                <div>
                  <Input placeholder="Name on card" />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="billing-same" defaultChecked />
                  <Label htmlFor="billing-same" className="text-sm">
                    Use shipping address as billing address
                  </Label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
