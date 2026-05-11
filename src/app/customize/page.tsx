import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CustomizeFormContent } from "./CustomizeFormContent";

export const metadata = {
  title: "Customize Your Event — EventPartner",
  description:
    "Tell us everything about your event. Venue, catering, activities, entertainment — we handle it all. Get tailored proposals within 24 hours.",
};

export default function CustomizePage() {
  return (
    <div id="page-root" style={{ backgroundColor: "#EAEAED" }}>
      <Navbar />
      <CustomizeFormContent />
      <Footer />
    </div>
  );
}
