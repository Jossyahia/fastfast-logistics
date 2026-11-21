// FormComponent.jsx
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const FormComponent = () => {
  const [newService, setNewService] = useState({
    name: "",
    type: "",
    route: "",
    capacity: "",
    departureTime: "",
    returnTime: "",
    address: "",
    phone: "",
    whatsapp: "",
    facebook: "",
    instagram: "",
  });

  const handleNewServiceChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewService((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitNewService = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("New service submitted:", newService);
    // Here you would typically send this data to your backend
    // Reset the form after submission
    setNewService({
      name: "",
      type: "",
      route: "",
      capacity: "",
      departureTime: "",
      returnTime: "",
      address: "",
      phone: "",
      whatsapp: "",
      facebook: "",
      instagram: "",
    });
  };

  return (
    <form onSubmit={handleSubmitNewService}>
      <div className="grid gap-4 py-4 bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-white transition-colors duration-200">
        <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-4">
          <Label htmlFor="name" className="text-right sm:text-left">
            Name
          </Label>
          <Input
            id="name"
            name="name"
            value={newService.name}
            onChange={handleNewServiceChange}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-4">
          <Label htmlFor="type" className="text-right sm:text-left">
            Type
          </Label>
          <Input
            id="type"
            name="type"
            value={newService.type}
            onChange={handleNewServiceChange}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-4">
          <Label htmlFor="route" className="text-right sm:text-left">
            Route
          </Label>
          <Input
            id="route"
            name="route"
            value={newService.route}
            onChange={handleNewServiceChange}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-4">
          <Label htmlFor="capacity" className="text-right sm:text-left">
            Capacity
          </Label>
          <Input
            id="capacity"
            name="capacity"
            value={newService.capacity}
            onChange={handleNewServiceChange}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-4">
          <Label htmlFor="departureTime" className="text-right sm:text-left">
            Departure
          </Label>
          <Input
            id="departureTime"
            name="departureTime"
            value={newService.departureTime}
            onChange={handleNewServiceChange}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-4">
          <Label htmlFor="returnTime" className="text-right sm:text-left">
            Return
          </Label>
          <Input
            id="returnTime"
            name="returnTime"
            value={newService.returnTime}
            onChange={handleNewServiceChange}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 items-start gap-4">
          <Label htmlFor="address" className="text-right sm:text-left">
            Address
          </Label>
          <Textarea
            id="address"
            name="address"
            value={newService.address}
            onChange={handleNewServiceChange}
            rows={3}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-4">
          <Label htmlFor="phone" className="text-right sm:text-left">
            Phone
          </Label>
          <Input
            id="phone"
            name="phone"
            value={newService.phone}
            onChange={handleNewServiceChange}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-4">
          <Label htmlFor="whatsapp" className="text-right sm:text-left">
            WhatsApp
          </Label>
          <Input
            id="whatsapp"
            name="whatsapp"
            value={newService.whatsapp}
            onChange={handleNewServiceChange}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-4">
          <Label htmlFor="facebook" className="text-right sm:text-left">
            Facebook
          </Label>
          <Input
            id="facebook"
            name="facebook"
            value={newService.facebook}
            onChange={handleNewServiceChange}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-4">
          <Label htmlFor="instagram" className="text-right sm:text-left">
            Instagram
          </Label>
          <Input
            id="instagram"
            name="instagram"
            value={newService.instagram}
            onChange={handleNewServiceChange}
          />
        </div>
        <div className="flex justify-end">
          <Button type="submit">Submit</Button>
        </div>
      </div>
    </form>
  );
};

export default FormComponent;
