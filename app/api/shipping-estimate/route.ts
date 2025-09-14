// app/api/shipping-estimate/route.ts
import { NextResponse } from 'next/server';

// Define a type for the shipment object from UPS
interface UPSShipment {
  Service: {
    Code: string;
    Description: string;
  };
  TotalCharges: {
    MonetaryValue: string;
  };
}

export async function POST(request: Request) {
  const { address, packageDetails } = await request.json();
  console.log(address, packageDetails); // Using the variables to remove warnings for now

  const upsRequestBody = { /* ... structure based on UPS docs ... */ };

  try {
    const response = await fetch('https://onlinetools.ups.com/ship/v1/rating', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'AccessLicenseNumber': process.env.UPS_ACCESS_KEY!,
      },
      body: JSON.stringify(upsRequestBody),
    });

    const data = await response.json();

    // The fix is here: we apply the UPSShipment type to the shipment parameter
    const rates = data.RateResponse.RatedShipment.map((shipment: UPSShipment) => ({
      service: shipment.Service.Code,
      name: shipment.Service.Description,
      cost: shipment.TotalCharges.MonetaryValue,
    }));

    return NextResponse.json({ rates });
  } catch (error) {
    console.error('UPS API Error:', error);
    return NextResponse.json({ error: 'Failed to fetch shipping rates.' }, { status: 500 });
  }
}