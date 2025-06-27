import { GetQuery } from "@/lib/queries";

export const useOrders = () => {
  const {
    data: orders = [],
    isLoading,
    error,
  } = GetQuery("getOrders", {}, true, null, Infinity) as {
    data: Order[];
    isLoading: boolean;
    error: any;
  };

  return {
    orders,
    isLoading,
    error,
  };
};
