"use client";
import React, { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

const LogisticsBookingForm = () => {
  const [pickupDate, setPickupDate] = useState(new Date());
  const [deliveryDate, setDeliveryDate] = useState(new Date());

  return (
    <Card className="w-full sm:w-[500px] lg:w-[600px] mx-auto p-4 sm:p-6">
      <CardHeader>
        <CardTitle className="text-lg sm:text-xl">Logistics Booking</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div className="space-y-2 lg:grid lg:grid-cols-2 lg:gap-4">
            <div className="space-y-2">
              <Label htmlFor="pickupAddress">Pickup Address</Label>
              <Input id="pickupAddress" placeholder="Enter pickup address" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="deliveryAddress">Delivery Address</Label>
              <Input id="deliveryAddress" placeholder="Enter delivery address" />
            </div>
          </div>

          <div className="space-y-2 lg:grid lg:grid-cols-2 lg:gap-4">
            <div className="space-y-2">
              <Label>Pickup Date</Label>
              <Calendar
                mode="single"
                selected={pickupDate}
                onSelect={setPickupDate}
                className="rounded-md border"
              />
            </div>
            <div className="space-y-2">
              <Label>Delivery Date</Label>
              <Calendar
                mode="single"
                selected={deliveryDate}
                onSelect={setDeliveryDate}
                className="rounded-md border"
              />
            </div>
          </div>

          <div className="space-y-2 lg:grid lg:grid-cols-2 lg:gap-4">
            <div className="space-y-2">
              <Label htmlFor="pickupTime">Pickup Time</Label>
              <Select>
                <SelectTrigger id="pickupTime">
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="now">Now (now)</SelectItem>
                  <SelectItem value="morning">Morning (8AM - 12PM)</SelectItem>
                  <SelectItem value="afternoon">Afternoon (12PM - 4PM)</SelectItem>
                  <SelectItem value="evening">Evening (4PM - 8PM)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="deliveryTime">Delivery Time</Label>
              <Select>
                <SelectTrigger id="deliveryTime">
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="now">Now (now)</SelectItem>
                  <SelectItem value="morning">Morning (8AM - 12PM)</SelectItem>
                  <SelectItem value="afternoon">Afternoon (12PM - 4PM)</SelectItem>
                  <SelectItem value="evening">Evening (4PM - 8PM)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="packageSize">Package Size</Label>
            <Select>
              <SelectTrigger id="packageSize">
                <SelectValue placeholder="Select size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="small">Small</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="large">Large</SelectItem>
                <SelectItem value="extralarge">Extra Large</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button type="submit" className="w-full">Book Pickup</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default LogisticsBookingForm;
