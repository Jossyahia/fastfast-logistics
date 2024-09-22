import CouponForm from "@/components/CreateCouponForm";
import CouponList from "./../../../components/CouponList";

export default function CouponsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Admin: Manage Coupons
      </h1>
      <CouponForm />
      <CouponList />
    </div>
  );
}
