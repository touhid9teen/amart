import { z } from "zod";

// ==============================
// PRODUCT VALIDATION
// ==============================
export const productSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(200),
  slug: z.string().optional(),
  description: z.string().optional(),
  short_description: z.string().optional(),
  price: z.number().positive("Price must be positive"),
  discount_price: z.number().nullable().optional(),
  stock: z.number().int().min(0, "Stock cannot be negative"),
  sku: z.string().min(1, "SKU is required"),
  category: z.number().positive("Category is required"),
  brand: z.number().nullable().optional(),
  tags: z.array(z.string()).optional(),
  images: z.array(z.string()).optional(),
  status: z.enum(["active", "draft", "archived"]),
  is_featured: z.boolean().optional(),
});

export type ProductFormValues = z.infer<typeof productSchema>;

// ==============================
// CATEGORY VALIDATION
// ==============================
export const categorySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  slug: z.string().optional(),
  description: z.string().optional(),
  parent: z.number().nullable().optional(),
});

export type CategoryFormValues = z.infer<typeof categorySchema>;

// ==============================
// BRAND VALIDATION
// ==============================
export const brandSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  slug: z.string().optional(),
  description: z.string().optional(),
  website: z.string().url("Must be a valid URL").optional().or(z.literal("")),
});

export type BrandFormValues = z.infer<typeof brandSchema>;

// ==============================
// COUPON VALIDATION
// ==============================
export const couponSchema = z.object({
  code: z.string().min(3, "Code must be at least 3 characters").max(20),
  discount_type: z.enum(["percentage", "fixed"]),
  discount_value: z.number().positive("Value must be positive"),
  min_order_amount: z.number().min(0).default(0),
  max_uses: z.number().int().positive("Must be at least 1").default(100),
  is_active: z.boolean().default(true),
  start_date: z.string().min(1, "Start date is required"),
  expiry_date: z.string().min(1, "Expiry date is required"),
});

export type CouponFormValues = z.infer<typeof couponSchema>;

// ==============================
// ADMIN LOGIN VALIDATION
// ==============================
export const adminLoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type AdminLoginFormValues = z.infer<typeof adminLoginSchema>;

// ==============================
// SETTINGS VALIDATIONS
// ==============================
export const storeSettingsSchema = z.object({
  store_name: z.string().min(1, "Store name is required"),
  store_email: z.string().email("Invalid email"),
  store_phone: z.string().optional(),
  store_address: z.string().optional(),
  currency: z.string().optional(),
  timezone: z.string().optional(),
});

export const taxSettingsSchema = z.object({
  tax_enabled: z.boolean(),
  tax_rate: z.number().min(0).max(100),
  tax_inclusive: z.boolean(),
  tax_label: z.string().optional(),
});

// ==============================
// PASSWORD CHANGE VALIDATION
// ==============================
export const passwordChangeSchema = z
  .object({
    current: z.string().min(1, "Current password is required"),
    new: z.string().min(6, "New password must be at least 6 characters"),
    confirm: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.new === data.confirm, {
    message: "Passwords do not match",
    path: ["confirm"],
  });

export type PasswordChangeFormValues = z.infer<typeof passwordChangeSchema>;
