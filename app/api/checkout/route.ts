// /app/api/shipping/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { weight, dimensions, destination } = await request.json();
  const UPS_API_KEY = process.env.UPS_API_KEY;

  const upsRequestBody = {
    RateRequest: {
      Shipment: {
        Shipper: {
          Address: { PostalCode: 'L1H 8L9', CountryCode: 'CA' }, // Your Oshawa origin postal code
        },
        ShipTo: {
          Address: { PostalCode: destination.postalCode, CountryCode: 'CA' },
        },
        Package: {
          PackagingType: { Code: '02' },
          Dimensions: {
            UnitOfMeasurement: { Code: 'CM' },
            Length: dimensions.length.toString(),
            Width: dimensions.width.toString(),
            Height: dimensions.height.toString(),
          },
          PackageWeight: {
            UnitOfMeasurement: { Code: 'KGS' },
            Weight: (weight / 1000).toString(),
          },
        },
      },
    },
  };

  try {
    const response = await fetch('https://wwwcie.ups.com/json/Rate', { // NOTE: This is the UPS test URL
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'AccessLicenseNumber': UPS_API_KEY!,
      },
      body: JSON.stringify(upsRequestBody),
    });
    const data = await response.json();
    const estimatedCost = data.RateResponse.RatedShipment.TotalCharges.MonetaryValue;
    return NextResponse.json({ cost: parseFloat(estimatedCost) });
  } catch (error) {
    console.error('UPS API Error:', error);
    return NextResponse.json({ error: 'Failed to fetch shipping estimate' }, { status: 500 });
  }
}